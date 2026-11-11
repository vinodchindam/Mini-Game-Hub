// Generate random number
let secretNumber = Math.floor(Math.random() * 100) + 1;

// Maximum attempts
let maxAttempts = 7;

// Remaining attempts
let remainingAttempts = maxAttempts;

// Get HTML elements
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const attemptsText = document.getElementById("attempts");
const message = document.getElementById("message");

const rulesBtn = document.getElementById("rulesBtn");
const rulesBox = document.getElementById("rulesBox");

const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearBtn");

// Submit Guess
submitBtn.addEventListener("click", checkGuess);

// Press Enter to submit
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Check Guess Function
function checkGuess() {

    let guess = guessInput.value.trim();

    // Empty input validation
    if (guess === "") {
        message.textContent = "⚠️ Please enter a number!";
        return;
    }

    guess = Number(guess);

    // Validate number
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        message.textContent =
            "⚠️ Please enter a whole number between 1 and 100!";
        return;
    }

    // Check if game is finished
    if (remainingAttempts <= 0) {
        return;
    }

    // Reduce attempts
    remainingAttempts--;

    // Update attempts tracker
    attemptsText.textContent =
        remainingAttempts + " of 7 remaining";

    // Correct Guess
    if (guess === secretNumber) {

        message.textContent =
            "🎉 Congratulations! You guessed the correct number!";

        saveHistory("Won", secretNumber, 7 - remainingAttempts);

        endGame();

    }

    // Guess is too low
    else if (guess < secretNumber) {

        if (remainingAttempts === 0) {

            message.textContent =
                "❌ Game Over! The correct number was " + secretNumber;

            saveHistory("Lost", secretNumber, 7);

            endGame();

        } else {

            message.textContent = "📉 Too Low! Try a higher number.";

        }

    }

    // Guess is too high
    else {

        if (remainingAttempts === 0) {

            message.textContent =
                "❌ Game Over! The correct number was " + secretNumber;

            saveHistory("Lost", secretNumber, 7);

            endGame();

        } else {

            message.textContent = "📈 Too High! Try a lower number.";

        }

    }

    // Clear input
    guessInput.value = "";
}

// End Game
function endGame() {

    submitBtn.disabled = true;
    guessInput.disabled = true;

}

// Reset Game
function resetGame() {

    secretNumber = Math.floor(Math.random() * 100) + 1;

    remainingAttempts = maxAttempts;

    attemptsText.textContent = "7 of 7 remaining";

    message.textContent =
        "Enter your first guess between 1 and 100!";

    guessInput.value = "";

    guessInput.disabled = false;
    submitBtn.disabled = false;

}

// Play Again Button
resetBtn.addEventListener("click", resetGame);

// Hide and Show Rules
rulesBtn.addEventListener("click", function() {

    if (rulesBox.style.display === "none") {

        rulesBox.style.display = "block";
        rulesBtn.textContent = "Hide Rules";

    } else {

        rulesBox.style.display = "none";
        rulesBtn.textContent = "Show Rules";

    }

});

// Save Result History
function saveHistory(result, number, attempts) {

    const li = document.createElement("li");

    li.textContent =
        result + " | Secret Number: " + number +
        " | Attempts Used: " + attempts;

    historyList.prepend(li);

}

// Clear History
clearBtn.addEventListener("click", function() {

    historyList.innerHTML = "";

});