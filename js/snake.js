const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restart-button');

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };
let score = 0;

// Generate food
function generateFood() {
  food.x = Math.floor(Math.random() * 20) * 20;
  food.y = Math.floor(Math.random() * 20) * 20;
}

// Draw game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lime';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 20, 20);
}

// Update game state
function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

// Check for collisions
function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Game loop
function gameLoop() {
  if (checkCollision()) {
    alert(`Game Over! Score: ${score}`);
    restartGame();
    return;
  }
  update();
  draw();
  setTimeout(gameLoop, 100);
}

// Restart game
function restartGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  generateFood();
}

// Handle keyboard input
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -20 }; break;
    case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 20 }; break;
    case 'ArrowLeft': if (direction.x === 0) direction = { x: -20, y: 0 }; break;
    case 'ArrowRight': if (direction.x === 0) direction = { x: 20, y: 0 }; break;
  }
});

restartButton.addEventListener('click', restartGame);

generateFood();
gameLoop();