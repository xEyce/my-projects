const playerChoice = document.querySelector(".playerChoice");
const computerChoice = document.querySelector(".computerChoice");
const resultText = document.getElementById("resultDisplay");
const choices = document.querySelectorAll(".choices button");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let playerScore = 0;
let computerScore = 0;

// Map choices to emojis
const emojiMap = {
    "rock": "✊",
    "paper": "✋",
    "scissors": "✌"
};


// Function to play game
function playGame(userChoice) {
    const choicesArray = ["rock", "paper", "scissors"];
    const aiChoice = choicesArray[Math.floor(Math.random() * 3)];
    let result = "";
    
    // Update player and AI choices with emojis
    playerChoice.innerHTML = emojiMap[userChoice];
    computerChoice.innerHTML = emojiMap[aiChoice];

    // Determine winner
    if (userChoice === aiChoice) {
       result = "It's a Tie!";
       resultText.classList.remove("redText", "greenText")
    } else {
        switch (userChoice) {
            case("rock"):
                result =  aiChoice === "scissors" ? "YOU WIN!" : "YOU LOSE!";
                break;
            case("paper"):
                result =  aiChoice === "rock" ? "YOU WIN!" : "YOU LOSE!"; 
                break;
            case("scissors"):
                result =  aiChoice === "paper" ? "YOU WIN!" : "YOU LOSE!"; 
                break;
        }
    }
    console.log(result);
    resultText.textContent = result;

    switch (result) {
        case "YOU WIN!":
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            playerScoreDisplay.classList.add("greenText");
            resultText.classList.add("greenText");
            break;
        case "YOU LOSE!":
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            computerScoreDisplay.classList.add("redText");
            resultText.classList.add("redText");
            break;
    }
};
