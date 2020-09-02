const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const finishedWord = document.querySelector('#finishedWord')
// words to put into game when it loads
// instead of pulling words from the words array
// fetch words from a word api to generate random words
// const words = ["application", "programming", "interface", "wizard"];
const words = [
  "how",
  "about",
  "each",
  "nice",
  "than",
  "walk",
  "after",
  "every",
  "jump",
  "now",
  "thank",
  "want",
  "again",
  "find",
  "just",
  "old",
  "way",
  "also",
  "first",
  "keep",
  "only",
  "them",
  "went",
  "high",
  "right",
  "left",
  "write",
  "your",
  "think",
  "word",
  "work",
  "day",
  "live",
  "been",
  "had",
  "many",
  "use",
  "were",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function inputFree() {
  let freeLetter = selectedWord[[Math.floor(Math.random() * selectedWord.length)]];
  correctLetters.push(freeLetter);
}

console.log(selectedWord);



// Show the hidden word
function displayWord() {
    console.log("array:", correctLetters);
    wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
    <span class='letter'>
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")}
`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  //   console.log(wordEl.innerText, innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

// update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
    `;
  // Display parts for figure
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    // console.log(part, index);
    if (index < errors) {
      //   console.log("in if", part, index);
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check if you lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Sorry you lost.";
    finishedWord.innerText = `${selectedWord}`
    setTimeout(() => {
      popup.style.display = "flex";
    }, 700);
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    // console.log(letter);
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        //  console.log(correctLetters)
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
    // console.log('correct',correctLetters)
    // console.log('wrong',wrongLetters)
  }
});

// Restart game and play again

playAgainBtn.addEventListener("click", () => {
  // Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
    // get random word
  selectedWord = words[Math.floor(Math.random() * words.length)];
  // console.log(freeLetter);
  console.log(selectedWord);
  
  // remove popup
  popup.style.display = "none";

  // remove wrong letters element
  updateWrongLettersEl();
  inputFree();
  displayWord();
});

inputFree();
displayWord();
