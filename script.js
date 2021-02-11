// Marking important html elements constants
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// Adding variables for javascript
var timer = [0, 0, 0, 0];
var inter;
var runningTimer = false;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function zeroLead(time) {
    if (time <= 9) {
        time = "0"+time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function timerRun() {
    let timeCurrent = zeroLead(timer[0]) + ":" + zeroLead(timer[1]) + ":" + zeroLead(timer[2]);
    theTimer.innerHTML = timeCurrent;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor(timer[3]/100 - timer[0]*60);
    timer[2] = Math.floor(timer[3] - timer[1]*100 - timer[0]*60*100);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let enteredText = testArea.value;
    let textCheckOr = originText.substring(0, enteredText.length);
    if (enteredText == originText){
        testWrapper.style.border = "10px solid #01f52a";
        clearInterval(inter);
    } else {
        if (enteredText == textCheckOr) {
            testWrapper.style.border = "10px solid #f6fa00";
        } else {
            testWrapper.style.border = "10px solid red";
        }
    }

}

// Start the timer:
function start() {
    let enteredTextLen = testArea.value.length;
    if (enteredTextLen === 0 && !runningTimer){
        runningTimer = true;
        inter = setInterval(timerRun, 10);
    }
    console.log(enteredTextLen);
}

// Reset everything:
function reset() {
    clearInterval(inter);
    inter = null;
    timer = [0, 0, 0, 0];
    runningTimer = false;
    testArea.value  = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.border = "10px solid #f6fa00";
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);