/* ============================================================
   LOVE QUEST — Tasnim 💚
   Password: 28dec
   Anniversary: 28 December 2017
   ============================================================ */

// ========== GITHUB GIST CONFIGURATION ==========
const GIST_ID = 'b85ba63d4376ddd0862c53e97aade6ab';
const GIST_FILENAME = 'lovequest-data.json';
const GITHUB_TOKEN = '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';

// ========== GLOBAL HELPERS ==========
function showPopup(msg) {
    const pop = document.createElement('div');
    pop.className = 'popup-message';
    pop.textContent = msg;
    document.body.appendChild(pop);
    setTimeout(() => { if (pop && pop.parentNode) pop.remove(); }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

// ========== GIST API ==========
async function loadFromGist() {
    try {
        const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        if (!res.ok) throw new Error('load failed');
        const gist = await res.json();
        const file = gist.files && gist.files[GIST_FILENAME];
        if (!file || !file.content) return { notes: [], future_plans: [] };
        return JSON.parse(file.content);
    } catch (err) {
        console.error('Gist load error:', err);
        return { notes: [], future_plans: [] };
    }
}

async function saveToGist(data) {
    try {
        const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: { [GIST_FILENAME]: { content: JSON.stringify(data, null, 2) } }
            })
        });
        if (!res.ok) throw new Error('save failed');
        console.log('✅ Synced');
        return true;
    } catch (err) {
        console.error('Gist save error:', err);
        return false;
    }
}

// ========== MAIN APP ==========
(function () {
    "use strict";

    // ---------- LOGIN ----------
    const VALID_PASSWORDS = ['28dec'];

    function checkUser() {
        const isLoggedIn = sessionStorage.getItem('lovequest_auth');
        const overlay = document.getElementById('loginOverlay');
        const app = document.getElementById('mainApp');
        if (isLoggedIn === 'true') {
            if (overlay) overlay.classList.add('hidden');
            if (app) app.classList.add('visible');
            if (!window._gameInitialized) { initGameApp(); window._gameInitialized = true; }
        } else {
            if (overlay) overlay.classList.remove('hidden');
            if (app) app.classList.remove('visible');
        }
    }

    function attemptLogin() {
        const input = document.getElementById('passwordInput');
        const error = document.getElementById('loginError');
        const overlay = document.getElementById('loginOverlay');
        const app = document.getElementById('mainApp');
        const password = input ? input.value.trim().toLowerCase() : '';

        if (!password) {
            if (error) error.textContent = "❌ Please enter our special date";
            return;
        }

        if (VALID_PASSWORDS.includes(password)) {
            if (overlay) overlay.classList.add('hidden');
            if (app) app.classList.add('visible');
            sessionStorage.setItem('lovequest_auth', 'true');
            if (!window._gameInitialized) { initGameApp(); window._gameInitialized = true; }
            showPopup('💕 Welcome back, my love! ✨');
        } else {
            if (error) error.textContent = "❌ That's not our date, try again... 💭";
            if (input) { input.value = ''; input.focus(); }
        }
    }

    // ---------- CUSTOMIZATION ----------
    const girlfriendName = "Tasnim";
    const ANNIVERSARY = new Date('2017-12-28T00:00:00');

    const specialMessages = [
        "You're my favorite notification ❤️",
        "Every day with you is a new level of love.",
        "I fall for you again and again.",
        "You're the heart of my game.",
        "Tasnim, you make life magical ✨",
        "You're the reason I smile every day 💕",
        "My heart beats only for you 💓"
    ];

    const dailyLoveMessages = [
        "You're my today and all my tomorrows.",
        "Thinking of you is my favorite hobby.",
        "Tasnim, you make ordinary days magical.",
        "I love you more than yesterday.",
        "You are my sunshine ☀️",
        "Every moment with you is a treasure 💎",
        "You're the best thing that ever happened to me",
        "My love for you grows stronger each day 🌱",
        "You're not just my girlfriend, you're my everything",
        "Falling in love with you was the best decision ever 💕",
        "You make my heart skip a beat 💓",
        "I cherish every second we spend together",
        "You're the missing piece I never knew I needed 🧩",
        "With you, every day feels like a fairytale ✨",
        "You're my dream come true 🌙",
        "I love you to the moon and back 🌙⭐",
        "You're my favorite person in the whole world 🌍",
        "Thank you for being you 💝",
        "You're beautiful inside and out 💖",
        "I'm so lucky to have you in my life 🍀"
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
        { title: '💖 Falling in love', dialogue: "I realized I couldn't stop thinking about you, every minute of every day.", choices: ['It was scary but beautiful', 'I was completely all in'], romanticEnd: 'And I fell completely, head over heels.' },
        { title: '🌙 Missing each other', dialogue: 'Distance made my heart grow fonder with each passing day.', choices: ["I counted the days until we'd meet", 'Your messages saved me daily'], romanticEnd: 'Missing you became a sweet, beautiful ache.' },
        { title: '💍 Forever promise', dialogue: 'I want you in every single chapter of my life story.', choices: ['Always and forever ❤️', "You're my forever person"], romanticEnd: 'No matter what happens, I will always choose you.' },
        { title: '🌟 Growing together', dialogue: 'Every challenge we faced only made our love stronger.', choices: ["We're an unstoppable team 💪", 'Nothing can break us'], romanticEnd: 'Together, we can conquer anything life throws at us.' },
        { title: '🎵 Our song', dialogue: 'Every love song suddenly makes perfect sense because of you.', choices: ["You're the melody to my heart 🎶", 'Our love is the sweetest song'], romanticEnd: 'Our love story is my favorite song that never ends.' },
        { title: '🌅 Beautiful future', dialogue: 'When I think about tomorrow, all I see is you beside me.', choices: ['Building dreams together 🏠', 'Growing old with you 👵👴'], romanticEnd: 'The best is yet to come because I have you.' }
    ];

    const whatsappNumber = "96878440900";

    // ---------- STATE ----------
    let currentScreen = 'home';
    let currentStoryChapter = 0;
    let musicEnabled = true;
    let typingSoundEnabled = true;
    let gameInterval = null;
    let gameActive = false;
    let score = 0;
    let gameLevel = 1;
    let typingInterval = null;
    let screens = {};
    let welcomeMsg, dynamicNameSpan;
    let futurePlans = [];
    let notesList = [];
    let countdownIntervals = new Map();
    let notifiedPlans = new Set();
    let daysInterval = null;

    // ---------- NOTIFICATIONS ----------
    async function requestNotificationPermission() {
        if (!("Notification" in window)) return;
        if (Notification.permission === "default") {
            try { await Notification.requestPermission(); } catch (e) {}
        }
    }

    function sendBrowserNotification(title, body) {
        if (!("Notification" in window)) return;
        if (Notification.permission === "granted") {
            try {
                new Notification(title, { body: body, icon: '❤️', badge: '❤️' });
            } catch (e) {}
        }
    }

    function checkAndNotifyPlan(plan) {
        const now = new Date();
        const target = new Date(plan.date);
        if (target - now <= 0 && !notifiedPlans.has(plan.id)) {
            notifiedPlans.add(plan.id);
            showPopup(`💫 "${plan.title}" is happening now! ❤️`);
            sendBrowserNotification(`💫 ${plan.title}`, plan.description || 'Your special moment has arrived! ❤️');
            saveNotifiedPlans();
        }
    }

    function saveNotifiedPlans() {
        localStorage.setItem('notified_plans', JSON.stringify(Array.from(notifiedPlans)));
    }
    function loadNotifiedPlans() {
        const saved = localStorage.getItem('notified_plans');
        if (saved) {
            try { notifiedPlans = new Set(JSON.parse(saved)); } catch (e) {}
        }
    }

    // ---------- DAYS TOGETHER COUNTER ----------
    function startDaysTogetherCounter() {
        function calcBreakdown(from, to) {
            let years = to.getFullYear() - from.getFullYear();
            let months = to.getMonth() - from.getMonth();
            let days = to.getDate() - from.getDate();
            let hours = to.getHours() - from.getHours();
            let mins = to.getMinutes() - from.getMinutes();
            let secs = to.getSeconds() - from.getSeconds();

            if (secs < 0)  { secs += 60; mins--; }
            if (mins < 0)  { mins += 60; hours--; }
            if (hours < 0) { hours += 24; days--; }
            if (days < 0) {
                const prevMonthDays = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
                days += prevMonthDays;
                months--;
            }
            if (months < 0) { months += 12; years--; }

            return { years: years, months: months, days: days, hours: hours, mins: mins, secs: secs };
        }

        function update() {
            const now = new Date();
            const totalMs = now - ANNIVERSARY;
            if (totalMs < 0) return;
            const totalDays = Math.floor(totalMs / 86400000);
            const bd = calcBreakdown(ANNIVERSARY, now);

            const elDays    = document.getElementById('daysCount');
            const elYears   = document.getElementById('bdYears');
            const elMonths  = document.getElementById('bdMonths');
            const elBDays   = document.getElementById('bdDays');
            const elHours   = document.getElementById('bdHours');
            const elMins    = document.getElementById('bdMins');
            const elSecs    = document.getElementById('bdSecs');
            const elSub     = document.getElementById('daysSubtitle');

            if (elDays)   elDays.textContent   = totalDays.toLocaleString();
            if (elYears)  elYears.textContent  = bd.years;
            if (elMonths) elMonths.textContent = bd.months;
            if (elBDays)  elBDays.textContent  = bd.days;
            if (elHours)  elHours.textContent  = String(bd.hours).padStart(2, '0');
            if (elMins)   elMins.textContent   = String(bd.mins).padStart(2, '0');
            if (elSecs)   elSecs.textContent   = String(bd.secs).padStart(2, '0');

            if (elSub) {
                const subs = [
                    'Every second with you counts ❤️',
                    'Still falling for you, Tasnim 💕',
                    'And forever to go… ✨',
                    'My favorite adventure 🌙'
                ];
                const idx = Math.floor(Date.now() / 30000) % subs.length;
                elSub.textContent = subs[idx];
            }
        }

        if (daysInterval) clearInterval(daysInterval);
        update();
        daysInterval = setInterval(update, 1000);
    }

    // ---------- INIT ----------
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
        startDaysTogetherCounter();
        loadNotifiedPlans();
        initDataSync();

        function showScreen(id) {
            Object.keys(screens).forEach(function (k) {
                if (screens[k]) screens[k].classList.remove('active');
            });
            if (screens[id]) screens[id].classList.add('active');
            currentScreen = id;
            if (id === 'daily') generateDailyMessage();
            if (id === 'gallery') renderMemoryGallery();
            if (id === 'story') loadStoryChapter(currentStoryChapter);
            if (id === 'future') renderFuturePlans();
            if (id === 'notes') renderNotesFromLocal();
            if (id === 'mini') initMiniGame();
        }

        // ---------- DATA SYNC ----------
        async function initDataSync() {
            const localNotes = localStorage.getItem('lovequest_notes');
            const localPlans = localStorage.getItem('lovequest_plans');
            if (localNotes) { try { notesList = JSON.parse(localNotes); } catch (e) {} }
            if (localPlans) { try { futurePlans = JSON.parse(localPlans); } catch (e) {} }

            const gistData = await loadFromGist();
            if (gistData && Array.isArray(gistData.notes) && gistData.notes.length > 0) {
                notesList = gistData.notes;
                localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            }
            if (gistData && Array.isArray(gistData.future_plans) && gistData.future_plans.length > 0) {
                futurePlans = gistData.future_plans;
                localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            }
        }

        async function syncAllData() {
            const data = { notes: notesList, future_plans: futurePlans };
            localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            await saveToGist(data);
        }

        // ---------- PROGRESS ----------
        function saveProgress() {
            localStorage.setItem('loveQuest_progress', JSON.stringify({
                chapter: currentStoryChapter,
                music: musicEnabled,
                typing: typingSoundEnabled
            }));
        }
        function loadProgress() {
            const saved = localStorage.getItem('loveQuest_progress');
            if (!saved) return;
            try {
                const data = JSON.parse(saved);
                currentStoryChapter = data.chapter || 0;
                musicEnabled = data.music !== undefined ? data.music : true;
                typingSoundEnabled = data.typing !== undefined ? data.typing : true;
                updateAudioUI();
            } catch (e) {}
        }
        function updateAudioUI() {
            const m = document.getElementById('toggleMusicBtn');
            const t = document.getElementById('toggleTypingSoundBtn');
            if (m) m.textContent = musicEnabled ? '🔊 ON' : '🔇 OFF';
            if (t) t.textContent = typingSoundEnabled ? '🔊 ON' : '🔇 OFF';
        }

        // ---------- STORY ----------
        function loadStoryChapter(index) {
            const actual = index % storyLevels.length;
            const chapter = storyLevels[actual];
            const indicator = document.getElementById('levelIndicator');
            if (indicator) indicator.textContent = `Chapter ${index + 1} · ${chapter.title}`;
            const dialogue = document.getElementById('storyDialogue');
            if (dialogue) { dialogue.textContent = ''; typeText(chapter.dialogue, dialogue); }
            const choices = document.getElementById('storyChoices');
            if (!choices) return;
            choices.innerHTML = '';
            chapter.choices.forEach(function (text, idx) {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.addEventListener('click', function () {
                    showPopup(idx === 0
                        ? `You chose "${text}" — sweet memory ❤️`
                        : `"${text}" — I feel the same way.`);
                    if (dialogue) dialogue.textContent = chapter.romanticEnd + ' ❤️';
                    choices.innerHTML = '';
                    const next = document.createElement('button');
                    next.textContent = '📖 Next Chapter ➡️';
                    next.addEventListener('click', function () {
                        currentStoryChapter++;
                        saveProgress();
                        loadStoryChapter(currentStoryChapter);
                        if (currentStoryChapter % 5 === 0) showFinalMessage();
                    });
                    choices.appendChild(next);
                });
                choices.appendChild(btn);
            });
        }

        function showFinalMessage() {
            const finalDiv = document.getElementById('finalMessageContainer');
            if (!finalDiv) return;
            finalDiv.innerHTML = `<div class="final-message">Chapter ${currentStoryChapter} complete!<br>My love for you keeps growing with every chapter ❤️</div>`;
            setTimeout(function () { finalDiv.innerHTML = ''; }, 5000);
            showPopup("Every chapter with you is my favorite 📚❤️");
        }

        // ---------- TYPING ANIMATION ----------
        function typeText(text, el, speed) {
            speed = speed || 40;
            if (!el) return;
            if (typingInterval) clearInterval(typingInterval);
            let i = 0;
            el.textContent = '';
            typingInterval = setInterval(function () {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    if (typingSoundEnabled) playTypingTick();
                    i++;
                } else { clearInterval(typingInterval); }
            }, speed);
        }

        // ---------- MINI GAME ----------
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas ? canvas.getContext('2d') : null;
        let basketW = 90, basketH = 22;
        let basketX = 200;
        let hearts = [];
        let particles = [];
        let lives = 3;
        let combo = 0;
        let comboTimer = 0;
        let highScore = Number(localStorage.getItem('heartHighScore') || 0);
        let gamePaused = false;
        const gameScoreSpan = document.getElementById('gameScore');
        const gameLevelSpan = document.getElementById('gameLevel');
        const gameLivesSpan = document.getElementById('gameLives');

        function refreshBasketSize() {
            if (!canvas) return;
            const w = canvas.getBoundingClientRect().width;
            basketW = w < 400 ? 80 : 90;
        }

        function initMiniGame() {
            if (!canvas || !ctx) return;
            stopMiniGame();
            refreshBasketSize();
            gameActive = true;
            gamePaused = false;
            score = 0; gameLevel = 1; hearts = []; particles = [];
            lives = 3; combo = 0; comboTimer = 0;
            basketX = (canvas.width - basketW) / 2;
            updateScore();
            updateLives();
            gameInterval = setInterval(updateGame, 40);
            canvas.addEventListener('mousemove', moveBasket);
            canvas.addEventListener('touchmove', touchMove, { passive: false });
            window.addEventListener('keydown', handleKey);
            document.addEventListener('visibilitychange', handleVisibility);
        }

        function stopMiniGame() {
            gameActive = false;
            if (gameInterval) { clearInterval(gameInterval); gameInterval = null; }
            if (canvas) {
                canvas.removeEventListener('mousemove', moveBasket);
                canvas.removeEventListener('touchmove', touchMove);
            }
            window.removeEventListener('keydown', handleKey);
            document.removeEventListener('visibilitychange', handleVisibility);
        }

        function handleVisibility() { gamePaused = document.hidden; }

        function handleKey(e) {
            if (!gameActive || !canvas) return;
            const step = 32;
            if (e.key === 'ArrowLeft')  basketX = Math.max(0, basketX - step);
            if (e.key === 'ArrowRight') basketX = Math.min(canvas.width - basketW, basketX + step);
        }

        function moveBasket(e) {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const x = (e.clientX - rect.left) * scaleX;
            basketX = Math.min(canvas.width - basketW, Math.max(0, x - basketW / 2));
        }
        function touchMove(e) {
            e.preventDefault();
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const t = e.touches[0];
            const x = (t.clientX - rect.left) * scaleX;
            basketX = Math.min(canvas.width - basketW, Math.max(0, x - basketW / 2));
        }

        function spawnHeart() {
            const roll = Math.random();
            let type = 'normal';
            if (roll < 0.12) type = 'bomb';
            else if (roll < 0.20) type = 'gold';

            hearts.push({
                x: Math.random() * (canvas.width - 24),
                y: -20,
                size: type === 'gold' ? 26 : 20 + Math.random() * 6,
                speed: (1.8 + Math.random() * 2.2) + (gameLevel - 1) * 0.25,
                type: type,
                wobble: Math.random() * Math.PI * 2
            });
        }

        function spawnBurst(x, y, color) {
            for (let i = 0; i < 8; i++) {
                particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4 - 1,
                    life: 30,
                    color: color || '#ffb6c1'
                });
            }
        }

        function updateGame() {
            if (!gameActive || !ctx || gamePaused || !canvas) return;

            gameLevel = Math.floor(score / 10) + 1;
            if (gameLevelSpan) gameLevelSpan.textContent = gameLevel;

            const spawnChance = 0.07 + (gameLevel - 1) * 0.008;
            if (Math.random() < spawnChance) spawnHeart();

            if (comboTimer > 0) {
                comboTimer--;
                if (comboTimer === 0) combo = 0;
            }

            hearts = hearts.filter(function (h) {
                h.y += h.speed;
                h.wobble += 0.1;

                if (h.y + h.size >= canvas.height - basketH - 5 && h.y < canvas.height - 5) {
                    if (h.x + h.size > basketX && h.x < basketX + basketW) {
                        if (h.type === 'bomb') {
                            lives--;
                            updateLives();
                            spawnBurst(h.x, h.y, '#444');
                            playCollectSound(220);
                            combo = 0;
                            if (lives <= 0) endGame();
                        } else {
                            const pts = h.type === 'gold' ? 5 : 1;
                            combo++;
                            comboTimer = 120;
                            score += pts * Math.max(1, Math.floor(combo / 3));
                            updateScore();
                            spawnBurst(h.x, h.y, h.type === 'gold' ? '#ffd700' : '#ff69b4');
                            playCollectSound(h.type === 'gold' ? 1600 : 1100);
                            if (Math.random() < 0.25) {
                                showPopup(specialMessages[Math.floor(Math.random() * specialMessages.length)]);
                            }
                        }
                        return false;
                    }
                }
                return h.y < canvas.height + 30;
            });

            particles = particles.filter(function (p) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15;
                p.life--;
                return p.life > 0;
            });

            drawCanvas();
        }

        function drawCanvas() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grad.addColorStop(0, 'rgba(255, 240, 245, 0.6)');
            grad.addColorStop(1, 'rgba(248, 187, 217, 0.4)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(function (p) {
                ctx.globalAlpha = p.life / 30;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            ctx.fillStyle = '#d44e7a';
            ctx.shadowColor = '#ffb6c1';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            roundRect(ctx, basketX, canvas.height - basketH - 5, basketW, basketH, 12);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.textAlign = 'left';
            hearts.forEach(function (h) {
                ctx.font = `${h.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
                const wobbleX = h.x + Math.sin(h.wobble) * 3;
                if (h.type === 'bomb') {
                    ctx.fillText('🖤', wobbleX, h.y);
                } else if (h.type === 'gold') {
                    ctx.shadowColor = '#ffd700';
                    ctx.shadowBlur = 16;
                    ctx.fillText('💛', wobbleX, h.y);
                    ctx.shadowBlur = 0;
                } else {
                    ctx.fillText('❤️', wobbleX, h.y);
                }
            });

            if (combo >= 3) {
                ctx.font = 'bold 20px sans-serif';
                ctx.fillStyle = '#e6739f';
                ctx.textAlign = 'center';
                ctx.fillText(`🔥 x${combo}`, canvas.width / 2, 45);
                ctx.textAlign = 'left';
            }

            ctx.font = 'bold 18px sans-serif';
            ctx.fillStyle = '#7a2e4a';
            ctx.fillText(`❤️ ${score}`, 10, 40);
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = '#b3708c';
            ctx.fillText(`Best: ${highScore}`, 10, 60);
        }

        function endGame() {
            stopMiniGame();
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('heartHighScore', String(highScore));
                showPopup(`🏆 New high score: ${score}! 💕`);
            } else {
                showPopup(`💔 Game over — score: ${score}`);
            }
            gameActive = false;
        }

        function roundRect(c, x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            c.moveTo(x + r, y);
            c.lineTo(x + w - r, y);
            c.quadraticCurveTo(x + w, y, x + w, y + r);
            c.lineTo(x + w, y + h - r);
            c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            c.lineTo(x + r, y + h);
            c.quadraticCurveTo(x, y + h, x, y + h - r);
            c.lineTo(x, y + r);
            c.quadraticCurveTo(x, y, x + r, y);
            return c;
        }

        function updateScore() {
            if (gameScoreSpan) gameScoreSpan.textContent = score;
        }
        function updateLives() {
            if (!gameLivesSpan) return;
            let str = '';
            for (let i = 0; i < lives; i++) str += '❤️';
            for (let i = lives; i < 3; i++) str += '🖤';
            gameLivesSpan.textContent = str;
        }

        // ---------- DAILY MESSAGE ----------
        function generateDailyMessage() {
            const el = document.getElementById('dailyMessageDisplay');
            if (!el) return;
            const dayIndex = Math.floor(Date.now() / 86400000) % dailyLoveMessages.length;
            el.innerText = dailyLoveMessages[dayIndex] + ' ❤️';
        }
        function generateRandomMessage() {
            const el = document.getElementById('dailyMessageDisplay');
            if (!el) return;
            el.innerText = dailyLoveMessages[Math.floor(Math.random() * dailyLoveMessages.length)] + ' ❤️';
        }

        // ---------- GALLERY ----------
        function renderMemoryGallery() {
            const container = document.getElementById('videoReelContainer');
            if (!container) return;
            container.innerHTML = '';
            memories.forEach(function (mem) {
                const card = document.createElement('div');
                card.className = 'video-card';

                if (mem.type === "video" && mem.videoId) {
                    const iframe = document.createElement('iframe');
                    iframe.width = "100%";
                    iframe.height = "100%";
                    iframe.loading = "lazy";
                    iframe.src = `https://www.youtube.com/embed/${mem.videoId}?autoplay=0&mute=1&controls=1&loop=1&playlist=${mem.videoId}&modestbranding=1&rel=0`;
                    iframe.title = mem.title;
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                    iframe.allowFullscreen = true;
                    card.appendChild(iframe);
                } else if (mem.type === "image" && mem.image) {
                    const img = document.createElement('img');
                    img.src = mem.image;
                    img.alt = mem.title;
                    img.loading = "lazy";
                    img.onerror = function () { img.style.background = '#f8bbd9'; img.alt = '💗'; };
                    img.style.cursor = 'pointer';
                    img.addEventListener('click', function () { if (img.requestFullscreen) img.requestFullscreen(); });
                    card.appendChild(img);
                }

                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                overlay.innerHTML = `<div class="video-title">${escapeHtml(mem.title)}</div><div class="video-description">💬 ${escapeHtml(mem.full)}</div>`;
                card.appendChild(overlay);
                container.appendChild(card);
            });
            if (memories.length === 0) {
                container.innerHTML = '<p style="text-align:center;padding:40px;">✨ Beautiful memories coming soon... ✨</p>';
            }
        }

        // ---------- AUDIO ----------
        function playTypingTick() {
            if (!typingSoundEnabled) return;
            try {
                const a = new (window.AudioContext || window.webkitAudioContext)();
                if (a.state === 'suspended') a.resume();
                const o = a.createOscillator(); o.type = 'sine'; o.frequency.value = 800;
                const g = a.createGain(); g.gain.value = 0.05;
                o.connect(g); g.connect(a.destination);
                o.start(); o.stop(a.currentTime + 0.03);
            } catch (e) {}
        }
        function playCollectSound(freq) {
            freq = freq || 1200;
            try {
                const a = new (window.AudioContext || window.webkitAudioContext)();
                if (a.state === 'suspended') a.resume();
                const o = a.createOscillator(); o.type = 'triangle'; o.frequency.value = freq;
                const g = a.createGain(); g.gain.value = 0.1;
                o.connect(g); g.connect(a.destination);
                o.start(); o.stop(a.currentTime + 0.08);
            } catch (e) {}
        }

        function updateNameEverywhere() {
            if (dynamicNameSpan) dynamicNameSpan.textContent = `✨ ${girlfriendName} ✨`;
            if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${girlfriendName} ❤️ This world was made just for you.`;
        }

        // ---------- NOTES ----------
        function renderNotesFromLocal() {
            const container = document.getElementById('notesList');
            if (!container) return;
            if (notesList.length === 0) {
                container.innerHTML = '<div class="notes-empty"><div class="empty-notes-icon">💌</div><p>No notes yet...</p><p class="notes-empty-sub">Write the first love note!</p></div>';
                return;
            }
            container.innerHTML = '';
            notesList
                .slice()
                .sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); })
                .forEach(function (note) {
                    const card = document.createElement('div');
                    card.className = 'note-card';
                    card.innerHTML = `
                        <div class="note-body">
                            <div class="note-text">${escapeHtml(note.content)}</div>
                            <div class="note-actions">
                                <button class="action-btn delete-btn" data-id="${escapeHtml(note.id)}">🗑️</button>
                            </div>
                        </div>
                        <div class="note-meta">
                            <span class="note-author">${escapeHtml(note.author_name || 'Anonymous')}</span>
                            <span class="note-time">${timeAgo(note.created_at)}</span>
                        </div>`;
                    const delBtn = card.querySelector('.delete-btn');
                    if (delBtn) delBtn.addEventListener('click', function () { deleteNote(note.id); });
                    container.appendChild(card);
                });
        }

        async function saveNoteToLocal() {
            const input = document.getElementById('newNoteText');
            const nameInput = document.getElementById('nameInput');
            if (!input) return;
            const content = input.value.trim();
            const name = (nameInput && nameInput.value.trim()) || 'Anonymous';
            if (!content) { showPopup('Write something first! 💭'); return; }

            const note = {
                id: Date.now().toString(),
                content: content,
                author_name: name,
                created_at: new Date().toISOString()
            };
            notesList.unshift(note);
            localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            input.value = '';
            if (nameInput) nameInput.value = '';
            const cc = document.getElementById('charCount');
            if (cc) cc.textContent = '0';
            renderNotesFromLocal();
            showPopup('💕 Note saved!');
            await syncAllData();
        }

        async function deleteNote(id) {
            if (!confirm('Delete this note?')) return;
            notesList = notesList.filter(function (n) { return n.id !== id; });
            localStorage.setItem('lovequest_notes', JSON.stringify(notesList));
            renderNotesFromLocal();
            await syncAllData();
        }

        // ---------- FUTURE ----------
        function formatCountdown(targetDate) {
            const now = new Date();
            const target = new Date(targetDate);
            const diff = target - now;
            if (diff <= 0) return { reached: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
            return {
                reached: false,
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000)
            };
        }

        function timeAgo(dateString) {
            const now = new Date();
            const date = new Date(dateString);
            const s = Math.floor((now - date) / 1000);
            if (s < 60) return 'just now';
            const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
            const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
            const d = Math.floor(h / 24); if (d < 7) return `${d}d ago`;
            return date.toLocaleDateString();
        }

        function startCountdown(planId, targetDate, element, plan) {
            if (countdownIntervals.has(planId)) {
                const prev = countdownIntervals.get(planId);
                if (prev && prev.cancel) prev.cancel();
                countdownIntervals.delete(planId);
            }
            let lastUpdate = 0;
            let rafId;

            function update() {
                if (!element || !element.isConnected) {
                    if (rafId) cancelAnimationFrame(rafId);
                    countdownIntervals.delete(planId);
                    return;
                }
                if (document.hidden) { rafId = requestAnimationFrame(tick); return; }

                const t = formatCountdown(targetDate);
                if (t.reached) {
                    element.innerHTML = '<div class="countdown-reached">✨ Today is the moment ❤️ ✨</div>';
                    if (plan) checkAndNotifyPlan(plan);
                    if (rafId) cancelAnimationFrame(rafId);
                    countdownIntervals.delete(planId);
                    return;
                }
                element.innerHTML = `
                    <div class="countdown-display">
                        <div class="countdown-unit"><span class="countdown-number">${t.days}</span><span class="countdown-label">Days</span></div>
                        <div class="countdown-unit"><span class="countdown-number">${String(t.hours).padStart(2,'0')}</span><span class="countdown-label">Hours</span></div>
                        <div class="countdown-unit"><span class="countdown-number">${String(t.minutes).padStart(2,'0')}</span><span class="countdown-label">Mins</span></div>
                        <div class="countdown-unit"><span class="countdown-number">${String(t.seconds).padStart(2,'0')}</span><span class="countdown-label">Secs</span></div>
                    </div>`;
            }

            function tick() {
                const now = Date.now();
                if (now - lastUpdate >= 1000) { lastUpdate = now; update(); }
                if (countdownIntervals.has(planId)) rafId = requestAnimationFrame(tick);
            }
            update();
            rafId = requestAnimationFrame(tick);
            countdownIntervals.set(planId, { cancel: function () { if (rafId) cancelAnimationFrame(rafId); } });
        }

        function renderFuturePlans() {
            const container = document.getElementById('futurePlansContainer');
            const emptyState = document.getElementById('emptyFutureState');
            if (!container) return;

            countdownIntervals.forEach(function (v) { if (v && v.cancel) v.cancel(); });
            countdownIntervals.clear();

            container.innerHTML = '';
            if (emptyState) container.appendChild(emptyState);

            if (futurePlans.length === 0) {
                if (emptyState) emptyState.style.display = 'block';
                return;
            }
            if (emptyState) emptyState.style.display = 'none';

            futurePlans
                .slice()
                .sort(function (a, b) { return new Date(a.date) - new Date(b.date); })
                .forEach(function (plan) {
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
                    const del = document.createElement('button');
                    del.className = 'plan-delete-btn';
                    del.textContent = '🗑️ Remove';
                    del.addEventListener('click', function (e) { e.stopPropagation(); deletePlan(plan.id); });
                    footer.appendChild(del);

                    card.appendChild(header);
                    card.appendChild(desc);
                    card.appendChild(countdownDiv);
                    card.appendChild(footer);

                    if (emptyState) container.insertBefore(card, emptyState);
                    else container.appendChild(card);

                    startCountdown(plan.id, plan.date, countdownDiv, plan);
                });
        }

        async function addFuturePlan(title, description, date, author) {
            const plan = {
                id: Date.now().toString(),
                title: title,
                description: description,
                date: date,
                author: author,
                created_at: new Date().toISOString()
            };
            futurePlans.push(plan);
            localStorage.setItem('lovequest_plans', JSON.stringify(futurePlans));
            renderFuturePlans();
            showPopup('✅ Plan saved!');
            requestNotificationPermission();
            await syncAllData();
        }

        async function deletePlan(id) {
            futurePlans = futurePlans.filter(function (p) { return p.id !== id; });
            if (countdownIntervals.has(id)) {
                const v = countdownIntervals.get(id);
                if (v && v.cancel) v.cancel();
                countdownIntervals.delete(id);
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
                function pad(n) { return String(n).padStart(2, '0'); }
                const min = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
                dateInput.min = min;
                dateInput.value = min;
                dateInput.step = '60';
            }
            let selectedAuthor = 'Me ❤️';
            const btns = document.querySelectorAll('.author-btn');
            btns.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    btns.forEach(function (b) { b.classList.remove('active'); });
                    this.classList.add('active');
                    selectedAuthor = this.dataset.author;
                });
            });
            const addBtn = document.getElementById('addPlanBtn');
            if (addBtn) {
                addBtn.addEventListener('click', function () {
                    const titleEl = document.getElementById('planTitle');
                    const descEl = document.getElementById('planDescription');
                    const dateEl = document.getElementById('planDate');
                    const title = titleEl ? titleEl.value.trim() : '';
                    const description = descEl ? descEl.value.trim() : '';
                    const date = dateEl ? dateEl.value : '';
                    if (!title) { showPopup('Please add a title for your plan 💭'); return; }
                    if (!date)  { showPopup('When are we planning this? 📅'); return; }
                    addFuturePlan(title, description, date, selectedAuthor);
                    if (titleEl) titleEl.value = '';
                    if (descEl) descEl.value = '';
                });
            }
            renderFuturePlans();
        }

        // ---------- EVENT LISTENERS ----------
        const startStoryBtn = document.getElementById('startStoryBtn');
        if (startStoryBtn) startStoryBtn.addEventListener('click', function () {
            currentStoryChapter = 0; showScreen('story');
        });

        const goMiniGameBtn = document.getElementById('goMiniGameBtn');
        if (goMiniGameBtn) goMiniGameBtn.addEventListener('click', function () { showScreen('mini'); });

        const goDailyBtn = document.getElementById('goDailyBtn');
        if (goDailyBtn) goDailyBtn.addEventListener('click', function () { showScreen('daily'); });

        const goGalleryBtn = document.getElementById('goGalleryBtn');
        if (goGalleryBtn) goGalleryBtn.addEventListener('click', function () { showScreen('gallery'); });

        const goSettingsBtn = document.getElementById('goSettingsBtn');
        if (goSettingsBtn) goSettingsBtn.addEventListener('click', function () { showScreen('settings'); });

        const goFutureBtn = document.getElementById('goFutureBtn');
        if (goFutureBtn) goFutureBtn.addEventListener('click', function () { showScreen('future'); });

        const goNotesBtn = document.getElementById('goNotesBtn');
        if (goNotesBtn) goNotesBtn.addEventListener('click', function () {
            showScreen('notes'); renderNotesFromLocal();
        });

        document.querySelectorAll('[id^="backFrom"]').forEach(function (b) {
            b.addEventListener('click', function () { stopMiniGame(); showScreen('home'); });
        });

        const refreshBtn = document.getElementById('refreshDailyBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', function () {
            generateRandomMessage();
            showPopup("Here's another message just for you! 💝");
        });

        const missMeBtn = document.getElementById('missMeBtn');
        if (missMeBtn) missMeBtn.addEventListener('click', function () {
            const msgs = [
                `I miss you every second, ${girlfriendName} ❤️`,
                "Can't wait to see you again! 💕",
                "You're always on my mind 🌙"
            ];
            showPopup(msgs[Math.floor(Math.random() * msgs.length)]);
        });

        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) whatsappBtn.addEventListener('click', function () {
            const text = encodeURIComponent(`Hey! I just played your Love Quest game! ❤️ - ${girlfriendName}`);
            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });

        const musicBtn = document.getElementById('toggleMusicBtn');
        if (musicBtn) musicBtn.addEventListener('click', function () {
            musicEnabled = !musicEnabled; updateAudioUI(); saveProgress();
        });

        const typingBtn = document.getElementById('toggleTypingSoundBtn');
        if (typingBtn) typingBtn.addEventListener('click', function () {
            typingSoundEnabled = !typingSoundEnabled; updateAudioUI(); saveProgress();
        });

        const resetBtn = document.getElementById('resetProgressBtn');
        if (resetBtn) resetBtn.addEventListener('click', function () {
            currentStoryChapter = 0; saveProgress(); showPopup('Story reset! ❤️');
        });

        const restartBtn = document.getElementById('restartMiniGame');
        if (restartBtn) restartBtn.addEventListener('click', function () {
            stopMiniGame(); initMiniGame();
        });

        const saveNoteBtn = document.getElementById('saveNoteBtn');
        if (saveNoteBtn) saveNoteBtn.addEventListener('click', saveNoteToLocal);

        const noteTextEl = document.getElementById('newNoteText');
        const charCountEl = document.getElementById('charCount');
        if (noteTextEl) noteTextEl.addEventListener('input', function () {
            if (charCountEl) charCountEl.textContent = noteTextEl.value.length;
        });

        loadProgress();
        updateAudioUI();
        initFuturePlanner();

        setTimeout(function () {
            if (currentScreen === 'home')
                showPopup(`Hey ${girlfriendName}… I just wanted to remind you I love you ❤️`);
        }, 1500);
    }

    // ---------- PARTICLES ----------
    const pCanvas = document.getElementById('heart-particle-canvas');
    if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        let particles = [];
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resize() {
            pCanvas.width = window.innerWidth;
            pCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const COUNT = reduceMotion ? 8 : 25;
        for (let i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * pCanvas.width,
                y: Math.random() * pCanvas.height,
                size: 12 + Math.random() * 20,
                speed: 0.2 + Math.random() * 0.6
            });
        }
        function draw() {
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            pCtx.font = '20px "Segoe UI Emoji"';
            pCtx.fillStyle = 'rgba(255,200,220,0.5)';
            particles.forEach(function (p) {
                p.y -= p.speed;
                if (p.y < -30) { p.y = pCanvas.height + 20; p.x = Math.random() * pCanvas.width; }
                pCtx.fillText('❤️', p.x, p.y);
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    // ---------- FLOATING RINGS ----------
    (function createRings() {
        const overlay = document.getElementById('loginOverlay');
        if (!overlay || document.querySelector('.rings-container')) return;
        const wrap = document.createElement('div');
        wrap.className = 'rings-container';
        for (let i = 1; i <= 2; i++) {
            const ring = document.createElement('div');
            ring.className = 'ring ring-' + i;
            wrap.appendChild(ring);
        }
        overlay.appendChild(wrap);
    })();

    // ---------- BOOT ----------
    document.addEventListener('DOMContentLoaded', function () {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.addEventListener('click', attemptLogin);
        const pwd = document.getElementById('passwordInput');
        if (pwd) pwd.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') attemptLogin();
        });
        checkUser();
    });
})();
