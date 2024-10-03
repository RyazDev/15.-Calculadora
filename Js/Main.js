let currentValue = ''; // Almacena el valor actual
let previousValue = ''; // Almacena el valor anterior
let operator = ''; // Almacena el operador seleccionado

function clearDisplay() {
    currentValue = '';
    previousValue = '';
    operator = '';
    document.getElementById("display").value = '';
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    document.getElementById("display").value = currentValue;
}

function appendCharacter(character) {
    // Evitar ingresar operadores directamente en el display
    if (['+', '-', '*', '/', '%'].includes(character)) {
        selectOperator(character);
        return;
    }

    if (character === '.' && currentValue.includes('.')) return;

    currentValue += character;
    document.getElementById("display").value = currentValue;
}

function selectOperator(selectedOperator) {
    if (currentValue === '') return; // No hacer nada si no hay número actual

    if (previousValue !== '' && operator !== '') {
        calculateResult(); // Realizar la operación
    }

    operator = selectedOperator;
    previousValue = currentValue; // Guardar el número actual como el número previo
    currentValue = ''; // Limpiar para el siguiente número
}

function calculateResult() {
    if (previousValue === '' || operator === '' || currentValue === '') return; // No hacer nada si no hay operador o números

    let num1 = parseFloat(previousValue);
    let num2 = parseFloat(currentValue);

    // Validación básica de números
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("display").value = "Error";
        return;
    }

    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                result = "Error"; // Evitar división por cero
            } else {
                result = num1 / num2;
            }
            break;
        case '%':
            result = num1 % num2;
            break;
        default:
            result = "Error";
    }

    // Mostrar el resultado en el display
    document.getElementById("display").value = result;
    currentValue = result.toString(); // Convertir el resultado en el nuevo número actual
    previousValue = ''; // Limpiar el valor anterior
    operator = ''; // Limpiar el operador
}
