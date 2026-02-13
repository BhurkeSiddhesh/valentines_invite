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

let noBtnClickCount = 0;

// Typewriter entrance sequence
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

// Start typewriter on load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 800);
    createFallingHearts();
    setInterval(createFallingHearts, 10000);
});

// When user clicks "Yes"
yesBtn.addEventListener('click', () => {
    content.style.display = 'none';
    successMessage.style.display = 'block';

    // Update status
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

    // Confetti burst
    createConfettiBurst();
    // Falling hearts
    createFallingHearts();
    createFallingHearts();
});

// Runaway "No" button
noBtn.addEventListener('mouseenter', () => {
    noBtnClickCount++;

    const card = document.querySelector('.valentine-card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 30;
    const maxX = cardRect.width - btnRect.width - padding;
    const maxY = cardRect.height - btnRect.height - padding;

    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    const randomX = Math.random() * safeMaxX;
    const randomY = Math.random() * safeMaxY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '100';

    // Yes button grows
    const newSize = 1 + (noBtnClickCount * 0.12);
    yesBtn.style.transform = `scale(${newSize})`;

    // Changing text
    const noTexts = {
        2: 'Are you sure? 🦆',
        4: 'Really, Snehal?! 🥺',
        6: 'You can\'t say no! 😤',
        8: 'The button is scared! 😱',
        10: 'PLEASE? 💔🦆',
        12: 'I\'ll be sad forever 😢',
        14: 'Just click Yes already! 💕'
    };
    if (noTexts[noBtnClickCount]) {
        noBtn.textContent = noTexts[noBtnClickCount];
    }
});

// Click on No (if somehow managed)
noBtn.addEventListener('click', () => {
    const responses = [
        "Nice try! But the button ran away 😉",
        "That's not how this works, Snehal! 🦆",
        "The No button is on my side! 💕",
        "Error 404: 'No' not found 😏"
    ];
    alert(responses[Math.floor(Math.random() * responses.length)]);
});

// Also handle touch for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    noBtn.dispatchEvent(new Event('mouseenter'));
});

// Confetti burst
function createConfettiBurst() {
    const colors = ['#FF6F61', '#FFB7B2', '#FFDAC1', '#FFD700', '#FF69B4', '#FF1493'];
    const burst = document.getElementById('celebrationBurst');

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

// Background falling hearts
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
