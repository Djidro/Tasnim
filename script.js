/* ============================================================
   LOVE QUEST — Tasnim 💚
   Password: 28dec
   Anniversary: 28 December 2017
   ============================================================ */

const GIST_ID = 'b85ba63d4376ddd0862c53e97aade6ab';
const GIST_FILENAME = 'lovequest-data.json';
const GITHUB_TOKEN = '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';

function showPopup(msg) {
    const pop = document.createElement('div');
    pop.className = 'popup-message';
    pop.textContent = msg;
    document.body.appendChild(pop);
    setTimeout(function () { if (pop && pop.parentNode) pop.remove(); }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

async function loadFromGist() {
    try {
        const res = await fetch('https://api.github.com/gists/' + GIST_ID, {
            headers: { 'Authorization': 'token ' + GITHUB_TOKEN }
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
        const bodyObj = { files: {} };
        bodyObj.files[GIST_FILENAME] = { content: JSON.stringify(data, null, 2) };
        const res = await fetch('https://api.github.com/gists/' + GIST_ID, {
            method: 'PATCH',
            headers: {
                'Authorization': 'token ' + GITHUB_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        });
        if (!res.ok) throw new Error('save failed');
        console.log('✅ Synced');
        return true;
    } catch (err) {
        console.error('Gist save error:', err);
        return false;
    }
}
// THEME ENGINE
const THEMES = [
    { bg1:'#6B0F2A', bg2:'#FFF4E0', bg3:'#D4AF6A', bodyText:'#2B2024',
      card:'linear-gradient(160deg,#FFFDF9 0%,#FCE8EE 100%)', cardBorder:'#8B1E3F', cardShadow:'rgba(139,30,63,0.4)',
      heading:'#8B1E3F', btnBg:'linear-gradient(135deg,#FFFDF9 0%,#F3D6DE 100%)', btnBorder:'#8B1E3F', btnText:'#8B1E3F', btnShadow:'rgba(139,30,63,0.3)',
      accent:'#D4AF6A', hero1:'#FFFDF9', hero2:'#F3D6DE', hero3:'#E8A0B8', heroBorder:'#8B1E3F', heroNumber:'#8B1E3F', heroGlow:'rgba(232,160,184,0.5)',
      badgeBg:'#FFFDF9ee', badgeBorder:'#8B1E3F', inputBg:'#FFFDF9', inputBorder:'#E8A0B8', inputText:'#2B2024' },
    { bg1:'#E8537E', bg2:'#FFFFFF', bg3:'#FFD1DC', bodyText:'#5B0F2B',
      card:'linear-gradient(160deg,#FFFFFF 0%,#FFE4EF 100%)', cardBorder:'#E8537E', cardShadow:'rgba(232,83,126,0.4)',
      heading:'#B8446A', btnBg:'linear-gradient(135deg,#FFFFFF 0%,#FFD1DC 100%)', btnBorder:'#E8537E', btnText:'#B8446A', btnShadow:'rgba(232,83,126,0.3)',
      accent:'#FF9EBF', hero1:'#FFFFFF', hero2:'#FFE4EF', hero3:'#FFB6CE', heroBorder:'#E8537E', heroNumber:'#B8446A', heroGlow:'rgba(232,83,126,0.45)',
      badgeBg:'#FFFFFFee', badgeBorder:'#E8537E', inputBg:'#FFFFFF', inputBorder:'#FFB6CE', inputText:'#5B0F2B' },
    { bg1:'#F8D5DE', bg2:'#F0B8C5', bg3:'#B8446A', bodyText:'#2B2024',
      card:'linear-gradient(160deg,#FFF8FA 0%,#F8D5DE 100%)', cardBorder:'#8B1E3F', cardShadow:'rgba(139,30,63,0.35)',
      heading:'#5B0F2B', btnBg:'linear-gradient(135deg,#FFF8FA 0%,#F8D5DE 100%)', btnBorder:'#8B1E3F', btnText:'#5B0F2B', btnShadow:'rgba(139,30,63,0.28)',
      accent:'#E8A0B8', hero1:'#FFF8FA', hero2:'#F8D5DE', hero3:'#E8A0B8', heroBorder:'#8B1E3F', heroNumber:'#5B0F2B', heroGlow:'rgba(139,30,63,0.35)',
      badgeBg:'#FFF8FAee', badgeBorder:'#8B1E3F', inputBg:'#FFF8FA', inputBorder:'#E8A0B8', inputText:'#2B2024' },
    { bg1:'#9B7FC7', bg2:'#F8BBD9', bg3:'#FFFFFF', bodyText:'#3D2159',
      card:'linear-gradient(160deg,#FDF8FF 0%,#F3E4FA 100%)', cardBorder:'#8B5EB3', cardShadow:'rgba(139,94,179,0.4)',
      heading:'#7B4DA8', btnBg:'linear-gradient(135deg,#FFFFFF 0%,#F3D6F0 100%)', btnBorder:'#8B5EB3', btnText:'#7B4DA8', btnShadow:'rgba(139,94,179,0.3)',
      accent:'#F8BBD9', hero1:'#FDF8FF', hero2:'#F8BBD9', hero3:'#D9B8F0', heroBorder:'#8B5EB3', heroNumber:'#7B4DA8', heroGlow:'rgba(179,157,219,0.5)',
      badgeBg:'#FDF8FFee', badgeBorder:'#8B5EB3', inputBg:'#FDF8FF', inputBorder:'#C9A6E8', inputText:'#3D2159' },
    { bg1:'#4A0A1E', bg2:'#D4AF6A', bg3:'#FFF4E0', bodyText:'#2B2024',
      card:'linear-gradient(160deg,#FFF9EC 0%,#F5E0B8 100%)', cardBorder:'#8B1E3F', cardShadow:'rgba(74,10,30,0.5)',
      heading:'#5B0F2B', btnBg:'linear-gradient(135deg,#FFF9EC 0%,#F5E0B8 100%)', btnBorder:'#8B1E3F', btnText:'#5B0F2B', btnShadow:'rgba(74,10,30,0.35)',
      accent:'#D4AF6A', hero1:'#FFF9EC', hero2:'#F5E0B8', hero3:'#D4AF6A', heroBorder:'#5B0F2B', heroNumber:'#5B0F2B', heroGlow:'rgba(212,175,106,0.6)',
      badgeBg:'#FFF9ECee', badgeBorder:'#8B1E3F', inputBg:'#FFF9EC', inputBorder:'#D4AF6A', inputText:'#2B2024' }
];

let currentThemeIndex = 0;
let themeInterval = null;

function applyTheme(theme) {
    const r = document.documentElement;
    const map = {
        '--bg-1': theme.bg1, '--bg-2': theme.bg2, '--bg-3': theme.bg3,
        '--body-text': theme.bodyText,
        '--card-bg': theme.card, '--card-border': theme.cardBorder, '--card-shadow': theme.cardShadow,
        '--heading-color': theme.heading, '--body-soft': theme.heading,
        '--btn-bg': theme.btnBg, '--btn-border': theme.btnBorder, '--btn-text': theme.btnText, '--btn-shadow': theme.btnShadow,
        '--accent': theme.accent,
        '--hero-1': theme.hero1, '--hero-2': theme.hero2, '--hero-3': theme.hero3,
        '--hero-border': theme.heroBorder, '--hero-number': theme.heroNumber, '--hero-glow': theme.heroGlow,
        '--badge-bg': theme.badgeBg, '--badge-border': theme.badgeBorder,
        '--input-bg': theme.inputBg, '--input-border': theme.inputBorder, '--input-text': theme.inputText
    };
    Object.keys(map).forEach(function (k) { r.style.setProperty(k, map[k]); });
}

function startThemeCycler() {
    applyTheme(THEMES[0]);
    if (themeInterval) clearInterval(themeInterval);
    themeInterval = setInterval(function () {
        currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
        applyTheme(THEMES[currentThemeIndex]);
    }, 5000);
}

(function () {
    "use strict";

    const VALID_PASSWORDS = ['28dec'];

    function checkUser() {
        const isLoggedIn = sessionStorage.getItem('lovequest_auth');
        const overlay = document.getElementById('loginOverlay');
        const app = document.getElementById('mainApp');
        if (isLoggedIn === 'true') {
            if (overlay) overlay.classList.add('hidden');
            if (app) app.classList.add('visible');
            if (!window._gameInitialized) { initGameApp(); window._gameInitialized = true; }
            startThemeCycler();
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
        if (!password) { if (error) error.textContent = "❌ Please enter our special date"; return; }
        if (VALID_PASSWORDS.includes(password)) {
            if (overlay) overlay.classList.add('hidden');
            if (app) app.classList.add('visible');
            sessionStorage.setItem('lovequest_auth', 'true');
            if (!window._gameInitialized) { initGameApp(); window._gameInitialized = true; }
            startThemeCycler();
            showPopup('💕 Welcome back, my love! ✨');
        } else {
            if (error) error.textContent = "❌ That's not our date, try again... 💭";
            if (input) { input.value = ''; input.focus(); }
        }
    }

    const girlfriendName = "Tasnim";
    const ANNIVERSARY = new Date('2017-12-28T00:00:00');

    const specialMessages = [
        "You're my favorite notification ❤️", "Every day with you is a new level of love.",
        "I fall for you again and again.", "You're the heart of my game.",
        "Tasnim, you make life magical ✨", "You're the reason I smile every day 💕",
        "My heart beats only for you 💓"
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

    // LETTER MOODS (shortened references — full content preserved)
    const letterMoods = [
        { emoji: "🥺", label: "Open when", title: "you miss me", signature: "— Forever yours ❤️", messages: [
            "My love, if you're reading this, I know you're missing me right now. I wish I could be there beside you, holding you close and telling you that everything is okay. Until I can hold you again, close your eyes and imagine my arms around you. Remember, no matter how far apart we are, my heart is always with you. ❤️",
            "I wish I was there too. I wish I could suddenly appear beside you, sit next to you, hold your hand, and just stay there with you. Sometimes I hate that I can't simply be beside you when I want to. But one day, my love, being together won't be something we have to wish for. It will just be our normal life.",
            "If you miss hearing my voice, imagine me saying your name softly and telling you, \"I love you.\" Imagine all our little conversations, our jokes, our silly arguments, and the times we talked about absolutely nothing. I can't give you my voice through this message, but I hope these words make you feel a little closer to me.",
            "Come here, my love. 🤗 Imagine me pulling you close and holding you for a long time. No talking, no phones, no distance — just you in my arms. I wish I could give you that hug right now. Until I can, keep this little imaginary hug from me. ❤️",
            "I wish I could see your face right now. I wish I could look at you, smile at you, and watch you smile back at me. Whenever you miss seeing me, remember that there is someone somewhere looking at your pictures and thinking, \"That's the woman I want to spend my life with.\"",
            "I know being apart isn't easy. There are moments when I wish we could forget about everything else and just spend the whole day together. But our story has already survived so many days, so many miles, and so many moments apart. And we're still here. Still us. ❤️",
            "Think about us. Think about the laughs, the conversations, the little moments, the crazy moments, and everything we've experienced together. Since 28 December 2017, we've created so many memories. And the beautiful thing is that our best memories don't have to be behind us. We still have so many more to create.",
            "Sometimes I wish I could go back to one of our favorite days and live it again with you. But then I remember something: I don't want to live only in our memories. I want to create thousands of new moments with you. I want more days, more nights, more laughs, more adventures, and more ordinary moments together.",
            "If you're reading this at night, look at the sky for a moment. Somewhere under that same sky, I'm thinking about you too. I wish I could say goodnight while holding you instead of sending words through a screen. One day, I hope \"goodnight\" will mean a kiss, a hug, and falling asleep beside you.",
            "Good morning, my love. ❤️ If I'm not there when you wake up, I hope this message reminds you that you are still the first person I would want to see. Imagine me beside you, wishing you a beautiful morning and giving you a kiss before starting the day. Until that becomes our reality, carry my love with you.",
            "If you miss me so much that your heart hurts a little, remember this: I'm not going anywhere. We've been together since 28 December 2017. We've come this far, and I don't want our story to stop here. I want to keep choosing you, loving you, and building our future together. This distance is temporary. Us is what I want to be permanent. ❤️",
            "Take your hand and imagine mine holding it. Imagine our fingers together, walking side by side, with nowhere we need to rush to. I can't hold your hand through this screen, but I hope you can feel how much I wish I could. Sooner than we know, holding your hand won't be something we miss. It will be something we do every day.",
            "Sometimes I still think about how incredible it is that two people can meet, fall in love, and somehow become such an important part of each other's lives. Since 28 December 2017, you have become more than just someone I love. You became part of my story, my memories, my dreams, and my future. And even when I miss you terribly, I'm grateful that I have someone worth missing this much.",
            "One day, my love, I hope you'll read this message while lying beside me. No distance. No counting the days until we meet. No saying goodbye. Just you and me, together. We'll look back at these days and remember how much we missed each other, and we'll smile because we finally made it to the life we dreamed about. Until then, hold onto us. We're getting there. 💍❤️",
            "If you opened this one, then you must really miss me. So let me tell you the one thing I want you to remember: I miss you too. I miss your presence. I miss your voice. I miss your smile. I miss talking to you. I miss being close to you. I miss all the little things that make you you. But more than anything, I miss the feeling of simply being beside the woman I love. We've been together since 28 December 2017, and after all these years, my heart still chooses you. So whenever you miss me, remember that somewhere, I'm looking forward to the same thing you are: the day when we won't have to miss each other anymore. Until that day... wait for me. ❤️ I love you. I choose you. And I can't wait to spend the rest of my life with you. 💍"
        ]},
        { emoji: "😢", label: "Open when", title: "you're sad", signature: "— Always here for you ❤️", messages: [
            "My love, I'm sorry you're feeling sad right now. I wish I could be beside you, hold you close, and take away whatever is hurting your heart. You don't have to pretend to be okay for me. It's okay to have difficult days. Just remember that you are loved, deeply and completely, and I'm always here for you. ❤️",
            "If you need to cry, then cry, my love. Don't hold everything inside. Let it out. And while you do, imagine me sitting beside you, holding your hand and reminding you that you don't have to go through everything alone. Cry today if you need to. Tomorrow, we'll try again together.",
            "I know sometimes everything can feel like it's happening at once. When that happens, don't worry about tomorrow or next week. Just take one breath at a time. You don't have to solve everything tonight. Rest your heart for a while. I'm proud of you for making it this far, and I believe in you.",
            "If you need me, imagine me right beside you. Imagine my arms around you and my voice saying, \"I'm here.\" You don't have to say anything. You don't have to explain yourself. Just stay there with me for a moment. I may not physically be beside you, but my love is always reaching for you.",
            "Please don't let one difficult moment make you forget how loved you are. You are loved by me in ways I probably don't say enough. I love your smile, your heart, your personality, your little habits, and even the parts of yourself you sometimes don't like. To me, you are precious.",
            "I'm sorry someone made you feel hurt. I wish I could protect your heart from every painful thing in this world. But since I can't, I want you to remember this: someone's words or actions don't decide your worth. You know who you are, and I know the beautiful person you are. Don't let someone else's behavior change how you see yourself.",
            "It's nighttime, and maybe your thoughts are getting louder than usual. Please don't let them convince you that everything will always feel this way. Tonight is just tonight. Tomorrow is another chance. Put your head down, take a deep breath, and imagine me giving you a goodnight kiss and telling you, \"Everything will be okay, my love.\" ❤️",
            "Even when you feel alone, remember that you have someone who thinks about you, worries about you, prays for your happiness, and dreams about a future with you. You are a part of my life that I never want to lose. So when loneliness comes, remember that my heart has a place that belongs only to you.",
            "My love, you don't have to be perfect to be loved. You don't have to have everything figured out. You don't have to make everyone happy. You just have to be yourself. I fell in love with you, not some perfect version of you. Please don't be so hard on the woman I love.",
            "Rest, my love. You don't always have to be strong. You don't always have to keep moving. Sometimes the strongest thing you can do is stop for a moment and breathe. Forget about everything for a little while. Take care of yourself. Tomorrow can wait. Your heart deserves some peace.",
            "I know it might feel that way right now, but feelings can change. The pain you're feeling today isn't guaranteed to stay forever. You've already survived difficult days that you once thought you couldn't get through. So hold on. One day you'll look back at this moment and realize that you made it through. And I'll be proud of you.",
            "Look at how far we've come. Since 28 December 2017, we've experienced so many things together. We've had beautiful days and difficult days, but we're still here. That's something I never want you to forget. Whatever today feels like, it doesn't erase everything we've built together. I love you, and I'm still here.",
            "Close your eyes and imagine our future. Imagine us waking up in the same home. Imagine us having breakfast together, laughing about something silly, making plans, traveling, celebrating birthdays, and growing older together. That's the future I want. So whatever is making you sad today, remember that this is only one moment in a much bigger story we're still writing together. ❤️",
            "Please don't give up on yourself because of one painful chapter. You have so much more life ahead of you. So many mornings you haven't seen, places you haven't visited, memories you haven't made, and moments you haven't experienced yet. And I want to be there for many of them. Take another breath. Take another step. You don't have to figure everything out today.",
            "If you're reading this while your heart is hurting, then listen to me carefully: You are loved. You are important. You are enough. You are not alone. And you don't have to hide your sadness from me. We've been together since 28 December 2017, and I don't only want to be there for your happy days. I want to be there when you cry, when you're tired, when you're confused, when you're angry, and when life feels difficult. I want all of you. The happy you. The tired you. The emotional you. The imperfect you. I choose you—all of you. So wipe your tears when you're ready, take a deep breath, and remember that somewhere, there is a man who loves you more than these words can explain. I'm here, my love. Always. ❤️"
        ]},
        { emoji: "🌙", label: "Open when", title: "you can't sleep", signature: "— Goodnight, my love 🌙", messages: [
            "My love, if you're awake right now, I wish I could be there beside you. Put your head on my chest, close your eyes, and imagine my arms around you. You don't need to think about tomorrow right now. Just breathe, relax, and remember that you are loved. ❤️",
            "I know your thoughts might be running everywhere tonight. But you don't have to solve everything at this moment. Let the thoughts wait until morning. Tonight, your only job is to rest. Close your eyes, take a slow breath, and imagine me telling you, \"I've got you, my love.\"",
            "I wish I was there too. I would turn toward you, pull you closer, kiss your forehead, and tell you to stop worrying. One day, I hope nights like this won't involve a phone or a screen between us. You'll simply reach for me, and I'll be right there.",
            "Goodnight, my beautiful girl. ❤️ Even if I can't say it to you in person tonight, imagine hearing my voice: \"Goodnight, my love. Sleep peacefully. I'll be thinking about you.\" Now close your eyes and let yourself rest.",
            "If the room feels too quiet tonight, remember that somewhere there is someone thinking about you and wishing he could be beside you. Distance may separate us physically, but it can't separate what we have in our hearts. You're never as alone as you feel.",
            "Stop looking at the clock, my love. 😂❤️ The minutes don't need to matter right now. Put your phone down after reading this, get comfortable, close your eyes, and let yourself rest. Tomorrow will come whether you watch the clock or not. So let tonight simply be tonight.",
            "Imagine me whispering your name. Imagine me saying, \"I love you.\" Imagine us talking about random things until we both become sleepy. If I could, I would stay on the phone with you until you fell asleep. Until then, let these words keep you company tonight.",
            "Come here. 🤗 This is your imaginary midnight hug. Imagine me pulling you close, wrapping my arms around you, and holding you without saying anything. Stay there for a moment. Forget everything else. Just you and me. I hope you can feel how much I wish I could give you this hug for real.",
            "Maybe you're awake thinking about everything that is ahead of us. Remember that our story started on 28 December 2017, but that wasn't the end of the story—it was only the beginning. There are still so many mornings, nights, adventures, and memories waiting for us. One day, we'll look back at these nights and smile.",
            "I wish we were together tonight. I wish we could lie next to each other, talk about our day, laugh about something silly, and eventually fall asleep beside each other. That's one of the simple things I look forward to most. Not something huge. Just you beside me.",
            "Don't let your tired mind create problems that aren't there. Remember us. Remember how far we've come since 28 December 2017. We've had good days and difficult days, but we're still here. So tonight, don't overthink our story. Just remember that I love you, and I choose you. ❤️",
            "Instead of thinking about your worries, think about one of our favorite memories. Remember what happened. Remember what we were laughing about. Remember how you felt. Then imagine us creating another memory just like that someday. Maybe one day, this very night will become another memory we'll laugh about together.",
            "If you're crying right now, it's okay. You don't have to hide your emotions from me. Let the tears come, breathe slowly, and be gentle with yourself. If I were there, I wouldn't tell you to stop crying. I'd simply hold you until you felt a little better. You don't have to be strong every minute of every day.",
            "Good. Now don't open another message. 😂❤️ Put your phone down, close your eyes, get comfortable, and imagine me giving you one last kiss on your forehead. Goodnight, my love. May your dreams be peaceful, and may you wake up knowing that someone loves you very much. Sleep now. 🌙❤️",
            "If you're awake because you miss me, then remember something: I'm missing you too. I wish I could walk through the door right now, climb into bed beside you, pull you close, and tell you that everything is okay. We've been together since 28 December 2017, and every day brings us closer to the future we're dreaming about. One day, you won't have to read a message from me when you can't sleep. I'll be right beside you. You'll be able to reach for my hand, put your head on my chest, and fall asleep knowing I'm right there. Until that day comes, close your eyes and imagine me holding you. Goodnight, my love. Sleep peacefully. I'll see you in your dreams. ❤️🌙"
        ]},
        { emoji: "😊", label: "Open when", title: "you need a smile", signature: "— Your favorite person ❤️", messages: [
            "Hey beautiful, if you're reading this, I'm officially assigning you one mission: Smile. Right now. 😌❤️ Yes, I'm serious. Even if you're sitting there looking at your phone with the most serious face in the world, I want you to smile because somewhere out there is a man who loves you more than you know. Okay... that's enough seriousness. Now smile properly. 😂❤️",
            "Remember all the stupid things we've laughed about? Some of them weren't even funny, but somehow we couldn't stop laughing. 😂 That's one of my favorite things about us. We don't always need something amazing to be happy. Sometimes all we need is each other and one completely ridiculous conversation. So here's your reminder: You're my favorite person to be stupid with. ❤️",
            "My love, I know you might not feel beautiful every single day. But if you could see yourself through my eyes for just five minutes, you would understand why I smile whenever I think about you. So stop being so hard on yourself. Fix your hair. Look in the mirror. And smile at that beautiful girl looking back at you. She's the one I love. ❤️",
            "Okay, imagine me walking toward you right now. You look at me. I look at you. I try to look serious... And then I do something completely stupid just to make you laugh. 😂 You know exactly what I'm talking about. And yes, I would probably do it again. Anything for that smile. ❤️",
            "Think about us. Not the difficult moments. Think about the random conversations, the jokes, the laughs, the little moments that nobody else would understand. Since 28 December 2017, we've created our own little world. And honestly? I wouldn't trade our crazy little world for anything. Now smile. That's an order. 😌❤️",
            "Congratulations! You have officially opened a message from your boyfriend instead of finding something useful to do. 😂 But since you're already here... I want you to know that if I were there, I'd probably make you even more bored by talking about completely random things. And somehow we'd end up laughing about something that makes absolutely no sense. That's our talent. 😂❤️",
            "Here's your virtual kiss: 😘 And another one: 😘 Okay, one more: 😘 Fine... I'm sending you a whole collection. 😘😘😘😘😘😘😘😘 Don't complain. You opened the message. 😂❤️",
            "If you need a reason to smile, here's one: You are loved. Not because you're perfect. Not because you always have everything together. Just because you're you. And somewhere, there's someone who looks at you and thinks, \"That's my girl.\" That's me. ❤️",
            "Random compliment of the day: You're beautiful. You're adorable. You're amazing. You're sometimes a little crazy. 😂 But most importantly... You're mine, and I feel lucky to have you. ❤️ Now go smile before I send you another compliment.",
            "I have a very important question for you: Why are you reading this instead of smiling already? 🤨😂 Seriously. You have approximately 5 seconds to smile. 5... 4... 3... 2... 1... Caught you. 😏❤️",
            "Imagine us years from now. Maybe we're sitting together, looking through old photos. We find these messages. We read them and laugh at how romantic and ridiculous I was. 😂 Then I'll look at you and say, \"I'd still choose you.\" And you'll probably say, \"I know.\" 😌❤️ And honestly, I hope that's exactly how our future looks.",
            "Do you know what makes you special to me? It's not just one thing. It's your smile. Your voice. Your personality. The way you make me feel. The memories we've created. The way you became such an important part of my life without me even realizing how deeply I would fall for you. So if you ever forget how special you are... Come back and read this. ❤️",
            "Okay, forget whatever was making you sad for the next 30 seconds. Take a breath. Relax your face. Smile. Now imagine me standing in front of you doing the most ridiculous dance imaginable just because I want to make you laugh. 😂💃 You're welcome. And yes... I'd actually do it.",
            "You. Simple. Your name appearing on my phone. Your messages. Your pictures. Your voice. Your laugh. Memories of us. Thinking about our future. Even the smallest things can make me smile when they remind me of you. So if you ever wonder whether you make me happy... You do. More than you know. ❤️",
            "My love, whatever happened today, I hope this little message gives you a reason to smile. We've been together since 28 December 2017. We've laughed together. We've grown together. We've made mistakes. We've made memories. We've dreamed about our future. And through all of it, you're still the girl who can make my heart smile. So here's my final instruction: Put your phone down for a moment. Take a deep breath. Think about us. Think about the life we're trying to build together. And smile. Because somewhere, I'm smiling too. Because I have you. ❤️ And if that doesn't work... I'll just have to come there and make you laugh myself. 😂💋"
        ]},
        { emoji: "😤", label: "Open when", title: "you're angry at me", signature: "— I only want to make you smile ❤️", messages: [
            "My love, if you opened this, it means something happened — and I want you to know that I'm sorry. I never want to be the reason you're upset. I would rather spend a thousand years fixing my mistakes than spend a single day knowing I hurt you. Talk to me when you're ready. I'm listening. I'm not going anywhere. ❤️",
            "I know I'm not perfect. I know I say the wrong things sometimes. I know I can be frustrating. But I want you to know that every mistake I make teaches me how to love you better. You are worth every effort, every apology, every change. Forgive me when you can. I'll spend every day after earning it. ❤️",
            "You're allowed to be angry. You're allowed to need space. You're allowed to feel everything you're feeling. And when you're ready — whenever that is — I'll be right here. Not pushing. Not rushing. Just here. Because you matter more to me than being right. Always. ❤️",
            "If you're angry with me right now, then please read this slowly: I would rather lose every argument in the world than lose you. I don't need to be right. I need to be with you. I need to hold you. I need to make it right. Whatever it is — we can fix it. Together. Because that's what we do. ❤️",
            "My love, whatever happened, I'm sorry. Truly. Deeply. From the bottom of my heart. I never want to be the reason you cry. I never want to be the reason you feel hurt. If I could take it all back, I would. Take your time. And know that when you come back, my arms will be open. They always are. For you. ❤️",
            "I know you might not want to talk right now. And that's okay. But I want you to know: I'm not going anywhere. Not because I'm stubborn. Not because I'm waiting for you to calm down. But because you are my home, and I will always wait at the door for you. Whenever you're ready. ❤️",
            "You know what I love most about us? That even when we're upset with each other, we still choose each other. We still come back. We still fight for us. That's rare, Tasnim. And I don't take it for granted. Not for a single second. So whenever you're ready — I'm here. ❤️",
            "If I hurt you, I'm sorry. If I made you feel small, I'm sorry. If I made you feel unloved, I'm sorry. You deserve someone who lifts you up, and I want to be that someone. Not just today. Every day. Let me be better. Let me be the man you deserve. ❤️",
            "My love, anger is okay. Sadness is okay. Being quiet is okay. What's not okay is you thinking for one second that this changes how much I love you. Because it doesn't. It never could. Not in a million years. Not in a million lifetimes. You're my person. Nothing changes that. ❤️",
            "Whatever happened, I want you to know this: I love you. I love you when you're happy. I love you when you're sad. I love you when you're angry. I love you when you don't want to talk to me. I love you through every mood, every storm, every silence. And I'll love you through the day you decide you're ready to talk. ❤️",
            "Take all the time you need. I'll be here. Not because I'm waiting for you to forgive me. But because being without you is not an option I'm willing to consider. You are my forever. Even when you're angry. Especially when you're angry. Because that's when you need me to love you the most. ❤️",
            "I don't want to win. I want us. I want the version of us that talks things through. The version that grows from hard days. The version that looks back at fights like this and says, \"We made it through that too.\" So whenever you're ready — let's talk. Let's fix this. Let's be us again. ❤️",
            "If you opened this because you're angry at me, then I want you to know I've been thinking about you all day. Not about what went wrong — about you. About your smile. About the way you laugh. About everything I love. And I want to make it right. For you. For us. Always. ❤️",
            "My love, I know I make mistakes. But there is one thing I will never do — I will never stop loving you. Not for one second. Not for one argument. Not for one bad day. You are my heart. My home. My everything. And no fight is big enough to change that. ❤️",
            "I know you didn't open this because you're angry. You opened it because you love me, and even through frustration, you wanted to hear my voice. So here it is: I love you. I'm sorry. I'm here. And I always will be. Now come here so I can hold you and make it all better. ❤️🥰"
        ]},
        { emoji: "🫂", label: "Open when", title: "you feel alone", signature: "— You'll never be alone with me ❤️", messages: [
            "My love, if you're reading this because you feel alone, I want you to remember one thing: You are never truly alone. ❤️ Even when I'm not physically beside you, my heart is always with you. Close your eyes for a moment and imagine my arms around you. I'm holding you tightly and telling you, \"I'm here, my love. You don't have to go through everything by yourself.\" I love you more than words can explain. ❤️",
            "I know sometimes you just want someone next to you. Someone to talk to. Someone to hold you. Someone who doesn't need you to explain how you're feeling. I wish I could be that person beside you right now. Until I can be there, remember that my heart is sitting right beside yours. ❤️ And one day, I hope we won't have to miss each other from far away anymore.",
            "My love, maybe today you feel like nobody understands what you're going through. Maybe you don't even know how to explain it yourself. That's okay. You don't always have to have the right words. You can simply tell me, \"I'm not okay.\" I'll listen. I won't judge you. I won't make you feel like your feelings are too much. Because you're my girl, and what matters to you matters to me. ❤️",
            "Come here. 🫂❤️ Consider this your official permission to stop everything for a moment and imagine me giving you the biggest hug. A long one. The kind where you don't have to say anything. Just breathe. Relax. And stay there for a little while. If I were beside you, I wouldn't let go quickly. I'd hold you until you felt a little better. So here's your virtual hug until I can give you the real one. 🫂❤️",
            "My love, nighttime can make loneliness feel much bigger. Everything becomes quiet, and suddenly your thoughts become louder. If that happens tonight, remember that somewhere I'm thinking about you too. Look at the sky and remember that we're under the same moon. 🌙❤️ You're not forgotten. You're not forgotten by me. Close your eyes, take a deep breath, and imagine me whispering: \"Goodnight, my love. I'm here.\"",
            "If you're feeling like nobody cares about you today, please read this slowly: I care about you. I care about your happiness. I care about your worries. I care about your dreams. I care about the little things you think nobody notices. You matter to me more than you realize. So please don't let one difficult day convince you that you're alone in this world. You have someone who loves you deeply. Me. ❤️",
            "Sometimes you can be surrounded by people and still feel completely alone. I understand that sometimes being around people doesn't make the loneliness disappear. So if that's how you're feeling right now, don't force yourself to pretend everything is okay. Take a moment for yourself. And remember that you have a place in someone's heart where you will always belong. My heart. ❤️ No matter how crowded the world becomes, there will always be a place for you with me.",
            "I know there are moments when you just wish I could suddenly appear beside you. I wish I could do that too. I'd come to you, sit beside you, look at you, and say, \"I'm here now.\" Then I'd probably hug you without even asking why you're feeling lonely. Because sometimes you don't need advice. Sometimes you just need someone you love beside you. And I want to be that person for you. ❤️",
            "My love, you have me. Not just when everything is good. Not just when you're smiling. Not just when you're happy. You have me when you're tired. When you're confused. When you're lonely. When you're having a difficult day. When you don't know what to say. And even when you simply need someone to sit quietly with you. I'm your person, and I want you to remember that. ❤️",
            "Sometimes I imagine what it will be like when we finally have our own little home. No more wishing I was there. No more missing each other from far away. Just you and me. Maybe sitting together after a long day. Maybe watching something silly. Maybe eating together. Maybe doing absolutely nothing. Just being together. Until that day comes, hold onto that picture with me. That's one of the futures I'm dreaming about. ❤️🏡",
            "My love, if everything feels too heavy today, you don't have to solve your whole life right now. Take it one moment at a time. Breathe. Rest if you need to. Cry if you need to. Talk if you want to. And please remember that you don't have to carry everything alone. Let me be there for you. You don't have to be strong every second. Sometimes you can simply be my girl who needs a little love. And I'll give you all the love I can. ❤️",
            "Put your hand over your heart. Feel that? Now imagine my hand over yours. We're apart physically, but the love between us doesn't disappear because of distance. Since 28 December 2017, we've created something that means so much to me. We've shared memories, laughs, difficult moments, dreams, and countless conversations. So whenever you feel far away from me, remember: Distance can separate our bodies, but it cannot erase what we have in our hearts. ❤️",
            "If you're ever sitting alone wondering what our future will look like, come back to this message. I don't know exactly what every day ahead will bring. But I know who I want beside me. You. ❤️ I want to keep making memories with you. I want to keep growing with you. I want to build a life with you. And I want the future we talk about to become the life we're actually living. So whenever you feel alone thinking about tomorrow, remember that I'm dreaming about that tomorrow with you. 💍❤️",
            "If I could teleport to you right now, I wouldn't waste a second. I'd come straight to you. I'd hold you. I'd kiss your forehead. I'd look into your eyes and tell you, \"You're okay. I'm here.\" Since I can't teleport yet... 😂 You'll have to accept this message as my little piece of me reaching you. So whenever you need me, read this again. Imagine my arms around you. And remember how deeply I love you. ❤️",
            "My love, if you've opened this one, maybe you're having one of those moments when the loneliness feels especially strong. So please stay here with me for a moment. Forget everything else. Take a slow breath. Close your eyes. Imagine we're sitting together. No phones. No distance. No worries. Just you and me. I'd take your hand and remind you of everything we've already been through together since 28 December 2017. Look how far we've come. And there's still so much ahead of us. So please remember this: You are loved. You are important. You are wanted. You have a place in my heart. And no matter how lonely you feel sometimes, there is someone in this world who is thinking about you, missing you, praying for your happiness, and dreaming about a future with you. That someone is me. ❤️ So whenever loneliness whispers that you're alone... Come back here. Read this again. And imagine me holding you tightly. You don't have to face the world alone, my love. I'm with you. 🫂❤️"
        ]},
        { emoji: "💗", label: "Open when", title: "you want to feel loved", signature: "— Forever yours ❤️", messages: [
            "My love, if you opened this because you need to feel loved, then let me remind you of something very simple: I love you. ❤️ Not only when you're happy. Not only when everything is going perfectly. I love you on your good days, your difficult days, your quiet days, and even the days when you don't feel like yourself. You don't have to do anything to earn my love. You are already loved simply because you are you. So whenever you need a reminder, come back to these words. My heart is yours. ❤️",
            "I LOVE YOU. ❤️ I know three little words can sometimes feel too simple for everything I feel for you. So let me say it differently: I love your smile. I love your voice. I love the way you make me feel. I love the memories we've created. I love talking to you. I love thinking about our future. And most of all... I love that somehow, out of all the people in this world, I found you. ❤️",
            "Come here, my love. 🫂❤️ Imagine me pulling you into my arms right now. No talking. No questions. No explanations. Just a long, warm hug. The kind of hug that says: \"I've got you.\" Stay there for as long as you need. And when you're ready, remember that even from far away, my love is still wrapped around you.",
            "My love, please don't ever believe that you are unimportant to me. You have become such a meaningful part of my life that sometimes I don't even know how to explain it. Your happiness matters to me. Your feelings matter to me. Your dreams matter to me. You matter to me. Never measure your importance by how much attention you receive from other people. You have a very special place in my heart that nobody else can take. ❤️",
            "If you're reading this because you're wondering whether I still love you... The answer is yes. ❤️ And I hope you remember that love isn't only about saying the words. It's about the memories. The conversations. The effort. The patience. The little moments. The dreams we share. We've been together since 28 December 2017, and every year has given me more reasons to appreciate having you in my life. So don't let one difficult moment make you question everything we've built together. I love you, my girl. ❤️",
            "Do you know how special you are to me? You're not just someone I love. You're someone whose name can change my whole mood when it appears on my phone. ❤️ You're someone I think about during random moments. You're someone I want to tell my good news to. You're someone I miss when you're not around. You're someone I imagine in my future. So if you ever wonder whether you're special to me... You are more special than you probably realize. 🥰",
            "My love, you don't have to be perfect for me. You don't have to look perfect. You don't have to have everything figured out. You don't have to always be strong. You don't have to pretend you're okay when you're not. I don't love some imaginary perfect version of you. I love you. The real you. The girl with her beautiful heart, her dreams, her imperfections, her silly moments, her emotions, and everything that makes her who she is. Please don't forget that. ❤️",
            "If you're reading this late at night, I wish I could be beside you. I'd probably tell you to stop thinking so much. 😂 Then I'd pull you closer, kiss your forehead, and tell you: \"You are loved, my love. Now close your eyes.\" ❤️ So tonight, let your heart rest. You don't need to solve everything before you sleep. Tomorrow can wait. For now, just remember that somewhere, someone loves you very deeply. Goodnight, beautiful. 🌙❤️",
            "Okay... You opened the right message. 😌❤️ Here's your first kiss: 😘 Here's another: 😘 And because I know one isn't enough... 😘😘😘😘😘 Consider all of those kisses delivered with love. And when we finally see each other, I'll make up for all the kisses I couldn't give you while we were apart. ❤️",
            "My love, if today makes you feel like nobody loves you, please don't believe that feeling. Because I love you. ❤️ Maybe I can't always be beside you. Maybe I can't always say the perfect thing. Maybe sometimes life gets busy. But that doesn't mean my love disappears. You are still in my thoughts. You are still in my heart. And you are still the person I want beside me in my future. You are loved, more than you know. ❤️",
            "To me, love isn't only saying: \"I love you.\" Love is choosing each other. Listening. Forgiving. Laughing together. Supporting each other's dreams. Being there during difficult days. Making memories. Growing together. And looking toward the future and still wanting the same person beside you. That's what I want with you. Not just a beautiful love story... A real life together. ❤️🏡",
            "Close your eyes and imagine our future for a moment. Imagine us waking up in the same home. Imagine having breakfast together. Imagine laughing about stupid things. Imagine coming home to each other after a long day. Imagine looking back at these messages years from now. And imagine me telling you: \"Look how far we've come.\" That's the kind of future I dream about. A future where I don't have to miss you from far away because you're right there beside me. You are part of the future I want. ❤️💍",
            "If you're having one of those moments when you just want to feel someone's love... Come here. 🫂❤️ Imagine my hand holding yours. Imagine my arms around you. Imagine me looking into your eyes and telling you: \"You are loved. You are precious to me. And you never have to question whether you have a place in my heart.\" Sometimes we all need to hear those words. So here they are again: I love you. I choose you. And I'm grateful for you. ❤️",
            "Why do I love you? There isn't just one answer. I love you because of your heart. Because of your smile. Because of the way you make ordinary moments feel special. Because of the memories we've created. Because you became someone I couldn't imagine my life without. And because somewhere along the way, you became more than just someone I loved... You became my person. ❤️ That's why.",
            "My beautiful love, if you've reached this message, I want you to stop for a moment and forget everything else. Forget the bad day. Forget the doubts. Forget whatever made you question yourself. And listen to me: You are deeply loved. ❤️ You have someone who thinks about you. Someone who misses you. Someone who wants to see you happy. Someone who wants to make memories with you. Someone who dreams about building a future with you. Someone who has loved you since 28 December 2017 and still looks forward to everything that's waiting for us. That someone is me. ❤️ I can't promise that every day will be perfect. But I can promise that my feelings for you are real. And whenever you need to feel loved, come back to this message. Read it slowly. Imagine me holding your hand. Imagine me looking into your eyes. And imagine me saying: \"My love, you are loved. You are precious. You are important. And you will always have a special place in my heart.\" ❤️ Now smile for me. Because knowing that you're loved should always give you a little reason to smile. I love you, today, tomorrow, and through every chapter of our story. ❤️💍"
        ]},
        { emoji: "💪", label: "Open when", title: "you need courage", signature: "— I believe in you, always ❤️", messages: [
            "My love, if you're opening this because you need courage, take a deep breath first. You don't have to feel fearless to be brave. Sometimes courage simply means being scared and choosing to keep going anyway. Whatever is in front of you right now, take it one step at a time. I believe in you. And when you feel like you can't do it, remember that somewhere, someone is cheering for you with his whole heart. That's me. ❤️ You've got this, beautiful.",
            "My love, don't let the fear of failing stop you from trying. You might not know exactly how things will turn out, and that's okay. You don't need to know the whole journey. You only need enough courage to take the first step. Try. Learn. Make mistakes. Try again. And remember, no matter what happens, I'm proud of you for having the courage to try. Believe in yourself the way I believe in you. ❤️",
            "Hey beautiful, I know there are days when you look at yourself and wonder if you're capable enough. So borrow my belief in you until you find your own again. Because I believe you can do more than you think. You've already made it through difficult moments you once thought you couldn't handle. Look at you. You're still here. ❤️ That's proof that you're stronger than you sometimes realize.",
            "Come here first. 🫂❤️ You don't have to pretend you're not scared. It's okay to be afraid. Being scared doesn't mean you're weak. It means something matters to you. Take a deep breath. Look at what is in front of you. Then take one small step. And another. And remember that even if I can't physically stand beside you, my heart is standing with you. You're not facing this alone. ❤️",
            "My love, if everything feels too difficult right now, don't try to carry everything at once. Put down what can wait. Take care of what needs you most. Breathe. Rest. Then try again. You don't have to conquer the entire world today. Sometimes getting through the day is already enough. And if you need someone to remind you that you can keep going... I'm here. ❤️",
            "You have more strength inside you than you realize. Think about everything you've already survived. Every difficult day. Every disappointment. Every moment you thought you couldn't continue. And yet... Here you are. Still dreaming. Still loving. Still moving forward. So don't underestimate yourself now. You are stronger than your doubts. And I'll always remind you of that. ❤️",
            "My love, before you give up, take one more breath. You don't have to finish everything today. You don't have to have all the answers. You can stop and rest without giving up. Take your time. Then when you're ready, take another small step. And remember: A difficult chapter doesn't mean the whole story is over. ❤️ There are still beautiful moments waiting for you.",
            "My love, never let someone else's words decide your worth. People may misunderstand you. People may underestimate you. People may tell you that you can't do something. Listen to advice when it's useful, but don't let someone's doubt become your identity. You know your heart. You know your dreams. Keep going. And remember that I see the person you are capable of becoming. Believe in her too. ❤️",
            "If you're scared about making the wrong decision, slow down. You don't need to rush just because you're afraid of choosing incorrectly. Think. Listen to your heart. Look at the facts. Consider what matters to you. Then make the best decision you can with what you know. And remember: Whatever you decide, you don't have to face the consequences alone. I'll be here to listen, support you, and remind you that one decision doesn't define your entire life. I love you. ❤️",
            "New beginnings can be scary. A new opportunity. A new challenge. A new chapter. A new dream. You might feel nervous because you don't know what is waiting for you. But that's also what makes a new beginning beautiful. You get to discover something you haven't experienced before. So take that first step. Be brave, my love. ❤️ Your future self might thank you for having the courage to begin.",
            "Hey, beautiful. You don't have to be strong every minute of every day. Sometimes strong means admitting you're tired. Sometimes strong means asking for help. Sometimes strong means resting and trying again tomorrow. So don't feel guilty for needing a break. Rest isn't failure. Take care of yourself. Then when you're ready, stand back up. I'll be cheering for you. ❤️",
            "If nobody has told you today: I believe in you. ❤️ I believe in your heart. I believe in your dreams. I believe in your ability to learn. I believe in your ability to grow. And I believe you can handle more than you think. So whenever your own confidence disappears for a moment, remember that you have someone who sees your potential even when you can't see it yourself. Keep going, my love.",
            "My love, your heart might be racing right now. Your mind might be imagining everything that could go wrong. But take a breath. You've prepared. You've learned. You've come this far. Now trust yourself. You don't need to be perfect. You just need to do your best. And whatever happens afterward, come back to me. I'll be waiting to hear about it. I'm proud of you for facing it. ❤️",
            "Sometimes even beautiful dreams can feel scary because they're so important. When you think about our future, I want you to remember that we don't have to figure everything out today. We'll take life one step at a time. We'll learn. We'll grow. We'll make mistakes. We'll fix things. We'll make memories. And we'll keep moving forward together. Since 28 December 2017, we've already come so far. So whenever the future feels uncertain, take my hand and remember: We don't need to know every step. We just need to keep walking together. ❤️💍",
            "My love, if you're reading this because you truly need courage, I want you to remember who you are. You're the girl who has made it through difficult days. You're the girl who has kept going when things weren't easy. You're the girl who has dreams, hopes, and a heart full of love. And you're stronger than you think. So whatever you're facing right now... Stand up. Take a breath. Wipe away those tears if there are any. Look forward. And take one small step. You don't need to be fearless. You just need to be brave enough to continue. And whenever you feel like you're not strong enough, remember my voice telling you: \"I believe in you. You can do this. I'm proud of you. And I'm always here for you.\" ❤️ Now go show the world the beautiful, strong woman I know you are. You've got this, my love. 🫂❤️"
        ]}
    ];

    const WHEEL_SLICES = [
        { key: 'kiss',     emoji: '💋', label: 'Kiss',        fill: '#8B1E3F', text: '#FFFDF9' },
        { key: 'compli',   emoji: '🥰', label: 'Compliment',  fill: '#F3D6DE', text: '#5B0F2B' },
        { key: 'joke',     emoji: '😂', label: 'Joke',        fill: '#D4AF6A', text: '#2B2024' },
        { key: 'letter',   emoji: '💌', label: 'Love Letter', fill: '#E8A0B8', text: '#5B0F2B' },
        { key: 'memory',   emoji: '📸', label: 'Memory',      fill: '#FFFDF9', text: '#8B1E3F' },
        { key: 'iloveyou', emoji: '❤️', label: 'I Love You',  fill: '#B8446A', text: '#FFFDF9' },
        { key: 'surprise', emoji: '🎁', label: 'Surprise',    fill: '#F3D6DE', text: '#5B0F2B' }
    ];

    const COMPLIMENTS = [
        "You are beautiful in ways you don't even realize. ❤️",
        "Your smile will always be one of my favorite things in this world. 🥰",
        "Even after all these years, you still make my heart smile.",
        "You are the calm my heart finds in every storm.",
        "Everything about you feels like home to me. 🏡",
        "You have a heart so rare that I thank God for it every single day.",
        "You're not just my girlfriend — you're my favorite person, my safest place, my forever. ❤️",
        "You make ordinary moments feel like the best parts of my life.",
        "You are the most beautiful person I have ever known — inside and out.",
        "If I could, I would give you every star in the sky. But even that wouldn't be enough. ✨",
        "You're the reason my phone lights up with happiness.",
        "You make me a better man just by being you.",
        "You have the kind of soul that makes the world softer and warmer.",
        "You are precious. Every part of you. Never doubt it. 💗",
        "I fall for you again and again, every single day. 🥰"
    ];

    const JOKES = [
        "I was going to write something incredibly romantic... but then I remembered how cute you are and forgot what I was saying. 😂❤️",
        "Are you a magician? Because whenever I look at you, everyone else disappears. ✨😂",
        "I tried to count how much I love you. I had to stop because I started running out of numbers. 😂",
        "Do you have a map? Because I keep getting lost in your eyes. 🗺️❤️",
        "I'm not saying you're my favorite person... but my phone smiles every time your name pops up. 😏",
        "If being cute was a crime, you'd be serving a life sentence. 😌😂",
        "Are you WiFi? Because I'm feeling a real connection. 📶❤️",
        "You must be tired... because you've been running through my mind all day. 😂😘",
        "I'm reading a book about you. It's called \"How to Be Amazing Without Even Trying.\" 😂🥰",
        "I was going to be productive today... then I thought about you. Now here we are. 😂❤️",
        "Are you made of sugar? Because you're the sweetest thing I know. 🍬💕",
        "You + me = my favorite equation. Even math agrees. 😉",
        "They say nothing lasts forever... but you're my 'nothing,' and you're forever. 😂❤️",
        "I love you more than pizza. And you know how I feel about pizza. 🍕💗",
        "Warning: excessive cuteness detected. That's you. It's always you. 😂🥰"
    ];

    const LOVE_LETTERS = [
        "My love,\n\nThere are moments when I catch myself thinking about you, and I smile without even realizing it. That's what you do to me — quietly, gently, every single day.\n\nSince 28 December 2017, you've been woven into every part of me. My memories, my dreams, my future — they all have you in them.\n\nI don't need a special occasion to love you. I love you on ordinary Tuesdays. I love you in the quiet hours. I love you when you're laughing and when you're quiet and when you're everything in between.\n\nYou are, and always will be, my favorite part of this life.\n\n— Forever yours ❤️",
        "Tasnim,\n\nI want you to know something: even after all this time, you still give me butterflies.\n\nNot the nervous kind. The warm kind. The kind that reminds me I'm exactly where I'm supposed to be — with you.\n\nThank you for every laugh, every late-night talk, every gentle moment you've given me. Thank you for choosing me, again and again.\n\nWhatever the years bring, I want you to know: my heart is yours. Then, now, and always.\n\nI love you. ❤️",
        "My beautiful girl,\n\nI was thinking about the very first time I realized I loved you. And then I realized — I never stopped. Not for a single day.\n\nYou've made me kinder. Braver. Softer in the ways that matter. You've turned ordinary days into little treasures.\n\nI don't know exactly what tomorrow looks like, but I know who I want beside me when it arrives.\n\nYou. Always you.\n\n— Your person, forever. ❤️",
        "My love,\n\nThere's something I want you to carry with you today:\n\nYou are deeply loved. Not for what you do. Not for how you look. Just for being you.\n\nYou're the person I think about when something good happens. You're the person I want to tell everything to. You're my safest place, my favorite hello, my hardest goodbye.\n\nI'm grateful for you in ways I'll never fully be able to explain.\n\nI love you, Tasnim. More than words can carry. ❤️",
        "My darling,\n\nSometimes I think about our future — our home, our mornings, our little rituals, our growing old together — and my heart settles into something peaceful.\n\nBecause that's what you are to me: peace. And joy. And home.\n\nThank you for being mine. Thank you for letting me be yours.\n\nI promise to keep choosing you. In every season. In every mood. On every ordinary day.\n\nForever and always. 💍❤️"
    ];

    const SURPRISE_POOL = ['kiss', 'letter', 'memory', 'iloveyou', 'compli'];
    const whatsappNumber = "96878440900";

    let currentScreen = 'home';
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
    let openedMoods = new Set();
    let seenMessages = {};
    let wheelRotation = 0;
    let wheelSpinning = false;
    let experienceInited = false;
    let futureRoomInited = false;
    let gardenStage = 0;
    let visitedSections = new Set();

    async function requestNotificationPermission() {
        if (!("Notification" in window)) return;
        if (Notification.permission === "default") {
            try { await Notification.requestPermission(); } catch (e) {}
        }
    }
    function sendBrowserNotification(title, body) {
        if (!("Notification" in window)) return;
        if (Notification.permission === "granted") {
            try { new Notification(title, { body: body, icon: '❤️', badge: '❤️' }); } catch (e) {}
        }
    }
    function checkAndNotifyPlan(plan) {
        const now = new Date();
        const target = new Date(plan.date);
        if (target - now <= 0 && !notifiedPlans.has(plan.id)) {
            notifiedPlans.add(plan.id);
            showPopup('💫 "' + plan.title + '" is happening now! ❤️');
            sendBrowserNotification('💫 ' + plan.title, plan.description || 'Your special moment has arrived! ❤️');
            saveNotifiedPlans();
        }
    }
    function saveNotifiedPlans() {
        localStorage.setItem('notified_plans', JSON.stringify(Array.from(notifiedPlans)));
    }
    function loadNotifiedPlans() {
        const saved = localStorage.getItem('notified_plans');
        if (saved) { try { notifiedPlans = new Set(JSON.parse(saved)); } catch (e) {} }
    }

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
            const elDays = document.getElementById('daysCount');
            const elYears = document.getElementById('bdYears');
            const elMonths = document.getElementById('bdMonths');
            const elBDays = document.getElementById('bdDays');
            const elHours = document.getElementById('bdHours');
            const elMins = document.getElementById('bdMins');
            const elSecs = document.getElementById('bdSecs');
            const elSub = document.getElementById('daysSubtitle');
            if (elDays)   elDays.textContent   = totalDays.toLocaleString();
            if (elYears)  elYears.textContent  = bd.years;
            if (elMonths) elMonths.textContent = bd.months;
            if (elBDays)  elBDays.textContent  = bd.days;
            if (elHours)  elHours.textContent  = String(bd.hours).padStart(2, '0');
            if (elMins)   elMins.textContent   = String(bd.mins).padStart(2, '0');
            if (elSecs)   elSecs.textContent   = String(bd.secs).padStart(2, '0');
            if (elSub) {
                const subs = ['Every second with you counts ❤️', 'Still falling for you, Tasnim 💕', 'And forever to go… ✨', 'My favorite adventure 🌙'];
                const idx = Math.floor(Date.now() / 30000) % subs.length;
                elSub.textContent = subs[idx];
            }
        }
        if (daysInterval) clearInterval(daysInterval);
        update();
        daysInterval = setInterval(update, 1000);
    }

    function fadeHero() {
        const hero = document.getElementById('daysTogetherCard');
        if (hero) hero.classList.add('hidden');
    }
    function showHero() {
        const hero = document.getElementById('daysTogetherCard');
        if (!hero) return;
        hero.style.display = '';
        void hero.offsetWidth;
        hero.classList.remove('hidden');
    }

    function burstHearts(originEl, count) {
        count = count || 10;
        const rect = originEl && originEl.getBoundingClientRect
            ? originEl.getBoundingClientRect()
            : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
        for (let i = 0; i < count; i++) {
            const h = document.createElement('div');
            h.className = 'celebration-heart';
            h.textContent = ['❤️','💗','💕','💖','💘','✨'][Math.floor(Math.random() * 6)];
            h.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 100) + 'px';
            h.style.top  = (rect.top + rect.height / 2 + (Math.random() - 0.5) * 60) + 'px';
            h.style.fontSize = (1 + Math.random() * 1) + 'rem';
            h.style.animationDelay = (Math.random() * 0.3) + 's';
            document.body.appendChild(h);
            setTimeout(function () { if (h.parentNode) h.parentNode.removeChild(h); }, 2600);
        }
    }

    function markVisit(key) {
        if (visitedSections.has(key)) return;
        visitedSections.add(key);
        if (gardenStage < 4) { gardenStage++; updateGarden(); }
    }
    function updateGarden() {
        const plant = document.getElementById('plant');
        const msg = document.getElementById('gardenMsg');
        if (!plant) return;
        plant.classList.remove('stage-1', 'stage-2', 'stage-3', 'stage-4');
        if (gardenStage > 0) plant.classList.add('stage-' + gardenStage);
        const bloom = document.getElementById('plantBloom');
        if (bloom) bloom.textContent = ['🌱', '🌱', '🌿', '🌷', '🌹'][gardenStage] || '🌱';
        if (msg) {
            if (gardenStage >= 4) msg.textContent = 'Just like this little garden, our love keeps growing. ❤️';
            else msg.textContent = 'Keep exploring to help it grow… 🌱 (' + gardenStage + '/4)';
        }
    }

    function initGameApp() {
        screens = {
            home: document.getElementById('homeScreen'),
            story: document.getElementById('storyScreen'),
            mini: document.getElementById('miniGameScreen'),
            experience: document.getElementById('experienceScreen'),
            futureRoom: document.getElementById('futureRoomScreen'),
            notes: document.getElementById('notesScreen'),
            gallery: document.getElementById('galleryScreen'),
            future: document.getElementById('futureScreen'),
            wheel: document.getElementById('wheelScreen')
        };
        welcomeMsg = document.getElementById('welcomeMessage');
        dynamicNameSpan = document.getElementById('dynamicNameDisplay');

        updateNameEverywhere();
        startDaysTogetherCounter();
        loadNotifiedPlans();
        loadOpenedState();
        initDataSync();

        function showScreen(id) {
            Object.keys(screens).forEach(function (k) {
                if (screens[k]) screens[k].classList.remove('active');
            });
            if (screens[id]) screens[id].classList.add('active');
            currentScreen = id;
            if (id === 'home') showHero(); else fadeHero();
            if (id === 'gallery') renderMemoryGallery();
            if (id === 'story') renderLettersGrid();
            if (id === 'future') renderFuturePlans();
            if (id === 'notes') renderNotesFromLocal();
            if (id === 'mini') initMiniGame();
            if (id === 'wheel') initWheel();
            if (id === 'experience') initExperience();
            if (id === 'futureRoom') initFutureRoom();
            // Scroll only within wrapper, avoid full-page scroll jump
            const wrap = document.querySelector('.game-wrapper');
            if (wrap) wrap.scrollTop = 0;
        }

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

        function loadOpenedState() {
            try {
                const moodsSaved = localStorage.getItem('openedMoods');
                if (moodsSaved) openedMoods = new Set(JSON.parse(moodsSaved));
            } catch (e) {}
            try {
                const seenSaved = localStorage.getItem('seenMessages');
                if (seenSaved) seenMessages = JSON.parse(seenSaved);
            } catch (e) {}
            if (!seenMessages || typeof seenMessages !== 'object') seenMessages = {};
        }
        function saveOpenedState() {
            localStorage.setItem('openedMoods', JSON.stringify(Array.from(openedMoods)));
            localStorage.setItem('seenMessages', JSON.stringify(seenMessages));
        }
        function pickMessageIndex(moodIndex) {
            const total = letterMoods[moodIndex].messages.length;
            let seen = seenMessages[moodIndex];
            if (!Array.isArray(seen)) seen = [];
            if (seen.length >= total) seen = [];
            const available = [];
            for (let i = 0; i < total; i++) {
                if (seen.indexOf(i) === -1) available.push(i);
            }
            const pick = available[Math.floor(Math.random() * available.length)];
            seen.push(pick);
            seenMessages[moodIndex] = seen;
            saveOpenedState();
            return pick;
        }

        function renderLettersGrid() {
            const grid = document.getElementById('lettersGrid');
            const view = document.getElementById('openLetterView');
            if (!grid) return;
            if (view) view.classList.add('hidden');
            grid.style.display = 'grid';
            grid.innerHTML = '';
            letterMoods.forEach(function (mood, idx) {
                const card = document.createElement('div');
                card.className = 'letter-card' + (openedMoods.has(idx) ? ' opened' : '');
                card.style.animationDelay = (idx * 0.06) + 's';
                if (openedMoods.has(idx)) {
                    const tag = document.createElement('div');
                    tag.className = 'letter-opened-tag';
                    tag.textContent = '💗';
                    card.appendChild(tag);
                }
                const emoji = document.createElement('div');
                emoji.className = 'letter-emoji'; emoji.textContent = mood.emoji;
                const label = document.createElement('div');
                label.className = 'letter-label'; label.textContent = mood.label;
                const title = document.createElement('div');
                title.className = 'letter-title'; title.textContent = mood.title;
                card.appendChild(emoji); card.appendChild(label); card.appendChild(title);
                card.addEventListener('click', function () { openLetter(idx); });
                grid.appendChild(card);
            });
        }

        function openLetter(moodIndex) {
            const mood = letterMoods[moodIndex];
            if (!mood) return;
            openedMoods.add(moodIndex);
            saveOpenedState();
            const msgIndex = pickMessageIndex(moodIndex);
            const messageText = mood.messages[msgIndex];
            const grid = document.getElementById('lettersGrid');
            const view = document.getElementById('openLetterView');
            const iconEl = document.getElementById('openLetterIcon');
            const titleEl = document.getElementById('openLetterTitle');
            const bodyEl = document.getElementById('openLetterBody');
            const sigEl = document.getElementById('openLetterSignature');
            if (grid) grid.style.display = 'none';
            if (view) view.classList.remove('hidden');
            if (iconEl) iconEl.textContent = mood.emoji;
            if (titleEl) titleEl.textContent = mood.label + ' ' + mood.title + ' ' + mood.emoji;
            if (sigEl) sigEl.textContent = mood.signature || '— With all my love ❤️';
            if (bodyEl) { bodyEl.textContent = ''; typeLetter(messageText, bodyEl); }
        }

        function typeLetter(text, el) {
            if (typingInterval) clearInterval(typingInterval);
            let i = 0;
            el.textContent = '';
            typingInterval = setInterval(function () {
                if (i < text.length) { el.textContent += text.charAt(i); i++; }
                else clearInterval(typingInterval);
            }, 22);
        }

        // MINI GAME
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
            gameActive = true; gamePaused = false;
            score = 0; gameLevel = 1; hearts = []; particles = [];
            lives = 3; combo = 0; comboTimer = 0;
            basketX = (canvas.width - basketW) / 2;
            updateScore(); updateLives();
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
                x: Math.random() * (canvas.width - 24), y: -20,
                size: type === 'gold' ? 26 : 20 + Math.random() * 6,
                speed: (1.8 + Math.random() * 2.2) + (gameLevel - 1) * 0.25,
                type: type, wobble: Math.random() * Math.PI * 2
            });
        }
        function spawnBurst(x, y, color) {
            for (let i = 0; i < 8; i++) {
                particles.push({ x: x, y: y, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4-1, life: 30, color: color || '#ffb6c1' });
            }
        }
        function updateGame() {
            if (!gameActive || !ctx || gamePaused || !canvas) return;
            gameLevel = Math.floor(score / 10) + 1;
            if (gameLevelSpan) gameLevelSpan.textContent = gameLevel;
            const spawnChance = 0.07 + (gameLevel - 1) * 0.008;
            if (Math.random() < spawnChance) spawnHeart();
            if (comboTimer > 0) { comboTimer--; if (comboTimer === 0) combo = 0; }
            hearts = hearts.filter(function (h) {
                h.y += h.speed; h.wobble += 0.1;
                if (h.y + h.size >= canvas.height - basketH - 5 && h.y < canvas.height - 5) {
                    if (h.x + h.size > basketX && h.x < basketX + basketW) {
                        if (h.type === 'bomb') {
                            lives--; updateLives(); spawnBurst(h.x, h.y, '#444'); combo = 0;
                            if (lives <= 0) endGame();
                        } else {
                            const pts = h.type === 'gold' ? 5 : 1;
                            combo++; comboTimer = 120;
                            score += pts * Math.max(1, Math.floor(combo / 3));
                            updateScore();
                            spawnBurst(h.x, h.y, h.type === 'gold' ? '#ffd700' : '#ff69b4');
                            if (Math.random() < 0.25) showPopup(specialMessages[Math.floor(Math.random() * specialMessages.length)]);
                        }
                        return false;
                    }
                }
                return h.y < canvas.height + 30;
            });
            particles = particles.filter(function (p) { p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life--; return p.life > 0; });
            drawCanvas();
        }
        function drawCanvas() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grad.addColorStop(0, 'rgba(255, 253, 249, 0.6)');
            grad.addColorStop(1, 'rgba(243, 214, 222, 0.6)');
            ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function (p) {
                ctx.globalAlpha = p.life / 30; ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#8B1E3F'; ctx.shadowColor = '#E8A0B8'; ctx.shadowBlur = 14;
            ctx.beginPath(); roundRect(ctx, basketX, canvas.height - basketH - 5, basketW, basketH, 12); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.textAlign = 'left';
            hearts.forEach(function (h) {
                ctx.font = h.size + 'px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
                const wobbleX = h.x + Math.sin(h.wobble) * 3;
                if (h.type === 'bomb') ctx.fillText('🖤', wobbleX, h.y);
                else if (h.type === 'gold') { ctx.shadowColor = '#D4AF6A'; ctx.shadowBlur = 16; ctx.fillText('💛', wobbleX, h.y); ctx.shadowBlur = 0; }
                else ctx.fillText('❤️', wobbleX, h.y);
            });
            if (combo >= 3) {
                ctx.font = 'bold 20px sans-serif'; ctx.fillStyle = '#8B1E3F'; ctx.textAlign = 'center';
                ctx.fillText('🔥 x' + combo, canvas.width / 2, 45); ctx.textAlign = 'left';
            }
            ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = '#8B1E3F';
            ctx.fillText('❤️ ' + score, 10, 40);
            ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = '#5B0F2B';
            ctx.fillText('Best: ' + highScore, 10, 60);
        }
        function endGame() {
            stopMiniGame();
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('heartHighScore', String(highScore));
                showPopup('🏆 New high score: ' + score + '! 💕');
            } else showPopup('💔 Game over — score: ' + score);
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
        function updateScore() { if (gameScoreSpan) gameScoreSpan.textContent = score; }
        function updateLives() {
            if (!gameLivesSpan) return;
            let str = '';
            for (let i = 0; i < lives; i++) str += '❤️';
            for (let i = lives; i < 3; i++) str += '🖤';
            gameLivesSpan.textContent = str;
        }

        function renderMemoryGallery() {
            const container = document.getElementById('videoReelContainer');
            if (!container) return;
            container.innerHTML = '';
            memories.forEach(function (mem) {
                const card = document.createElement('div');
                card.className = 'video-card';
                if (mem.type === "video" && mem.videoId) {
                    const iframe = document.createElement('iframe');
                    iframe.width = "100%"; iframe.height = "100%"; iframe.loading = "lazy";
                    iframe.src = 'https://www.youtube.com/embed/' + mem.videoId + '?autoplay=0&mute=1&controls=1&loop=1&playlist=' + mem.videoId + '&modestbranding=1&rel=0';
                    iframe.title = mem.title;
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                    iframe.allowFullscreen = true;
                    card.appendChild(iframe);
                } else if (mem.type === "image" && mem.image) {
                    const img = document.createElement('img');
                    img.src = mem.image; img.alt = mem.title; img.loading = "lazy";
                    img.onerror = function () { img.style.background = '#F3D6DE'; img.alt = '💗'; };
                    img.style.cursor = 'pointer';
                    img.addEventListener('click', function () { if (img.requestFullscreen) img.requestFullscreen(); });
                    card.appendChild(img);
                }
                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                overlay.innerHTML = '<div class="video-title">' + escapeHtml(mem.title) + '</div><div class="video-description">💬 ' + escapeHtml(mem.full) + '</div>';
                card.appendChild(overlay);
                container.appendChild(card);
            });
        }

        function updateNameEverywhere() {
            if (dynamicNameSpan) dynamicNameSpan.textContent = '✨ ' + girlfriendName + ' ✨';
            if (welcomeMsg) welcomeMsg.textContent = 'Welcome, ' + girlfriendName + ' ❤️ This world was made just for you.';
        }

        function renderNotesFromLocal() {
            const container = document.getElementById('notesList');
            if (!container) return;
            if (notesList.length === 0) {
                container.innerHTML = '<div class="notes-empty"><div class="empty-notes-icon">💌</div><p>No notes yet...</p><p class="notes-empty-sub">Write the first love note!</p></div>';
                return;
            }
            container.innerHTML = '';
            notesList.slice().sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); }).forEach(function (note) {
                const card = document.createElement('div');
                card.className = 'note-card';
                card.innerHTML = '<div class="note-body"><div class="note-text">' + escapeHtml(note.content) + '</div><div class="note-actions"><button class="action-btn delete-btn" data-id="' + escapeHtml(note.id) + '">🗑️</button></div></div><div class="note-meta"><span class="note-author">' + escapeHtml(note.author_name || 'Anonymous') + '</span><span class="note-time">' + timeAgo(note.created_at) + '</span></div>';
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
            const note = { id: Date.now().toString(), content: content, author_name: name, created_at: new Date().toISOString() };
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
            const m = Math.floor(s / 60); if (m < 60) return m + 'm ago';
            const h = Math.floor(m / 60); if (h < 24) return h + 'h ago';
            const d = Math.floor(h / 24); if (d < 7) return d + 'd ago';
            return date.toLocaleDateString();
        }
        function startCountdown(planId, targetDate, element, plan) {
            if (countdownIntervals.has(planId)) {
                const prev = countdownIntervals.get(planId);
                if (prev && prev.cancel) prev.cancel();
                countdownIntervals.delete(planId);
            }
            let lastUpdate = 0; let rafId;
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
                element.innerHTML = '<div class="countdown-display"><div class="countdown-unit"><span class="countdown-number">' + t.days + '</span><span class="countdown-label">Days</span></div><div class="countdown-unit"><span class="countdown-number">' + String(t.hours).padStart(2,'0') + '</span><span class="countdown-label">Hours</span></div><div class="countdown-unit"><span class="countdown-number">' + String(t.minutes).padStart(2,'0') + '</span><span class="countdown-label">Mins</span></div><div class="countdown-unit"><span class="countdown-number">' + String(t.seconds).padStart(2,'0') + '</span><span class="countdown-label">Secs</span></div></div>';
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
            futurePlans.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); }).forEach(function (plan) {
                const card = document.createElement('div');
                card.className = 'plan-card';
                card.dataset.planId = plan.id;
                const header = document.createElement('div');
                header.className = 'plan-header';
                header.innerHTML = '<h3 class="plan-title">' + escapeHtml(plan.title) + '</h3><span class="plan-author">' + escapeHtml(plan.author) + '</span>';
                const desc = document.createElement('div');
                desc.className = 'plan-description';
                desc.textContent = plan.description || 'No description';
                const countdownDiv = document.createElement('div');
                countdownDiv.className = 'plan-countdown';
                countdownDiv.id = 'countdown-' + plan.id;
                const footer = document.createElement('div');
                footer.className = 'plan-footer';
                const del = document.createElement('button');
                del.className = 'plan-delete-btn';
                del.textContent = '🗑️ Remove';
                del.addEventListener('click', function (e) { e.stopPropagation(); deletePlan(plan.id); });
                footer.appendChild(del);
                card.appendChild(header); card.appendChild(desc); card.appendChild(countdownDiv); card.appendChild(footer);
                if (emptyState) container.insertBefore(card, emptyState);
                else container.appendChild(card);
                startCountdown(plan.id, plan.date, countdownDiv, plan);
            });
        }
        async function addFuturePlan(title, description, date, author) {
            const plan = { id: Date.now().toString(), title: title, description: description, date: date, author: author, created_at: new Date().toISOString() };
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
                const min = now.getFullYear() + '-' + pad(now.getMonth()+1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes());
                dateInput.min = min; dateInput.value = min; dateInput.step = '60';
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

        // WHEEL
        const wheelCanvas = document.getElementById('wheelCanvas');
        const wheelCtx = wheelCanvas ? wheelCanvas.getContext('2d') : null;
        const spinBtn = document.getElementById('spinBtn');
        const spinAgainBtn = document.getElementById('spinAgainBtn');
        const wheelResult = document.getElementById('wheelResult');

        function drawWheel(rotationRad) {
            if (!wheelCtx || !wheelCanvas) return;
            const W = wheelCanvas.width;
            const H = wheelCanvas.height;
            const cx = W / 2, cy = H / 2;
            const radius = Math.min(W, H) / 2 - 12;
            wheelCtx.clearRect(0, 0, W, H);
            wheelCtx.beginPath();
            wheelCtx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
            const outerGrad = wheelCtx.createLinearGradient(0, 0, W, H);
            outerGrad.addColorStop(0, '#D4AF6A');
            outerGrad.addColorStop(0.5, '#8B1E3F');
            outerGrad.addColorStop(1, '#D4AF6A');
            wheelCtx.fillStyle = outerGrad;
            wheelCtx.fill();
            const sliceAngle = (Math.PI * 2) / WHEEL_SLICES.length;
            const offset = rotationRad - Math.PI / 2 - sliceAngle / 2;
            WHEEL_SLICES.forEach(function (slice, i) {
                const start = offset + i * sliceAngle;
                const end = start + sliceAngle;
                wheelCtx.beginPath();
                wheelCtx.moveTo(cx, cy);
                wheelCtx.arc(cx, cy, radius, start, end);
                wheelCtx.closePath();
                wheelCtx.fillStyle = slice.fill;
                wheelCtx.fill();
                wheelCtx.lineWidth = 2;
                wheelCtx.strokeStyle = 'rgba(255,253,249,0.6)';
                wheelCtx.stroke();
                wheelCtx.save();
                wheelCtx.translate(cx, cy);
                wheelCtx.rotate(start + sliceAngle / 2);
                wheelCtx.textAlign = 'right';
                wheelCtx.textBaseline = 'middle';
                wheelCtx.fillStyle = slice.text;
                wheelCtx.font = 'bold 26px "Segoe UI Emoji","Apple Color Emoji",sans-serif';
                wheelCtx.fillText(slice.emoji, radius - 32, 0);
                wheelCtx.font = 'bold 15px "Segoe UI", Quicksand, sans-serif';
                wheelCtx.fillText(slice.label, radius - 74, 0);
                wheelCtx.restore();
            });
            wheelCtx.beginPath();
            wheelCtx.arc(cx, cy, radius * 0.30, 0, Math.PI * 2);
            wheelCtx.fillStyle = '#FFFDF9';
            wheelCtx.fill();
            wheelCtx.lineWidth = 4;
            wheelCtx.strokeStyle = '#D4AF6A';
            wheelCtx.stroke();
        }
        function initWheel() {
            if (!wheelCanvas) return;
            requestAnimationFrame(function () {
                const rect = wheelCanvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                const size = Math.min(rect.width, rect.height) || 460;
                wheelCanvas.width = size * dpr;
                wheelCanvas.height = size * dpr;
                if (wheelCtx) wheelCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
                drawWheel(wheelRotation);
                if (wheelResult) wheelResult.classList.add('hidden');
                if (spinBtn) { spinBtn.disabled = false; wheelSpinning = false; }
            });
        }
        function spinWheel() {
            if (!wheelCanvas || !wheelCtx || wheelSpinning) return;
            wheelSpinning = true;
            if (spinBtn) spinBtn.disabled = true;
            if (wheelResult) wheelResult.classList.add('hidden');
            const sliceCount = WHEEL_SLICES.length;
            const sliceAngle = (Math.PI * 2) / sliceCount;
            const winningIndex = Math.floor(Math.random() * sliceCount);
            const targetAngle = (Math.PI * 2) * 6 + (Math.PI * 2 - winningIndex * sliceAngle);
            const startAngle = wheelRotation % (Math.PI * 2);
            const startTime = performance.now();
            const duration = 5200;
            function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
            function frame(now) {
                const elapsed = now - startTime;
                const t = Math.min(1, elapsed / duration);
                const eased = easeOutCubic(t);
                const current = startAngle + (targetAngle - startAngle) * eased;
                wheelRotation = current;
                drawWheel(current);
                if (t < 1) requestAnimationFrame(frame);
                else { wheelRotation = current % (Math.PI * 2); finishSpin(winningIndex); }
            }
            requestAnimationFrame(frame);
        }
        function finishSpin(winningIndex) {
            const slice = WHEEL_SLICES[winningIndex];
            burstHearts(wheelCanvas, 24);
            showWheelResult(slice);
            wheelSpinning = false;
            if (spinBtn) spinBtn.disabled = false;
        }
        function showWheelResult(slice) {
            if (!wheelResult) return;
            const titleEl = document.getElementById('resultTitle');
            const bodyEl = document.getElementById('resultBody');
            const kissesEl = document.getElementById('resultKisses');
            if (kissesEl) kissesEl.innerHTML = '';
            let titleText = '', bodyText = '';
            switch (slice.key) {
                case 'kiss':
                    titleText = '💋 KISS';
                    bodyText = 'You just received kisses from me! 😘\n\n"Save these until I can give you the real ones." ❤️';
                    if (kissesEl) for (let i = 0; i < 5; i++) { const s = document.createElement('span'); s.textContent = '😘'; kissesEl.appendChild(s); }
                    break;
                case 'compli':
                    titleText = '🥰 COMPLIMENT';
                    bodyText = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
                    break;
                case 'joke':
                    titleText = '😂 JOKE';
                    bodyText = JOKES[Math.floor(Math.random() * JOKES.length)];
                    break;
                case 'letter':
                    titleText = '💌 LOVE LETTER';
                    bodyText = LOVE_LETTERS[Math.floor(Math.random() * LOVE_LETTERS.length)];
                    break;
                case 'memory': {
                    titleText = '📸 MEMORY';
                    const m = memories[Math.floor(Math.random() * memories.length)];
                    bodyText = (m ? m.title + '\n\n' + m.full : 'A little memory of us ❤️');
                    break;
                }
                case 'iloveyou':
                    titleText = '❤️ I LOVE YOU';
                    bodyText = 'Three words will never be enough to explain how much you mean to me.';
                    if (kissesEl) {
                        const big = document.createElement('div');
                        big.className = 'result-heart-big';
                        big.textContent = '❤️';
                        kissesEl.appendChild(big);
                    }
                    break;
                case 'surprise': {
                    const pick = SURPRISE_POOL[Math.floor(Math.random() * SURPRISE_POOL.length)];
                    titleText = '🎁 SURPRISE — ' + pick.toUpperCase();
                    switch (pick) {
                        case 'kiss':
                            bodyText = 'A surprise kiss just for you! 😘\n\n"Save these until I can give you the real ones." ❤️';
                            if (kissesEl) for (let i = 0; i < 5; i++) { const s = document.createElement('span'); s.textContent = '😘'; kissesEl.appendChild(s); }
                            break;
                        case 'letter': bodyText = LOVE_LETTERS[Math.floor(Math.random() * LOVE_LETTERS.length)]; break;
                        case 'memory': {
                            const m = memories[Math.floor(Math.random() * memories.length)];
                            bodyText = (m ? m.title + '\n\n' + m.full : 'A little memory of us ❤️');
                            break;
                        }
                        case 'iloveyou':
                            bodyText = 'I LOVE YOU. More than yesterday, less than tomorrow. ❤️';
                            if (kissesEl) {
                                const big = document.createElement('div');
                                big.className = 'result-heart-big';
                                big.textContent = '❤️';
                                kissesEl.appendChild(big);
                            }
                            break;
                        case 'compli':
                        default: bodyText = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
                    }
                }
            }
            if (titleEl) titleEl.textContent = titleText;
            if (bodyEl) bodyEl.textContent = bodyText;
            wheelResult.classList.remove('hidden');
            setTimeout(function () {
                if (wheelResult && wheelResult.scrollIntoView) {
                    wheelResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 150);
        }
        if (spinBtn) spinBtn.addEventListener('click', spinWheel);
        if (spinAgainBtn) {
            spinAgainBtn.addEventListener('click', function () {
                if (wheelResult) wheelResult.classList.add('hidden');
                setTimeout(spinWheel, 120);
            });
        }
        let wheelResizeTimer = null;
        window.addEventListener('resize', function () {
            if (wheelResizeTimer) clearTimeout(wheelResizeTimer);
            wheelResizeTimer = setTimeout(function () {
                if (currentScreen === 'wheel') initWheel();
            }, 200);
        });

        // ============================================================
        // LOVE EXPERIENCE
        // ============================================================
        const REASONS = [
            "Because you make me smile.", "Because you make ordinary days special.",
            "Because I feel lucky to have you.", "Because you love me the way I am.",
            "Because your laugh is my favorite sound.", "Because you care about the little things.",
            "Because you're brave when it's hard.", "Because you make me want to be better.",
            "Because your hugs feel like home.", "Because you listen to me.",
            "Because you remember what matters to me.", "Because you look beautiful even when you don't try.",
            "Because you're kind to everyone.", "Because you're honest with me.",
            "Because you forgive me when I mess up.", "Because you make me laugh when I'm stressed.",
            "Because you believe in us.", "Because you're my best friend.",
            "Because you understand my silences.", "Because you cheer for my dreams.",
            "Because you make time for me.", "Because you choose me, again and again.",
            "Because you're patient with me.", "Because you know how to comfort me.",
            "Because you bring out the best in me.", "Because you're my safe place.",
            "Because you're the first person I want to tell things to.", "Because you make me feel seen.",
            "Because you never give up on us.", "Because you love me on my worst days too.",
            "Because you're gentle with my heart.", "Because you're strong when I'm not.",
            "Because you accept all of me.", "Because you still get shy around me sometimes.",
            "Because you send me things that remind you of me.", "Because you talk about our future like it's certain.",
            "Because you miss me the way I miss you.", "Because you're proud of me.",
            "Because you make me feel chosen.", "Because you kiss me like it still matters.",
            "Because you cry when you're happy.", "Because you make me feel safe to be soft.",
            "Because you remember our small dates.", "Because you still get excited to see me.",
            "Because you make even boring days fun.", "Because you make me want to try harder.",
            "Because you're the calm in my chaos.", "Because you make my heart skip a beat.",
            "Because you smell like home.", "Because you're the person I want at the end of every day.",
            "Because you love the same songs with me.", "Because you make me believe in forever.",
            "Because you never let me go to sleep upset.", "Because you check on me.",
            "Because you say my name in a way nobody else does.", "Because you support every crazy idea I have.",
            "Because you trust me.", "Because you make time slow down.",
            "Because you look at me like I matter.", "Because you save me the last bite.",
            "Because you remember what I like.", "Because you hold my hand in public.",
            "Because you text me good morning.", "Because you text me goodnight.",
            "Because you make me feel young.", "Because you make me feel grown up.",
            "Because you make me feel everything.", "Because you keep my secrets.",
            "Because you're my number one person.", "Because you make me feel like I belong.",
            "Because you're the woman I brag about.", "Because you make me want to come home.",
            "Because you love me even when I'm difficult.", "Because you know when to hug me.",
            "Because you know when to leave me alone.", "Because you make the hard days softer.",
            "Because you call me just to hear my voice.", "Because you laugh at my bad jokes.",
            "Because you're honest about what hurts.", "Because you protect what we have.",
            "Because you still flirt with me.", "Because you forgive me faster than I deserve.",
            "Because you make me feel enough.", "Because you make me want to grow old with you.",
            "Because you sing in the car.", "Because you dance when you think nobody's watching.",
            "Because you love me loudly.", "Because you love me quietly too.",
            "Because you never stopped being my favorite person.", "Because you're home.",
            "Because you're her.", "Because you're you.",
            "Because you're mine.", "Because we're us.",
            "Because 28 December 2017 was the best day of my life.", "Because every day since then has been a gift.",
            "Because I still love you the way I did at the beginning.", "Because I always will.",
            "Because I can't imagine my life without you.", "Because you're my forever.",
            "Because I love you. Simple. Always."
        ];

        const MOON_PHASES = [
            { icon: '🌕', msg: 'You are my light.' },
            { icon: '🌖', msg: "Even when you can't see me, my love is still there." },
            { icon: '🌗', msg: "Distance means nothing to a heart that's sure." },
            { icon: '🌘', msg: 'Every night I think of you before I sleep.' },
            { icon: '🌑', msg: "Even in my darkest moments, you're the light I reach for." },
            { icon: '🌒', msg: 'You make me want to be the best version of myself.' },
            { icon: '🌓', msg: 'Half of me is you.' },
            { icon: '🌔', msg: 'I love you more than the moon loves the sky.' }
        ];

        const GIFT_SURPRISES = [
            { title: '💌 Love Letter', body: 'My love,\n\nEvery day with you feels like a gift I did not earn. Thank you for being mine. — Forever yours ❤️' },
            { title: '🌹 Romantic Message', body: 'You are the softest, warmest, most beautiful part of my life. 🌹' },
            { title: '💋 Kiss Message', body: 'Save this kiss until I can give you the real one. 😘' },
            { title: '🥰 Compliment', body: "You are stunning in ways you don't even notice. And I notice every single one." },
            { title: '😂 Cute Joke', body: 'Are you a magician? Because whenever I look at you, everyone else disappears. ✨' },
            { title: '📸 Memory', body: 'Remember 28 December 2017? The day everything changed for me. I still smile thinking about it.' },
            { title: '💍 Future Message', body: "One day, our story will be a home, not a promise. And I can't wait. 💍" },
            { title: '❤️ I Love You', body: "I love you. Not because it's easy. Because it's you. Always you. ❤️" }
        ];
        let lastGiftIdx = -1;

        function initExperience() {
            if (experienceInited) return;
            experienceInited = true;

            document.querySelectorAll('.exp-chip').forEach(function (chip) {
                chip.addEventListener('click', function () {
                    document.querySelectorAll('.exp-chip').forEach(function (c) { c.classList.remove('active'); });
                    document.querySelectorAll('.exp-panel').forEach(function (p) { p.classList.remove('active'); });
                    this.classList.add('active');
                    const key = this.dataset.exp;
                    const panel = document.querySelector('.exp-panel[data-panel="' + key + '"]');
                    if (panel) panel.classList.add('active');
                    if (key === 'garden') updateGarden();
                });
            });

            const rose = document.getElementById('roseClickable');
            const roseMsg = document.getElementById('roseMessage');
            const roseHint = document.getElementById('roseHint');
            if (rose) rose.addEventListener('click', function () {
                rose.classList.add('open');
                if (roseHint) roseHint.textContent = 'It bloomed for you 🌹';
                setTimeout(function () { if (roseMsg) roseMsg.classList.add('show'); }, 900);
                burstHearts(rose, 14);
                markVisit('rose');
            });

            const hbHeart = document.getElementById('heartbeatHeart');
            const hbReveal = document.getElementById('heartbeatReveal');
            if (hbHeart) hbHeart.addEventListener('click', function () {
                hbHeart.classList.add('fast');
                setTimeout(function () {
                    if (hbReveal) hbReveal.classList.add('show');
                    hbHeart.classList.remove('fast');
                }, 3000);
                burstHearts(hbHeart, 10);
                markVisit('heartbeat');
            });

            const starA = document.getElementById('starA');
            const starB = document.getElementById('starB');
            const msgA = document.getElementById('universeMsgA');
            const msgB = document.getElementById('universeMsgB');
            const finalMsg = document.getElementById('universeFinal');
            const connectLine = document.getElementById('connectLine');
            let universeA = false, universeB = false;
            function checkUniverse() {
                if (universeA && universeB) {
                    if (connectLine) connectLine.setAttribute('d', 'M 90 100 Q 200 40 310 130');
                    if (finalMsg) finalMsg.classList.add('show');
                    const st = document.getElementById('universeStage');
                    if (st) burstHearts(st, 18);
                    markVisit('universe');
                }
            }
            if (starA) starA.addEventListener('click', function () { universeA = true; if (msgA) msgA.classList.add('show'); checkUniverse(); });
            if (starB) starB.addEventListener('click', function () { universeB = true; if (msgB) msgB.classList.add('show'); checkUniverse(); });

            const giftBox = document.getElementById('giftBox');
            const giftResultTitle = document.getElementById('giftResultTitle');
            const giftResultBody = document.getElementById('giftResultBody');
            const openAnotherGiftBtn = document.getElementById('openAnotherGiftBtn');
            const giftHint = document.getElementById('giftHint');
            const giftLight = document.getElementById('giftLight');
            function openGift() {
                if (!giftBox) return;
                giftBox.classList.add('open');
                if (giftLight) { giftLight.classList.remove('show'); void giftLight.offsetWidth; giftLight.classList.add('show'); }
                burstHearts(giftBox, 16);
                if (giftHint) giftHint.textContent = 'Your gift opened 🎁';
                let idx;
                do { idx = Math.floor(Math.random() * GIFT_SURPRISES.length); }
                while (idx === lastGiftIdx && GIFT_SURPRISES.length > 1);
                lastGiftIdx = idx;
                const pick = GIFT_SURPRISES[idx];
                if (giftResultTitle) giftResultTitle.textContent = pick.title;
                if (giftResultBody) giftResultBody.textContent = pick.body;
                if (openAnotherGiftBtn) openAnotherGiftBtn.classList.remove('hidden');
                markVisit('gift');
            }
            if (giftBox) giftBox.addEventListener('click', openGift);
            if (openAnotherGiftBtn) openAnotherGiftBtn.addEventListener('click', function () {
                giftBox.classList.remove('open');
                if (giftResultTitle) giftResultTitle.textContent = '';
                if (giftResultBody) giftResultBody.textContent = '';
                openAnotherGiftBtn.classList.add('hidden');
                setTimeout(openGift, 300);
            });

            const reasonsHeart = document.getElementById('reasonsHeart');
            const reasonsCounter = document.getElementById('reasonsCounter');
            const reasonsText = document.getElementById('reasonsText');
            const reasonsFinal = document.getElementById('reasonsFinal');
            const resetReasonsBtn = document.getElementById('resetReasonsBtn');
            let reasonsIdx = 0;
            function updateReasons() {
                if (reasonsIdx >= REASONS.length) return;
                if (reasonsCounter) reasonsCounter.textContent = (reasonsIdx + 1) + ' / ' + REASONS.length;
                if (reasonsText) {
                    reasonsText.style.opacity = 0;
                    setTimeout(function () {
                        reasonsText.textContent = REASONS[reasonsIdx];
                        reasonsText.style.opacity = 1;
                    }, 180);
                }
                reasonsIdx++;
                if (reasonsIdx === REASONS.length) {
                    if (reasonsFinal) reasonsFinal.classList.remove('hidden');
                    burstHearts(reasonsHeart, 30);
                    markVisit('reasons');
                }
            }
            if (reasonsHeart) reasonsHeart.addEventListener('click', function () {
                if (reasonsIdx >= REASONS.length) return;
                updateReasons();
            });
            if (resetReasonsBtn) resetReasonsBtn.addEventListener('click', function () {
                reasonsIdx = 0;
                if (reasonsFinal) reasonsFinal.classList.add('hidden');
                if (reasonsText) reasonsText.textContent = REASONS[0];
                if (reasonsCounter) reasonsCounter.textContent = '1 / ' + REASONS.length;
                reasonsIdx = 1;
            });

            const bubblesStage = document.getElementById('bubblesStage');
            const bubbleModal = document.getElementById('bubbleModal');
            const bubbleClose = document.getElementById('bubbleClose');
            const bubbleImg = document.getElementById('bubbleImg');
            const bubbleDate = document.getElementById('bubbleDate');
            const bubbleCaption = document.getElementById('bubbleCaption');
            if (bubblesStage) {
                bubblesStage.innerHTML = '';
                memories.forEach(function (mem) {
                    const b = document.createElement('div');
                    b.className = 'bubble';
                    if (mem.type === 'image' && mem.image) {
                        const img = document.createElement('img');
                        img.src = mem.image; img.alt = mem.title; img.loading = 'lazy';
                        img.onerror = function () { img.style.background = 'linear-gradient(135deg,#F3D6DE,#E8A0B8)'; };
                        b.appendChild(img);
                    } else {
                        const ph = document.createElement('div');
                        ph.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.4rem;background:linear-gradient(135deg,#F3D6DE,#E8A0B8);';
                        ph.textContent = '📸';
                        b.appendChild(ph);
                    }
                    const cap = document.createElement('div');
                    cap.className = 'bubble-caption-small';
                    cap.textContent = mem.title;
                    b.appendChild(cap);
                    b.addEventListener('click', function () {
                        if (bubbleModal) bubbleModal.classList.remove('hidden');
                        if (bubbleImg) bubbleImg.src = mem.image || '';
                        if (bubbleDate) bubbleDate.textContent = mem.title;
                        if (bubbleCaption) bubbleCaption.textContent = mem.full;
                        markVisit('bubbles');
                    });
                    bubblesStage.appendChild(b);
                });
            }
            if (bubbleClose) bubbleClose.addEventListener('click', function () {
                if (bubbleModal) bubbleModal.classList.add('hidden');
            });

            const rainStage = document.getElementById('rainStage');
            const rainDrops = document.getElementById('rainDrops');
            const rainStars = document.getElementById('rainStars');
            const rainLine2 = document.getElementById('rainLine2');
            const rainTrigger = document.getElementById('rainTrigger');
            let rainStarted = false;
            if (rainDrops) {
                rainDrops.innerHTML = '';
                for (let i = 0; i < 40; i++) {
                    const d = document.createElement('div');
                    d.className = 'raindrop';
                    d.style.left = Math.random() * 100 + '%';
                    d.style.animationDuration = (0.6 + Math.random() * 0.8) + 's';
                    d.style.animationDelay = (Math.random() * 2) + 's';
                    rainDrops.appendChild(d);
                }
            }
            if (rainTrigger) rainTrigger.addEventListener('click', function () {
                if (rainStarted) return;
                rainStarted = true;
                if (rainDrops) { rainDrops.style.transition = 'opacity 2s ease'; rainDrops.style.opacity = '0'; }
                if (rainStage) rainStage.classList.add('cleared');
                if (rainStars) rainStars.classList.remove('hidden');
                setTimeout(function () { if (rainStars) rainStars.classList.add('show'); }, 400);
                setTimeout(function () { if (rainLine2) rainLine2.classList.remove('hidden'); }, 1400);
                burstHearts(rainStage, 16);
                markVisit('rain');
            });

            const candle = document.getElementById('candleClickable');
            const candleLetter = document.getElementById('candleLetter');
            const closeCandleLetter = document.getElementById('closeCandleLetter');
            const candleHint = document.getElementById('candleHint');
            if (candle) candle.addEventListener('click', function () {
                candle.classList.add('bright');
                if (candleLetter) candleLetter.classList.remove('hidden');
                if (candleHint) candleHint.textContent = 'Read slowly, my love ❤️';
                burstHearts(candle, 12);
                markVisit('candle');
            });
            if (closeCandleLetter) closeCandleLetter.addEventListener('click', function () {
                if (candleLetter) candleLetter.classList.add('hidden');
                if (candle) candle.classList.remove('bright');
                if (candleHint) candleHint.textContent = 'Tap the candle 🕯️';
            });

            const moon = document.getElementById('moonClickable');
            const moonMsg = document.getElementById('moonMsg');
            let moonIdx = 0;
            if (moon) moon.addEventListener('click', function () {
                const phase = MOON_PHASES[moonIdx % MOON_PHASES.length];
                moon.textContent = phase.icon;
                if (moonMsg) moonMsg.textContent = phase.msg;
                moonIdx++;
                burstHearts(moon, 8);
                markVisit('moon');
            });

            // 👑 QUEEN → FUTURE ROOM
            const queenEnterBtn = document.getElementById('queenEnterBtn');
            if (queenEnterBtn) queenEnterBtn.addEventListener('click', function () {
                markVisit('queen');
                showScreen('futureRoom');
            });

            updateGarden();

            const finalHeart = document.getElementById('finalHeart');
            const finalLetter = document.getElementById('finalLetter');
            const finalHint = document.getElementById('finalHint');
            const finalConfetti = document.getElementById('finalConfetti');
            if (finalHeart) finalHeart.addEventListener('click', function () {
                if (finalLetter) finalLetter.classList.remove('hidden');
                if (finalHint) finalHint.textContent = 'With all my heart ❤️';
                if (finalConfetti) {
                    finalConfetti.innerHTML = '';
                    for (let i = 0; i < 30; i++) {
                        const c = document.createElement('div');
                        c.textContent = ['❤️','💗','💕','✨','💖'][Math.floor(Math.random()*5)];
                        c.style.position = 'absolute';
                        c.style.left = Math.random() * 100 + '%';
                        c.style.top = (Math.random() * 60) + '%';
                        c.style.fontSize = (0.9 + Math.random() * 1) + 'rem';
                        c.style.animation = 'celebrateFloat 3s ease-out forwards';
                        c.style.animationDelay = (Math.random() * 0.6) + 's';
                        c.style.pointerEvents = 'none';
                        finalConfetti.appendChild(c);
                    }
                }
                burstHearts(finalHeart, 24);
                markVisit('final');
            });
        }

        // ============================================================
        // OUR FUTURE ROOM
        // ============================================================
        let doorWrap, doorEl, doorHint, roomWrap, doorOpened, doorBusy;

        function initFutureRoom() {
            if (futureRoomInited) return;
            futureRoomInited = true;

            doorWrap = document.getElementById('frDoorWrap');
            doorEl = document.getElementById('frDoor');
            doorHint = document.getElementById('frDoorHint');
            const skipBtn = document.getElementById('frSkipBtn');
            roomWrap = document.getElementById('frRoomWrap');
            const roomEl = document.getElementById('frRoom');
            const frWindow = document.getElementById('frWindow');
            const frRing = document.getElementById('frRing');
            const msgCard = document.getElementById('frMessageCard');
            const msgText = document.getElementById('frMessageText');
            const msgClose = document.getElementById('frMessageClose');

            doorOpened = false;
            doorBusy = false;

            function openDoor() {
                if (doorOpened || doorBusy || !doorEl) return;
                doorBusy = true;
                doorEl.classList.add('unlocking');
                if (doorHint) doorHint.textContent = 'Unlocking… 🔑';
                setTimeout(function () {
                    doorEl.classList.add('open');
                    burstHearts(doorEl, 16);
                    if (doorHint) doorHint.textContent = 'Welcome home, my love ❤️';
                }, 900);
                setTimeout(function () {
                    if (doorWrap) doorWrap.style.display = 'none';
                    if (roomWrap) roomWrap.classList.remove('hidden');
                    doorOpened = true;
                    doorBusy = false;
                }, 3400);
            }
            if (doorEl) doorEl.addEventListener('click', openDoor);
            if (skipBtn) skipBtn.addEventListener('click', function () {
                if (doorWrap) doorWrap.style.display = 'none';
                if (roomWrap) roomWrap.classList.remove('hidden');
                doorOpened = true;
            });

            function showRoomMessage(text) {
                if (msgText) msgText.textContent = text;
                if (msgCard) msgCard.classList.remove('hidden');
            }
            function closeRoomMessage() { if (msgCard) msgCard.classList.add('hidden'); }
            if (msgClose) msgClose.addEventListener('click', closeRoomMessage);
            if (msgCard) msgCard.addEventListener('click', function (e) {
                if (e.target === msgCard) closeRoomMessage();
            });

            const ROOM_MESSAGES = {
                living:  "I imagine us laughing together over the smallest things. ❤️",
                kitchen: "I want the ordinary moments with you — cooking, eating, talking, and laughing. ❤️",
                bedroom: "Ending every day beside you and starting every morning with you. ❤️",
                garden:  "A peaceful little place where we can make memories together. ❤️",
                memory:  "One day we'll look back at all our memories and realize how far we've come. ❤️"
            };

            document.querySelectorAll('.fr-area').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const key = this.dataset.area;
                    const msg = ROOM_MESSAGES[key] || 'A little piece of our future ❤️';
                    showRoomMessage(msg);
                    burstHearts(this, 8);
                });
            });

            if (frRing) frRing.addEventListener('click', function () {
                showRoomMessage("I don't know everything our future will bring…\n\nBut I know who I want beside me while we discover it. ❤️");
                burstHearts(frRing, 12);
            });

            if (frWindow) frWindow.addEventListener('click', function () {
                if (!roomEl) return;
                const already = roomEl.classList.contains('sunrise');
                roomEl.classList.toggle('sunrise');
                if (!already) {
                    setTimeout(function () {
                        showRoomMessage("There are still so many beautiful chapters waiting for us.\n\nAnd I want to experience them with you. ❤️");
                    }, 3200);
                    burstHearts(frWindow, 14);
                }
            });

            const backKingdomBtn = document.getElementById('backToKingdomBtn');
            if (backKingdomBtn) backKingdomBtn.addEventListener('click', function () {
                // Reset door for next visit
                if (doorWrap) doorWrap.style.display = '';
                if (roomWrap) roomWrap.classList.add('hidden');
                if (doorEl) doorEl.classList.remove('open', 'unlocking');
                if (doorHint) doorHint.textContent = 'Tap the door to unlock our future 🔑';
                doorOpened = false;
                doorBusy = false;

                showScreen('experience');
                document.querySelectorAll('.exp-chip').forEach(function (c) { c.classList.remove('active'); });
                document.querySelectorAll('.exp-panel').forEach(function (p) { p.classList.remove('active'); });
                const queenChip = document.querySelector('.exp-chip[data-exp="queen"]');
                const queenPanel = document.querySelector('.exp-panel[data-panel="queen"]');
                if (queenChip) queenChip.classList.add('active');
                if (queenPanel) queenPanel.classList.add('active');
            });

            const nextBtn = document.getElementById('frNextChapterBtn');
            if (nextBtn) nextBtn.addEventListener('click', function () {
                // Reset door for next visit
                if (doorWrap) doorWrap.style.display = '';
                if (roomWrap) roomWrap.classList.add('hidden');
                if (doorEl) doorEl.classList.remove('open', 'unlocking');
                if (doorHint) doorHint.textContent = 'Tap the door to unlock our future 🔑';
                doorOpened = false;
                doorBusy = false;

                showScreen('experience');
                document.querySelectorAll('.exp-chip').forEach(function (c) { c.classList.remove('active'); });
                document.querySelectorAll('.exp-panel').forEach(function (p) { p.classList.remove('active'); });
                const chip = document.querySelector('.exp-chip[data-exp="final"]');
                const panel = document.querySelector('.exp-panel[data-panel="final"]');
                if (chip) chip.classList.add('active');
                if (panel) panel.classList.add('active');
            });
        }

        // EVENT LISTENERS
        const startStoryBtn = document.getElementById('startStoryBtn');
        if (startStoryBtn) startStoryBtn.addEventListener('click', function () { showScreen('story'); });

        const goMiniGameBtn = document.getElementById('goMiniGameBtn');
        if (goMiniGameBtn) goMiniGameBtn.addEventListener('click', function () { showScreen('mini'); });

        const goExperienceBtn = document.getElementById('goExperienceBtn');
        if (goExperienceBtn) goExperienceBtn.addEventListener('click', function () { showScreen('experience'); });

        const goGalleryBtn = document.getElementById('goGalleryBtn');
        if (goGalleryBtn) goGalleryBtn.addEventListener('click', function () { showScreen('gallery'); });

        const goWheelBtn = document.getElementById('goWheelBtn');
        if (goWheelBtn) goWheelBtn.addEventListener('click', function () { showScreen('wheel'); });

        const goFutureBtn = document.getElementById('goFutureBtn');
        if (goFutureBtn) goFutureBtn.addEventListener('click', function () { showScreen('future'); });

        const goNotesBtn = document.getElementById('goNotesBtn');
        if (goNotesBtn) goNotesBtn.addEventListener('click', function () {
            showScreen('notes'); renderNotesFromLocal();
        });

        // Generic back buttons (skip the ones with own handlers)
        document.querySelectorAll('[id^="backFrom"]').forEach(function (b) {
            if (b.id === 'backFromStoryBottom' ||
                b.id === 'backFromExperienceTop' ||
                b.id === 'backFromExperienceBottom') return;
            b.addEventListener('click', function () { stopMiniGame(); showScreen('home'); });
        });

        const backFromExperienceTop = document.getElementById('backFromExperienceTop');
        if (backFromExperienceTop) backFromExperienceTop.addEventListener('click', function () {
            showScreen('home');
        });

        const backFromExperienceBottom = document.getElementById('backFromExperienceBottom');
        if (backFromExperienceBottom) backFromExperienceBottom.addEventListener('click', function () {
            showScreen('home');
        });

        const backFromStoryBottom = document.getElementById('backFromStoryBottom');
        if (backFromStoryBottom) backFromStoryBottom.addEventListener('click', function () {
            if (typingInterval) clearInterval(typingInterval);
            showScreen('home');
        });

        const closeLetterBtn = document.getElementById('closeLetterBtn');
        if (closeLetterBtn) closeLetterBtn.addEventListener('click', function () {
            if (typingInterval) clearInterval(typingInterval);
            renderLettersGrid();
        });

        const missMeBtn = document.getElementById('missMeBtn');
        if (missMeBtn) missMeBtn.addEventListener('click', function () {
            const msgs = [
                'I miss you every second, ' + girlfriendName + ' ❤️',
                "Can't wait to see you again! 💕",
                "You're always on my mind 🌙"
            ];
            showPopup(msgs[Math.floor(Math.random() * msgs.length)]);
        });

        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) whatsappBtn.addEventListener('click', function () {
            const text = encodeURIComponent('Hey! I just played your Love Quest game! ❤️ - ' + girlfriendName);
            window.open('https://wa.me/' + whatsappNumber + '?text=' + text, '_blank');
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

        initFuturePlanner();

        setTimeout(function () {
            if (currentScreen === 'home')
                showPopup('Hey ' + girlfriendName + '… I just wanted to remind you I love you ❤️');
        }, 1500);
    }

    // PARTICLES
    const pCanvas = document.getElementById('heart-particle-canvas');
    if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        let particles = [];
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let rafId = null;
        let running = true;

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
                speed: 0.2 + Math.random() * 0.6
            });
        }
        function draw() {
            if (!running) return;
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            pCtx.font = '20px "Segoe UI Emoji"';
            pCtx.fillStyle = 'rgba(255,200,220,0.55)';
            particles.forEach(function (p) {
                p.y -= p.speed;
                if (p.y < -30) { p.y = pCanvas.height + 20; p.x = Math.random() * pCanvas.width; }
                pCtx.fillText('❤️', p.x, p.y);
            });
            rafId = requestAnimationFrame(draw);
        }
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                running = false;
                if (rafId) cancelAnimationFrame(rafId);
            } else if (!running) {
                running = true;
                rafId = requestAnimationFrame(draw);
            }
        });
        rafId = requestAnimationFrame(draw);
    }

    // FLOATING RINGS
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

    // CINEMATIC INTRO
    function runIntro() {
        const intro = document.getElementById('introOverlay');
        const skip = document.getElementById('skipIntroBtn');
        if (!intro) return;
        let introDone = false;
        function endIntro() {
            if (introDone) return;
            introDone = true;
            intro.classList.add('hidden');
            setTimeout(function () { if (intro && intro.parentNode) intro.style.display = 'none'; }, 1200);
        }
        if (skip) skip.addEventListener('click', endIntro);
        setTimeout(endIntro, 9500);
    }

    document.addEventListener('DOMContentLoaded', function () {
        runIntro();
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.addEventListener('click', attemptLogin);
        const pwd = document.getElementById('passwordInput');
        if (pwd) pwd.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') attemptLogin();
        });
        checkUser();
    });
})();
