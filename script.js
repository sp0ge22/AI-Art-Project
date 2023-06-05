// Get references to the HTML elements
const imageElement = document.querySelector(".ai-container img");
const guessInput = document.getElementById("guess");
const regenerateButton = document.querySelector(".regenerate-container button");
const submitButton = document.querySelector(".guess-container button");
const messageContainer = document.querySelector(".message-container");

// Message Elements
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
  messageContainer.innerHTML = ""; // Clear any messages
}

// Submit the user's guess
function submitGuess(event) {
  event.preventDefault(); // Prevent form submission or page reload
  const userGuess = guessInput.value.trim().toLowerCase();

  // Log the user's guess to the console
  console.log("User's guess:", userGuess);

  // Clear any previous message
  messageContainer.innerHTML = "";
  
  if (userGuess === "tree") {
    console.log("Correct guess");
    messageContainer.appendChild(congratsMessage);
  } else {
    console.log("Incorrect guess");
    messageContainer.appendChild(tryAgainMessage);
  }

  guessInput.value = ""; // Clear the input field
}

// Attach event listeners to the buttons
regenerateButton.addEventListener("click", regenerateImage);
submitButton.addEventListener("click", submitGuess);
