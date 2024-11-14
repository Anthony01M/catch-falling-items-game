const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
let playerPosition = gameContainer.clientWidth / 2 - player.clientWidth / 2;
let score = 0;
let missedItems = 0;
const maxMissedItems = 5;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (e.key === 'ArrowRight' && playerPosition < gameContainer.clientWidth - player.clientWidth) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
});

function createFallingItem() {
    const item = document.createElement('div');
    item.classList.add('falling-item');

    const itemType = Math.floor(Math.random() * 3) + 1;
    item.classList.add(`item-type-${itemType}`);

    item.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px';
    gameContainer.appendChild(item);

    let itemPosition = 0;
    const fallInterval = setInterval(() => {
        itemPosition += 5;
        item.style.top = itemPosition + 'px';

        if (itemPosition > gameContainer.clientHeight - player.clientHeight - 30 &&
            itemPosition < gameContainer.clientHeight - player.clientHeight &&
            parseInt(item.style.left) > playerPosition - 30 &&
            parseInt(item.style.left) < playerPosition + player.clientWidth) {
            clearInterval(fallInterval);
            gameContainer.removeChild(item);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else if (itemPosition > gameContainer.clientHeight) {
            clearInterval(fallInterval);
            gameContainer.removeChild(item);
            missedItems++;
            if (missedItems >= maxMissedItems) {
                alert('Game Over! Your score is ' + score);
                location.reload();
            }
        }
    }, 50);
}

setInterval(createFallingItem, 2000);