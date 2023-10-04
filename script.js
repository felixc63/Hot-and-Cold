const currentGuessTxt = document.getElementById("current-guess");
const subtractBtns = document.getElementsByClassName("subtract");
const logger = document.getElementById("logger");

let target = 0;
let currentGuess = 0;

function loadGame(){
    currentGuess = 50;
    target = Math.floor(Math.random()*100)+1;
    updateCurrentGuess(currentGuess);
    logger.innerHTML = "";   
}

function updateCurrentGuess(guessNum){
    currentGuessTxt.innerText = `Current Guess: ${guessNum}`;
}

function updateLogger(guessNum, hotOrCold){
    const p = document.createElement("p");
    p.innerHTML = `${guessNum}; ${hotOrCold}`;
}

function subtract(num){
    return currentGuess-num;
}

function add(num){
    return currentGuess+num;
}

loadGame;