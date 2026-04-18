(function(){
    "use strict";
    
    /* ---------- CUSTOMIZABLE VARIABLES ---------- */
    let girlfriendName = "Tasnim";
    const specialMessages = [
        "You're my favorite notification ❤️", "Every day with you is a new level of love.",
        "I fall for you again and again.", "You're the heart of my game.",
        "Tasnim, you make life magical ✨"
    ];
  const memories = [
    { 
        title: "🌟 First time I thought about you", 
        full: "It was a random Tuesday, and you stayed in my mind like a beautiful song.",
        image: "gallery-1.jpg"  // ← Remove "images/"
    },
    { 
        title: "💫 The moment you made me smile", 
        full: "When you laughed at my silly joke — I knew I wanted to hear it forever.",
        image: "gallery-2.jpg"  // ← Remove "images/"
    },
    { 
        title: "🌙 Late night talks", 
        full: "We talked until 3am about stars and dreams. I felt so close to you.",
        image: "IMG_9813.png"   // ← Use your actual file name
    },
    // Remove the fourth one or add another image
];
    // ----- game state ------
    let currentScreen = 'home';
    let storyLevel = 1;            // 1..5
    let storyUnlocked = 1;          // localStorage progress
    let musicEnabled = true;
    let typingSoundEnabled = true;
    let audioCtx = null; 
    
    // mini game
    let gameInterval = null;
    let gameActive = false;
    let score = 0;
    
    // typing
    let typingInterval = null;

    // DOM elements
    const screens = {
        home: document.getElementById('homeScreen'),
        story: document.getElementById('storyScreen'),
        mini: document.getElementById('miniGameScreen'),
        daily: document.getElementById('dailyScreen'),
        gallery: document.getElementById('galleryScreen'),
        settings: document.getElementById('settingsScreen')
    };
    const welcomeMsg = document.getElementById('welcomeMessage');
    const dynamicNameSpan = document.getElementById('dynamicNameDisplay');
    
    // ---- INIT PERSONALIZATION ----
    function updateNameEverywhere() {
        dynamicNameSpan.textContent = `✨ ${girlfriendName} ✨`;
        welcomeMsg.textContent = `Welcome, ${girlfriendName} ❤️ This world was made just for you.`;
    }
    girlfriendName = "Tasnim";  // could be changed, but fixed
    updateNameEverywhere();
    
    // ----- SCREEN NAVIGATION -----
    function showScreen(screenId) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenId].classList.add('active');
        currentScreen = screenId;
        if (screenId === 'daily') generateDailyMessage();
        if (screenId === 'gallery') renderMemoryGallery();
        if (screenId === 'story') loadStoryLevel(storyLevel);
        if (screenId === 'mini') { /* start only when needed */ }
        if (screenId === 'home') { /* maybe random popup */ }
    }

    // ----- LOCALSTORAGE -----
    function saveProgress() {
        localStorage.setItem('loveQuest_progress', JSON.stringify({ level: storyUnlocked, music: musicEnabled, typing: typingSoundEnabled }));
    }
    function loadProgress() {
        const saved = localStorage.getItem('loveQuest_progress');
        if(saved) {
            try {
                const data = JSON.parse(saved);
                storyUnlocked = data.level || 1;
                storyLevel = Math.min(storyUnlocked, 5);
                musicEnabled = data.music !== undefined ? data.music : true;
                typingSoundEnabled = data.typing !== undefined ? data.typing : true;
                updateAudioUI();
            }catch(e){}
        }
    }
    function updateAudioUI() {
        document.getElementById('toggleMusicBtn').textContent = musicEnabled ? '🔊 ON' : '🔇 OFF';
        document.getElementById('toggleTypingSoundBtn').textContent = typingSoundEnabled ? '🔊 ON' : '🔇 OFF';
        if(musicEnabled) playBgMusic(); else stopBgMusic();
    }

    // ----- STORY MODE (5 levels) -----
    const storyData = {
        1: { title: 'First meeting', dialogue: 'I still remember the first time I saw you... my heart skipped.', choices: ['You were glowing ✨', 'I was nervous'], romanticEnd: 'That moment, something changed in me.' },
        2: { title: 'Getting closer', dialogue: 'Every conversation felt like coming home.', choices: ['I loved your voice', 'You made me laugh'], romanticEnd: 'I started falling, slowly.' },
        3: { title: 'Falling in love', dialogue: 'I realized I couldn’t stop thinking about you.', choices: ['It was scary but beautiful', 'I was all in'], romanticEnd: 'And I fell completely.' },
        4: { title: 'Missing each other', dialogue: 'Distance made the heart grow fonder.', choices: ['I counted days', 'Your messages saved me'], romanticEnd: 'Missing you became a sweet ache.' },
        5: { title: 'Forever promise', dialogue: 'I want you in every chapter.', choices: ['Always ❤️', 'Forever us'], romanticEnd: 'No matter what, I choose you.' }
    };

    function loadStoryLevel(level) {
        const lvl = storyData[level] || storyData[1];
        document.getElementById('levelIndicator').textContent = `Level ${level}/5 · ${lvl.title}`;
        const dialogueDiv = document.getElementById('storyDialogue');
        dialogueDiv.textContent = '';
        typeText(lvl.dialogue, dialogueDiv);
        const choicesDiv = document.getElementById('storyChoices');
        choicesDiv.innerHTML = '';
        lvl.choices.forEach((choiceText, idx) => {
            const btn = document.createElement('button');
            btn.textContent = choiceText;
            btn.addEventListener('click', () => {
                // AI-like react based on choice
                if(idx === 0) showPopup(`You chose "${choiceText}" — sweet memory ❤️`);
                else showPopup(`"${choiceText}" — I feel the same.`);
                // end of level message
                dialogueDiv.textContent = lvl.romanticEnd + ' ❤️';
                choicesDiv.innerHTML = '';
                // advance if possible
                if(storyLevel < 5) {
                    const nextBtn = document.createElement('button');
                    nextBtn.textContent = 'Next level ➡️';
                    nextBtn.addEventListener('click', ()=>{
                        if(storyLevel < 5) {
                            storyLevel++;
                            if(storyLevel > storyUnlocked) storyUnlocked = storyLevel;
                            saveProgress();
                            loadStoryLevel(storyLevel);
                        } else {
                            showFinalScreen();
                        }
                    });
                    choicesDiv.appendChild(nextBtn);
                } else {
                    showFinalScreen();
                }
            });
            choicesDiv.appendChild(btn);
        });
    }

    function showFinalScreen() {
        const finalDiv = document.getElementById('finalMessageContainer');
        finalDiv.innerHTML = `<div class="final-message">No matter how many times you play this game…<br>My love for you will always stay the same ❤️</div>`;
        setTimeout(() => finalDiv.innerHTML = '', 7000);
        showPopup("You’ll always win my heart ❤️");
    }

    // typing animation with optional sound
    function typeText(text, element, speed=40) {
        if(typingInterval) clearInterval(typingInterval);
        let i=0;
        element.textContent = '';
        typingInterval = setInterval(() => {
            if(i < text.length) {
                element.textContent += text.charAt(i);
                if(typingSoundEnabled) playTypingTick();
                i++;
            } else { clearInterval(typingInterval); }
        }, speed);
    }

    // ----- MINI GAME (Catch hearts) -----
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let basketX = 200;
    const basketW = 80, basketH = 20;
    let hearts = [];
    let frame = 0;
    let gameScoreSpan = document.getElementById('gameScore');

    function initMiniGame() {
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
        canvas.removeEventListener('mousemove', moveBasket);
        canvas.removeEventListener('touchmove', touchMove);
    }
    function updateGame() {
        if(!gameActive) return;
        // spawn hearts
        if(Math.random()<0.08) {
            hearts.push({ x: Math.random()*(canvas.width-20), y: 0, size: 18+Math.floor(Math.random()*10), speed: 2+Math.floor(Math.random()*4) });
        }
        // move
        hearts = hearts.filter(h => {
            h.y += h.speed;
            // collision
            if(h.y + h.size >= canvas.height - basketH - 5 && h.y < canvas.height - 5) {
                if(h.x + h.size > basketX && h.x < basketX + basketW) {
                    score++;
                    updateScore();
                    if(Math.random()<0.35) showPopup(specialMessages[Math.floor(Math.random()*specialMessages.length)]);
                    playCollectSound();
                    return false;
                }
            }
            return h.y < canvas.height + 20;
        });
        drawCanvas();
        // difficulty: increase speed over time
        if(frame%60===0) hearts.forEach(h=> h.speed = Math.min(9, h.speed+0.2));
        frame++;
    }
    function drawCanvas() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // basket
        ctx.fillStyle = '#d44e7a';
        ctx.shadowColor = '#ffb6c1';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(basketX, canvas.height-basketH-5, basketW, basketH, 12);
        ctx.fill();
        ctx.shadowBlur = 0;
        // hearts
        hearts.forEach(h => {
            ctx.font = `${h.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
            ctx.fillText('❤️', h.x, h.y);
        });
        ctx.font = 'bold 18px sans-serif';
        ctx.fillStyle = '#7a2e4a';
        ctx.fillText(`❤️ ${score}`, 10, 40);
    }
    CanvasRenderingContext2D.prototype.roundRect = function(x,y,w,h,r){
        if(w<2*r) r=w/2; if(h<2*r) r=h/2;
        this.moveTo(x+r, y);
        this.lineTo(x+w-r, y); this.quadraticCurveTo(x+w, y, x+w, y+r);
        this.lineTo(x+w, y+h-r); this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        this.lineTo(x+r, y+h); this.quadraticCurveTo(x, y+h, x, y+h-r);
        this.lineTo(x, y+r); this.quadraticCurveTo(x, y, x+r, y);
        return this;
    };
    function updateScore(){ gameScoreSpan.textContent = score; }

    // ----- DAILY MESSAGE -----
    function generateDailyMessage() {
        const messages = ["You're my today and all my tomorrows.","Thinking of you is my favorite hobby.","Tasnim, you make ordinary days magical.","I love you more than yesterday.","You are my sunshine."];
        const dayIndex = new Date().getDate() % messages.length;
        document.getElementById('dailyMessageDisplay').innerText = messages[dayIndex] + ' ❤️';
    }
function renderMemoryGallery() {
    const grid = document.getElementById('memoryGrid');
    const expandedDiv = document.getElementById('expandedMemory');
    grid.innerHTML = '';
    expandedDiv.innerHTML = ''; // Clear expanded area
    
    memories.forEach((mem, i) => {
        const card = document.createElement('div'); 
        card.className = 'memory-card';
        
        // Add image to card
        if (mem.image) {
            const img = document.createElement('img');
            img.src = mem.image;
            img.alt = mem.title;
            img.style.width = '100%';
            img.style.height = '120px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '16px';
            img.style.marginBottom = '8px';
            card.appendChild(img);
        }
        
        // Add title
        const titleSpan = document.createElement('span');
        titleSpan.textContent = mem.title;
        titleSpan.style.display = 'block';
        titleSpan.style.fontWeight = '600';
        card.appendChild(titleSpan);
        
        card.addEventListener('click', () => {
            // Create full-size image display
            let expandedContent = `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: flex-end;">
                        <button onclick="this.parentElement.parentElement.parentElement.innerHTML=''" 
                                style="padding: 8px 16px; font-size: 14px; background: #ffb0c3;">
                            ✕ Close
                        </button>
                    </div>
            `;
            
            if (mem.image) {
                expandedContent += `
                    <img src="${mem.image}" 
                         alt="${mem.title}" 
                         style="width: 100%; 
                                max-height: 400px; 
                                object-fit: contain; 
                                border-radius: 20px;
                                border: 3px solid #ffb0c3;
                                box-shadow: 0 8px 20px rgba(210, 100, 130, 0.3);
                                cursor: zoom-out;"
                         onclick="this.requestFullscreen()">
                `;
            }
            
            expandedContent += `
                    <div style="padding: 16px; background: #fff0f7; border-radius: 20px;">
                        <strong style="font-size: 1.2rem;">${mem.title}</strong>
                        <p style="margin-top: 8px; font-size: 1.1rem;">💬 ${mem.full}</p>
                        <p style="margin-top: 12px; font-size: 0.9rem; color: #8f3f60;">
                            💡 Click the image to view fullscreen
                        </p>
                    </div>
                </div>
            `;
            
            expandedDiv.innerHTML = expandedContent;
            
            // Scroll to expanded image
            expandedDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        
        grid.appendChild(card);
    });
}
    // ----- AUDIO (Web Audio)-----
    function playBgMusic(){ /* soft oscillator not included for brevity, but we use simple oscillator if allowed */ }
    function stopBgMusic(){}
    function playTypingTick(){ if(!typingSoundEnabled)return; const a=new AudioContext(); const o=a.createOscillator(); o.type='sine'; o.frequency.value=800; const g=a.createGain(); g.gain.value=0.05; o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime+0.03); }
    function playCollectSound(){ const a=new AudioContext(); const o=a.createOscillator(); o.type='triangle'; o.frequency.value=1200; const g=a.createGain(); g.gain.value=0.1; o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime+0.06); }

    // popup
    function showPopup(msg) {
        const pop = document.createElement('div'); pop.className='popup-message'; pop.textContent=msg;
        document.body.appendChild(pop); setTimeout(()=>pop.remove(), 3000);
    }

    // event listeners
    document.getElementById('startStoryBtn').addEventListener('click',()=>{ storyLevel=1; showScreen('story'); });
    document.getElementById('goMiniGameBtn').addEventListener('click',()=>{ showScreen('mini'); initMiniGame(); });
    document.getElementById('goDailyBtn').addEventListener('click',()=>showScreen('daily'));
    document.getElementById('goGalleryBtn').addEventListener('click',()=>showScreen('gallery'));
    document.getElementById('goSettingsBtn').addEventListener('click',()=>showScreen('settings'));
    document.querySelectorAll('[id^="backFrom"]').forEach(b=>b.addEventListener('click',()=>{ stopMiniGame(); showScreen('home'); }));
    document.getElementById('missMeBtn').addEventListener('click',()=>showPopup("I miss you every second, Tasnim ❤️"));
    document.getElementById('whatsappBtn').addEventListener('click',()=>{ 
    const phoneNumber = "96878440900"; // Your WhatsApp number
    const message = `Hey! I just played your Love Quest game and I love it! ❤️ - ${girlfriendName}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
});
    document.getElementById('toggleMusicBtn').addEventListener('click',()=>{ musicEnabled=!musicEnabled; updateAudioUI(); saveProgress(); });
    document.getElementById('toggleTypingSoundBtn').addEventListener('click',()=>{ typingSoundEnabled=!typingSoundEnabled; updateAudioUI(); saveProgress(); });
    document.getElementById('resetProgressBtn').addEventListener('click',()=>{ storyUnlocked=1; storyLevel=1; saveProgress(); showPopup('Progress reset, but love remains ❤️'); });
    document.getElementById('restartMiniGame').addEventListener('click',()=>{ stopMiniGame(); initMiniGame(); });
    
    // Particle canvas (background hearts)
    const pCanvas = document.getElementById('heart-particle-canvas'), pCtx = pCanvas.getContext('2d');
    function resizeCanvas(){ pCanvas.width=window.innerWidth; pCanvas.height=window.innerHeight; }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
    let particles = [];
    for(let i=0;i<25;i++) particles.push({ x:Math.random()*pCanvas.width, y:Math.random()*pCanvas.height, size:12+Math.random()*20, speed:0.2+Math.random()*0.6 });
    function drawParticles(){
        pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
        pCtx.font='20px "Segoe UI Emoji"'; pCtx.fillStyle='rgba(255,200,220,0.5)';
        particles.forEach(p=>{ p.y-=p.speed; if(p.y<-30){ p.y=pCanvas.height+20; p.x=Math.random()*pCanvas.width; } pCtx.fillText('❤️',p.x,p.y); });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    loadProgress();
    updateAudioUI();
    // random popup (first load)
    setTimeout(()=>{ if(currentScreen==='home') showPopup("Hey… I just wanted to remind you I love you ❤️"); }, 1500);
})();
