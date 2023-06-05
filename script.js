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

// Define images and their corresponding answers
const images = [
  { src: 'ai-generated-image-1.png', answer: 'tree' },
  { src: 'ai-generated-image-2.png', answer: 'balloon' },
  { src: 'ai-generated-image-3.png', answer: 'chicken' },
  // add as many images as you want...
];

let currentAnswer = ''; // this will hold the correct answer

// Generate a random number for the image filename
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Regenerate the AI-generated image
function regenerateImage() {
  const randomNumber = generateRandomNumber(0, images.length - 1); // get a random index
  const image = images[randomNumber]; // get the image at that index
  imageElement.src = image.src; // set the image source
  currentAnswer = image.answer; // store the correct answer
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
  
  if (userGuess === currentAnswer) {
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

// Generate the first image when the script loads
regenerateImage();
