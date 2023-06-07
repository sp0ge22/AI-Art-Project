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

  // Show or hide the checkmark and submit button based on whether the image has been guessed
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
    submitButton.style.visibility = "visible"; // Make sure the submit button is visible
    guessInput1.disabled = false;
    guessInput2.disabled = false;
    guessInput1.classList.remove("correct-guess");
    guessInput2.classList.remove("correct-guess");
    guessInput1.value = ""; // Clear the input field value
    guessInput2.value = ""; // Clear the input field value
  }
}

function submitGuess(event) {
  event.preventDefault(); 

  const userGuess1 = guessInput1.value.trim().toLowerCase();
  const userGuess2 = guessInput2.value.trim().toLowerCase();

  console.log("User's guess:", userGuess1, userGuess2);

  messageContainer.innerHTML = "";

  if (
    (userGuess1 === currentAnswer[0] && userGuess2 === currentAnswer[1]) ||
    (userGuess1 === currentAnswer[1] && userGuess2 === currentAnswer[0])
  ) {
    console.log("Correct guess");
    images[currentIndex].guessed = true;
    checkmark.style.display = "block";

    submitButton.style.visibility = "hidden";

    guessInput1.disabled = true;
    guessInput2.disabled = true;
    guessInput1.classList.add("correct-guess");
    guessInput2.classList.add("correct-guess");
  } else {
    console.log("Incorrect guess");
    images[currentIndex].guessed = false;
    checkmark.style.display = "none";

    guessInput1.disabled = false;
    guessInput2.disabled = false;

    let incorrectGuess1 = userGuess1 !== currentAnswer[0] && userGuess1 !== currentAnswer[1];
    let incorrectGuess2 = userGuess2 !== currentAnswer[0] && userGuess2 !== currentAnswer[1];

    // Check if word 1 is correct
    if (!incorrectGuess1) {
      guessInput1.classList.add("correct-guess");
    } else {
      guessInput1.classList.add("incorrect-guess");
    }

    // Check if word 2 is correct
    if (!incorrectGuess2) {
      guessInput2.classList.add("correct-guess");
    } else {
      guessInput2.classList.add("incorrect-guess");
    }

    // Flash red and remove the style if guess is incorrect
    if (incorrectGuess1 || incorrectGuess2) {
      setTimeout(() => {
        guessInput1.classList.remove("incorrect-guess");
        guessInput2.classList.remove("incorrect-guess");
      }, 500); // remove the incorrect guess style after 0.5 seconds
    }
  }
}

// Function to handle keydown event on input fields
function handleInputKeyDown(event) {
  if (event.key === "Enter") {
    // Trigger the submit action
    submitGuess(event);
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

// Attach event listeners to the input fields for the keydown event
guessInput1.addEventListener("keydown", handleInputKeyDown);
guessInput2.addEventListener("keydown", handleInputKeyDown);
