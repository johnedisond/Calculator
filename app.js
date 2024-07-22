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

const disableBtn = () => {
    for (let nums of numBtn) {
        nums.disabled = true;
    }
    for (let op of operatorBtn) {
        op.disabled = true;
    }
    equals.disabled = true;
    deleteLeft.disabled = true;
    sign.disabled = true;
    decimalPoint.disabled = true;
}

const disabledColor = () => {
    for (let nums of numBtn) {
        nums.classList.add("disableNums");
    }
    for (let op of operatorBtn) {
        op.classList.add("disableFunc");
    }
    deleteLeft.classList.add("disableNums");
    sign.classList.add("disableNums");
    decimalPoint.classList.add("disableNums");
    equals.classList.add("disableFunc");
}

allClear.addEventListener("click", () => {
    firstNum = "";
    secondNum = "";
    isFirstNum = false;
    isSecondNum = false;
    operator = "";
    result = "";
    previousDisplay.textContent = "";
    currentDisplay.textContent = "";
    for (let nums of numBtn) {
        nums.classList.remove("disableNums");
    }
    for (let op of operatorBtn) {
        op.classList.remove("disableFunc");
    }
    deleteLeft.classList.remove("disableNums");
    sign.classList.remove("disableNums");
    decimalPoint.classList.remove("disableNums");
    equals.classList.remove("disableFunc");
    for (let nums of numBtn) {
        nums.disabled = false;
    }
    for (let op of operatorBtn) {
        op.disabled = false;
    }
    equals.disabled = false;
    deleteLeft.disabled = false;
    sign.disabled = false;
    decimalPoint.disabled = false;
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
    if (firstNum !== "" && operator === "") {
        result = -firstNum;
        firstNum = result;
    }
    if (operator !== "" && secondNum !== "") {
        result = -secondNum;
        secondNum = result;
    }
    currentDisplay.textContent = result;
})


decimalPoint.addEventListener("click", () => {
    if (operator === "" && !firstNum.includes(".") || firstNum === -firstNum) {
        firstNum += ".";
        currentDisplay.textContent = `${firstNum}`;
    }
    if (operator !== "" && !secondNum.includes(".") || secondNum === -secondNum || firstNum === -firstNum.includes(".")) {
        secondNum += ".";
        currentDisplay.textContent = `${secondNum}`;
    }

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
        firstNum += num;
        currentDisplay.textContent = firstNum;
        getOperator();
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
            if (isFirstNum = true) {
                operator = opChoice.dataset.value;
                console.log(operator);
                previousDisplay.textContent = `${firstNum} ${operator}`;
            }
        })
    }
}


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
    firstNum = firstNum.toString();
    secondNum = secondNum.toString();
}


function operate() {
    equals.addEventListener("click", (e) => {


        if (firstNum !== "" && operator !== "" && secondNum !== "") {
            calculate()
            resultString = AnsLength().toString();
            if (resultString.length > 11) {
                previousDisplay.textContent = "";
                currentDisplay.textContent = `= ${resultString.slice(0, 9)}...`;
                disableBtn();
                disabledColor();

            } else if (firstNum !== "" && operator === "÷" && secondNum === "0") {
                previousDisplay.textContent = "";
                currentDisplay.textContent = "= Math.error";
                disableBtn();
                disabledColor();

            } else {
                previousDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
                currentDisplay.textContent = `= ${resultString}`;
            }
        }
        firstNum = resultString;
        secondNum = "";
    })
}
operate();


const AnsLength = function () {
    return Math.round(result * 1000) / 1000;
}
AnsLength();

addEventListener("keydown", (e) => {
    if (e.key === ".") {
        decimalPoint.click()
        decimalPoint.classList.add("press");
        setTimeout(() => {
            decimalPoint.classList.remove("press");
        }, 100);

    } else if (e.key === "Backspace") {
        deleteLeft.click()
        deleteLeft.classList.add("press");
        setTimeout(() => {
            deleteLeft.classList.remove("press");
        }, 100);

    } else if (e.key === "Enter") {
        equals.click()
        equals.focus();
        equals.classList.add("pressfunc");
        e.preventDefault();
        equals.classList.remove("pressfunc");

    } else if (e.key === "+") {
        handleOperator("+");

    } else if (e.key === "-") {
        handleOperator("-");

    } else if (e.key === "*") {
        handleOperator("×");

    } else if (e.key === "/") {
        handleOperator("÷");

    } else if (e.key >= "0" && e.key <= "9") {
        handleOperand(e.key);
    }
})

function handleOperator(operator) {
    const opChoice = Array.from(operatorBtn).find(btn => btn.textContent === operator);
    opChoice.click()
    opChoice.focus();
    opChoice.classList.add("pressfunc");
    opChoice.classList.remove("pressfunc");
}

function handleOperand(nums) {
    const numChoice = Array.from(numBtn).find(btn => btn.textContent === nums);
    numChoice.click()
    numChoice.classList.add("press");
    setTimeout(() => {
        numChoice.classList.remove("press");
    }, 100);
}