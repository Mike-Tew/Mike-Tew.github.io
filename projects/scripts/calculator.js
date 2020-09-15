const display = document.getElementById('display');
let operator = '';
let num1 = '';
let num2 = '';
let allowDecimal = true;

function decimal() {
  if (allowDecimal && num1 && !operator) {
    num1 += '.';
    allowDecimal = !allowDecimal;
    display.innerHTML = num1;
  }
  if (allowDecimal && num2) {
    num2 += '.';
    allowDecimal = !allowDecimal;
    display.innerHTML = num2;
  }
}

function input(num) {
  if (!operator) {
    num1 += num;
    display.innerHTML = num1;
  } else {
    num2 += num;
    display.innerHTML = num2;
  }
}

function opFunction(op) {
  if (num1) {
    operator = op;
    display.innerHTML = op;
    allowDecimal = !allowDecimal;
  }
}

function negative() {
  if (!operator) {
    num1 = -num1;
    display.innerHTML = num1;
  } else {
    num2 = -num2;
    display.innerHTML = num2;
  }
}

const calc = {
  '+': function (num1, num2) {
    return num1 + num2;
  },
  '-': function (num1, num2) {
    return num1 - num2;
  },
  '*': function (num1, num2) {
    return num1 * num2;
  },
  '/': function (num1, num2) {
    return num1 / num2;
  },
};

function equals() {
  if (num1 && num2 && operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    num1 = calc[operator](num1, num2);
    display.innerHTML = num1;
    num2 = '';
    operator = '';
  }
}

function reset() {
  display.innerHTML = '0';
  operator = '';
  num1 = '';
  num2 = '';
  allowDecimal = true;
}
