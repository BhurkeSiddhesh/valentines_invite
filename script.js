// Fun knack: The "No" button runs away from the cursor!
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const content = document.getElementById('content');
const successMessage = document.getElementById('successMessage');
const heartsContainer = document.getElementById('hearts');
const duck = document.getElementById('duck');

let noBtnClickCount = 0;

// When user clicks "Yes"
yesBtn.addEventListener('click', () => {
    content.style.display = 'none';
    successMessage.style.display = 'block';

    // Make duck happy!
    duck.classList.add('happy');
    setTimeout(() => {
        duck.classList.remove('happy');
    }, 1800);

    // Create floating hearts
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heartsContainer.appendChild(heart);
    }

    // Create falling hearts in background
    createFallingHearts();
});

// Fun knack: Make the "No" button run away!
noBtn.addEventListener('mouseenter', () => {
    noBtnClickCount++;

    // Make duck sad!
    duck.classList.remove('happy');
    duck.classList.add('sad');
    setTimeout(() => {
        duck.classList.remove('sad');
    }, 1000);

    // Get button and container dimensions
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate maximum positions (keep button inside container)
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = 200; // Limited vertical movement

    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Move the button
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Make "Yes" button bigger each time "No" is approached
    const newSize = 1 + (noBtnClickCount * 0.1);
    yesBtn.style.transform = `scale(${newSize})`;

    // Change "No" button text after a few attempts
    if (noBtnClickCount === 3) {
        noBtn.textContent = 'Are you sure?';
    } else if (noBtnClickCount === 5) {
        noBtn.textContent = 'Really? 🥺';
    } else if (noBtnClickCount === 7) {
        noBtn.textContent = 'Please? 💔';
    }
});

// Just in case someone manages to click "No"
noBtn.addEventListener('click', () => {
    alert("The button ran away! Maybe that's a sign? 😉");
});

// Create falling hearts in the background
function createFallingHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = '💕';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 7) + 's';
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, i * 200);
    }
}

// Add some initial background hearts
window.addEventListener('load', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(heart);
        }, i * 500);
    }
});
