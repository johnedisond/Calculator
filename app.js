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
    if (firstNum !== "") {
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
    if (firstNum !== "" && secondNum !== "" && operator !== "") {
        result = -result;
    }
    currentDisplay.textContent = result;
})

function getDecimal() {
    decimalPoint.addEventListener("click", () => {
        if (!firstNum.includes(".")) {
            firstNum += ".";
            currentDisplay.textContent = `${firstNum}`;

        }
        if (operator !== "" && !secondNum.includes(".")) {
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


function operate() {
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
    resultAns();
}



function resultAns() {
    equals.addEventListener("click", () => {
        if (firstNum !== "" && operator !== "" && secondNum !== "") {
            operate();
            previousDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
            currentDisplay.textContent = checkAnsLength(result);
        }
        firstNum = checkAnsLength(result);
        secondNum = "";
    })

}
resultAns();


function checkAnsLength() {
    return Math.round(result * 1000) / 1000;

}