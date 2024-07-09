const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");

const numBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const allClear = document.querySelector(".clear");
const deleteLeft = document.querySelector(".erase");
const sign = document.querySelector(".sign");
const decimalPoint = document.querySelector(".decimal");
const equals = document.querySelector(".equals");


let firstNum = "";
let secondNum = "";
let isFirstNum = false;
let isSecondNum = false;
let operator = "";
let result = "";


allClear.addEventListener("click", () => {
    firstNum = "";
    secondNum = "";
    isFirstNum = false;
    isSecondNum = false;
    operator = "";
    result = "";
    previousDisplay.textContent = "";
    currentDisplay.textContent = "";
})

deleteLeft.addEventListener("click", () => {
    if (firstNum !== "") {
        firstNum = firstNum.toString().slice(0, -1);
        currentDisplay.textContent = firstNum;
    }
    if (secondNum !== "" && operator !== "") {
        secondNum = secondNum.toString().slice(0, -1);
        currentDisplay.textContent = secondNum;
    }
})


sign.addEventListener("click", () => {
    if (firstNum !== "") {
        result = -firstNum;
        firstNum = result;
    }
    currentDisplay.textContent = result;
})




for (let number of numBtn) {
    number.addEventListener("click", () => {
        const numValue = number.dataset.value;
        console.log(numValue);
        if (isFirstNum === false) {
            getFirstNum(numValue);
        }
        if (isSecondNum === false) {
            getSecondNum(numValue);
        }
    })
}

function getFirstNum(num) {
    if (firstNum.length < 10) {
        currentDisplay.textContent = "";
        firstNum += num;
        currentDisplay.textContent = firstNum;
    }
}

function getSecondNum(num) {
    if (firstNum !== "" && operator !== "" && secondNum.length < 10) {
        currentDisplay.textContent = "";
        secondNum += num;
        currentDisplay.textContent = secondNum;
    }
}

function getOperator() {
    for (let opChoice of operatorBtn) {
        opChoice.addEventListener("click", () => {
            operator = opChoice.dataset.value;
            console.log(operator);
            isFirstNum = true;
            previousDisplay.textContent = `${firstNum} ${operator}`;
        })
    }
}
getOperator();


function calculate() {
    equals.addEventListener("click", () => {
        currentDisplay.textContent = "";
        firstNum = parseInt(firstNum);
        secondNum = parseInt(secondNum);
        if (operator === "+") {
            result = firstNum + secondNum;

        } else if (operator === "-") {
            result = firstNum - secondNum;

        } else if (operator === "×") {
            result = firstNum * secondNum;

        } else if (operator === "÷") {
            result = firstNum / secondNum;
        }
        previousDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
        currentDisplay.textContent = `= ${result}`;
        firstNum = result;
        secondNum = "";
    })
    if (result !== "" && isFirstNum === true) {
        firstNum = "";
        secondNum = "";
        isFirstNum = false;
        isSecondNum = false;
        operator = "";
        result = "";
        previousDisplay.textContent = "";
    }
}
calculate();
