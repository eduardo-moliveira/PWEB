const form = document.getElementById("operationsForm");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const num1 = parseFloat(document.getElementById("num1").value);
	const num2 = parseFloat(document.getElementById("num2").value);

	const sum = num1 + num2;
	const subtraction = num1 - num2;
	const product = num1 * num2;
	const division = num1 / num2;
	const remainder = num1 % num2;

	const operationsResult = document.getElementById("operationsResult");

	operationsResult.innerHTML = `
        <h2>Resultados</h2>
        <p><strong>Soma:</strong> ${sum}</p>
        <p><strong>Subtração:</strong> ${subtraction}</p>
        <p><strong>Produto:</strong> ${product}</p>
        <p><strong>Divisão:</strong> ${division}</p>
        <p><strong>Resto:</strong> ${remainder}</p>
    `;
});
