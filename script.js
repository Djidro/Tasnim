// ========== GITHUB GIST CONFIGURATION ==========
const GIST_ID = 'fba30498b001f8dabb4762ce8385cb8a';
const GIST_FILENAME = 'lovequest-data.json';
const GITHUB_TOKEN = localStorage.getItem('lovequest_github_token');

if (!GITHUB_TOKEN) {
    console.warn('⚠️ GitHub token not set. Sync disabled. Run: localStorage.setItem("lovequest_github_token", "ghp_YOUR_TOKEN")');
}

// ========== GIST API FUNCTIONS ==========
async function loadFromGist() {
    if (!GITHUB_TOKEN) {
        console.warn('⚠️ Skipping Gist load - no token');
        return { notes: [], future_plans: [] };
    }
    
    try {
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        if (!response.ok) throw new Error('Failed to load');
        const gist = await response.json();
        
        // SAFE CHECK: Make sure files exist before accessing
        if (!gist.files || !gist.files[GIST_FILENAME]) {
            console.warn('⚠️ Gist file not found');
            return { notes: [], future_plans: [] };
        }
        
        const content = gist.files[GIST_FILENAME].content;
        return content ? JSON.parse(content) : { notes: [], future_plans: [] };
    } catch (err) {
        console.error('Gist load error:', err);
        return { notes: [], future_plans: [] };
    }
}

async function saveToGist(data) {
    if (!GITHUB_TOKEN) {
        console.warn('⚠️ Skipping Gist save - no token');
        return false;
    }
    
    try {
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                files: {
                    [GIST_FILENAME]: {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Save failed:', errorData);
            return false;
        }
        
        console.log('✅ Data synced to Gist successfully!');
        return true;
    } catch (err) {
        console.error('Gist save error:', err);
        return false;
    }
}
// ========== GIST API FUNCTIONS ==========
async function loadFromGist() {
    try {
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        if (!response.ok) throw new Error('Failed to load');
        const gist = await response.json();
        const content = gist.files[GIST_FILENAME]?.content;
        return content ? JSON.parse(content) : { notes: [], future_plans: [] };
    } catch (err) {
        console.error('Gist load error:', err);
        return { notes: [], future_plans: [] };
    }
}

async function saveToGist(data) {
    try {
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                files: {
                    [GIST_FILENAME]: {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Save failed:', errorData);
            return false;
        }
        
        console.log('✅ Data synced to Gist successfully!');
        return true;
    } catch (err) {
        console.error('Gist save error:', err);
        return false;
    }
}

// ========== MAIN APPLICATION ==========
(function () {
    "use strict";

    // ========== SIMPLE PASSWORD LOGIN ==========
    const VALID_PASSWORDS = ['28dec', '28.dec', '28.dec.2017', '28-dec', '28dec2017'];

    function checkUser() {
        const isLoggedIn = sessionStorage.getItem('lovequest_auth');
        const loginOverlay = document.getElementById('loginOverlay');
        const mainApp = document.getElementById('mainApp');

        if (isLoggedIn === 'true') {
            if (loginOverlay) loginOverlay.classList.add('hidden');
            if (mainApp) mainApp.classList.add('visible');
            if (!window._gameInitialized) {
                initGameApp();
                window._gameInitialized = true;
            }
        } else {
            if (loginOverlay) loginOverlay.classList.remove('hidden');
            if (mainApp) mainApp.classList.remove('visible');
        }
    }

    function attemptLogin() {
        const passwordInput = document.getElementById('passwordInput');
        const loginError = document.getElementById('loginError');
        const loginOverlay = document.getElementById('loginOverlay');
        const mainApp = document.getElementById('mainApp');
        const password = passwordInput?.value.trim().toLowerCase();

        if (!password) {
            if (loginError) loginError.textContent = "❌ Please enter our special date";
            return;
        }

        if (VALID_PASSWORDS.includes(password)) {
            if (loginOverlay) loginOverlay.classList.add('hidden');
            if (mainApp) mainApp.classList.add('visible');
            sessionStorage.setItem('lovequest_auth', 'true');
            if (!window._gameInitialized) {
                initGameApp();
                window._gameInitialized = true;
            }
            showPopup('💕 Welcome back, my love! ✨');
        } else {
            if (loginError) loginError.textContent = "❌ That's not our date, try again... 💭";
            if (passwordInput) { passwordInput.value = ''; passwordInput.focus(); }
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
    let notesList = [];
    let countdownIntervals = new Map();
    let notifiedPlans = new Set();

    // ========== BROWSER NOTIFICATIONS ==========
    async function requestNotificationPermission() {
        if (!("Notification" in window)) return;
        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    }

    function sendBrowserNotification(title, body) {
        if (!("Notification" in window)) return;
        if (Notification.permission === "granted") {
            new Notification(title, {
                body: body,
                icon: '❤️',
                badge: '❤️',
                vibrate: [200, 100, 200],
                requireInteraction: true
            });
        }
    }

    function checkAndNotifyPlan(plan) {
        const now = new Date();
        const targetDate = new Date(plan.date);
        const diff = targetDate - now;
        if (diff <= 0 && !notifiedPlans.has(plan.id)) {
            notifiedPlans.add(plan.id);
            showPopup(`💫 "${plan.title}" is happening now! ❤️`);
            sendBrowserNotification(`💫 ${plan.title}`, plan.description || 'Your special moment has arrived! ❤️');
            saveNotifiedPlans();
        }
    }

    function saveNotifiedPlans() {
        localStorage.setItem('notified_plans', JSON.stringify([...notifiedPlans]));
    }

    function loadNotifiedPlans() {
        const saved = localStorage.getItem('notified_plans');
        if (saved) {
            try {
                notifiedPlans = new Set(JSON.parse(saved));
            } catch (e) { /* ignore */ }
        }
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
        
        updateNameEverywhere();
        requestNotificationPermission();
        loadNotifiedPlans();
        initDataSync();

        function showScreen(screenId) {
            Object.values(screens).forEach(s => { if (s) s.classList.remove('active'); });
            if (screens[screenId]) screens[screenId].classList.add('active');
            currentScreen = screenId;
            if (screenId === 'daily') generateDailyMessage();
            if (screenId === 'gallery') renderMemoryGallery();
            if (screenId === 'story') loadStoryChapter(currentStoryChapter);
            if (screenId === 'future') renderFuturePlans();
            if (screenId === 'notes') renderNotesFromLocal();
        }

        // ========== DATA SYNC ==========
        async function initDataSync() {
            const localNotes = localStorage.getItem('lovequest_notes');
            const localPlans = localStorage.getItem('lovequest_plans');
            
            if (localNotes) notesList = JSON.parse(localNotes);
            if (localPlans) futurePlans = JSON.parse(localPlans);

            const gistData = await loadFromGist();
            if (gistData.notes && gistData.notes.length > 0) {
                notesList = gistData.notes;
                localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            }
            if (gistData.future_plans && gistData.future_plans.length > 0) {
                futurePlans = gistData.future_plans;
                localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            }
        }

        async function syncAllData() {
            const data = {
                notes: notesList,
                future_plans: futurePlans
            };
            localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            await saveToGist(data);
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

        // ========== NOTES SYSTEM ==========
        function renderNotesFromLocal() {
            const container = document.getElementById('notesList');
            if (!container) return;
            
            if (notesList.length === 0) {
                container.innerHTML = '<div class="notes-empty"><div class="empty-notes-icon">💌</div><p>No notes yet...</p><p class="notes-empty-sub">Write the first love note!</p></div>';
                return;
            }
            
            container.innerHTML = '';
            notesList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            notesList.forEach(note => {
                const card = document.createElement('div');
                card.className = 'note-card';
                card.innerHTML = `
                    <div class="note-body">
                        <div class="note-text">${escapeHtml(note.content)}</div>
                        <div class="note-actions">
                            <button class="action-btn delete-btn" data-id="${note.id}">🗑️</button>
                        </div>
                    </div>
                    <div class="note-meta">
                        <span class="note-author">${escapeHtml(note.author_name || 'Anonymous')}</span>
                        <span class="note-time">${timeAgo(note.created_at)}</span>
                    </div>
                `;
                card.querySelector('.delete-btn').addEventListener('click', () => deleteNote(note.id));
                container.appendChild(card);
            });
        }

        async function saveNoteToLocal() {
            const input = document.getElementById("newNoteText");
            const nameInput = document.getElementById("nameInput");
            if (!input) return;
            const content = input.value.trim();
            let name = nameInput?.value?.trim() || "Anonymous";
            if (!content) { showPopup("Write something first! 💭"); return; }
            
            const note = {
                id: Date.now().toString(),
                content: content,
                author_name: name,
                created_at: new Date().toISOString()
            };
            
            notesList.unshift(note);
            localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            input.value = "";
            if (nameInput) nameInput.value = "";
            renderNotesFromLocal();
            showPopup("💕 Note saved!");
            await syncAllData();
        }

        async function deleteNote(noteId) {
            if (!confirm('Delete this note?')) return;
            notesList = notesList.filter(n => n.id !== noteId);
            localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            renderNotesFromLocal();
            await syncAllData();
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

        async function addFuturePlan(title, description, date, author) {
            const plan = {
                id: Date.now().toString(),
                title,
                description,
                date,
                author,
                created_at: new Date().toISOString()
            };
            futurePlans.push(plan);
            localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            renderFuturePlans();
            showPopup('✅ Plan saved!');
            await syncAllData();
        }

        async function deletePlan(planId) {
            futurePlans = futurePlans.filter(p => p.id !== planId);
            if (countdownIntervals.has(planId)) {
                const interval = countdownIntervals.get(planId);
                if (interval.cancel) interval.cancel();
                countdownIntervals.delete(planId);
            }
            localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            renderFuturePlans();
            showPopup('💔 Plan removed');
            await syncAllData();
        }

        function initFuturePlanner() {
            const dateInput = document.getElementById('planDate');
            if (dateInput) {
                const now = new Date();
                now.setMinutes(now.getMinutes() + 2);
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
                dateInput.min = minDateTime;
                dateInput.value = minDateTime;
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
                    if (!title) { showPopup('Please add a title for your plan 💭'); return; }
                    if (!date) { showPopup('When are we planning this? 📅'); return; }
                    addFuturePlan(title, description, date, selectedAuthor);
                    if (titleInput) titleInput.value = '';
                    if (descInput) descInput.value = '';
                });
            }
            renderFuturePlans();
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
        if (notesBtn) notesBtn.addEventListener('click', () => { showScreen('notes'); renderNotesFromLocal(); });
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        if (saveNoteBtn) saveNoteBtn.addEventListener('click', saveNoteToLocal);
        const backFromFuture = document.getElementById('backFromFuture');
        if (backFromFuture) backFromFuture.addEventListener('click', () => showScreen('home'));

        loadProgress();
        updateAudioUI();
        initFuturePlanner();

        setTimeout(() => { if (currentScreen === 'home') showPopup(`Hey ${girlfriendName}… I just wanted to remind you I love you ❤️`); }, 1500);
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
    })();

    // ========== DOM CONTENT LOADED ==========
    document.addEventListener('DOMContentLoaded', () => {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.addEventListener('click', attemptLogin);
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });
        checkUser();
    });
})();
