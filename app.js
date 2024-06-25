let previousDisplay = document.querySelector(".previous");
let currentDisplay = document.querySelector(".current");

const clearScreen = document.querySelector(".clear");
const eraseLeft = document.querySelector(".erase");

const signButton = document.querySelector(".sign");
const decimalButton = document.querySelector(".decimal");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");


let previousValue = "";
let currentValue = "";
let operator = undefined;


// for (let numChoice of numberButtons) {
//     numChoice.addEventListener("click", (e) => {
//         display(e.target.textContent);
//         currentOperand.textContent = `= ${currentValue}`;
//     })
// }

for (let numChoice of numberButtons) {
    numChoice.addEventListener("click", (e) => {
        const value = numChoice.textContent;
        display(value);
        currentDisplay.textContent = `${currentValue}`;
    })
}

for (let operatorChoice of operatorButtons) {
    operatorChoice.addEventListener("click", (e) => {
        const opChoice = operatorChoice.textContent;
        opDisplay(opChoice);
        previousDisplay.textContent = `${previousValue} ${opChoice} ${currentValue}`;
        currentDisplay.textContent = currentValue;
    })
}


function display(value) {
    if (currentValue.length < 10) {
        currentValue += value;
    }
}


function opDisplay(opChoice) {
    operator = opChoice;
    previousValue = currentValue;
    currentValue = "";
}


clearScreen.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = undefined;
    previousDisplay.textContent = "";
    currentDisplay.textContent = "";
})