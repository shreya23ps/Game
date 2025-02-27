const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let board = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Restart game
restartButton.addEventListener('click', restartGame);

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    restartGame();
  } else if (board.every(cell => cell !== null)) {
    alert("It's a draw!");
    restartGame();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for a win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

// Restart game
function restartGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
}