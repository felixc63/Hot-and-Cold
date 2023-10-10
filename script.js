const currentGuessTxt = document.getElementById("current-guess");
const guessLeftTxt = document.getElementById("guess-left");
const commitBtn = document.getElementById("commit");
const resetBtn = document.getElementById("reset");
const addBtns = document.getElementsByClassName("add");
const subtractBtns = document.getElementsByClassName("subtract");
const hotOrColdImg = document.getElementById("hot-or-cold");
const statusTxt = document.getElementById("status");
const logger = document.getElementById("logger");

let target = 0;
let currentGuess = 0;
let guessCounter = 0;
let win;
let gameEnd;

loadGame();

commitBtn.onclick = function(){
    if(win || guessCounter == 0){
        if(confirm("Error: The game has already ended.\nPress OK to reset now.")){
            resetBtn.click();
        } 
    }else{
        guessCounter--;
        updateCurrentGuess();
        updateLogger(updateStatus());
        if(win){
            statusTxt.style.color = "lightgreen";
            statusTxt.innerText = "Victory";
            hotOrColdImg.src = "images/victory.png";
            alert(`You have found the target, ${target}! You won!`);
        }else if(guessCounter == 0){
            statusTxt.style.color = "red";
            statusTxt.innerText = "Fail";
            hotOrColdImg.src = "images/fail.png";
            const h2 = document.createElement("h2");
            h2.textContent = `Target Number: ${target}`;
            document.getElementById("middle").appendChild(h2);
            alert(`You ran out of guesses. The target was ${target}. Click reset to try again.`);
        }
    }
}

resetBtn.onclick = function(){
    if(guessCounter == 0){
        document.getElementById("middle").removeChild(document.getElementById("middle").lastChild);
    }
    loadGame();
}

for(let i = 0; i < addBtns.length; i++){
    addBtns[i].onclick = function(){
        add(addBtns[i].textContent.substring(1));
    }
}

for(let i = 0; i < subtractBtns.length; i++){
    subtractBtns[i].onclick = function(){
        subtract(subtractBtns[i].textContent.substring(1));
    }
}

function loadGame(){
    currentGuess = 50;
    guessCounter = 5;
    win = false;
    statusTxt.innerHTML = "";
    hotOrColdImg.src = "";
    target = Math.floor(Math.random()*100)+1;
    updateCurrentGuess();
    logger.innerHTML = "";   
}

function updateCurrentGuess(){
    currentGuessTxt.innerText = `${currentGuess}`;
    guessLeftTxt.innerText = `${guessCounter}`;
}

function updateStatus(){
    let distance = Math.abs(currentGuess-target);
    let status;
    if(currentGuess == target){
        win = true;
        status = "Victory";
        return status;
    }
    if(guessCounter == 0){
        status = "Fail";
        return status;
    }
    if(distance >= 21){
        hotOrColdImg.src = "images/cold.png";
    }else{
        hotOrColdImg.src = "images/hot.png";
    }
    if(distance >= 56) {
        statusTxt.style.color = "#8A2BE2";
        status = "Very Cold";
    }else if (distance >= 41){
        statusTxt.style.color = "#9370DB";
        status = "Cold";
    }else if (distance >= 31){
        statusTxt.style.color = "#0000FF";
        status = "Very Cool";
    }else if (distance >= 21){
        statusTxt.style.color = "#87CEEB";
        status = "Cool";
    }else if (distance >= 16){
        statusTxt.style.color = "#FFD700";
        status = "Warm";
    }else if (distance >= 9){
        statusTxt.style.color = "#FFFF00";
        status = "Very Warm";
    }else if (distance >= 6){
        statusTxt.style.color = "#FFA500";
        status = "Hot";
    }else{
        statusTxt.style.color = "#FF0000";
        status = "Very Hot";
    }
    statusTxt.innerText = status;
    return status;
}

function updateLogger(status){
    const p = document.createElement("p");
    const span = document.createElement("span");
    if(status == "Very Cold"){
        span.style.color = "#8A2BE2";
    }else if(status == "Cold"){
        span.style.color = "#9370DB";
    }else if(status == "Very Cool"){
        span.style.color = "#0000FF";
    }else if(status == "Cool"){
        span.style.color = "#87CEEB";
    }else if(status == "Warm"){
        span.style.color = "#FFD700";
    }else if(status == "Very Warm"){
        span.style.color = "#FFFF00";
    }else if(status == "Hot"){
        span.style.color = "#FFA500";
    }else if(status == "Very Hot"){
        span.style.color = "#FF0000";
    }else if(status == "Victory"){
        span.style.color = "lightgreen";
    }else if(status == "Fail"){
        span.style.color = "red";
    }
    span.innerHTML = status;
    p.style.fontSize = "20px";
    p.style.marginLeft = "10px";
    p.innerHTML = `${currentGuess} `;
    p.append(span);
    logger.appendChild(p);
}

function add(num){
    if(currentGuess+Number(num) > 100){
        alert("Error: Cannot go above 100");
        return;
    }
    currentGuess+=Number(num);
    updateCurrentGuess();
}

function subtract(num){
    if(currentGuess-Number(num) < 1){
        alert("Error: Cannot go below 1");
        return;
    }
    currentGuess-=Number(num);
    updateCurrentGuess();
}
