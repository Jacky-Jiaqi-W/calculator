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
    return Math.round(a / b * 100) / 100;
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
    return operate(operator, firstNumber, secondNumber);
}

function divideByZero(arr) {
    return (arr[1] === "/") && (arr[2] === "0");
}

function handlePressedNumbersBtn(pressedOperatorBtn) {
    if (resultDisplay.textContent !== "") {
        handlePressedClearBtn();
    }
    displayContent += pressedOperatorBtn.textContent;
    populateDisplay(equationDisplay, displayContent);
}

function handlePressedOperatorsBtn(pressedOperatorBtn) {
    if (displayContent !== "") {
        let arr = displayContent.trimEnd().split(" ");
        if (arr.length === 1) {
            displayContent = `${displayContent} ${pressedOperatorBtn.textContent} `;
        } else if (arr.length === 2) {
            arr[1] = pressedOperatorBtn.textContent;
            displayContent = arr.join(" ") + " ";;
        } else if (arr.length === 3) {
            if (divideByZero(arr)) {
                handlePressedClearBtn();
                populateDisplay(resultDisplay, "Error");
                return;
            }
            arr.length = 0;
            arr[0] = evaluate();
            arr[1] = pressedOperatorBtn.textContent;
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

function handlePressedBtn(pressedBtn) {
    switch (pressedBtn.className) {
        case "number":
            handlePressedNumbersBtn(pressedBtn);
            break;
        case "operators":
            handlePressedOperatorsBtn(pressedBtn);
            break;
        case "operators eval":
            handlePressedEvalBtn();
            break;
        case "ac":
            handlePressedClearBtn();
            break;
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

let firstNumber = null;
let secondNumber = null;
let operator = "";
let displayContent = "";