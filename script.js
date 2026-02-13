// Fun knack: The "No" button runs away from the cursor!
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const content = document.getElementById('content');
const successMessage = document.getElementById('successMessage');
const heartsContainer = document.getElementById('hearts');
const statusValue = document.getElementById('statusValue');

let noBtnClickCount = 0;

// When user clicks "Yes"
yesBtn.addEventListener('click', () => {
    content.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Update Status
    if (statusValue) {
        statusValue.textContent = 'They said YES! 🎉';
        statusValue.style.color = '#FF6F61';
    }

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
    
    // Get button and card dimensions
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate maximum positions (keep button inside card, accounting for padding)
    // We want the button to stay within the card boundaries
    // The button is absolutely positioned relative to the card

    const padding = 30; // approximate padding
    const maxX = cardRect.width - btnRect.width - padding;
    const maxY = cardRect.height - btnRect.height - padding;
    
    // Ensure we don't get negative values
    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    const randomX = Math.random() * safeMaxX;
    const randomY = Math.random() * safeMaxY;
    
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
    const maxActiveHearts = 15; // Reduced from 30 for better performance
    for (let i = 0; i < maxActiveHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = '💕';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            const animationDuration = Math.random() * 3 + 5; // 5-8 seconds
            heart.style.animationDuration = animationDuration + 's';
            document.body.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, animationDuration * 1000);
        }, i * 100);
    }
}

// Add some initial background hearts
window.addEventListener('load', () => {
    createFallingHearts(); // Start some hearts immediately
    setInterval(createFallingHearts, 10000); // Keep them coming
});
