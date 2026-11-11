const cells = document.querySelectorAll(".cell");
const turnMessage = document.getElementById("turnMessage");
const newGameBtn = document.getElementById("newGameBtn");
const historyList = document.getElementById("historyList");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameNumber = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = Number(cell.dataset.index);

        if (!gameActive || board[index] !== "") {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.disabled = true;

        checkWinner();

    });

});

// Check winner
function checkWinner() {

    let winningPattern = null;

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winningPattern = pattern;
            break;
        }
    }

    if (winningPattern) {

        gameActive = false;

        winningPattern.forEach(index => {
            cells[index].classList.add("winner");
        });

        turnMessage.textContent =
            `🎉 Player ${currentPlayer === "X" ? "1" : "2"} (${currentPlayer}) Wins!`;

        addHistory(
            `Player ${currentPlayer === "X" ? "1" : "2"} (${currentPlayer}) Wins!`,
            "win"
        );

        return;
    }

    // Check draw
    if (!board.includes("")) {

        gameActive = false;

        turnMessage.textContent = "🤝 Match Draw!";

        addHistory("Match Draw", "draw");

        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    turnMessage.textContent =
        `Player ${currentPlayer === "X" ? "1" : "2"} (${currentPlayer})'s turn to move`;
}

// New Game / Reset Board
newGameBtn.addEventListener("click", resetGame);

function resetGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {

        cell.textContent = "";
        cell.disabled = false;

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );

    });

    turnMessage.textContent =
        "Player 1 (X)'s turn to move";

}

// Add result history
function addHistory(result, type) {

    const emptyMessage =
        historyList.querySelector(".empty-history");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    gameNumber++;

    const item = document.createElement("div");
    item.className = "history-item";

    const game = document.createElement("span");
    game.textContent = `Game ${gameNumber}`;

    const resultText = document.createElement("span");
    resultText.textContent = result;

    resultText.className =
        type === "win" ? "history-win" : "history-draw";

    const date = document.createElement("span");
    date.textContent = new Date().toLocaleString();

    item.append(game, resultText, date);

    historyList.prepend(item);
}

// Clear History
document.getElementById("clearHistoryBtn")
.addEventListener("click", () => {

    historyList.innerHTML = `
        <p class="empty-history">
            No games played yet.
        </p>
    `;

    gameNumber = 0;

});

// Show / Hide Rules
document.getElementById("rulesBtn")
.addEventListener("click", function () {

    const rules = document.getElementById("rulesSection");

    if (rules.style.display === "none") {

        rules.style.display = "block";
        this.textContent = "Hide Rules";

    } else {

        rules.style.display = "none";
        this.textContent = "Show Rules";

    }

});