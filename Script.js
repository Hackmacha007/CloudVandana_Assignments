const display = document.getElementById("display");
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', e => {
        const operator = e.target.textContent;
        updateDisplay(operator);
    });
});

document.addEventListener('keydown', e => {
    let key;
    switch (e.key) {
        case 'Backspace':
            key = "DEL";
            break;
        case 'Delete':
            key = "C";
            break;
        case 'Enter':
            key = "=";
            break;
        case '*':
            key = "×";
            break;
        case '/':
            e.preventDefault();
            key = "÷";
            break;
        default:
            key = e.key;
    }

    updateDisplay(key);
});

function updateDisplay(operator) {
    if (/^\d|\./.test(operator)) {
        display.textContent += operator;
    } else if (/[\÷×\-+]/.test(operator)) {
        if (display.textContent === "") {
            display.textContent = `0 ${operator} `;
        } else {
            display.textContent += ` ${operator} `;
        }
    } else if (operator === "C") {
        display.textContent = "";
    } else if (operator === "DEL") {
        if (display.textContent.slice(-1) === " ") {
            display.textContent = display.textContent.slice(0,-3);
        } else {
            display.textContent = display.textContent.slice(0,-1);
        }
    } else if (operator === "+-") {
        const arr = display.textContent.split(" ");
        const lastElement = arr.length - 1;
        arr[lastElement] = arr[lastElement].includes("-") 
            ? arr[lastElement].slice(1)
            : `-${arr[lastElement]}`;
        display.textContent = arr.join(" ");
    }

    const contentArr = display.textContent.split(" ");
    if (contentArr.length === 5 || operator === "=") {
        operate(contentArr[1], contentArr[0], contentArr[2], contentArr[3]);
    }
}

function operate(operator, a, b, lastChar) {
    let result;
    switch (operator) {
        case "÷":
            result = a / b;
            break;
        case "×":
            result = a * b;
            break;
        case "-":
            result = a - b;
            break;
        case "+":
            result = +a + +b;
            break;
        default:
            display.textContent = "ERROR";
            break;
    }

    display.textContent = result.toString().slice(0, 14);
    if (/[÷×\-+]/.test(lastChar)) {
        display.textContent += ` ${lastChar} `;
    }
}
