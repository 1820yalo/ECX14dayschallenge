let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

//This function appends a number to the display value
function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

//This function sets the current operation to the given operation
//If there is already a current operation, it will compute the result of the current operation
//It will then set the first operand to the current display value
//The current operation will be set to the given operation
//The display value will be set to an empty string
function setOperation(operation) {
    if (currentOperation !== null) compute();
    firstOperand = displayValue;
    currentOperation = operation;
    displayValue = '';
}

// This function is used to compute the result of the current operation
function compute() {
    // If there is no current operation or the display value is empty, return
    if (currentOperation === null || displayValue === '') return;
    // Set the second operand to the current display value
    secondOperand = displayValue;
    
    // Create an object to store the operations
    const operations = {
        // Addition
        '+': () => parseFloat(firstOperand) + parseFloat(secondOperand),
        // Subtraction
        '-': () => parseFloat(firstOperand) - parseFloat(secondOperand),
        // Multiplication
        '*': () => parseFloat(firstOperand) * parseFloat(secondOperand),
        // Division
        '/': () => secondOperand != 0 ? parseFloat(firstOperand) / parseFloat(secondOperand) : 'Error',
        '^': () => Math.pow(parseFloat(firstOperand), parseFloat(secondOperand))
    };

    displayValue = operations[currentOperation]().toString();
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    updateDisplay();
}

//This function clears the display and resets all variables
function clearDisplay() {
    //Set the display value to an empty string
    displayValue = '';
    //Set the first operand to null
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    updateDisplay();
}

//This function deletes the last character from the displayValue variable
function deleteLast() {
    displayValue = displayValue.toString().slice(0, -1);
    updateDisplay();
}

//This function updates the display on the webpage with the value of the variable 'displayValue'
//Function to update the display
function updateDisplay() {
    //Get the element with the id 'display' and set its inner text to the value of the variable 'displayValue'
    document.getElementById('display').innerText = displayValue;
}

document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('calculator').classList.toggle('dark-mode');
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.toggle('dark-mode');
    });
    document.querySelector('.display').classList.toggle('dark-mode');
});

//This function computes the square root of the current value displayed on the calculator
function computeSquareRoot() {
    //Calculate the square root of the current value and convert it to a string
    displayValue = Math.sqrt(parseFloat(displayValue)).toString();
    //Update the display with the new value
    updateDisplay();
}

//This function takes the value of the display and divides it by 100, then updates the display with the new value
function computePercentage() {
    //Convert the display value to a float and divide it by 100
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}

//This function computes the exponentiation of the current operation
function computeExponentiation() {
    //If there is a current operation, compute it
    if (currentOperation !== null) compute();
    //Set the first operand to the current display value
    firstOperand = displayValue;
    //Set the current operation to exponentiation
    currentOperation = '^';
    //Set the display value to an empty string
    displayValue = '';
}

document.querySelector('.buttons').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn')) {
        const buttonValue = event.target.getAttribute('data-value');
        if (buttonValue) {
            switch (buttonValue) {
                case 'clear':
                    clearDisplay();
                    break;
                case 'delete':
                    deleteLast();
                    break;
                case 'equals':
                    compute();
                    break;
                case 'sqrt':
                    computeSquareRoot();
                    break;
                case 'percent':
                    computePercentage();
                    break;
                case 'power':
                    computeExponentiation();
                    break;
                default:
                    appendNumber(buttonValue);
            }
        }
    }
});

