// Get references to the HTML elements
const imageElement = document.querySelector(".ai-container img");
const guessInput1 = document.getElementById("guess1");
const guessInput2 = document.getElementById("guess2");
const regenerateButton = document.querySelector(".regenerate-container button");
const submitButton = document.querySelector(".guess-container button");
const messageContainer = document.querySelector(".message-container");
const titleElement = document.getElementById("image-title");
const hintButton1 = document.getElementById("hint1");
const hintButton2 = document.getElementById("hint2");

// Message Elements
const congratsMessage = document.createElement("p");
congratsMessage.textContent = "Congratulations, you've guessed the image!";
congratsMessage.classList.add("congrats-message");
const tryAgainMessage = document.createElement("p");
tryAgainMessage.textContent = "Try again.";
tryAgainMessage.classList.add("try-again-message");

const images = [
  { src: 'ai-generated-image-1.png', answer: ['surfing', 'monkey'], title: 'Kowabunga George', hints: ['Water skateboarding', 'Lil furry human'] },
  { src: 'ai-generated-image-2.png', answer: ['skunk', 'soup'], title: 'Essence of Pew', hints: ['Smelly boy', 'sluuuuurppp'] },
  { src: 'ai-generated-image-3.png', answer: ['porkchop', 'sandwiches'], title: 'The GI Special', hints: ['get the fuck outta here', 'you stupid idiot'] },
  // add as many images as you want...
];

let currentAnswer = []; // this will hold the correct answer
let currentHints = []; // this will hold the correct hints

// Generate a random number for the image filename
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Regenerate the AI-generated image
function regenerateImage() {
  const randomNumber = generateRandomNumber(0, images.length - 1); // get a random index
  const image = images[randomNumber]; // get the image at that index
  imageElement.src = image.src; // set the image source
  titleElement.textContent = image.title; // set the image title
  currentAnswer = image.answer; // store the correct answer
  currentHints = image.hints; // store the correct hints
  hintButton1.textContent = "Hint"; // reset the hint button
  hintButton2.textContent = "Hint"; // reset the hint button
  hintButton1.style.backgroundColor = "black"; // reset the hint button color
  hintButton2.style.backgroundColor = "black"; // reset the hint button color
  messageContainer.innerHTML = ""; // Clear any messages
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
  } else {
    console.log("Incorrect guess");
    messageContainer.appendChild(tryAgainMessage);
  }

  // Clear the input fields
  guessInput1.value = "";
  guessInput2.value = "";
}

// Attach event listeners to the buttons
regenerateButton.addEventListener("click", regenerateImage);
submitButton.addEventListener("click", submitGuess);

// Generate the first image when the script loads
regenerateImage();

// Show hint when the user clicks the hint button
function showHint(hintButton, hint) {
  hintButton.textContent = hint;
  hintButton.style.backgroundColor = "white";
}

// Attach event listeners to the hint buttons
hintButton1.addEventListener("click", function() { showHint(hintButton1, currentHints[0]) });
hintButton2.addEventListener("click", function() { showHint(hintButton2, currentHints[1]) });
