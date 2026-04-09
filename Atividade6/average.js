const form = document.getElementById("gradesForm");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = document.getElementById("name").value;

	const gradeInputs = Array.from(
		document.querySelectorAll(".js-grade-input"),
	);

	let gradesSum = 0;

	for (const input of gradeInputs) {
		gradesSum += parseFloat(input.value);
	}

	const average = gradesSum / gradeInputs.length;

	const gradesResult = document.getElementById("gradesResult");

	gradesResult.innerHTML = `
        <h2>Resultado</h2>
        <p><strong>Aluno:</strong> ${name}</p>
        <p><strong>Média:</strong> ${average.toFixed(2)}</p>
    `;
});
