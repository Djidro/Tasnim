// ========== SUPABASE INITIALIZATION ==========
const supabaseUrl = 'https://jwjyrsikkxenmfuprmra.supabase.co';
const supabaseKey = 'sb_publishable_PHN_TDMztYkLLKkxbeFanA_cKKHEu94';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// ========== ONESIGNAL CONFIGURATION ==========
const ONESIGNAL_APP_ID = '85cf1a46-eedf-4ea3-9a02-304b2c687726';

// ========== GLOBAL ONESIGNAL INITIALIZATION ==========
async function initOneSignal() {
    try {
        if (!window.OneSignal) {
            await new Promise(resolve => {
                const check = setInterval(() => {
                    if (window.OneSignal) { clearInterval(check); resolve(); }
                }, 100);
            });
        }

        window.OneSignalDeferred = window.OneSignalDeferred || [];
        
        OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
                appId: ONESIGNAL_APP_ID,
                notifyButton: { enable: false },
                allowLocalhostAsSecureOrigin: true,
                serviceWorkerPath: 'OneSignalSDKWorker.js',
                serviceWorkerParam: { scope: '/' },
                promptOptions: {
                    slidedown: {
                        prompts: [{
                            type: "push",
                            autoPrompt: false,
                            text: {
                                actionMessage: "We'd love to notify you when your countdowns finish! 💕",
                                acceptButton: "Allow Notifications",
                                cancelButton: "Maybe Later"
                            },
                            delay: { pageViews: 1, timeDelay: 3 }
                        }]
                    }
                }
            });

            OneSignal.User.PushSubscription.addEventListener('change', async function(event) {
                if (event.current && event.current.id) {
                    await savePlayerId(event.current.id);
                    if (showPopupGlobal && typeof showPopupGlobal === 'function') {
                        showPopupGlobal('✅ Notifications enabled! 💕');
                    }
                }
            });

            OneSignal.Notifications.addEventListener('click', async function(event) {
                window.focus();
                if (showScreenGlobal && typeof showScreenGlobal === 'function') {
                    showScreenGlobal('future');
                }
            });

            const permission = await OneSignal.Notifications.permission;
            if (!permission) {
                setTimeout(async () => {
                    await OneSignal.Slidedown.promptPush();
                }, 3000);
            }
        });
    } catch (error) {
        console.error('OneSignal init error:', error);
    }
}

async function savePlayerId(playerId) {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        const email = session?.user?.email || 'anonymous';
        await supabaseClient
            .from('onesignal_subscriptions')
            .upsert({ player_id: playerId, email: email, updated_at: new Date().toISOString() }, { onConflict: 'player_id' });
    } catch (err) {
        console.error('Save player ID error:', err);
    }
}

// ========== GLOBAL REFERENCES FOR ONESIGNAL CALLBACKS ==========
let showPopupGlobal = null;
let showScreenGlobal = null;

// ========== MAIN APPLICATION ==========
(function () {
    "use strict";

    // ========== AUTHENTICATION CHECK ==========
    async function checkUser() {
        try {
            const { data: { session }, error } = await supabaseClient.auth.getSession();
            if (error) { console.error('Session error:', error); return; }

            const loginOverlay = document.getElementById('loginOverlay');
            const mainApp = document.getElementById('mainApp');

            if (session) {
                if (loginOverlay) loginOverlay.classList.add('hidden');
                if (mainApp) mainApp.classList.add('visible');
                sessionStorage.setItem('lovequest_auth', 'true');
                if (!window._gameInitialized) {
                    initGameApp();
                    window._gameInitialized = true;
                }
                showDailyPasscodeScreen();
                initOneSignal();
            } else {
                if (loginOverlay) loginOverlay.classList.remove('hidden');
            }
        } catch (err) {
            console.error('checkUser error:', err);
        }
    }

    async function attemptLogin() {
        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');
        const loginError = document.getElementById('loginError');
        const loginOverlay = document.getElementById('loginOverlay');
        const mainApp = document.getElementById('mainApp');
        const email = emailInput?.value.trim();
        const password = passwordInput?.value.trim();

        if (!email || !password) {
            if (loginError) loginError.textContent = "❌ Please enter email and password";
            return;
        }

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) { if (loginError) loginError.textContent = "❌ " + error.message; return; }
            if (loginOverlay) loginOverlay.classList.add('hidden');
            if (mainApp) mainApp.classList.add('visible');
            sessionStorage.setItem('lovequest_auth', 'true');
            if (!window._gameInitialized) {
                initGameApp();
                window._gameInitialized = true;
            }
            showDailyPasscodeScreen();
            initOneSignal();
        } catch (err) {
            console.error('Login error:', err);
            if (loginError) loginError.textContent = "❌ Login failed.";
        }
    }

    const CORRECT_PASSCODE = "28.dec";

    function showDailyPasscodeScreen() {
        const overlay = document.getElementById('dailyPasscodeOverlay');
        const error = document.getElementById('dailyPasscodeError');
        const input = document.getElementById('dailyPasscodeInput');
        const mainApp = document.getElementById('mainApp');
        if (overlay) overlay.classList.remove('hidden');
        if (error) error.textContent = '';
        if (input) input.value = '';
        if (mainApp) mainApp.classList.remove('visible');
    }

    function hideDailyPasscodeScreen() {
        const overlay = document.getElementById('dailyPasscodeOverlay');
        const mainApp = document.getElementById('mainApp');
        if (overlay) overlay.classList.add('hidden');
        if (mainApp) mainApp.classList.add('visible');
    }

    function checkDailyPasscode() {
        const input = document.getElementById('dailyPasscodeInput');
        const error = document.getElementById('dailyPasscodeError');
        const entered = input?.value.trim();
        if (entered === CORRECT_PASSCODE || entered === "28dec" || entered === "28.dec.2017") {
            hideDailyPasscodeScreen();
            alert('💕 Welcome back, my love! ✨');
        } else {
            if (error) error.textContent = "❌ That's not our date, baby... Try again 💭";
            if (input) { input.value = ''; input.focus(); }
        }
    }

    // ========== CUSTOMIZATION ==========
    let girlfriendName = "Tasnim";
    const specialMessages = [
        "You're my favorite notification ❤️", "Every day with you is a new level of love.",
        "I fall for you again and again.", "You're the heart of my game.",
        "Tasnim, you make life magical ✨", "You're the reason I smile every day 💕",
        "My heart beats only for you 💓"
    ];
    const dailyLoveMessages = [
        "You're my today and all my tomorrows.", "Thinking of you is my favorite hobby.",
        "Tasnim, you make ordinary days magical.", "I love you more than yesterday.",
        "You are my sunshine ☀️", "Every moment with you is a treasure 💎",
        "You're the best thing that ever happened to me", "My love for you grows stronger each day 🌱",
        "You're not just my girlfriend, you're my everything", "Falling in love with you was the best decision ever 💕",
        "You make my heart skip a beat 💓", "I cherish every second we spend together",
        "You're the missing piece I never knew I needed 🧩", "With you, every day feels like a fairytale ✨",
        "You're my dream come true 🌙", "I love you to the moon and back 🌙⭐",
        "You're my favorite person in the whole world 🌍", "Thank you for being you 💝",
        "You're beautiful inside and out 💖", "I'm so lucky to have you in my life 🍀"
    ];
    const memories = [
        { type: "video", title: "🌟 First video together", full: "From nothing, this video reflects what we dreamed of becoming.", videoId: "oLGeMfnNP5g" },
        { type: "image", title: "💫 Meaningful moment", full: "The moment our love grew deeper and more meaningful.", image: "gallery-1.jpg" },
        { type: "image", title: "🌙 28.dec.2017", full: "28 Dec 2017 - the day forever began.", image: "gallery-2.jpg" },
        { type: "video", title: "💫 Our Beautiful World", full: "Even with many reasons to break up, we held on to each other.", videoId: "mKZUeGkqtEQ" },
        { type: "image", title: "📸 First photo together", full: "Our first image together—simple, but the start of something truly special.", image: "gallery-3.jpg" },
        { type: "image", title: "🌸 Queen almahdi", full: "My life, my story, my memories—summed up in one photo.", image: "gallery-4.jpg" },
        { type: "image", title: "🕊️ Childhood", full: "From kids to growing up together, and hoping to stay together forever.", image: "gallery-5.jpg" }
    ];
    const storyLevels = [
        { title: '✨ First meeting', dialogue: 'I still remember the first time I saw you... my heart skipped a beat.', choices: ['You were glowing ✨', 'I was so nervous'], romanticEnd: 'That moment, something changed in me forever.' },
        { title: '💕 Getting closer', dialogue: 'Every conversation felt like coming home to where I belong.', choices: ['I loved your voice', 'You made me laugh so much'], romanticEnd: 'I started falling for you, slowly but surely.' },
        { title: '💖 Falling in love', dialogue: 'I realized I couldn\'t stop thinking about you, every minute of every day.', choices: ['It was scary but beautiful', 'I was completely all in'], romanticEnd: 'And I fell completely, head over heels.' },
        { title: '🌙 Missing each other', dialogue: 'Distance made my heart grow fonder with each passing day.', choices: ['I counted the days until we\'d meet', 'Your messages saved me daily'], romanticEnd: 'Missing you became a sweet, beautiful ache.' },
        { title: '💍 Forever promise', dialogue: 'I want you in every single chapter of my life story.', choices: ['Always and forever ❤️', 'You\'re my forever person'], romanticEnd: 'No matter what happens, I will always choose you.' },
        { title: '🌟 Growing together', dialogue: 'Every challenge we faced only made our love stronger.', choices: ['We\'re an unstoppable team 💪', 'Nothing can break us'], romanticEnd: 'Together, we can conquer anything life throws at us.' },
        { title: '🎵 Our song', dialogue: 'Every love song suddenly makes perfect sense because of you.', choices: ['You\'re the melody to my heart 🎶', 'Our love is the sweetest song'], romanticEnd: 'Our love story is my favorite song that never ends.' },
        { title: '🌅 Beautiful future', dialogue: 'When I think about tomorrow, all I see is you beside me.', choices: ['Building dreams together 🏠', 'Growing old with you 👵👴'], romanticEnd: 'The best is yet to come because I have you.' }
    ];
    const whatsappNumber = "96878440900";

    // ========== GAME STATE ==========
    let currentScreen = 'home';
    let currentStoryChapter = 0;
    let musicEnabled = true;
    let typingSoundEnabled = true;
    let gameInterval = null;
    let gameActive = false;
    let score = 0;
    let typingInterval = null;
    let screens = {};
    let welcomeMsg, dynamicNameSpan;
    let futurePlans = [];
    let countdownIntervals = new Map();
    let notifiedPlans = new Set();
    let notesSubscription = null;
    let commentSubscription = null;
    let currentUser = null;

    // ========== NOTIFICATION FUNCTIONS ==========
    function playNotificationSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const notes = [
                { freq: 523.25, delay: 0 },
                { freq: 659.25, delay: 0.1 },
                { freq: 783.99, delay: 0.2 },
                { freq: 1046.50, delay: 0.3 }
            ];
            notes.forEach(({ freq, delay }) => {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                const startTime = audioCtx.currentTime + delay;
                gainNode.gain.setValueAtTime(0.2, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
                oscillator.start(startTime);
                oscillator.stop(startTime + 0.3);
            });
        } catch (e) { /* ignore */ }
    }

    function checkAndNotifyPlan(plan) {
        const now = new Date();
        const targetDate = new Date(plan.date);
        const diff = targetDate - now;
        if (diff <= 0 && !notifiedPlans.has(plan.id)) {
            notifiedPlans.add(plan.id);
            showPopup(`💫 "${plan.title}" is happening now! ❤️`);
            playNotificationSound();
            if (document.hidden) createBrowserNotification(plan);
            markPlanAsNotifiedInDB(plan.id);
        }
    }

    async function createBrowserNotification(plan) {
        if (!("Notification" in window)) return;
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                const notification = new Notification(`💫 ${plan.title}`, {
                    body: plan.description || 'Your special moment has arrived! ❤️',
                    icon: '/icon-192.png',
                    badge: '/icon-192.png',
                    tag: `plan-${plan.id}`,
                    vibrate: [200, 100, 200],
                    requireInteraction: true
                });
                notification.onclick = () => { window.focus(); showScreen('future'); notification.close(); };
            }
        } catch (error) { /* ignore */ }
    }

    async function markPlanAsNotifiedInDB(planId) {
        try {
            await supabaseClient
                .from('future_plans')
                .update({ notification_sent: true, notification_sent_at: new Date().toISOString() })
                .eq('id', planId);
        } catch (err) { console.error('Mark notified error:', err); }
    }

    async function loadNotifiedPlans() {
        try {
            const { data } = await supabaseClient.from('future_plans').select('id').eq('notification_sent', true);
            if (data) data.forEach(plan => notifiedPlans.add(plan.id));
        } catch (err) { console.error('Load notified error:', err); }
    }

    // ========== INIT GAME APP ==========
    function initGameApp() {
        screens = {
            home: document.getElementById('homeScreen'),
            story: document.getElementById('storyScreen'),
            mini: document.getElementById('miniGameScreen'),
            daily: document.getElementById('dailyScreen'),
            notes: document.getElementById('notesScreen'),
            gallery: document.getElementById('galleryScreen'),
            future: document.getElementById('futureScreen'),
            settings: document.getElementById('settingsScreen')
        };
        welcomeMsg = document.getElementById('welcomeMessage');
        dynamicNameSpan = document.getElementById('dynamicNameDisplay');
        
        // Set global references for OneSignal callbacks
        showPopupGlobal = showPopup;
        showScreenGlobal = showScreen;
        
        updateNameEverywhere();

        // ========== SCREEN NAVIGATION ==========
        function showScreen(screenId) {
            Object.values(screens).forEach(s => { if (s) s.classList.remove('active'); });
            if (screens[screenId]) screens[screenId].classList.add('active');
            currentScreen = screenId;
            if (screenId === 'daily') generateDailyMessage();
            if (screenId === 'gallery') renderMemoryGallery();
            if (screenId === 'story') loadStoryChapter(currentStoryChapter);
            if (screenId === 'future') renderFuturePlans();
            if (screenId === 'notes') initNotesScreen();
        }

        // ========== LOCAL STORAGE ==========
        function saveProgress() {
            localStorage.setItem('loveQuest_progress', JSON.stringify({ chapter: currentStoryChapter, music: musicEnabled, typing: typingSoundEnabled }));
        }
        function loadProgress() {
            const saved = localStorage.getItem('loveQuest_progress');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    currentStoryChapter = data.chapter || 0;
                    musicEnabled = data.music !== undefined ? data.music : true;
                    typingSoundEnabled = data.typing !== undefined ? data.typing : true;
                    updateAudioUI();
                } catch (e) { /* ignore */ }
            }
        }
        function updateAudioUI() {
            const musicBtn = document.getElementById('toggleMusicBtn');
            const typingBtn = document.getElementById('toggleTypingSoundBtn');
            if (musicBtn) musicBtn.textContent = musicEnabled ? '🔊 ON' : '🔇 OFF';
            if (typingBtn) typingBtn.textContent = typingSoundEnabled ? '🔊 ON' : '🔇 OFF';
        }

        // ========== STORY MODE ==========
        function loadStoryChapter(chapterIndex) {
            const actualIndex = chapterIndex % storyLevels.length;
            const chapter = storyLevels[actualIndex];
            const displayNumber = chapterIndex + 1;
            const levelIndicator = document.getElementById('levelIndicator');
            if (levelIndicator) levelIndicator.textContent = `Chapter ${displayNumber} · ${chapter.title}`;
            const dialogueDiv = document.getElementById('storyDialogue');
            if (dialogueDiv) { dialogueDiv.textContent = ''; typeText(chapter.dialogue, dialogueDiv); }
            const choicesDiv = document.getElementById('storyChoices');
            if (choicesDiv) {
                choicesDiv.innerHTML = '';
                chapter.choices.forEach((choiceText, idx) => {
                    const btn = document.createElement('button');
                    btn.textContent = choiceText;
                    btn.addEventListener('click', () => {
                        if (idx === 0) showPopup(`You chose "${choiceText}" — sweet memory ❤️`);
                        else showPopup(`"${choiceText}" — I feel the same way.`);
                        if (dialogueDiv) dialogueDiv.textContent = chapter.romanticEnd + ' ❤️';
                        choicesDiv.innerHTML = '';
                        const nextBtn = document.createElement('button');
                        nextBtn.textContent = '📖 Next Chapter ➡️';
                        nextBtn.addEventListener('click', () => {
                            currentStoryChapter++;
                            saveProgress();
                            loadStoryChapter(currentStoryChapter);
                            if (currentStoryChapter % 5 === 0) showFinalMessage();
                        });
                        choicesDiv.appendChild(nextBtn);
                    });
                    choicesDiv.appendChild(btn);
                });
            }
        }

        function showFinalMessage() {
            const finalDiv = document.getElementById('finalMessageContainer');
            if (finalDiv) {
                finalDiv.innerHTML = `<div class="final-message">Chapter ${currentStoryChapter} complete!<br>My love for you keeps growing with every chapter ❤️</div>`;
                setTimeout(() => { if (finalDiv) finalDiv.innerHTML = ''; }, 5000);
            }
            showPopup("Every chapter with you is my favorite 📚❤️");
        }

        // ========== TYPING ANIMATION ==========
        function typeText(text, element, speed = 40) {
            if (!element) return;
            if (typingInterval) clearInterval(typingInterval);
            let i = 0;
            element.textContent = '';
            typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    if (typingSoundEnabled) playTypingTick();
                    i++;
                } else { clearInterval(typingInterval); }
            }, speed);
        }

        // ========== MINI GAME ==========
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas ? canvas.getContext('2d') : null;
        let basketX = 200;
        const basketW = 80, basketH = 20;
        let hearts = [];
        let gameScoreSpan = document.getElementById('gameScore');

        function initMiniGame() {
            if (!canvas || !ctx) return;
            if (gameInterval) clearInterval(gameInterval);
            gameActive = true;
            score = 0;
            hearts = [];
            basketX = 200;
            updateScore();
            gameInterval = setInterval(updateGame, 40);
            canvas.addEventListener('mousemove', moveBasket);
            canvas.addEventListener('touchmove', touchMove, { passive: false });
        }
        function touchMove(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const scaleX = canvas.width / rect.width;
            let x = (touch.clientX - rect.left) * scaleX;
            basketX = Math.min(canvas.width - basketW, Math.max(0, x - basketW / 2));
        }
        function moveBasket(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            let x = (e.clientX - rect.left) * scaleX;
            basketX = Math.min(canvas.width - basketW, Math.max(0, x - basketW / 2));
        }
        function stopMiniGame() {
            gameActive = false;
            if (gameInterval) clearInterval(gameInterval);
            if (canvas) {
                canvas.removeEventListener('mousemove', moveBasket);
                canvas.removeEventListener('touchmove', touchMove);
            }
        }
        function updateGame() {
            if (!gameActive || !ctx) return;
            if (Math.random() < 0.08) {
                hearts.push({ x: Math.random() * (canvas.width - 20), y: 0, size: 18 + Math.floor(Math.random() * 10), speed: 2 + Math.floor(Math.random() * 4) });
            }
            hearts = hearts.filter(h => {
                h.y += h.speed;
                if (h.y + h.size >= canvas.height - basketH - 5 && h.y < canvas.height - 5) {
                    if (h.x + h.size > basketX && h.x < basketX + basketW) {
                        score++;
                        updateScore();
                        if (Math.random() < 0.35) showPopup(specialMessages[Math.floor(Math.random() * specialMessages.length)]);
                        playCollectSound();
                        return false;
                    }
                }
                return h.y < canvas.height + 20;
            });
            drawCanvas();
        }
        function drawCanvas() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#d44e7a';
            ctx.shadowColor = '#ffb6c1';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            roundRect(ctx, basketX, canvas.height - basketH - 5, basketW, basketH, 12);
            ctx.fill();
            ctx.shadowBlur = 0;
            hearts.forEach(h => {
                ctx.font = `${h.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
                ctx.fillText('❤️', h.x, h.y);
            });
            ctx.font = 'bold 18px sans-serif';
            ctx.fillStyle = '#7a2e4a';
            ctx.fillText(`❤️ ${score}`, 10, 40);
        }
        function roundRect(ctx, x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            return ctx;
        }
        function updateScore() { if (gameScoreSpan) gameScoreSpan.textContent = score; }

        // ========== DAILY MESSAGE ==========
        function generateDailyMessage() {
            const dailyDisplay = document.getElementById('dailyMessageDisplay');
            if (dailyDisplay) {
                const randomIndex = Math.floor(Math.random() * dailyLoveMessages.length);
                dailyDisplay.innerText = `${dailyLoveMessages[randomIndex]} ❤️`;
            }
        }

        // ========== MEMORY GALLERY ==========
        function renderMemoryGallery() {
            const container = document.getElementById('videoReelContainer');
            if (!container) return;
            container.innerHTML = '';
            memories.forEach((mem) => {
                const card = document.createElement('div');
                card.className = 'video-card';
                if (mem.type === "video" && mem.videoId) {
                    const iframe = document.createElement('iframe');
                    iframe.width = "100%";
                    iframe.height = "100%";
                    iframe.src = `https://www.youtube.com/embed/${mem.videoId}?autoplay=0&mute=1&controls=1&loop=1&playlist=${mem.videoId}&modestbranding=1&rel=0&showinfo=0`;
                    iframe.title = mem.title;
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                    iframe.allowFullscreen = true;
                    iframe.style.aspectRatio = "9 / 16";
                    iframe.style.objectFit = "cover";
                    card.appendChild(iframe);
                } else if (mem.type === "image" && mem.image) {
                    const img = document.createElement('img');
                    img.src = mem.image;
                    img.alt = mem.title;
                    img.style.width = "100%";
                    img.style.height = "100%";
                    img.style.aspectRatio = "9 / 16";
                    img.style.objectFit = "cover";
                    img.style.cursor = "pointer";
                    img.addEventListener('click', () => { if (img.requestFullscreen) img.requestFullscreen(); });
                    card.appendChild(img);
                }
                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                overlay.innerHTML = `<div class="video-title">${mem.title}</div><div class="video-description">💬 ${mem.full}</div>`;
                card.appendChild(overlay);
                container.appendChild(card);
            });
            if (memories.length === 0) {
                container.innerHTML = '<p style="text-align: center; padding: 40px;">✨ Beautiful memories coming soon... ✨</p>';
            }
        }

        // ========== AUDIO ==========
        function playTypingTick() {
            if (!typingSoundEnabled) return;
            try {
                const a = new (window.AudioContext || window.webkitAudioContext)();
                if (a.state === 'suspended') a.resume();
                const o = a.createOscillator(); o.type = 'sine'; o.frequency.value = 800;
                const g = a.createGain(); g.gain.value = 0.05;
                o.connect(g); g.connect(a.destination);
                o.start(); o.stop(a.currentTime + 0.03);
            } catch (e) { /* ignore */ }
        }
        function playCollectSound() {
            try {
                const a = new (window.AudioContext || window.webkitAudioContext)();
                if (a.state === 'suspended') a.resume();
                const o = a.createOscillator(); o.type = 'triangle'; o.frequency.value = 1200;
                const g = a.createGain(); g.gain.value = 0.1;
                o.connect(g); g.connect(a.destination);
                o.start(); o.stop(a.currentTime + 0.06);
            } catch (e) { /* ignore */ }
        }

        // ========== POPUP ==========
        function showPopup(msg) {
            const pop = document.createElement('div');
            pop.className = 'popup-message';
            pop.textContent = msg;
            document.body.appendChild(pop);
            setTimeout(() => { if (pop && pop.parentNode) pop.remove(); }, 3000);
        }

        function updateNameEverywhere() {
            if (dynamicNameSpan) dynamicNameSpan.textContent = `✨ ${girlfriendName} ✨`;
            if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${girlfriendName} ❤️ This world was made just for you.`;
        }

        // ========== FUTURE PLANS ==========
        function formatCountdown(targetDate) {
            const now = new Date();
            const target = new Date(targetDate);
            const diff = target - now;
            if (diff <= 0) return { reached: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            return { reached: false, days, hours, minutes, seconds };
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function startCountdown(planId, targetDate, element, plan) {
            if (countdownIntervals.has(planId)) {
                const existing = countdownIntervals.get(planId);
                if (existing.cancel) existing.cancel();
                countdownIntervals.delete(planId);
            }
            let lastUpdate = Date.now();
            let rafId;

            const updateCountdown = () => {
                const now = Date.now();
                lastUpdate = now;
                const timeData = formatCountdown(targetDate);
                if (!element || !element.isConnected) {
                    if (countdownIntervals.has(planId)) {
                        const interval = countdownIntervals.get(planId);
                        if (interval.cancel) interval.cancel();
                        countdownIntervals.delete(planId);
                    }
                    return;
                }
                if (timeData.reached) {
                    element.innerHTML = `<div class="countdown-reached">✨ Today is the moment ❤️ ✨</div>`;
                    if (plan) checkAndNotifyPlan(plan);
                    if (countdownIntervals.has(planId)) {
                        const interval = countdownIntervals.get(planId);
                        if (interval.cancel) interval.cancel();
                        countdownIntervals.delete(planId);
                    }
                } else {
                    element.innerHTML = `
                        <div class="countdown-display">
                            <div class="countdown-unit"><span class="countdown-number">${timeData.days}</span><span class="countdown-label">Days</span></div>
                            <div class="countdown-unit"><span class="countdown-number">${String(timeData.hours).padStart(2, '0')}</span><span class="countdown-label">Hours</span></div>
                            <div class="countdown-unit"><span class="countdown-number">${String(timeData.minutes).padStart(2, '0')}</span><span class="countdown-label">Mins</span></div>
                            <div class="countdown-unit"><span class="countdown-number">${String(timeData.seconds).padStart(2, '0')}</span><span class="countdown-label">Secs</span></div>
                        </div>`;
                }
            };

            function tick() {
                const now = Date.now();
                if (now - lastUpdate >= 1000) updateCountdown();
                rafId = requestAnimationFrame(tick);
            }
            updateCountdown();
            rafId = requestAnimationFrame(tick);
            countdownIntervals.set(planId, { cancel: () => { if (rafId) cancelAnimationFrame(rafId); } });
        }

        async function loadFuturePlans() {
            try {
                const { data, error } = await supabaseClient.from('future_plans').select('*').order('date', { ascending: true });
                if (error) { console.error('Error loading plans:', error.message); return; }
                futurePlans = data || [];
                await loadNotifiedPlans();
                renderFuturePlans();
                updateFuturePlansCount();
            } catch (err) { console.error('Failed to load plans:', err); }
        }

        function createPlanCard(plan, index) {
            const card = document.createElement('div');
            card.className = 'plan-card';
            card.dataset.planId = plan.id;
            const header = document.createElement('div');
            header.className = 'plan-header';
            header.innerHTML = `<h3 class="plan-title">${escapeHtml(plan.title)}</h3><span class="plan-author">${escapeHtml(plan.author)}</span>`;
            const desc = document.createElement('div');
            desc.className = 'plan-description';
            desc.textContent = plan.description || 'No description';
            const countdownDiv = document.createElement('div');
            countdownDiv.className = 'plan-countdown';
            countdownDiv.id = `countdown-${plan.id}`;
            const footer = document.createElement('div');
            footer.className = 'plan-footer';
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'plan-delete-btn';
            deleteBtn.textContent = '🗑️ Remove';
            deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deletePlan(plan.id); });
            footer.appendChild(deleteBtn);
            card.appendChild(header);
            card.appendChild(desc);
            card.appendChild(countdownDiv);
            card.appendChild(footer);
            startCountdown(plan.id, plan.date, countdownDiv, plan);
            return card;
        }

        function renderFuturePlans() {
            const container = document.getElementById('futurePlansContainer');
            const emptyState = document.getElementById('emptyFutureState');
            if (!container) return;
            countdownIntervals.forEach((intervalObj) => {
                if (intervalObj && intervalObj.cancel) intervalObj.cancel();
            });
            countdownIntervals.clear();
            const children = Array.from(container.children);
            children.forEach(child => { if (child.id !== 'emptyFutureState') child.remove(); });
            if (futurePlans.length === 0) {
                if (emptyState) emptyState.style.display = 'block';
            } else {
                if (emptyState) emptyState.style.display = 'none';
                futurePlans.sort((a, b) => new Date(a.date) - new Date(b.date));
                futurePlans.forEach((plan, index) => {
                    const card = createPlanCard(plan, index);
                    container.insertBefore(card, emptyState);
                });
            }
        }

        function updateFuturePlansCount() {
            const countElement = document.getElementById('futurePlansCount');
            if (countElement) countElement.textContent = futurePlans.length;
        }

        async function addFuturePlan(title, description, date, author) {
            try {
                const { error } = await supabaseClient.from('future_plans').insert([{ title, description, date, author, created_at: new Date().toISOString() }]);
                if (error) { alert('❌ Failed to save plan: ' + error.message); return; }
                alert('✅ Plan saved!');
                await loadFuturePlans();
            } catch (err) { alert('❌ Failed to save plan'); }
        }

        async function deletePlan(planId) {
            try {
                const { error } = await supabaseClient.from('future_plans').delete().eq('id', planId);
                if (error) { alert('❌ Failed to delete plan'); return; }
                if (countdownIntervals.has(planId)) {
                    const interval = countdownIntervals.get(planId);
                    if (interval.cancel) interval.cancel();
                    countdownIntervals.delete(planId);
                }
                showPopup('💔 Plan removed');
                await loadFuturePlans();
            } catch (err) { alert('❌ Failed to delete plan'); }
        }

        function checkAllPlansStatus() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let todayPlans = [];
            let passedPlans = [];
            futurePlans.forEach(plan => {
                const planDate = new Date(plan.date);
                const planDay = new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate());
                if (planDay.getTime() === today.getTime()) todayPlans.push(plan);
                else if (planDay < today) passedPlans.push(plan);
            });
            if (todayPlans.length > 0) {
                setTimeout(() => { todayPlans.forEach(plan => showPopup(`💫 TODAY IS THE DAY! "${plan.title}" ❤️`)); }, 2000);
            }
            if (passedPlans.length > 0) {
                setTimeout(() => {
                    const names = passedPlans.map(p => p.title).join(', ');
                    showPopup(`📅 You missed: ${names}. Check your plans! 💕`);
                }, 4000);
            }
        }

        function initFuturePlanner() {
            loadFuturePlans();
            const dateInput = document.getElementById('planDate');
            if (dateInput) {
                const now = new Date();
                // Set to exactly 2 minutes from now
                now.setMinutes(now.getMinutes() + 2);
                
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                
                // Set BOTH min AND value to now + 2 minutes
                const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
                dateInput.min = minDateTime;
                dateInput.value = minDateTime;
                
                // Force the step to 1 minute
                dateInput.step = '60';
            }
            let selectedAuthor = 'Me ❤️';
            const authorBtns = document.querySelectorAll('.author-btn');
            authorBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    authorBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    selectedAuthor = this.dataset.author;
                });
            });
            const addBtn = document.getElementById('addPlanBtn');
            if (addBtn) {
                addBtn.addEventListener('click', function () {
                    const titleInput = document.getElementById('planTitle');
                    const descInput = document.getElementById('planDescription');
                    const dateInputEl = document.getElementById('planDate');
                    const title = titleInput ? titleInput.value.trim() : '';
                    const description = descInput ? descInput.value.trim() : '';
                    const date = dateInputEl ? dateInputEl.value : '';
                    if (!title) { showPopup('Please add a title for your plan 💭'); if (titleInput) titleInput.focus(); return; }
                    if (!date) { showPopup('When are we planning this? 📅'); if (dateInputEl) dateInputEl.focus(); return; }
                    addFuturePlan(title, description, date, selectedAuthor);
                    if (titleInput) titleInput.value = '';
                    if (descInput) descInput.value = '';
                    // Reset to 2 minutes from now
                    const resetNow = new Date();
                    resetNow.setMinutes(resetNow.getMinutes() + 2);
                    const ry = resetNow.getFullYear();
                    const rm = String(resetNow.getMonth() + 1).padStart(2, '0');
                    const rd = String(resetNow.getDate()).padStart(2, '0');
                    const rh = String(resetNow.getHours()).padStart(2, '0');
                    const rmin = String(resetNow.getMinutes()).padStart(2, '0');
                    if (dateInputEl) {
                        dateInputEl.value = `${ry}-${rm}-${rd}T${rh}:${rmin}`;
                        dateInputEl.min = `${ry}-${rm}-${rd}T${rh}:${rmin}`;
                    }
                    if (titleInput) titleInput.focus();
                });
            }
            renderFuturePlans();
        }

        // ========== NOTES SYSTEM ==========
        async function getCurrentUser() {
            const { data: { session } } = await supabaseClient.auth.getSession();
            currentUser = session?.user?.email || 'Unknown';
        }
        function timeAgo(dateString) {
            const now = new Date();
            const date = new Date(dateString);
            const seconds = Math.floor((now - date) / 1000);
            if (seconds < 60) return 'just now';
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes}m ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours}h ago`;
            const days = Math.floor(hours / 24);
            if (days < 7) return `${days}d ago`;
            return date.toLocaleDateString();
        }
        function sanitizeHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
        async function loadNotes() {
            try {
                const { data, error } = await supabaseClient.from('love_notes').select('*').order('created_at', { ascending: false });
                if (error) { console.error('Error loading notes:', error); return; }
                renderNotes(data || []);
            } catch (err) { console.error('Failed to load notes:', err); }
        }
        function renderNotes(notes) {
            const container = document.getElementById('notesList');
            if (!container) return;
            container.innerHTML = '';
            if (notes.length === 0) {
                container.innerHTML = '<div class="notes-empty"><div class="empty-notes-icon">💌</div><p>No notes yet...</p><p class="notes-empty-sub">Write the first love note!</p></div>';
                return;
            }
            notes.forEach(note => { const card = createNoteCard(note); container.appendChild(card); });
        }
        function createNoteCard(note) {
            const card = document.createElement('div');
            card.className = 'note-card';
            card.id = `note-${note.id}`;
            const likes = note.likes || 0;
            card.innerHTML = `
                <div class="note-body"><div class="note-text" id="text-${note.id}">${sanitizeHTML(note.content)}</div><div class="note-actions"><button class="action-btn edit-btn" title="Edit">✏️</button><button class="action-btn delete-btn" title="Delete">🗑️</button></div></div>
                <div class="note-meta"><span class="note-author">${sanitizeHTML(note.author_name || 'Anonymous')}</span><span class="note-time">${timeAgo(note.created_at)}</span></div>
                <div class="reactions-bar"><button class="like-btn">🤍 <span class="like-count">${likes}</span></button><button class="reply-toggle-btn">💬 Replies</button></div>
                <div class="replies-section" id="replies-${note.id}" style="display:none;"><div id="comments-${note.id}"></div><div class="reply-composer"><input type="text" id="reply-input-${note.id}" class="reply-input" placeholder="Write a reply..."/><button class="reply-send-btn" id="reply-send-${note.id}">Send</button></div></div>`;
            
            const likeBtn = card.querySelector('.like-btn');
const likedNotes = JSON.parse(localStorage.getItem('liked_notes') || '{}');

// If already liked in this browser, disable the button
if (likedNotes[note.id]) {
    likeBtn.innerHTML = `❤️ <span class="like-count">${likes}</span>`;
    likeBtn.disabled = true;
    likeBtn.style.opacity = '0.7';
    likeBtn.style.cursor = 'not-allowed';
} else {
    likeBtn.addEventListener('click', () => toggleLike(note.id));
}
            const editBtn = card.querySelector('.edit-btn');
            if (editBtn) editBtn.addEventListener('click', () => startEditing(note.id, note.content));
            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn) deleteBtn.addEventListener('click', () => deleteNote(note.id));
            card.querySelector('.reply-toggle-btn').addEventListener('click', () => {
                const section = document.getElementById(`replies-${note.id}`);
                if (section.style.display === 'none') { section.style.display = 'block'; loadComments(note.id); }
                else section.style.display = 'none';
            });
            const sendBtn = card.querySelector(`#reply-send-${note.id}`);
            if (sendBtn) sendBtn.addEventListener('click', () => sendReply(note.id));
            const replyInput = card.querySelector(`#reply-input-${note.id}`);
            if (replyInput) replyInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendReply(note.id); });
            loadComments(note.id);
            return card;
        }
        function updateSingleNote(note) {
            const existingCard = document.getElementById(`note-${note.id}`);
            if (existingCard) { const newCard = createNoteCard(note); existingCard.replaceWith(newCard); }
        }
        async function saveNote() {
            const input = document.getElementById("newNoteText");
            const nameInput = document.getElementById("nameInput");
            if (!input) return;
            const content = input.value.trim();
            let name = nameInput?.value?.trim() || "Anonymous";
            if (!content) { alert("Write something first! 💭"); return; }
            try {
                const { data: { session } } = await supabaseClient.auth.getSession();
                if (!name || name === "Anonymous") { if (session?.user?.email) name = session.user.email.split('@')[0]; }
                const { error } = await supabaseClient.from("love_notes").insert([{ content: content, author_name: name }]);
                if (error) { alert("❌ Failed to save note."); return; }
                input.value = "";
                if (nameInput) nameInput.value = "";
                const countSpan = document.getElementById('charCount');
                if (countSpan) countSpan.textContent = '0';
                alert("💕 Note saved successfully!");
                loadNotes();
            } catch (err) { alert("❌ Something went wrong."); }
        }
      
  async function toggleLike(noteId) {
    const card = document.getElementById(`note-${noteId}`);
    const likeBtn = card?.querySelector('.like-btn');
    const likeCountSpan = card?.querySelector('.like-count');
    
    // Check localStorage if this note was already liked
    const likedNotes = JSON.parse(localStorage.getItem('liked_notes') || '{}');
    
    if (likedNotes[noteId]) {
        showPopup('❤️ You already liked this note!');
        return;
    }
    
    try {
        // Get current likes from the displayed count
        const currentLikes = parseInt(likeCountSpan?.textContent || '0');
        const newLikes = currentLikes + 1;
        
        // Update in database
        const { error } = await supabaseClient
            .from('love_notes')
            .update({ likes: newLikes })
            .eq('id', noteId);
        
        if (error) {
            console.error('Like error:', error);
            return;
        }
        
        // Save to localStorage
        likedNotes[noteId] = true;
        localStorage.setItem('liked_notes', JSON.stringify(likedNotes));
        
        // Update button immediately
        if (likeBtn) {
            likeBtn.innerHTML = `❤️ <span class="like-count">${newLikes}</span>`;
            likeBtn.disabled = true;
            likeBtn.style.opacity = '0.7';
            likeBtn.style.cursor = 'not-allowed';
            likeBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                likeBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        showPopup('❤️ Liked!');
        
    } catch (err) {
        console.error('Like error:', err);
    }
}
   async function sendReply(noteId) {
    const input = document.getElementById(`reply-input-${noteId}`);
    const content = input?.value?.trim();
    
    if (!content) return;
    
    try {
        let authorName = "Anonymous";
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session?.user?.email) {
            authorName = session.user.email.split('@')[0];
        }
        
        const { error } = await supabaseClient
            .from('comments')
            .insert([{ 
                note_id: noteId, 
                content: content, 
                author_name: authorName 
            }]);
        
        if (error) {
            console.error('Reply error:', error);
            alert('❌ Failed to send reply');
            return;
        }
        
        input.value = '';
        await loadComments(noteId);
        
    } catch (err) {
        console.error('Send reply error:', err);
        alert('❌ Failed to send reply');
    }
}
        
        async function loadComments(noteId) {
            try {
                const { data } = await supabaseClient.from('comments').select('*').eq('note_id', noteId).order('created_at', { ascending: true });
                const container = document.getElementById(`comments-${noteId}`);
                if (!container) return;
                if (!data || data.length === 0) { container.innerHTML = '<p style="color: #b3708c; font-size: 0.85rem; padding: 8px;">No replies yet. 💬</p>'; return; }
                container.innerHTML = '';
                data.forEach(comment => {
                    const div = document.createElement('div');
                    div.className = 'reply-item';
                    div.innerHTML = `<div class="reply-text"><strong>${sanitizeHTML(comment.author_name || 'Anonymous')}</strong>: ${sanitizeHTML(comment.content)}</div><div class="reply-time">${timeAgo(comment.created_at)}</div>`;
                    container.appendChild(div);
                });
            } catch (err) { /* ignore */ }
        }
        async function startEditing(noteId, currentText) {
            const textDiv = document.getElementById(`text-${noteId}`);
            if (!textDiv) return;
            textDiv.contentEditable = true;
            textDiv.classList.add('editable');
            textDiv.focus();
            const saveEdit = async () => {
                const newText = textDiv.textContent.trim();
                textDiv.contentEditable = false;
                textDiv.classList.remove('editable');
                if (newText && newText !== currentText) {
                    await supabaseClient.from('love_notes').update({ content: newText }).eq('id', noteId);
                }
            };
            textDiv.addEventListener('blur', saveEdit, { once: true });
            textDiv.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); textDiv.blur(); } });
        }
   async function deleteNote(noteId) {
    if (!confirm('Delete this note?')) return;
    
    // Remove from UI immediately (optimistic update)
    const card = document.getElementById(`note-${noteId}`);
    if (card) { 
        card.style.opacity = '0'; 
        card.style.transform = 'scale(0.95)'; 
        card.style.transition = 'all 0.3s ease'; 
        
        try {
            const { error } = await supabaseClient
                .from('love_notes')
                .delete()
                .eq('id', noteId);
                
            if (error) { 
                // If delete fails, restore the card
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                alert('❌ Failed to delete note: ' + error.message);
                return; 
            }
            
            // Remove with animation after successful delete
            setTimeout(() => { 
                card.remove(); 
                const container = document.getElementById('notesList'); 
                if (container && container.querySelectorAll('.note-card').length === 0) { 
                    container.innerHTML = '<div class="notes-empty"><div class="empty-notes-icon">💌</div><p>No notes yet...</p><p class="notes-empty-sub">Write the first love note!</p></div>'; 
                } 
            }, 300);
            
        } catch (err) { 
            // Restore card on error
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            alert('❌ Failed to delete note'); 
        }
    }
}
       function subscribeToNotes() {
    if (notesSubscription) supabaseClient.removeChannel(notesSubscription);
    
    notesSubscription = supabaseClient.channel('love_notes_channel')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'love_notes' }, 
            (payload) => {
                console.log('Realtime event:', payload.eventType, payload); // Debug log
                
                if (payload.eventType === 'INSERT') {
                    const container = document.getElementById('notesList');
                    // Only reload if the container is empty or showing empty state
                    if (container?.querySelector('.notes-empty')) { 
                        loadNotes(); 
                    } else if (container) {
                        const newCard = createNoteCard(payload.new); 
                        container.insertBefore(newCard, container.firstChild); 
                    }
                } 
                else if (payload.eventType === 'UPDATE') { 
                    updateSingleNote(payload.new); 
                }
                else if (payload.eventType === 'DELETE') {
                    // Remove the card without reloading all notes
                    const card = document.getElementById(`note-${payload.old.id}`);
                    if (card) { 
                        card.style.opacity = '0'; 
                        card.style.transform = 'scale(0.95)'; 
                        card.style.transition = 'all 0.3s ease'; 
                        setTimeout(() => { 
                            card.remove(); 
                            const c = document.getElementById('notesList'); 
                            if (c && c.querySelectorAll('.note-card').length === 0) { 
                                c.innerHTML = '<div class="notes-empty"><div class="empty-notes-icon">💌</div><p>No notes yet...</p><p class="notes-empty-sub">Write the first love note!</p></div>'; 
                            } 
                        }, 300); 
                    }
                }
            }
        ).subscribe();
}
        function subscribeToComments() {
            if (commentSubscription) supabaseClient.removeChannel(commentSubscription);
            commentSubscription = supabaseClient.channel('comments_channel')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, (payload) => { if (payload.new?.note_id) loadComments(payload.new.note_id); }).subscribe();
        }
        function updateCharCount() {
            const textarea = document.getElementById('newNoteText');
            const countSpan = document.getElementById('charCount');
            if (textarea && countSpan) countSpan.textContent = textarea.value.length;
        }
        function initNotesScreen() {
            getCurrentUser();
            loadNotes();
            subscribeToNotes();
            subscribeToComments();
            const textarea = document.getElementById('newNoteText');
            if (textarea) textarea.addEventListener('input', updateCharCount);
            const saveBtn = document.getElementById('saveNoteBtn');
            if (saveBtn) saveBtn.addEventListener('click', saveNote);
        }

        // ========== EVENT LISTENERS ==========
        const startBtn = document.getElementById('startStoryBtn');
        if (startBtn) startBtn.addEventListener('click', () => { currentStoryChapter = 0; showScreen('story'); });
        const miniGameBtn = document.getElementById('goMiniGameBtn');
        if (miniGameBtn) miniGameBtn.addEventListener('click', () => { showScreen('mini'); initMiniGame(); });
        const dailyBtn = document.getElementById('goDailyBtn');
        if (dailyBtn) dailyBtn.addEventListener('click', () => showScreen('daily'));
        const galleryBtn = document.getElementById('goGalleryBtn');
        if (galleryBtn) galleryBtn.addEventListener('click', () => showScreen('gallery'));
        const settingsBtn = document.getElementById('goSettingsBtn');
        if (settingsBtn) settingsBtn.addEventListener('click', () => showScreen('settings'));
        document.querySelectorAll('[id^="backFrom"]').forEach(b => b.addEventListener('click', () => { stopMiniGame(); showScreen('home'); }));
        const refreshBtn = document.getElementById('refreshDailyBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', () => { generateDailyMessage(); showPopup("Here's another message just for you! 💝"); });
        const missMeBtn = document.getElementById('missMeBtn');
        if (missMeBtn) missMeBtn.addEventListener('click', () => { const msgs = [`I miss you every second, ${girlfriendName} ❤️`, "Can't wait to see you again! 💕", "You're always on my mind 🌙"]; showPopup(msgs[Math.floor(Math.random() * msgs.length)]); });
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) whatsappBtn.addEventListener('click', () => { window.open(`https://wa.me/${whatsappNumber}?text=Hey! I just played your Love Quest game! ❤️ - ${girlfriendName}`, '_blank'); });
        const musicBtn = document.getElementById('toggleMusicBtn');
        if (musicBtn) musicBtn.addEventListener('click', () => { musicEnabled = !musicEnabled; updateAudioUI(); saveProgress(); });
        const typingBtn = document.getElementById('toggleTypingSoundBtn');
        if (typingBtn) typingBtn.addEventListener('click', () => { typingSoundEnabled = !typingSoundEnabled; updateAudioUI(); saveProgress(); });
        const resetBtn = document.getElementById('resetProgressBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => { currentStoryChapter = 0; saveProgress(); showPopup('Story reset! ❤️'); });
        const restartBtn = document.getElementById('restartMiniGame');
        if (restartBtn) restartBtn.addEventListener('click', () => { stopMiniGame(); initMiniGame(); });
        const goFutureBtn = document.getElementById('goFutureBtn');
        if (goFutureBtn) goFutureBtn.addEventListener('click', () => showScreen('future'));
        const notesBtn = document.getElementById('goNotesBtn');
        if (notesBtn) notesBtn.addEventListener('click', () => { showScreen('notes'); initNotesScreen(); });
        const backFromFuture = document.getElementById('backFromFuture');
        if (backFromFuture) backFromFuture.addEventListener('click', () => showScreen('home'));

        loadProgress();
        updateAudioUI();
        initFuturePlanner();

        setTimeout(() => { if (currentScreen === 'home') showPopup(`Hey ${girlfriendName}… I just wanted to remind you I love you ❤️`); }, 1500);
        setTimeout(() => { if (typeof checkAllPlansStatus === 'function') checkAllPlansStatus(); }, 5000);
    }

    // ========== PARTICLES & ANIMATIONS ==========
    const pCanvas = document.getElementById('heart-particle-canvas');
    if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        function resizeCanvas() { pCanvas.width = window.innerWidth; pCanvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        let particles = [];
        for (let i = 0; i < 25; i++) { particles.push({ x: Math.random() * pCanvas.width, y: Math.random() * pCanvas.height, size: 12 + Math.random() * 20, speed: 0.2 + Math.random() * 0.6 }); }
        function drawParticles() {
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            pCtx.font = '20px "Segoe UI Emoji"';
            pCtx.fillStyle = 'rgba(255,200,220,0.5)';
            particles.forEach(p => { p.y -= p.speed; if (p.y < -30) { p.y = pCanvas.height + 20; p.x = Math.random() * pCanvas.width; } pCtx.fillText('❤️', p.x, p.y); });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    (function createFloatingRings() {
        const loginOverlay = document.getElementById('loginOverlay');
        if (!loginOverlay || document.querySelector('.rings-container')) return;
        const ringsContainer = document.createElement('div');
        ringsContainer.className = 'rings-container';
        loginOverlay.appendChild(ringsContainer);
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= 2; i++) { const ring = document.createElement('div'); ring.className = `ring ring-${i}`; fragment.appendChild(ring); }
        ringsContainer.appendChild(fragment);
        const handleVisibilityChange = () => {
            const rings = document.querySelectorAll('.ring');
            if (document.hidden) rings.forEach(r => r.style.animationPlayState = 'paused');
            else rings.forEach(r => r.style.animationPlayState = 'running');
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && loginOverlay.classList.contains('hidden')) {
                    const rings = document.querySelectorAll('.ring');
                    rings.forEach(r => { r.style.transition = 'opacity 0.5s ease'; r.style.opacity = '0'; });
                    setTimeout(() => { const c = document.querySelector('.rings-container'); if (c) { c.remove(); document.removeEventListener('visibilitychange', handleVisibilityChange); observer.disconnect(); } }, 500);
                }
            });
        });
        observer.observe(loginOverlay, { attributes: true });
        setTimeout(() => { document.querySelectorAll('.ring').forEach((r, i) => { r.style.transition = 'opacity 0.8s ease'; r.style.opacity = '1'; }); }, 100);
    })();

    // ========== DOM CONTENT LOADED ==========
    document.addEventListener('DOMContentLoaded', () => {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.addEventListener('click', attemptLogin);
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });
        const dailyPasscodeBtn = document.getElementById('dailyPasscodeBtn');
        if (dailyPasscodeBtn) dailyPasscodeBtn.addEventListener('click', checkDailyPasscode);
        const dailyPasscodeInput = document.getElementById('dailyPasscodeInput');
        if (dailyPasscodeInput) dailyPasscodeInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkDailyPasscode(); });
        checkUser();
    });
})();
