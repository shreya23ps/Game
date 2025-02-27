const chessboard = document.getElementById("chessboard");
const solveBtn = document.getElementById("solve-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("message");

const N = 8; // Size of the chessboard
let board = Array(N).fill().map(() => Array(N).fill(0)); // Initialize the board

// Initialize the chessboard
function createChessboard() {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => placeQueen(row, col));
      chessboard.appendChild(cell);
    }
  }
}

// Place or remove a queen on the board
function placeQueen(row, col) {
  if (board[row][col] === 1) {
    // Remove the queen
    board[row][col] = 0;
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.classList.remove("queen");
    cell.textContent = "";
  } else {
    // Check if the row already has a queen
    if (board[row].some(cell => cell === 1)) {
      message.textContent = "Invalid move! Only one queen per row is allowed.";
      message.style.color = "red";
      return;
    }

    // Check if placing a queen here is safe diagonally
    if (isSafe(board, row, col)) {
      board[row][col] = 1;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add("queen");
      cell.textContent = "♛";
    } else {
      message.textContent = "Invalid move! Queens cannot attack diagonally.";
      message.style.color = "red";
      return;
    }
  }
  checkSolution();
}

// Check if the current board is a valid solution
function checkSolution() {
  let queenCount = 0;
  let isValid = true;

  // Count queens and check for conflicts
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (board[row][col] === 1) {
        queenCount++;
        if (!isSafe(board, row, col)) {
          isValid = false;
          break;
        }
      }
    }
    if (!isValid) break;
  }

  // Check if the user has won
  if (queenCount === N && isValid) {
    message.textContent = "Congratulations! You've won the game! 🎉";
    message.style.color = "green";
    highlightChessboard(); // Add visual feedback
  } else if (queenCount === N) {
    message.textContent = "Invalid configuration! Queens are attacking diagonally.";
    message.style.color = "red";
  } else {
    message.textContent = `Keep going! ${queenCount} queens placed.`;
    message.style.color = "black";
  }
}

// Highlight the chessboard when the puzzle is solved
function highlightChessboard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.border = "2px solid green"; // Add a green border
  });

  // Remove the highlight after 3 seconds
  setTimeout(() => {
    cells.forEach(cell => {
      cell.style.border = "1px solid #ccc";
    });
  }, 3000);
}

// Check if it's safe to place a queen at a given position (diagonally)
function isSafe(board, row, col) {
  // Check upper diagonal on the left side
  for (let x = row - 1, y = col - 1; x >= 0 && y >= 0; x--, y--) {
    if (board[x][y] === 1) {
      return false;
    }
  }

  // Check lower diagonal on the left side
  for (let x = row + 1, y = col - 1; x < N && y >= 0; x++, y--) {
    if (board[x][y] === 1) {
      return false;
    }
  }

  return true;
}

// Solve the puzzle using backtracking
function solveNQueens(board, col) {
  if (col >= N) {
    return true;
  }

  for (let i = 0; i < N; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 1;
      if (solveNQueens(board, col + 1)) {
        return true;
      }
      board[i][col] = 0;
    }
  }

  return false;
}

// Display the solution on the chessboard
function displaySolution() {
  board = Array(N).fill().map(() => Array(N).fill(0)); // Reset the board
  solveNQueens(board, 0);
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      if (board[row][col] === 1) {
        cell.classList.add("queen");
        cell.textContent = "♛";
      } else {
        cell.classList.remove("queen");
        cell.textContent = "";
      }
    }
  }
  message.textContent = "Solution displayed!";
  message.style.color = "blue";
}

// Reset the chessboard
function resetChessboard() {
  board = Array(N).fill().map(() => Array(N).fill(0));
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.classList.remove("queen");
    cell.textContent = "";
    cell.style.border = "1px solid #ccc"; // Reset border
  });
  message.textContent = "";
}

// Event listeners
solveBtn.addEventListener("click", displaySolution);
resetBtn.addEventListener("click", resetChessboard);

// Initialize the chessboard on page load
createChessboard();
