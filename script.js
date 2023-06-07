// Get references to the HTML elements
const imageElement = document.querySelector(".ai-container img");
const guessInput1 = document.getElementById("guess1");
const guessInput2 = document.getElementById("guess2");
const prevButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const submitButton = document.querySelector(".submit-button");
const messageContainer = document.querySelector(".message-container");
const titleElement = document.getElementById("image-title");
const hintButton1 = document.getElementById("hint1");
const hintButton2 = document.getElementById("hint2");
const checkmark = document.getElementById("checkmark");

import data from './images.js';

const images = data.images;

// Function to close the modal
function closeModal() {
  var modal = document.getElementById('module-container');
  modal.style.display = "none";
}

// Initially display the modal
window.onload = function() {
  var modal = document.getElementById('module-container');
  modal.style.display = "block";
}

// Expose closeModal function to the global scope so iframe can access it
window.closeModal = closeModal;

// Message Elements
const congratsMessage = document.createElement("p");
congratsMessage.classList.add("congrats-message");
const tryAgainMessage = document.createElement("p");
tryAgainMessage.classList.add("try-again-message");

// Function to update congratsMessage
function updateCongratsMessage() {
  congratsMessage.textContent = "Congratulations, you've guessed the image!";
  if (messageContainer.contains(congratsMessage)) {
    messageContainer.removeChild(congratsMessage);
  }
  messageContainer.appendChild(congratsMessage);
}

// Function to update tryAgainMessage
function updateTryAgainMessage() {
  tryAgainMessage.textContent = "Try again.";
  if (messageContainer.contains(tryAgainMessage)) {
    messageContainer.removeChild(tryAgainMessage);
  }
  messageContainer.appendChild(tryAgainMessage);
}

let currentAnswer = []; // this will hold the correct answer
let currentHints = []; // this will hold the correct hints
let currentIndex = 0; // index of the current displayed image

// Display the first image when the script loads
displayImage(currentIndex);

// Show previous image
function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // get the previous index, looping around to the end if necessary
  displayImage(currentIndex);
}

// Show next image
function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length; // get the next index, looping around to the start if necessary
  displayImage(currentIndex);
}

// Generate a random number for the image filename
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayImage(index) {
  const image = images[index]; // get the image at that index
  imageElement.src = image.src; // set the image source
  titleElement.textContent = image.title; // set the image title
  currentAnswer = image.answer; // store the correct answer
  currentHints = image.hints; // store the correct hints
  hintButton1.textContent = "Hint"; // reset the hint button
  hintButton2.textContent = "Hint"; // reset the hint button
  hintButton1.style.backgroundColor = "black"; // reset the hint button color
  hintButton2.style.backgroundColor = "black"; // reset the hint button color
  messageContainer.innerHTML = ""; // Clear any messages

  // Show or hide the checkmark based on whether the image has been guessed
  if (image.guessed) {
    checkmark.style.display = "block";
    guessInput1.style.display = "none";
    guessInput2.style.display = "none";
    submitButton.style.display = "none";
    guessInput1.disabled = true;
    guessInput2.disabled = true;
    guessInput1.classList.remove("correct-guess");
    guessInput2.classList.remove("correct-guess");
  } else {
    checkmark.style.display = "none";
    guessInput1.style.display = "block";
    guessInput2.style.display = "block";
    submitButton.style.display = "block";
    guessInput1.disabled = false;
    guessInput2.disabled = false;
    guessInput1.classList.remove("correct-guess");
    guessInput2.classList.remove("correct-guess");
    guessInput1.value = ""; // Clear the input field value
    guessInput2.value = ""; // Clear the input field value
  }
}

function submitGuess(event) {
  event.preventDefault(); // Prevent form submission or page reload

  const userGuess1 = guessInput1.value.trim().toLowerCase();
  const userGuess2 = guessInput2.value.trim().toLowerCase();

  // Log the user's guess to the console
  console.log("User's guess:", userGuess1, userGuess2);

  // Clear any previous message
  messageContainer.innerHTML = "";

  // Check if both words were guessed (in any order)
  if (
    (userGuess1 === currentAnswer[0] && userGuess2 === currentAnswer[1]) ||
    (userGuess1 === currentAnswer[1] && userGuess2 === currentAnswer[0])
  ) {
    console.log("Correct guess");
    updateCongratsMessage();
    images[currentIndex].guessed = true; // Update the guessed status
    checkmark.style.display = "block"; // Show the checkmark

    // Hide the submit button
    submitButton.style.display = "none";

    // Disable and style the input fields for the correctly guessed image
    guessInput1.disabled = true;
    guessInput2.disabled = true;
    guessInput1.classList.add("correct-guess");
    guessInput2.classList.add("correct-guess");
  } else {
    console.log("Incorrect guess");
    images[currentIndex].guessed = false; // Update the guessed status
    checkmark.style.display = "none"; // Hide the checkmark

    // Reset the style and enable the input fields for the incorrect guess
    guessInput1.classList.remove("correct-guess");
    guessInput2.classList.remove("correct-guess");
    guessInput1.disabled = false;
    guessInput2.disabled = false;

    // Check if one or both words are correct
    let incorrectGuess1 = true; // Flag to track incorrect guess for word 1
    let incorrectGuess2 = true; // Flag to track incorrect guess for word 2

    // Check if word 1 is correct
    if (userGuess1 === currentAnswer[0] || userGuess1 === currentAnswer[1]) {
      guessInput1.classList.add("correct-guess"); // Apply the correct-guess class
      incorrectGuess1 = false; // Set the flag for correct guess
    }

    // Check if word 2 is correct
    if (userGuess2 === currentAnswer[0] || userGuess2 === currentAnswer[1]) {
      guessInput2.classList.add("correct-guess"); // Apply the correct-guess class
      incorrectGuess2 = false; // Set the flag for correct guess
    }

    // Display messages based on the guess results
    if (incorrectGuess1 && incorrectGuess2) {
      updateTryAgainMessage();
      messageContainer.innerHTML = "<p class='message-text'>You have guessed both words incorrectly. Try again.</p>"; // Set the message
    } else if (!incorrectGuess1 && !incorrectGuess2) {
      messageContainer.innerHTML = "<p class='message-text'>You have guessed both words correctly!</p>"; // Set the message
    } else {
      messageContainer.innerHTML = "<p class='message-text'>You have guessed one word correctly. Guess the other word.</p>"; // Set the message
    }
  }
}

// Attach event listeners to the buttons
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);
submitButton.addEventListener("click", submitGuess);

// Show hint when the user clicks the hint button
function showHint(hintButton, hint) {
  hintButton.textContent = hint;
  hintButton.style.backgroundColor = "white";
}

// Attach event listeners to the hint buttons
hintButton1.addEventListener("click", function() { showHint(hintButton1, currentHints[0]) });
hintButton2.addEventListener("click", function() { showHint(hintButton2, currentHints[1]) });
