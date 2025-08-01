let gameActive = false;
let currentSequence = [];
let currentIndex = 0;
let keys = ['W', 'A', 'S', 'D', 'E', 'F', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Q', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']; 

const timePerKey = 4000; 
let timerStart;
let gameInterval;

const qtePanel = document.querySelector('.qte-panel');
const keysContainer = document.querySelector('.qte-keys-container');
const timerFill = document.querySelector('.timer-fill');

function startGame() {
    gameActive = true;
    currentIndex = 0;
    
    currentSequence = generateSequence(13); 
    
    qtePanel.style.display = 'block';
    
    showNextKey();
}

function generateSequence(length) {
    let sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(keys[Math.floor(Math.random() * keys.length)]);
    }
    return sequence;
}

function showNextKey() {
    keysContainer.innerHTML = '';
    
    const keyElement = document.createElement('div');
    keyElement.classList.add('qte-key');
    keyElement.textContent = currentSequence[currentIndex];
    keysContainer.appendChild(keyElement);
    
    keyElement.classList.add('active');

    timerStart = Date.now();
    startTimerAnimation();
}

function startTimerAnimation() {
    timerFill.style.transition = 'none';
    timerFill.style.width = '100%';
    
    setTimeout(() => {
        timerFill.style.transition = `width ${timePerKey}ms linear`;
        timerFill.style.width = '0%';
    }, 10);
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        if (Date.now() - timerStart >= timePerKey) {
            endGame(false);
        }
    }, 50);
}

function handleInput(key) {
    if (!gameActive) return;

    if (key.toUpperCase() === currentSequence[currentIndex]) {
        keysContainer.children[0].classList.remove('active');
        keysContainer.children[0].style.backgroundColor = '#00e676';
        keysContainer.children[0].style.color = '#fff';

        currentIndex++;

        if (currentIndex >= currentSequence.length) {
            endGame(true);
        } else {
            setTimeout(() => {
                showNextKey();
            }, 100);
        }

    } else {
        keysContainer.children[0].classList.add('incorrect');
        endGame(false);
    }
}

function endGame(success) {
    gameActive = false;
    qtePanel.style.display = 'none';
    if (gameInterval) clearInterval(gameInterval);
    
    fetch(`https://${GetParentResourceName()}/minigameResult`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            success: success
        })
    });
}

window.addEventListener('message', function(event) {
    if (event.data.type === 'start') {
        startGame();
    } else if (event.data.type === 'stop') {
        endGame(false);
    }
});

document.addEventListener('keydown', function(event) {
    handleInput(event.key);
});