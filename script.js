// Valentine Page — Personalized for Snehal
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const content = document.getElementById('content');
const successMessage = document.getElementById('successMessage');
const heartsContainer = document.getElementById('hearts');
const statusValue = document.getElementById('statusValue');
const entranceText = document.getElementById('entranceText');
const proposalContent = document.getElementById('proposalContent');
const typewriterEl = document.getElementById('typewriter');
const duckImage = document.getElementById('duckImage');
const personalMessage = document.getElementById('personalMessage');

let noBtnClickCount = 0;
let resetTimer;

// ============================================================
// Duck State GIFs — reactive images based on user interaction
// ============================================================
const defaultImageSrc = 'images/cute-ducks-in-love.svg';

const duckStates = {
    // Sad crying duck
    sad: 'images/duck-sad.gif',
    // Angry duck
    mad: 'images/duck-angry.gif',
    // Shocked/Questioning duck
    shocked: 'images/duck-shocked.gif',
    // Happy dancing duck
    happy: 'images/duck-happy.gif'
};

// Preload images so transitions are instant
function preloadImages() {
    Object.values(duckStates).forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

function setDuckState(state) {
    if (!duckImage) return;

    // ... (rest of function) ...

    // Change image source
    if (state === 'default') {
        duckImage.src = defaultImageSrc;
    } else if (duckStates[state]) {
        duckImage.src = duckStates[state];
    }

    // Reset animation classes
    duckImage.className = 'duck-image';

    // Add state-specific animation
    if (state === 'mad') duckImage.classList.add('shake-anim');
    if (state === 'sad') duckImage.classList.add('sad-anim');
    if (state === 'happy') duckImage.classList.add('dance-anim');
}

// ============================================================
// Typewriter entrance sequence
// ============================================================
const messages = [
    "Hey Snehal... 💕",
    "I have something really important to ask you...",
    "Something I've been thinking about for a while now... 🦆",
    "Are you ready? 👀"
];

let msgIndex = 0;
let charIndex = 0;
let currentText = '';

function typeWriter() {
    if (msgIndex < messages.length) {
        const msg = messages[msgIndex];
        if (charIndex < msg.length) {
            currentText += msg.charAt(charIndex);
            typewriterEl.textContent = currentText;
            charIndex++;
            setTimeout(typeWriter, 45);
        } else {
            // Pause between messages
            setTimeout(() => {
                currentText = '';
                charIndex = 0;
                msgIndex++;
                if (msgIndex < messages.length) {
                    typewriterEl.classList.add('text-fade');
                    setTimeout(() => {
                        typewriterEl.textContent = '';
                        typewriterEl.classList.remove('text-fade');
                        typeWriter();
                    }, 400);
                } else {
                    // Done! Show the proposal
                    setTimeout(() => {
                        entranceText.classList.add('entrance-hide');
                        setTimeout(() => {
                            entranceText.style.display = 'none';
                            proposalContent.style.display = 'block';
                            proposalContent.classList.add('proposal-reveal');
                        }, 500);
                    }, 800);
                }
            }, 1200);
        }
    }
}

// Start on load
window.addEventListener('load', () => {
    preloadImages();
    setTimeout(typeWriter, 800);
    createFallingHearts();
    setInterval(createFallingHearts, 10000);
});

// ============================================================
// "Yes" button — celebration!
// ============================================================
yesBtn.addEventListener('click', () => {
    setDuckState('happy');

    // Hide buttons and personal message
    content.style.display = 'none';
    if (personalMessage) personalMessage.style.display = 'none';

    successMessage.style.display = 'block';

    // Update status footer
    if (statusValue) {
        statusValue.textContent = 'Snehal said YES! 🎉💕';
        statusValue.style.color = '#FF6F61';
    }

    // Create inline hearts
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = ['❤️', '💕', '🦆', '✨'][Math.floor(Math.random() * 4)];
        heartsContainer.appendChild(heart);
    }

    // Effects
    createConfettiBurst();
    createFallingHearts();
    createFallingHearts();
});

// ============================================================
// Runaway "No" button — with reactive duck states
// ============================================================
const noTexts = [
    "No",
    "Are you sure? 🦆",
    "Really?",
    "Think again!",
    "Really, Snehal?! 🥺",
    "Surely not?",
    "You can't say no! 😤",
    "Give it another thought!",
    "The button is scared! 😱",
    "This could be a mistake!",
    "PLEASE? 💔🦆",
    "Don't be so cold!",
    "I'll be sad forever 😢",
    "Change of heart?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Just click Yes already! 💕"
];

const dialogueText = [
    "No? 🥺",
    "Are you sure? 🦆",
    "Please don't! 💔",
    "I'm gonna cry... 😭",
    "You're breaking my heart! 💔",
    "Just click Yes! 😠"
];

function runAway() {
    noBtnClickCount++;
    clearTimeout(resetTimer);

    // Show dialogue
    const dialogue = document.getElementById('duck-dialogue');
    if (dialogue) {
        dialogue.classList.remove('hidden');
        dialogue.textContent = dialogueText[Math.min(noBtnClickCount - 1, dialogueText.length - 1)];
    }

    // Change duck state based on attempts
    if (noBtnClickCount === 1) {
        setDuckState('shocked');
    } else if (noBtnClickCount >= 2 && noBtnClickCount < 5) {
        setDuckState('sad');
    } else if (noBtnClickCount >= 5) {
        setDuckState('mad');
    }

    // Calculate random position within card
    const card = document.querySelector('.valentine-card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 20;
    const maxX = Math.max(0, cardRect.width - btnRect.width - padding);
    const maxY = Math.max(0, cardRect.height - btnRect.height - padding);

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '100';

    // Grow Yes button
    const newSize = 1 + (noBtnClickCount * 0.1);
    yesBtn.style.transform = `scale(${newSize})`;

    // Change text
    const textIndex = Math.min(noBtnClickCount, noTexts.length - 1);
    noBtn.textContent = noTexts[textIndex];

    // Reset duck face after 4 seconds of calm
    resetTimer = setTimeout(() => {
        if (successMessage.style.display === 'none' || !successMessage.style.display) {
            setDuckState('default');
        }
    }, 4000);
}

// Mouse hover
noBtn.addEventListener('mouseenter', runAway);

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    runAway();
});

// If they somehow manage to click it
noBtn.addEventListener('click', () => {
    const responses = [
        "Nice try! But you can't say no to this! 🦆💕",
        "That's not how this works, Snehal! 🦆",
        "The No button is on my side! 💕",
        "Error 404: 'No' not found 😏"
    ];
    alert(responses[Math.floor(Math.random() * responses.length)]);
    setDuckState('mad');
});

// ============================================================
// Effects
// ============================================================
function createConfettiBurst() {
    const colors = ['#FF6F61', '#FFB7B2', '#FFDAC1', '#FFD700', '#FF69B4', '#FF1493'];
    const burst = document.getElementById('celebrationBurst');
    if (!burst) return;

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            burst.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

function createFallingHearts() {
    const maxActiveHearts = 12;
    for (let i = 0; i < maxActiveHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = ['💕', '🦆', '✨', '💌', '❤️'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            const dur = Math.random() * 3 + 5;
            heart.style.animationDuration = dur + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), dur * 1000);
        }, i * 100);
    }
}
