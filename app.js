// definning the numbers inputs
const nums = document.getElementById('nums').children;
for (let i = 0; i < nums.length; i++) {
  nums[i].firstChild.addEventListener('click', inputNum);
}

// Operations
const division = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');

division.addEventListener('click', cal);
multiply.addEventListener('click', cal);
minus.addEventListener('click', cal);
plus.addEventListener('click', cal);

// Equal & All Clear & Delete
const equalTo = document.getElementById('equal');
const aC = document.getElementById('all-clear');
const del = document.getElementById('del');
// Equal & All Clear & Delete Event Listeners
equalTo.addEventListener('click', equal);
aC.addEventListener('click', allClear);
del.addEventListener('click', delSingleChar);

// Output
const output = document.getElementById('output');
const equation = document.getElementById('equation');

// Input Numbers array
let inputNumArr = [];
let number1 = 0;
let number2 = 0;
let result = 0;
let operator = '';
let operator2 = '';

// Operations Event Listeners
function cal(event) {
  if(operator === '') operator = event.target.innerText;
  if (equation.innerText && !equation.innerText.includes(operator) && output.innerText) {
    operator2 = event.target.innerText;
    console.log(operator2);
    equal();
  }
   else {
      operator2 = event.target.innerText;
      operator = operator2;
      operator2 = '';
      inputNumArr = [];
      outputEquation(number1);
  }
}

function equal() {
  number2 = parseFloat(output.innerText);
  number1 = parseFloat(equation.innerText);
  switch (operator) {
    case '/':
      result = number1 / number2;
      equation.innerText = `${number1} ${operator} ${number2} = ${result}`;
      break;
    case '*':
      result = number1 * number2;
      equation.innerText = `${number1} ${operator} ${number2} = ${result}`;
      break;
    case '-':
      result = number1 - number2;
      equation.innerText = `${number1} ${operator} ${number2} = ${result}`;
      break;
    case '+':
      result = number1 + number2;
      equation.innerText = `${number1} ${operator} ${number2} = ${result}`;
      break;
  }
  inputNumArr = [];
  number1 = result;
  operator = operator2;
  // operator = '';
  // operator2 = '';
  outputResult('');
}

function allClear() {
  inputNumArr = [];
  number1 = 0;
  number2 = 0;
  result = 0;
  operator = '';
  operator2 = '';
  output.innerText = '';
  equation.innerText = '';
  dot.addEventListener('click', inputNum);
}

function delSingleChar() {
  let delLast = number1.toString();
  inputNumArr = [];
  delLast = delLast.substring(0, delLast.length - 1);
  number1 = delLast;
  if (number1 % 1 === 0) dot.addEventListener('click', inputNum);
  inputNumArr[0] = number1;
  outputResult(number1);
  console.log(delLast);
}

function inputNum(event) {
  if(equation.innerText && equation.innerText.includes(operator)) {
    operator = operator2;
    operator2 = '';
    equation.innerText = '';
    equation.innerText = result;
    number1 = result;
  }
  else if(result > 0) {
    equation.innerText = result;
    number1 = parseFloat(output.innerText);
}
  inputNumArr.push(event.target.innerText);
  number1 = convertArrayToNum();
  outputResult(number1);
}

function convertArrayToNum() {
  let number = '';
  number += inputNumArr;
  number = number.replaceAll(',', '');
  if (number.includes('.'))
  dot.removeEventListener('click', inputNum);
  else if(parseFloat(number) % 1 === 0) dot.addEventListener('click', inputNum);
  return number;
}

function outputResult(num) {
  output.innerText = num;
}

function outputEquation(num) {
  output.innerText = '';
  equation.innerText = num;
}
