let dictionaryWords = [];
let secretWord = "";
let guessedLetters = "";
let fails = 0;
let foundALetter = 0;
let displayedWord = [];

fetch('dictionary.json')
    .then(response => response.json())
    .then(data => {
        dictionaryWords = data.words;
        Play();
    });

function Play() {
    document.getElementById('cheater').style.visibility = "hidden";
    document.getElementById("HangedMan").src = "Stickman/Hangman_0.png";
    fails = 0;
    guessedLetters = "Guessed Letters: ";
    document.getElementById("guessed").innerText = guessedLetters;
    secretWord = dictionaryWords[Math.floor(Math.random() * dictionaryWords.length)].toUpperCase();
    displayedWord = "_".repeat(secretWord.length).split("");
    document.getElementById("secretWord").innerText = displayedWord.join(" ");
    document.getElementById("cheater").innerText = secretWord;
    document.querySelectorAll("button.key").forEach(btn => {
        btn.disabled = false;
    });
}

function Tap(button) {
    button.disabled = true;
    if (guessedLetters.includes(button.id)) {
        return;
    }
    guessedLetters += button.id;
    document.getElementById("guessed").innerText = guessedLetters;
    foundALetter = 0;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === button.id) {
            displayedWord[i] = button.id;
            foundALetter += 1;
        }
    }
    if (foundALetter === 0) {
        fails += 1;
        document.getElementById("HangedMan").src = "Stickman/Hangman_" + fails + ".png";
    }
    document.getElementById("secretWord").innerText = displayedWord.join(" ");
    if(fails === 6){
        document.getElementById("HangedMan").src = "Stickman/Hangman_6.png";
        alert("You lost, try again");
        Play()
    }
    if(displayedWord.join("") === secretWord){
        alert("You won");
        Play()
    }
}

window.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    if (key === 'ENTER') {
        Play();
        return;
    }
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
        const button = document.querySelector(`button[id="${key}"]`);
        if (button && !button.disabled) {
            Tap(button);
        }
    }
});

function ToggleWord() {
    const hidden = document.getElementById('cheater');
    if (!hidden) return;
    hidden.style.visibility =
        getComputedStyle(hidden).visibility === 'hidden'
            ? 'visible'
            : 'hidden';
}