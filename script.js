document.addEventListener("DOMContentLoaded", btnDetection);

function btnDetection() {
  let container = document.querySelector(".main-container")
  container.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const btn = e.target.textContent;

    if (btn !== "Clear" && btn !== "Delete") {
      display(btn);
    } else if (btn === "Clear" || btn === "Delete"){
      clearCalcState(btn);
    }

  });
}

const calcState = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
  
  pointUsed: false,
  negativeNumUsed: false,
  isNaN: false,

  findSecondOperand: function (para) {
    const expectedStart = this.firstOperand + this.operator;
    if (!expectedStart) {
      console.log("Expression format is invalid")
      return false;
    }
    const secondOperandStr = para.textContent.slice(expectedStart.length);
    if (secondOperandStr) {
      this.secondOperand = secondOperandStr;
      return true;
    } else {
      console.log("Second Operand is invalid or not found")
      return false;
    }
  }
}


function display(key) {
  const para = document.querySelector("p");
  const operators = ["+", "-", "x", "÷"];

  if (Number.isNaN(calcState.firstOperand)) {
    clearCalcState();
    para.textContent = "Invalid Input"
    return;
  } 

  if (key.includes(".") && !(calcState.pointUsed)) {
    
    calcState.pointUsed = true;
    para.textContent += key;
    return;
  } else if (key.includes(".") && calcState.pointUsed === true) return;

  if (operators.includes(key)) {

    //replace last operator with another
    if (operators.includes(para.textContent.slice(-1))) {
      para.textContent = para.textContent.replace(/.$/, key)
      calcState.operator = key;
      return;
    }

    if (calcState.firstOperand === "" && (/\d/.test(para.textContent))) {
      if (para.textContent === "0.") return;
      calcState.firstOperand = para.textContent;
    } else if (calcState.firstOperand !== "" && calcState.operator !== "") {
      //if last character in para is a number
      if (/^\d$/.test(para.textContent.slice(-1))) {
        calcState.findSecondOperand(para);
      } else return;
    } else if (calcState.firstOperand !== "" && calcState.operator === "") {
      calcState.firstOperand = para.textContent;
    }

    if (key !== "-" && !(/\d/.test(para.textContent))) {
      return;
    } else if (key === "-" && !calcState.firstOperand && !(calcState.negativeNumUsed) && !calcState.pointUsed) {
      para.textContent = key;
      calcState.negativeNumUsed = true;
      return;
    } else if (key === "-" && !calcState.firstOperand) return;

    if (calcState.firstOperand !== "" && calcState.secondOperand !== "") {
      calcState.firstOperand = operate();

      if (Number.isNaN(calcState.firstOperand)) {
        para.textContent = "Invalid Input"
        calcState.isNaN = true;
        clearCalcState();
        return;
      }

      calcState.operator = key;
      para.textContent = calcState.firstOperand;
      para.textContent += key;
      restartCalcState();
      //logCalcState()
      return;
    }

    if (calcState.firstOperand.toString().endsWith(".")) {
      calcState.firstOperand = calcState.firstOperand.slice(0, -1);
      para.textContent = para.textContent.slice(0, -1);
    }
    calcState.operator = key;
    calcState.pointUsed = false;
    calcState.negativeNumUsed = false;
  }

  if (key === "=" && calcState.firstOperand && calcState.operator) {
    if (!calcState.findSecondOperand(para)) {
      console.log("Second operand could not be found.");
      return;
    }
    logCalcState()

    console.log(calcState.firstOperand = operate());

    if (Number.isNaN(calcState.firstOperand)) {
      para.textContent = "Invalid Input"
      calcState.isNaN = true;
      clearCalcState();
      return;
    }

    para.textContent = calcState.firstOperand;

    restartCalcState("=");

    return;
  }

  if (key !== "=") para.textContent += key;
}

function restartCalcState(trigger) {
  if (trigger === "=") calcState.operator = "";
  if (trigger === "Clear") {
    calcState.firstOperand = "";
    calcState.operator = "";
  }
  calcState.secondOperand = "";

  calcState.prevResult = "";
  calcState.pointUsed = false;
  calcState.negativeNumUsed = false;
  calcState.isNaN = false;
}

function clearCalcState(value) {
  const para = document.querySelector("p");

  if (calcState.isNaN) {
    para.textContent = "";
    restartCalcState();
    return;
  }

  if (value == "Delete") {

    /*  if (secondOperand !== "") {
   
   
     } */
    if (calcState.operator !== "" && calcState.firstOperand !== "") {
      calcState.operator = "";
    }

    if (calcState.firstOperand !== "" && calcState.operator === "") {
      console.log(calcState.firstOperand);
      //converts firstOperand's value to a string and then removes the last value
      calcState.firstOperand = String(calcState.firstOperand).slice(0, -1);
    }

    if (calcState.firstOperand === "" && para.textContent === "") {
      return;
    }

    para.textContent = para.textContent.slice(0, -1);
  }

  if (value === "Clear") {
    para.textContent = "";
    console.log(para.textContent);
    restartCalcState("Clear");
  }

}

function operate(n1, n2, operator) {
  n1 = calcState.firstOperand;
  n2 = calcState.secondOperand;
  operator = calcState.operator;

  switch(operator) {
    case "+":
      return add(n1, n2)
    case "-":
      return subtract(n1, n2)
    case "x":
      return multiply(n1, n2)
    case "÷":
      return divide(n1, n2)
    default:
      "Invalid operation"
  }

}

function add(n1, n2) {
  return +n1 + +n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function logCalcState() {
  console.log("firstOperand: ", calcState.firstOperand);
  console.log("secondOperand: ", calcState.secondOperand);
  console.log("operator: ", calcState.operator);
  console.log("prevResult: ", calcState.prevResult);
  console.log("pointUsed: ", calcState.pointUsed);
  console.log("negativeNumUsed: ", calcState.negativeNumUsed);
}