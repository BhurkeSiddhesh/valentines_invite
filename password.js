// Password Gate Logic
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const feedback = document.getElementById('feedback');
const lockIcon = document.getElementById('lockIcon');
const inputGroup = document.getElementById('inputGroup');
const heartsLeft = document.getElementById('heartsLeft');
const attemptCounter = document.getElementById('attemptCounter');
const priceySection = document.getElementById('priceySection');
const priceyText = document.getElementById('priceyText');
const letMeInBtn = document.getElementById('letMeInBtn');
const hintBox = document.getElementById('hintBox');
const pondyaaOverlay = document.getElementById('pondyaaOverlay');

const SECRET = 'bochuu';
let attempts = 0;
const maxAttempts = 5;

// Wrong answer messages (increasingly dramatic)
const wrongMessages = [
    "Nope! Try again 😜",
    "Still wrong! Think harder... 🤔",
    "Come onnnn, you know this! 😅",
    "Are you even my Bochuu?! 🦆😤",
    "Last chance... or maybe not 😏"
];

// Pricey messages (shown after max attempts)
const priceyMessages = [
    "Hmm... you really can't guess? 😒",
    "Maybe you don't know me well enough... 💅",
    "I'm thinking... should I even let you in? 🤔",
    "Okay fine, I'm not THAT mean... but you owe me! 😤💕"
];

function checkPassword() {
    const value = passwordInput.value.trim().toLowerCase();

    if (!value) {
        showFeedback("Type something at least! 😂", "warning");
        shakeInput();
        return;
    }

    if (value === SECRET) {
        // Correct!
        showFeedback("YESSS! That's me! 🦆💕", "success");
        lockIcon.innerHTML = '<span class="material-icons">lock_open</span>';
        lockIcon.classList.add('unlocked');
        inputGroup.classList.add('success');
        passwordInput.disabled = true;
        unlockBtn.disabled = true;

        // Redirect after celebration
        setTimeout(() => {
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = 'valentine.html';
            }, 600);
        }, 1500);
        return;
    }

    // Wrong answer
    attempts++;
    shakeInput();

    // Update hearts display — red for remaining, black for used
    const hearts = heartsLeft.querySelectorAll('span');
    const remaining = maxAttempts - attempts;
    hearts.forEach((heart, idx) => {
        if (idx < remaining) {
            heart.textContent = '❤️';
        } else {
            if (heart.textContent !== '🖤') {
                heart.classList.add('heart-break');
                setTimeout(() => { heart.textContent = '🖤'; }, 300);
            }
        }
    });

    // Update counter text
    const attemptsText = document.querySelector('.attempts-text');
    if (remaining > 0) {
        attemptsText.textContent = `${remaining} chance${remaining !== 1 ? 's' : ''} left`;
    } else {
        attemptsText.textContent = 'No chances left!';
    }

    if (attempts <= maxAttempts) {
        showFeedback(wrongMessages[Math.min(attempts - 1, wrongMessages.length - 1)], "error");
    }

    // Progressive hints
    if (attempts === 2) {
        // Trigger Pondyaa Popup
        if (pondyaaOverlay) {
            pondyaaOverlay.style.display = 'flex';
        }

        hintBox.innerHTML = `
            <span class="material-icons hint-icon">lightbulb</span>
            <p class="hint-text"><strong>Hint:</strong> It starts with "Bo" and ends with "uu" 🦆</p>
        `;
        hintBox.classList.add('hint-glow');
    }

    if (attempts === 4) {
        hintBox.innerHTML = `
            <span class="material-icons hint-icon">lightbulb</span>
            <p class="hint-text"><strong>Big Hint:</strong> B _ _ _ u u 🦆 (6 letters!)</p>
        `;
    }

    // Pricey mode after max attempts
    if (attempts >= maxAttempts) {
        enterPriceyMode();
    }

    passwordInput.value = '';
    passwordInput.focus();
}

function enterPriceyMode() {
    inputGroup.style.display = 'none';
    attemptCounter.style.display = 'none';
    hintBox.style.display = 'none';
    priceySection.style.display = 'block';

    // Show pricey messages one by one
    let msgIndex = 0;
    function showNextPriceyMessage() {
        if (msgIndex < priceyMessages.length) {
            priceyText.textContent = priceyMessages[msgIndex];
            priceyText.classList.add('pricey-fade');
            setTimeout(() => priceyText.classList.remove('pricey-fade'), 500);
            msgIndex++;

            if (msgIndex < priceyMessages.length) {
                setTimeout(showNextPriceyMessage, 2500);
            } else {
                // Show the "let me in" button after all pricey messages
                setTimeout(() => {
                    letMeInBtn.style.display = 'inline-block';
                    letMeInBtn.classList.add('btn-appear');
                }, 2000);
            }
        }
    }
    showNextPriceyMessage();
}

// Let me in button — bypasses password after being pricey
letMeInBtn.addEventListener('click', () => {
    priceyText.textContent = "Fine... but only because you're cute 😤💕";
    letMeInBtn.style.display = 'none';

    lockIcon.innerHTML = '<span class="material-icons">lock_open</span>';
    lockIcon.classList.add('unlocked');

    setTimeout(() => {
        document.body.classList.add('page-exit');
        setTimeout(() => {
            window.location.href = 'valentine.html';
        }, 600);
    }, 1500);
});

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `attempt-feedback ${type}`;
    feedback.classList.add('feedback-show');
}

function shakeInput() {
    inputGroup.classList.add('shake');
    setTimeout(() => inputGroup.classList.remove('shake'), 500);
}

// Enter key to submit
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPassword();
});

unlockBtn.addEventListener('click', checkPassword);

// Focus input on load
window.addEventListener('load', () => {
    passwordInput.focus();
    createFallingHearts();
    setInterval(createFallingHearts, 12000);
});

// Background hearts (reused)
function createFallingHearts() {
    const maxActiveHearts = 10;
    for (let i = 0; i < maxActiveHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = ['💕', '🦆', '✨', '💌'][Math.floor(Math.random() * 4)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            const dur = Math.random() * 3 + 5;
            heart.style.animationDuration = dur + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), dur * 1000);
        }, i * 150);
    }
}

// Global function for onclick in HTML
window.closePondyaaPopup = function () {
    if (pondyaaOverlay) {
        pondyaaOverlay.style.display = 'none';
        passwordInput.focus();
    }
}
