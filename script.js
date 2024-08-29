function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 + n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function operate(n1, operator, n2) {
  switch(operator) {
    case "+":
      add(n1, n2)
      break;
    case "-":
      subtract(n1, n2)
      break;
    case "*":
      multiply(n1, n2)
      break;
    case "/":
      divide(n1, n2)
      break;
    default:
      "Invalid operation"
  }
}