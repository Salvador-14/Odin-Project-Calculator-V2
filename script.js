document.addEventListener("DOMContentLoaded", btnDetection);

function btnDetection() {
  let container = document.querySelector(".main-container")
  container.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const btn = e.target.textContent;

    if (btn !== "Clear" && btn !== "Delete") {
      display(btn);
    } else if (btn === "Clear" || btn === "Delete"){

    }

  });
}

const calcState = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
  
  pointUsed: false,
  negativeNumUsed: false,
}

function logCalcState() {
  console.log("firstOperand: ", calcState.firstOperand);
  console.log("secondOperand: ", calcState.secondOperand);
  console.log("operator: ",   calcState.operator);
  console.log("prevResult: ", calcState.prevResult);
  console.log("pointUsed: ", calcState.pointUsed);
  console.log("negativeNumUsed: ", calcState.negativeNumUsed);
}

function display(key) {
  const para = document.querySelector("p");
  const operators = ["+", "-", "x", "÷", "="];

  if (key.includes(".") && !(calcState.pointUsed)) {
    
    calcState.pointUsed = true;
    para.textContent += key;
    return;
  } else if (key.includes(".") && calcState.pointUsed === true) return;


  if (operators.includes(key)) {

    if (key !== "-" && !(/\d/.test(para.textContent))) {
      return;
    } else if (key === "-" && !(/\d/.test(para.textContent)) && !(calcState.negativeNumUsed) ) {
      para.textContent = key;
      calcState.negativeNumUsed = true;
      return;
    }

    if (calcState.firstOperand === "") {
      calcState.firstOperand = para.textContent;
    } else if (calcState.firstOperand !== "" && calcState.operator !== "" ){
      console.log(para.textContent.match(/[+\-x÷](\d*\.?\d+)/));
      calcState.secondOperand = para.textContent.match(/[+\-x÷](\d*\.?\d+)/)[1];
    }

    if (key === "=" & calcState.firstOperand !== "" && calcState.secondOperand !== "" ) {
      console.log(operate())
  
      calcState.firstOperand = operate();
      para.textContent = calcState.firstOperand;
      restartCalcState("=");
      logCalcState()
  
      return;
    }


    if (calcState.firstOperand !== "" && calcState.secondOperand !== "" ) {
      console.log(operate())

      calcState.firstOperand = operate();
      calcState.operator = key;
      para.textContent = calcState.firstOperand;
      para.textContent += key;
      restartCalcState();
      //logCalcState()
      return;
    }

    calcState.operator = key;
    //replace last operator with another
    if (operators.includes(para.textContent.slice(-1))) {
      para.textContent = para.textContent.replace(/.$/, key)
      calcState.operator = key;
      return;
    }

    calcState.pointUsed = false;
    calcState.negativeNumUsed = false;
  }
 
 
  
  para.textContent += key;
}

function restartCalcState(trigger) {
  if (trigger === "=") calcState.operator = "";
  calcState.secondOperand = "";
  //calcState.firstOperand = "";


  calcState.prevResult = "";
  calcState.pointUsed = false;
  calcState.negativeNumUsed = false;
}

function clearCalcState() {
  
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
  //console.log(+n1 + +n2)
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

