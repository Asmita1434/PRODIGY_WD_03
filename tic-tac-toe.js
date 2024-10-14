
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== null || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkForWinner()) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        statusDiv.textContent = 'Game is a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkForWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState.fill(null);
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

resetGame(); // Initialize the game state
