// Game variables
let playerScore = 0;
let computerScore = 0;
let round = 0;
const winningScore = 5;

const choices = ["rock", "paper", "scissors"];

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

// HTML elements
const playerScoreElement =
    document.getElementById("playerScore");

const computerScoreElement =
    document.getElementById("computerScore");

const playerPickElement =
    document.getElementById("playerPick");

const computerPickElement =
    document.getElementById("computerPick");

const messageElement =
    document.getElementById("message");

const historyList =
    document.getElementById("historyList");

const choiceButtons =
    document.querySelectorAll(".choice-btn");

// Play game
choiceButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (playerScore >= winningScore ||
            computerScore >= winningScore) {
            return;
        }

        const playerChoice = this.dataset.choice;

        const computerChoice =
            choices[Math.floor(Math.random() * 3)];

        round++;

        // Display choices
        playerPickElement.textContent =
            emojis[playerChoice];

        computerPickElement.textContent =
            emojis[computerChoice];

        let result = "";

        // Check winner
        if (playerChoice === computerChoice) {

            result = "draw";

            messageElement.textContent =
                "🤝 It's a Draw! No points awarded.";

        } else if (
            (playerChoice === "rock" &&
             computerChoice === "scissors") ||

            (playerChoice === "paper" &&
             computerChoice === "rock") ||

            (playerChoice === "scissors" &&
             computerChoice === "paper")
        ) {

            result = "win";
            playerScore++;

            messageElement.textContent =
                "🎉 You Won This Round!";

        } else {

            result = "loss";
            computerScore++;

            messageElement.textContent =
                "😢 Computer Won This Round!";

        }

        // Update scores
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;

        // Add result to history
        addHistory(
            round,
            playerChoice,
            computerChoice,
            result
        );

        // Check match winner
        if (playerScore === winningScore) {

            messageElement.textContent =
                "🏆 Congratulations! You Won the Match!";

            disableButtons();

        } else if (computerScore === winningScore) {

            messageElement.textContent =
                "💻 Computer Won the Match! Better Luck Next Time!";

            disableButtons();

        } else {

            // Disable choices until next round
            choiceButtons.forEach(btn => {
                btn.disabled = true;
            });

            setTimeout(() => {
                choiceButtons.forEach(btn => {
                    btn.disabled = false;
                });
            }, 900);

        }

    });

});

// Disable buttons
function disableButtons() {

    choiceButtons.forEach(button => {
        button.disabled = true;
    });

}

// Add history
function addHistory(
    round,
    player,
    computer,
    result
) {

    const emptyMessage =
        historyList.querySelector(".empty-history");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const item = document.createElement("div");

    item.className = "history-item";

    const resultText = {
        win: "You Won",
        loss: "Computer Won",
        draw: "Draw"
    };

    item.innerHTML = `
        <span>Round ${round}</span>
        <span>
            ${emojis[player]} ${player}
            VS
            ${emojis[computer]} ${computer}
        </span>
        <span class="${result}">
            ${resultText[result]}
        </span>
    `;

    historyList.prepend(item);

}

// Restart Match
document.getElementById("restartBtn")
.addEventListener("click", function () {

    playerScore = 0;
    computerScore = 0;
    round = 0;

    playerScoreElement.textContent = 0;
    computerScoreElement.textContent = 0;

    playerPickElement.textContent = "❔";
    computerPickElement.textContent = "❔";

    messageElement.textContent =
        "First to 5 points wins the match! Make your move.";

    choiceButtons.forEach(button => {
        button.disabled = false;
    });

});

// Clear History
document.getElementById("clearHistoryBtn")
.addEventListener("click", function () {

    historyList.innerHTML =
        '<p class="empty-history">No games played yet.</p>';

});

// Show / Hide Rules
document.getElementById("rulesBtn")
.addEventListener("click", function () {

    const rulesSection =
        document.getElementById("rulesSection");

    if (rulesSection.style.display === "none") {

        rulesSection.style.display = "block";
        this.textContent = "Hide Rules";

    } else {

        rulesSection.style.display = "none";
        this.textContent = "Show Rules";

    }

});