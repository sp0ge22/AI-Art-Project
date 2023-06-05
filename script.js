// Get references to the HTML elements
const imageElement = document.querySelector(".ai-container img");
const guessInput = document.getElementById("guess");
const regenerateButton = document.querySelector(".regenerate-container button");
const submitButton = document.querySelector(".guess-container button");
const congratsMessage = document.createElement("p");
congratsMessage.textContent = "Congratulations, you've guessed the image!";
congratsMessage.classList.add("congrats-message");
const tryAgainMessage = document.createElement("p");
tryAgainMessage.textContent = "Try again.";
tryAgainMessage.classList.add("try-again-message");

// Generate a random number for the image filename
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Regenerate the AI-generated image
function regenerateImage() {
  const randomNumber = generateRandomNumber(1, 10); // Modify the range as needed
  imageElement.src = `ai-generated-image-${randomNumber}.png`;
  congratsMessage.style.display = "none"; // Hide the congratulations message
  tryAgainMessage.style.display = "none"; // Hide the try again message
}

// Submit the user's guess
function submitGuess() {
    const userGuess = guessInput.value.trim().toLowerCase();
  
    if (userGuess === "tree") {
    
      document.querySelector(".regenerate-container").appendChild(congratsMessage);
      congratsMessage.style.display = "block"; // Show the congratulations message
      tryAgainMessage.style.display = "none"; // Hide the try again message
    } else {
      document.querySelector(".regenerate-container").appendChild(tryAgainMessage);
      tryAgainMessage.style.display = "block"; // Show the try again message
      congratsMessage.style.display = "none"; // Hide the congratulations message
    }
  
    guessInput.value = ""; // Clear the input field
  }

// Attach event listeners to the buttons
regenerateButton.addEventListener("click", regenerateImage);
submitButton.addEventListener("click", submitGuess);
