(function(){
    "use strict";

    // ---------- 🔐 PASSWORD PROTECTION ----------
    const CORRECT_PASSWORD = "28.dec";   // CHANGE THIS TO YOUR PASSWORD

    const loginOverlay = document.getElementById('loginOverlay');
    const mainApp = document.getElementById('mainApp');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');

    // Check if already authenticated (session only)
    if (sessionStorage.getItem('lovequest_auth') === 'true') {
        loginOverlay.classList.add('hidden');
        mainApp.classList.add('visible');
    }

 function attemptLogin() {
    const entered = passwordInput.value.trim();
    if (entered === CORRECT_PASSWORD) {
        sessionStorage.setItem('lovequest_auth', 'true');
        loginOverlay.classList.add('hidden');
        mainApp.classList.add('visible');
        loginError.textContent = '';
        
        // Initialize game after successful login (only once!)
        setTimeout(() => {
            if (!window._gameInitialized) {
                initGameApp();
                window._gameInitialized = true;
            }
        }, 50);
    } else {
        loginError.textContent = '❌ Incorrect password';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            attemptLogin();
        }
    });

  // If already logged in, initialize game immediately (ONLY ONCE)
if (sessionStorage.getItem('lovequest_auth') === 'true') {
    loginOverlay.classList.add('hidden');
    mainApp.classList.add('visible');
    // Wait for DOM to be fully ready before initializing
    setTimeout(() => {
        if (!window._gameInitialized) {
            initGameApp();
            window._gameInitialized = true;
        }
    }, 50);
}

    /* ************************************************************ */
    /* 🔧 EDIT SECTION 1: CUSTOMIZE YOUR GIRLFRIEND'S INFO           */
    /* ************************************************************ */
    
    // 👤 CHANGE THIS to your girlfriend's name
    let girlfriendName = "Tasnim";
    
    // 💬 EDIT THESE POPUP MESSAGES (shown randomly during mini-game)
    const specialMessages = [
        "You're my favorite notification ❤️", 
        "Every day with you is a new level of love.",
        "I fall for you again and again.", 
        "You're the heart of my game.",
        "Tasnim, you make life magical ✨",
        "You're the reason I smile every day 💕",
        "My heart beats only for you 💓"
    ];
    
    // 💌 EDIT THESE LOVE MESSAGES (shown in Daily Love Message screen)
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

    /* ************************************************************ */
    /* 🔧 EDIT SECTION 2: MEMORY GALLERY (Images & Videos)           */
    /* ************************************************************ */
    const memories = [
        { 
            type: "video",
            title: "🌟 First video together", 
            full: "From nothing, this video reflects what we dreamed of becoming.",
            videoId: "oLGeMfnNP5g"
        },
        { 
            type: "image",
            title: "💫 Meaningful moment", 
            full: "The moment our love grew deeper and more meaningful.",
            image: "gallery-1.jpg"
        },
        { 
            type: "image",
            title: "🌙 28.dec.2017", 
            full: "28 Dec 2017 - the day forever began.",
            image: "gallery-2.jpg"
        },
        { 
            type: "video",
            title: "💫 Our Beautiful World", 
            full: "Even with many reasons to break up, we held on to each other.",
            videoId: "mKZUeGkqtEQ"
        },
        { 
            type: "image",
            title: "📸 First photo together", 
            full: "Our first image together—simple, but the start of something truly special.",
            image: "gallery-3.jpg"
        },
        { 
            type: "image",
            title: "🌸 Queen almahdi", 
            full: "My life, my story, my memories—summed up in one photo.",
            image: "gallery-4.jpg"
        },
        { 
            type: "image",
            title: "🕊️ Childhood", 
            full: "From kids to growing up together, and hoping to stay together forever.",
            image: "gallery-5.jpg"
        }
    ];

    /* ************************************************************ */
    /* 🔧 EDIT SECTION 3: STORY MODE LEVELS (Unlimited Chapters)     */
    /* ************************************************************ */
    const storyLevels = [
        { 
            title: '✨ First meeting', 
            dialogue: 'I still remember the first time I saw you... my heart skipped a beat.', 
            choices: ['You were glowing ✨', 'I was so nervous'], 
            romanticEnd: 'That moment, something changed in me forever.' 
        },
        { 
            title: '💕 Getting closer', 
            dialogue: 'Every conversation felt like coming home to where I belong.', 
            choices: ['I loved your voice', 'You made me laugh so much'], 
            romanticEnd: 'I started falling for you, slowly but surely.' 
        },
        { 
            title: '💖 Falling in love', 
            dialogue: 'I realized I couldn\'t stop thinking about you, every minute of every day.', 
            choices: ['It was scary but beautiful', 'I was completely all in'], 
            romanticEnd: 'And I fell completely, head over heels.' 
        },
        { 
            title: '🌙 Missing each other', 
            dialogue: 'Distance made my heart grow fonder with each passing day.', 
            choices: ['I counted the days until we\'d meet', 'Your messages saved me daily'], 
            romanticEnd: 'Missing you became a sweet, beautiful ache.' 
        },
        { 
            title: '💍 Forever promise', 
            dialogue: 'I want you in every single chapter of my life story.', 
            choices: ['Always and forever ❤️', 'You\'re my forever person'], 
            romanticEnd: 'No matter what happens, I will always choose you.' 
        },
        { 
            title: '🌟 Growing together', 
            dialogue: 'Every challenge we faced only made our love stronger.', 
            choices: ['We\'re an unstoppable team 💪', 'Nothing can break us'], 
            romanticEnd: 'Together, we can conquer anything life throws at us.' 
        },
        { 
            title: '🎵 Our song', 
            dialogue: 'Every love song suddenly makes perfect sense because of you.', 
            choices: ['You\'re the melody to my heart 🎶', 'Our love is the sweetest song'], 
            romanticEnd: 'Our love story is my favorite song that never ends.' 
        },
        { 
            title: '🌅 Beautiful future', 
            dialogue: 'When I think about tomorrow, all I see is you beside me.', 
            choices: ['Building dreams together 🏠', 'Growing old with you 👵👴'], 
            romanticEnd: 'The best is yet to come because I have you.' 
        }
    ];

    /* ************************************************************ */
    /* 🔧 EDIT SECTION 4: WHATSAPP NUMBER                           */
    /* ************************************************************ */
    const whatsappNumber = "96878440900";

    /* ************************************************************ */
    /* ⚠️ ADVANCED: Only edit below if you know what you're doing!  */
    /* ************************************************************ */
    
    // ----- Game State ------
    let currentScreen = 'home';
    let currentStoryChapter = 0;
    let musicEnabled = true;
    let typingSoundEnabled = true;
    
    // Mini game
    let gameInterval = null;
    let gameActive = false;
    let score = 0;
    
    // Typing
    let typingInterval = null;

    // DOM elements
    let screens = {};
    let welcomeMsg, dynamicNameSpan;
    
    function initGameApp() {
        // Initialize DOM references
        screens = {
            home: document.getElementById('homeScreen'),
            story: document.getElementById('storyScreen'),
            mini: document.getElementById('miniGameScreen'),
            daily: document.getElementById('dailyScreen'),
            gallery: document.getElementById('galleryScreen'),
            settings: document.getElementById('settingsScreen')
        };
        welcomeMsg = document.getElementById('welcomeMessage');
        dynamicNameSpan = document.getElementById('dynamicNameDisplay');
        
        // ---- INIT PERSONALIZATION ----
        updateNameEverywhere();
        
        // ----- SCREEN NAVIGATION -----
        function showScreen(screenId) {
            Object.values(screens).forEach(s => {
                if (s) s.classList.remove('active');
            });
            if (screens[screenId]) {
                screens[screenId].classList.add('active');
            }
            currentScreen = screenId;
            if (screenId === 'daily') generateDailyMessage();
            if (screenId === 'gallery') renderMemoryGallery();
            if (screenId === 'story') loadStoryChapter(currentStoryChapter);
        }

        // ----- LOCALSTORAGE -----
        function saveProgress() {
            localStorage.setItem('loveQuest_progress', JSON.stringify({ 
                chapter: currentStoryChapter, 
                music: musicEnabled, 
                typing: typingSoundEnabled 
            }));
        }
        
        function loadProgress() {
            const saved = localStorage.getItem('loveQuest_progress');
            if(saved) {
                try {
                    const data = JSON.parse(saved);
                    currentStoryChapter = data.chapter || 0;
                    musicEnabled = data.music !== undefined ? data.music : true;
                    typingSoundEnabled = data.typing !== undefined ? data.typing : true;
                    updateAudioUI();
                }catch(e){
                    console.log('Error loading progress:', e);
                }
            }
        }
        
        function updateAudioUI() {
            const musicBtn = document.getElementById('toggleMusicBtn');
            const typingBtn = document.getElementById('toggleTypingSoundBtn');
            if (musicBtn) musicBtn.textContent = musicEnabled ? '🔊 ON' : '🔇 OFF';
            if (typingBtn) typingBtn.textContent = typingSoundEnabled ? '🔊 ON' : '🔇 OFF';
        }

        // ----- UNLIMITED STORY MODE -----
        function loadStoryChapter(chapterIndex) {
            const actualIndex = chapterIndex % storyLevels.length;
            const chapter = storyLevels[actualIndex];
            const displayNumber = chapterIndex + 1;
            
            const levelIndicator = document.getElementById('levelIndicator');
            if (levelIndicator) {
                levelIndicator.textContent = `Chapter ${displayNumber} · ${chapter.title}`;
            }
            
            const dialogueDiv = document.getElementById('storyDialogue');
            if (dialogueDiv) {
                dialogueDiv.textContent = '';
                typeText(chapter.dialogue, dialogueDiv);
            }
            
            const choicesDiv = document.getElementById('storyChoices');
            if (choicesDiv) {
                choicesDiv.innerHTML = '';
                
                chapter.choices.forEach((choiceText, idx) => {
                    const btn = document.createElement('button');
                    btn.textContent = choiceText;
                    btn.addEventListener('click', () => {
                        if(idx === 0) showPopup(`You chose "${choiceText}" — sweet memory ❤️`);
                        else showPopup(`"${choiceText}" — I feel the same way.`);
                        
                        if (dialogueDiv) dialogueDiv.textContent = chapter.romanticEnd + ' ❤️';
                        choicesDiv.innerHTML = '';
                        
                        const nextBtn = document.createElement('button');
                        nextBtn.textContent = '📖 Next Chapter ➡️';
                        nextBtn.addEventListener('click', ()=>{
                            currentStoryChapter++;
                            saveProgress();
                            loadStoryChapter(currentStoryChapter);
                            
                            if(currentStoryChapter % 5 === 0) {
                                showFinalMessage();
                            }
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
                setTimeout(() => {
                    if (finalDiv) finalDiv.innerHTML = '';
                }, 5000);
            }
            showPopup("Every chapter with you is my favorite 📚❤️");
        }

        // ----- TYPING ANIMATION -----
        function typeText(text, element, speed=40) {
            if (!element) return;
            if(typingInterval) clearInterval(typingInterval);
            let i=0;
            element.textContent = '';
            typingInterval = setInterval(() => {
                if(i < text.length) {
                    element.textContent += text.charAt(i);
                    if(typingSoundEnabled) playTypingTick();
                    i++;
                } else { 
                    clearInterval(typingInterval); 
                }
            }, speed);
        }

        // ----- MINI GAME (Catch hearts) -----
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas ? canvas.getContext('2d') : null;
        let basketX = 200;
        const basketW = 80, basketH = 20;
        let hearts = [];
        let gameScoreSpan = document.getElementById('gameScore');

        function initMiniGame() {
            if (!canvas || !ctx) return;
            if(gameInterval) clearInterval(gameInterval);
            gameActive = true;
            score = 0;
            hearts = [];
            basketX = 200;
            updateScore();
            gameInterval = setInterval(updateGame, 40);
            canvas.addEventListener('mousemove', moveBasket);
            canvas.addEventListener('touchmove', touchMove, {passive: false});
        }
        
        function touchMove(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const scaleX = canvas.width / rect.width;
            let x = (touch.clientX - rect.left) * scaleX;
            basketX = Math.min(canvas.width - basketW, Math.max(0, x - basketW/2));
        }
        
        function moveBasket(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            let x = (e.clientX - rect.left) * scaleX;
            basketX = Math.min(canvas.width - basketW, Math.max(0, x - basketW/2));
        }
        
        function stopMiniGame() {
            gameActive = false;
            if(gameInterval) clearInterval(gameInterval);
            if (canvas) {
                canvas.removeEventListener('mousemove', moveBasket);
                canvas.removeEventListener('touchmove', touchMove);
            }
        }
        
        function updateGame() {
            if(!gameActive || !ctx) return;
            if(Math.random()<0.08) {
                hearts.push({ 
                    x: Math.random()*(canvas.width-20), 
                    y: 0, 
                    size: 18+Math.floor(Math.random()*10), 
                    speed: 2+Math.floor(Math.random()*4) 
                });
            }
            hearts = hearts.filter(h => {
                h.y += h.speed;
                if(h.y + h.size >= canvas.height - basketH - 5 && h.y < canvas.height - 5) {
                    if(h.x + h.size > basketX && h.x < basketX + basketW) {
                        score++;
                        updateScore();
                        if(Math.random()<0.35) {
                            const randomMsg = specialMessages[Math.floor(Math.random()*specialMessages.length)];
                            showPopup(randomMsg);
                        }
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
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = '#d44e7a';
            ctx.shadowColor = '#ffb6c1';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            roundRect(ctx, basketX, canvas.height-basketH-5, basketW, basketH, 12);
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
        
        function updateScore(){ 
            if (gameScoreSpan) gameScoreSpan.textContent = score; 
        }

        // ----- UNLIMITED DAILY MESSAGE -----
        function generateDailyMessage() {
            const dailyDisplay = document.getElementById('dailyMessageDisplay');
            if (dailyDisplay) {
                const randomIndex = Math.floor(Math.random() * dailyLoveMessages.length);
                const message = dailyLoveMessages[randomIndex];
                dailyDisplay.innerText = `${message} ❤️`;
            }
        }

        // ----- MEMORY GALLERY -----
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
                    
                    img.addEventListener('click', () => {
                        if (img.requestFullscreen) {
                            img.requestFullscreen();
                        }
                    });
                    
                    card.appendChild(img);
                }
                
                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                overlay.innerHTML = `
                    <div class="video-title">${mem.title}</div>
                    <div class="video-description">💬 ${mem.full}</div>
                `;
                card.appendChild(overlay);
                
                container.appendChild(card);
            });
            
            if (memories.length === 0) {
                container.innerHTML = '<p style="text-align: center; padding: 40px;">✨ Beautiful memories coming soon... ✨</p>';
            }
        }

        // ----- AUDIO -----
        function playTypingTick(){ 
            if(!typingSoundEnabled) return;
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const a = new AudioContext(); 
                if (a.state === 'suspended') {
                    a.resume();
                }
                const o = a.createOscillator(); 
                o.type='sine'; 
                o.frequency.value=800; 
                const g = a.createGain(); 
                g.gain.value=0.05; 
                o.connect(g); 
                g.connect(a.destination); 
                o.start(); 
                o.stop(a.currentTime+0.03); 
            } catch(e) {}
        }
        
        function playCollectSound(){ 
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const a = new AudioContext(); 
                if (a.state === 'suspended') {
                    a.resume();
                }
                const o = a.createOscillator(); 
                o.type='triangle'; 
                o.frequency.value=1200; 
                const g = a.createGain(); 
                g.gain.value=0.1; 
                o.connect(g); 
                g.connect(a.destination); 
                o.start(); 
                o.stop(a.currentTime+0.06); 
            } catch(e) {}
        }

        // ----- POPUP -----
        function showPopup(msg) {
            const pop = document.createElement('div'); 
            pop.className='popup-message'; 
            pop.textContent=msg;
            document.body.appendChild(pop); 
            setTimeout(()=> {
                if (pop && pop.parentNode) {
                    pop.remove();
                }
            }, 3000);
        }

        function updateNameEverywhere() {
            if (dynamicNameSpan) {
                dynamicNameSpan.textContent = `✨ ${girlfriendName} ✨`;
            }
            if (welcomeMsg) {
                welcomeMsg.textContent = `Welcome, ${girlfriendName} ❤️ This world was made just for you.`;
            }
        }

        // ----- EVENT LISTENERS -----
        const startBtn = document.getElementById('startStoryBtn');
        if (startBtn) startBtn.addEventListener('click', ()=>{ 
            currentStoryChapter = 0; 
            showScreen('story'); 
        });
        
        const miniGameBtn = document.getElementById('goMiniGameBtn');
        if (miniGameBtn) miniGameBtn.addEventListener('click', ()=>{ 
            showScreen('mini'); 
            initMiniGame(); 
        });
        
        const dailyBtn = document.getElementById('goDailyBtn');
        if (dailyBtn) dailyBtn.addEventListener('click', ()=>showScreen('daily'));
        
        const galleryBtn = document.getElementById('goGalleryBtn');
        if (galleryBtn) galleryBtn.addEventListener('click', ()=>showScreen('gallery'));
        
        const settingsBtn = document.getElementById('goSettingsBtn');
        if (settingsBtn) settingsBtn.addEventListener('click', ()=>showScreen('settings'));
        
        // Back buttons
        document.querySelectorAll('[id^="backFrom"]').forEach(b=>b.addEventListener('click', ()=>{ 
            stopMiniGame(); 
            showScreen('home'); 
        }));
        
        const refreshBtn = document.getElementById('refreshDailyBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', ()=>{
                generateDailyMessage();
                showPopup("Here's another message just for you! 💝");
            });
        }
        
        const missMeBtn = document.getElementById('missMeBtn');
        if (missMeBtn) {
            missMeBtn.addEventListener('click', ()=>{
                const messages = [
                    `I miss you every second, ${girlfriendName} ❤️`,
                    "Can't wait to see you again! 💕",
                    "You're always on my mind 🌙",
                    "Missing you like crazy right now 💔"
                ];
                showPopup(messages[Math.floor(Math.random() * messages.length)]);
            });
        }
        
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', ()=>{ 
                const message = `Hey! I just played your Love Quest game and I love it! ❤️ - ${girlfriendName}`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            });
        }
        
        const musicBtn = document.getElementById('toggleMusicBtn');
        if (musicBtn) {
            musicBtn.addEventListener('click', ()=>{ 
                musicEnabled=!musicEnabled; 
                updateAudioUI(); 
                saveProgress(); 
            });
        }
        
        const typingBtn = document.getElementById('toggleTypingSoundBtn');
        if (typingBtn) {
            typingBtn.addEventListener('click', ()=>{ 
                typingSoundEnabled=!typingSoundEnabled; 
                updateAudioUI(); 
                saveProgress(); 
            });
        }
        
        const resetBtn = document.getElementById('resetProgressBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', ()=>{ 
                currentStoryChapter = 0; 
                saveProgress(); 
                showPopup('Story reset! Ready for another journey through our love ❤️'); 
            });
        }
        
        const restartBtn = document.getElementById('restartMiniGame');
        if (restartBtn) {
            restartBtn.addEventListener('click', ()=>{ 
                stopMiniGame(); 
                initMiniGame(); 
            });
        }
        
        loadProgress();
        updateAudioUI();
        
        setTimeout(()=>{ 
            if(currentScreen === 'home') {
                showPopup(`Hey ${girlfriendName}… I just wanted to remind you I love you ❤️`); 
            }
        }, 1500);
    }
    
    // Particle canvas (always runs)
    const pCanvas = document.getElementById('heart-particle-canvas');
    if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        function resizeCanvas(){ 
            pCanvas.width = window.innerWidth; 
            pCanvas.height = window.innerHeight; 
        }
        window.addEventListener('resize', resizeCanvas); 
        resizeCanvas();
        
        let particles = [];
        for(let i=0;i<25;i++) {
            particles.push({ 
                x: Math.random()*pCanvas.width, 
                y: Math.random()*pCanvas.height, 
                size: 12+Math.random()*20, 
                speed: 0.2+Math.random()*0.6 
            });
        }
        
        function drawParticles(){
            pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
            pCtx.font='20px "Segoe UI Emoji"'; 
            pCtx.fillStyle='rgba(255,200,220,0.5)';
            particles.forEach(p=>{ 
                p.y -= p.speed; 
                if(p.y < -30){ 
                    p.y = pCanvas.height + 20; 
                    p.x = Math.random()*pCanvas.width; 
                } 
                pCtx.fillText('❤️', p.x, p.y); 
            });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }
// ----- FLOATING RINGS (Performance Optimized) -----
(function createFloatingRings() {
    // Only create rings if login overlay exists
    const loginOverlay = document.getElementById('loginOverlay');
    if (!loginOverlay) return;
    
    // Check if rings already exist
    if (document.querySelector('.rings-container')) return;
    
    // Create container for rings
    const ringsContainer = document.createElement('div');
    ringsContainer.className = 'rings-container';
    loginOverlay.appendChild(ringsContainer);
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create 8 rings with different sizes and positions
    for (let i = 1; i <= 8; i++) {
        const ring = document.createElement('div');
        ring.className = `ring ring-${i}`;
        fragment.appendChild(ring);
    }
    
    ringsContainer.appendChild(fragment);
    
    // Performance optimization: Pause animations when page is not visible
    const handleVisibilityChange = () => {
        const rings = document.querySelectorAll('.ring');
        if (document.hidden) {
            rings.forEach(ring => {
                ring.style.animationPlayState = 'paused';
            });
        } else {
            rings.forEach(ring => {
                ring.style.animationPlayState = 'running';
            });
        }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up rings when login is successful (optional - removes rings after unlock)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (loginOverlay.classList.contains('hidden')) {
                    // Fade out and remove rings after login
                    const rings = document.querySelectorAll('.ring');
                    rings.forEach(ring => {
                        ring.style.transition = 'opacity 0.5s ease';
                        ring.style.opacity = '0';
                    });
                    
                    setTimeout(() => {
                        const container = document.querySelector('.rings-container');
                        if (container) {
                            container.remove();
                            document.removeEventListener('visibilitychange', handleVisibilityChange);
                            observer.disconnect();
                        }
                    }, 500);
                }
            }
        });
    });
    
    observer.observe(loginOverlay, { attributes: true });
    
    // Add smooth fade-in for rings
    setTimeout(() => {
        const rings = document.querySelectorAll('.ring');
        rings.forEach((ring, index) => {
            ring.style.transition = 'opacity 0.8s ease';
            ring.style.opacity = '1';
        });
    }, 100);
})();
})();