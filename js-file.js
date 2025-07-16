function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
    }
}

function evaluate() {
    let arr = displayContent.split(" ");
    firstNumber = +arr[0];
    operator = arr[1];
    secondNumber = +arr[2];
    return Math.round(operate(operator, firstNumber, secondNumber) * 100) / 100;
}

function divideByZero(arr) {
    return (arr[1] === "/") && (arr[2] === "0");
}

function handlePressedNumbersBtn(numberStr) {
    if (resultDisplay.textContent !== "") {
        handlePressedClearBtn();
    }
    displayContent += numberStr;
    populateDisplay(equationDisplay, displayContent);
}

function handlePressedOperatorsBtn(operator) {
    if (displayContent !== "") {
        let arr = displayContent.trimEnd().split(" ");
        if (arr.length === 1) {
            displayContent = `${displayContent} ${operator} `;
        } else if (arr.length === 2) {
            arr[1] = operator;
            displayContent = arr.join(" ") + " ";;
        } else if (arr.length === 3) {
            if (divideByZero(arr)) {
                handlePressedClearBtn();
                populateDisplay(resultDisplay, "Error");
                return;
            }
            arr.length = 0;
            arr[0] = evaluate();
            arr[1] = operator;
            displayContent = arr.join(" ") + " ";
            resultDisplay.textContent = "";
        }
        populateDisplay(equationDisplay, displayContent);
    }
}

function handlePressedEvalBtn() {
    let arr = displayContent.trimEnd().split(" ");
    if (arr.length === 3) {
        if (divideByZero(arr)) {
            handlePressedClearBtn();
            populateDisplay(resultDisplay, "Error");
            return;
        }
        populateDisplay(resultDisplay, evaluate());
    }
}

function handlePressedClearBtn() {
    firstNumber = null;
    secondNumber = null;
    operator = "";
    displayContent = "";
    populateDisplay(equationDisplay, "");
    populateDisplay(resultDisplay, "");
}

function handlePressedDecimalBtn() {
    let arr = displayContent.trimEnd().split(" ");
    switch (arr.length) {
        case 1:
            if (arr[0] !== "" && !arr[0].includes(".")) {
                displayContent += ".";
            }
            break;
        case 3:
            if (!arr[2].includes(".")) {
                displayContent += ".";
            }
            break;
    }
    populateDisplay(equationDisplay, displayContent);
}

function handlePressedDeleteBtn() {
    if (displayContent !== "") {
        if (displayContent.endsWith(" ")) {
            displayContent = displayContent.slice(0, displayContent.length - 3);
        } else {
            displayContent = displayContent.slice(0, displayContent.length - 1);
        }
        populateDisplay(equationDisplay, displayContent);
    }
}

function handlePressedBtn(pressedBtn) {
    switch (pressedBtn.className) {
        case "number":
            handlePressedNumbersBtn(pressedBtn.textContent);
            break;
        case "operators":
            handlePressedOperatorsBtn(pressedBtn.textContent);
            break;
        case "operators eval":
            handlePressedEvalBtn();
            break;
        case "ac":
            handlePressedClearBtn();
            break;
        case "decimal":
            handlePressedDecimalBtn();
            break;
        case "del":
            handlePressedDeleteBtn();
            break;
    }
}

function handleKeyboard(key) {
    // Numbers (0-9)
    if (!isNaN(key) && key !== " ") {
        handlePressedNumbersBtn(key);
        return;
    }
    // Operators
    if (["+", "-", "*", "/"].includes(key)) {
        handlePressedOperatorsBtn(key);
        return;
    }
    if (key === ".") {
        handlePressedDecimalBtn();
        return;
    }
    // Enter or = → evaluate
    if (key === "Enter" || key === "=") {
        // e.preventDefault();
        handlePressedEvalBtn();
        return;
    }
    // Backspace → delete
    if (key === "Backspace") {
        handlePressedDeleteBtn();
        return;
    }
    // Escape → clear
    if (key === "Escape") {
        handlePressedClearBtn();
        return;
    }
}

const equationDisplay = document.querySelector(".equation");
const resultDisplay = document.querySelector(".result");

function populateDisplay(targetElement, displayContent) {
    targetElement.textContent = displayContent;
}

const keypad = document.querySelector(".keypad");

keypad.addEventListener("click", e => {
    handlePressedBtn(e.target);
});

document.addEventListener("keydown", e => {
    const key = e.key;
    handleKeyboard(key);
});

let firstNumber = null;
let secondNumber = null;
let operator = "";
let displayContent = "";