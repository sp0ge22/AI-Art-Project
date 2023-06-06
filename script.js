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
  { src: 'ai-generated-image-1.png', answer: ['homeless', 'catfish'], title: 'Vagrant Mutant (by Rod)', hints: ['Vagabond', 'Tricked on tinder'] },
  { src: 'ai-generated-image-2.png', answer: ['keyboard', 'warrior'], title: 'League of Legends (by Spoge)', hints: ['Clickty Clackity', 'Come out and playyy'] },
  { src: 'ai-generated-image-3.png', answer: ['hockey', 'penguin'], title: 'Mighty Ducks (by Rod)', hints: ['Slap Shot', 'Ice Bird'] },
  { src: 'ai-generated-image-4.png', answer: ['icecube', 'bacon'], title: 'No thanks (by Spoge)', hints: ['Cool ya drink', 'Salty Meat'] },
  { src: 'ai-generated-image-5.png', answer: ['fish', 'car'], title: 'Bi-Modal Whip (by Spoge)', hints: ['Smells like your girl', 'Vroom Vroom'] },
  { src: 'ai-generated-image-6.png', answer: ['pineapple', 'landline'], title: 'Sweet 70s iPhone (by Rod)', hints: ['Spongebob Squarepants', 'What your parents call it'] },
  { src: 'ai-generated-image-7.png', answer: ['pork', 'police'], title: 'Stop you Swine (by Rod)', hints: ['Mmmm bacon', 'Blue Lives Matter'] },
  { src: 'ai-generated-image-8.png', answer: ['minecraft', 'borat'], title: 'Notch Your Average Khazastanian (by Spoge)', hints: ['New Legos', 'Very nice!'] },
  { src: 'ai-generated-image-9.png', answer: ['musical', 'chairs'], title: 'Rotating Vibes (by Spoge)', hints: ['Zack Efron', 'Take a seat'] },
  { src: 'ai-generated-image-10.png', answer: ['tomato', 'elevator'], title: 'Growing Up (by Rod/Spoge)', hints: ['ketchup father', 'Hold your farts'] },
  { src: 'ai-generated-image-11.png', answer: ['hat', 'house'], title: 'This one is good (by Rod)', hints: ['Yankee wit no brim', 'Domicile'] },
  { src: 'ai-generated-image-12.png', answer: ['squirrell', 'astronaut'], title: 'Godspeed Squeakie (by Spoge)', hints: ['Yard rodent', 'Neil Armstronk'] },
  { src: 'ai-generated-image-13.png', answer: ['alligator', 'chef'], title: 'Order Up (by Rod/Spoge)', hints: ['Florida mennace', 'Boppita Boopy'] },
  { src: 'ai-generated-image-14.png', answer: ['stone', 'hinge'], title: 'Archaic Technology (by Spoge)', hints: ['Rocky boy', 'Eee Errr Eee Errr'] },
  { src: 'ai-generated-image-15.png', answer: ['horse', 'playground'], title: 'Eqeustrian Recess (by Spoge)', hints: ['Pony Up Cowboy', 'Proving ground for kids'] },
  { src: 'ai-generated-image-16.png', answer: ['quirky', 'corks'], title: 'Wine about it (by Spoge)', hints: ['Silly, funny, goofy', 'Wine Cap'] },
  { src: 'ai-generated-image-17.png', answer: ['skatepark', 'church'], title: 'Shred the Sabbath (by Rod)', hints: ['Sick grinds my dude', 'Sunday Worship'] },
  { src: 'ai-generated-image-18.png', answer: ['hamburger', 'headlamp'], title: 'Hearty Splunking (by Rod)', hints: ['Nom Nom Nom', 'Torch Hat'] },
  { src: 'ai-generated-image-19.png', answer: ['samuari', 'vape'], title: 'Clouds of Tsushima (by Rod/Spoge', hints: ['Ninja warrior', 'Digital Dart'] },
  { src: 'ai-generated-image-20.png', answer: ['broccoli', 'quarry'], title: 'Exscavating Nutrients (by Spoge)', hints: ['Rolling up dat', 'A rocky place'] },


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
