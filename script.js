function add(n1, n2) {
  console.log(+n1 + +n2)
  return +n1 + +n2;
}

function subtract(n1, n2) {
  console.log(n1 - n2)

  return n1 - n2;
}

function multiply(n1, n2) {
  console.log(n1 * n2)
  return n1 * n2;
}

function divide(n1, n2) {
  console.log(n1 / n2)
  return n1 / n2;
}

function operate(value) {
  const operation = value.split(/([+\-x÷])/).filter(Boolean); // Split string in 3 w/o empty values
  if (operation.length < 3) return;

  console.log(operation)
  let [n1, operator, n2] = operation; // Array destructuring

  switch(operator) {
    case "+":
      add(n1, n2)
      break;
    case "-":
      subtract(n1, n2)
      break;
    case "x":
      multiply(n1, n2)
      break;
    case "÷":
      divide(n1, n2)
      break;
    default:
      "Invalid operation"
  }

}

function btnDetection() {
  let container = document.querySelector(".main-container")
  container.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const btn = e.target.textContent;

    if (btn !== "Clear" && btn !== "Delete") {
      display(btn);
    }

  });
}



function display(key) {
  const operators = ["+", "-", "x", "÷"];
  const para = document.querySelector("p");

  if (para.textContent.includes(".") && key === ".") return;

  if (operators.includes(para.textContent.slice(-1)) && operators.includes(key)) {
    //replace last operator with another
    para.textContent = para.textContent.replace(/.$/, key)
    return;
  }

  const checkOp = (op) => para.textContent.includes(op);

  //Allows multiple operators in a single operation without them being adjacent
  if (operators.some(checkOp) && operators.includes(key)) {

    operate(para.textContent);
    return;
  }

  if (key === "=") {
    operate(para.textContent);
    return;
  }

  para.textContent += key;
}