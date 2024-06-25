const display = document.querySelector(".result-container");
const subDisplay = document.querySelector(".calculations-container");
const keysContainer = document.querySelector(".numbers-container");
const clearDelContainer = document.querySelector(".clear-del-container");

// Global variables
let numberOne = "";
let numberTwo = "";
let curOperator = null;
let cleanDisplay = true;
const decimals = 3;
const keyOperators = ["+", "-", "*", "/"];

keysContainer.addEventListener("click", function (e) {
  const key = e.target;
  if (!key.classList.contains("keys")) return;

  if (key.classList.contains("numbers")) {
    if (cleanDisplay) clearDisplay();
    if (display.textContent === "0") display.textContent = "";
    if (hasPointKey(display.textContent) && key.textContent === ".") return;
    displayNumber(key.textContent);
  }

  if (key.classList.contains("operators")) {
    if (curOperator) {
      evaluate();
    }
    numberOne = +display.textContent;
    curOperator = key.textContent;
    subDisplay.textContent = `${numberOne} ${curOperator}`;
    cleanDisplay = true;
  }

  if (key.classList.contains("equal")) {
    evaluate();
  }
});

window.addEventListener("keydown", function (e) {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    if (cleanDisplay) clearDisplay();
    if (display.textContent === "0") display.textContent = "";
    if (hasPointKey(display.textContent) && e.key === ".") return;
    displayNumber(e.key);
  }
  if (keyOperators.includes(e.key)) {
    if (curOperator) {
      evaluate();
    }
    numberOne = +display.textContent;
    curOperator = e.key;
    if (curOperator === "/") curOperator = "÷";
    if (curOperator === "*") curOperator = "x";
    subDisplay.textContent = `${numberOne} ${curOperator}`;
    cleanDisplay = true;
  }
  if (e.key === "=" || e.key === "Enter") {
    evaluate();
  }
  if (e.key === "Backspace") {
    if (display.textContent === "0") return;
    display.textContent = display.textContent.split("").slice(0, -1).join("");
  }
});

function hasPointKey(numberString) {
  return numberString.split("").includes(".");
}

function evaluate() {
  if (curOperator === null || cleanDisplay) return;
  if (curOperator === "÷" && displayNumber.textContent === "0") {
    alert(`You can't divide by zero`);
  }
  if (curOperator === "/") curOperator = "÷";
  if (curOperator === "*") curOperator = "x";
  numberTwo = display.textContent;
  subDisplay.textContent = `${numberOne} ${curOperator} ${numberTwo} =`;
  display.textContent = operate(numberOne, numberTwo, curOperator);
  numberTwo = "";
  curOperator = null;
}

clearDelContainer.addEventListener("click", function (e) {
  const button = e.target;
  if (!button.classList.contains("btn-clear-del")) return;

  if (button.classList.contains("btn-clear")) {
    numberOne = "";
    numberTwo = "";
    curOperator = null;
    cleanDisplay = true;
    display.textContent = "0";
    subDisplay.textContent = "";
  }

  if (button.classList.contains("btn-delete")) {
    if (display.textContent === "0") return;
    display.textContent = display.textContent.split("").slice(0, -1).join("");
  }
});

// Helper functions
function displayNumber(number) {
  if (display.textContent === "0" && number === "0") return;
  display.textContent += number;
}

function clearDisplay() {
  display.textContent = "";
  cleanDisplay = false;
}

// Operate fuction
function operate(a, b, operator) {
  a = +a;
  b = +b;
  if (operator === "+") return add(a, b);
  else if (operator === "-") return subtract(a, b);
  else if (operator === "x") return multiply(a, b);
  else if (operator === "÷") return divide(a, b);
  else return null;
}

// Basic functions
function add(a, b) {
  return +(a + b).toFixed(decimals);
}
function subtract(a, b) {
  return +(a - b).toFixed(decimals);
}
function multiply(a, b) {
  return +(a * b).toFixed(decimals);
}
function divide(a, b) {
  if (b === 0) return null;
  return +(a / b).toFixed(decimals);
}