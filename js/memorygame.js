// Memory Card Game

// Card Symbols (6 Pairs)
const symbols = [
    "🍎", "🍌", "🍇",
    "🍊", "🍓", "🍉"
];

// Game Variables
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;

// HTML Elements
const gameBoard = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const matchedText = document.getElementById("matched");
const message = document.getElementById("message");

const restartBtn = document.getElementById("restartBtn");
const rulesBtn = document.getElementById("rulesBtn");
const rulesSection = document.getElementById("rulesSection");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// Shuffle Cards
function shuffleCards() {

    let cards = [...symbols, ...symbols];

    cards.sort(() => Math.random() - 0.5);

    return cards;

}

// Start Game
function startGame() {

    // Reset Variables
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    moves = 0;
    matchedPairs = 0;

    // Update Scoreboard
    movesText.textContent = "0";
    matchedText.textContent = "0 / 6";

    message.textContent =
        "Click any two cards to find matching pairs!";

    // Clear Previous Cards
    gameBoard.innerHTML = "";

    // Shuffle Cards
    const shuffledCards = shuffleCards();

    // Create 12 Cards
    shuffledCards.forEach((symbol, index) => {

        const card = document.createElement("button");

        card.type = "button";
        card.classList.add("memory-card");

        card.dataset.symbol = symbol;

        card.setAttribute("aria-label", "Hidden card " + (index + 1));

        card.innerHTML = `
            <div class="card-inner">

                <div class="card-front">
                    ?
                </div>

                <div class="card-back">
                    ${symbol}
                </div>

            </div>
        `;

        // Card Click Event
        card.addEventListener("click", function() {
            flipCard(card);
        });

        gameBoard.appendChild(card);

    });

}

// Flip Card
function flipCard(card) {

    // Prevent Invalid Clicks
    if (
        lockBoard ||
        card === firstCard ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    // Reveal Card
    card.classList.add("flipped");

    if (firstCard === null) {

        firstCard = card;

        return;

    }

    // Second Card
    secondCard = card;

    // Increase Moves
    moves++;

    movesText.textContent = moves;

    // Check Matching
    checkMatch();

}

// Check Matching Cards
function checkMatch() {

    const isMatch =
        firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {

        // Matching Cards
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        matchedText.textContent = matchedPairs + " / 6";

        message.textContent =
            "🎉 Excellent! You found a matching pair!";

        resetCards();

        // Check Win
        if (matchedPairs === 6) {

            gameWon();

        }

    } else {

        // Cards Do Not Match
        lockBoard = true;

        message.textContent =
            "❌ Not a match! Try again.";

        setTimeout(function() {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetCards();

        }, 1000);

    }

}

// Reset Selected Cards
function resetCards() {

    firstCard = null;
    secondCard = null;

    lockBoard = false;

}

// Winning Function
function gameWon() {

    lockBoard = true;

    message.textContent =
        "🏆 Congratulations! You matched all 6 pairs in " +
        moves + " moves!";

    saveHistory();

}

// Save Result History
function saveHistory() {

    // Remove Empty History Message
    const emptyMessage =
        historyList.querySelector(".empty-history");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Create History Item
    const historyItem = document.createElement("div");

    historyItem.classList.add("history-item");

    // Result
    const result = document.createElement("span");

    result.classList.add("history-win");

    result.textContent = "🏆 WIN";

    // Moves
    const score = document.createElement("span");

    score.textContent = "Moves: " + moves;

    // Date
    const date = document.createElement("span");

    date.textContent = new Date().toLocaleString();

    // Add Elements
    historyItem.appendChild(result);
    historyItem.appendChild(score);
    historyItem.appendChild(date);

    historyList.prepend(historyItem);

}

// Restart Game
restartBtn.addEventListener("click", function() {

    startGame();

});

// Clear History
clearHistoryBtn.addEventListener("click", function() {

    historyList.innerHTML = `
        <p class="empty-history">
            No games played yet.
        </p>
    `;

});

// Hide and Show Rules
rulesBtn.addEventListener("click", function() {

    if (rulesSection.style.display === "none") {

        rulesSection.style.display = "block";

        rulesBtn.textContent = "Hide Rules";

    } else {

        rulesSection.style.display = "none";

        rulesBtn.textContent = "Show Rules";

    }

});

// Initialize Game
startGame();