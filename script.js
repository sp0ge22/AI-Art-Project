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

// Message Elements
const congratsMessage = document.createElement("p");
congratsMessage.textContent = "Congratulations, you've guessed the image!";
congratsMessage.classList.add("congrats-message");
const tryAgainMessage = document.createElement("p");
tryAgainMessage.textContent = "Try again.";
tryAgainMessage.classList.add("try-again-message");

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
  } else {
    checkmark.style.display = "none";
    guessInput1.style.display = "block";
    guessInput2.style.display = "block";
    submitButton.style.display = "block";
  }
}

// Submit the user's guess
function submitGuess(event) {
  event.preventDefault(); // Prevent form submission or page reload

  const userGuess1 = guessInput1.value.trim().toLowerCase();
  const userGuess2 = guessInput2.value.trim().toLowerCase();

  // Log the user's guess to the console
  console.log("User's guess:", userGuess1, userGuess2);

  // Clear any previous message
  messageContainer.innerHTML = "";

  // check if both words were guessed (in any order)
  if ((userGuess1 === currentAnswer[0] && userGuess2 === currentAnswer[1]) || 
      (userGuess1 === currentAnswer[1] && userGuess2 === currentAnswer[0])) {
    console.log("Correct guess");
    messageContainer.appendChild(congratsMessage);
    images[currentIndex].guessed = true; // update the guessed status
    checkmark.style.display = "block"; // show the checkmark

    // Hide the submit button and guess fields
    document.getElementById('guess1').style.display = 'none';
    document.getElementById('guess2').style.display = 'none';
    document.querySelector('.submit-button').style.display = 'none';
  } else {
    console.log("Incorrect guess");
    messageContainer.appendChild(tryAgainMessage);
    images[currentIndex].guessed = false; // update the guessed status
    checkmark.style.display = "none"; // hide the checkmark
  }

  // Clear the input fields
  guessInput1.value = "";
  guessInput2.value = "";
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
