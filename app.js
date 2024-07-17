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
let currentValue = "";
let operator = "";
let result = "";


allClear.addEventListener("click", () => {
    firstNum = "";
    secondNum = "";
    isFirstNum = false;
    isSecondNum = false;
    currentValue = "";
    operator = "";
    result = "";
    previousDisplay.textContent = "";
    currentDisplay.textContent = "";
})

deleteLeft.addEventListener("click", () => {
    if (firstNum !== "" && operator === "") {
        firstNum = firstNum.slice(0, -1);
        currentDisplay.textContent = firstNum;
    }
    if (operator !== "" && secondNum !== "") {
        secondNum = secondNum.slice(0, -1);
        currentDisplay.textContent = secondNum;
    }
})


sign.addEventListener("click", () => {
    if (firstNum !== "") {
        result = -firstNum;
        firstNum = result;

    }
    if (operator !== "" && secondNum !== "") {
        result = -secondNum;
        secondNum = result;
    }
    currentDisplay.textContent = result;
})

function getDecimal() {
    decimalPoint.addEventListener("click", () => {
        if (!firstNum.includes(".") || firstNum === -firstNum) {
            firstNum += ".";
            currentDisplay.textContent = `${firstNum}`;
        }
        if (operator !== "" && !secondNum.includes(".") || secondNum === -secondNum) {
            secondNum += ".";
            currentDisplay.textContent = `${secondNum}`;
        }
    })
}
getDecimal();


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
        firstNum += num;
        currentDisplay.textContent = firstNum;
    }
}

function getSecondNum(num) {
    if (firstNum !== "" && operator !== "" && secondNum.length < 10) {
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
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    if (operator === "+") {
        result = firstNum + secondNum;

    } else if (operator === "-") {
        result = firstNum - secondNum;

    } else if (operator === "×") {
        result = firstNum * secondNum;

    } else if (operator === "÷") {
        result = firstNum / secondNum;
    }

}



function operate() {
    equals.addEventListener("click", () => {
        calculate();
        currentValue = checkAnsLength().toString();
        firstNum = firstNum.toString();
        secondNum = secondNum.toString();

        if (currentValue.length > 11) {
            previousDisplay.textContent = "";
            currentDisplay.textContent = "Error";

        } else if (firstNum !== "" && operator !== "" && secondNum !== "") {
            previousDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
            currentDisplay.textContent = currentValue;

        }
        if (secondNum === "0") {
            previousDisplay.textContent = "";
            currentDisplay.textContent = "Math.error";
        }
        firstNum = currentValue;
        secondNum = "";

    })

}
operate();


function checkAnsLength() {
    return Math.round(result * 1000) / 1000;
}