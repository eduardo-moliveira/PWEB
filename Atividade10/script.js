const classifications = [
	{ label: "Magreza", obesityLevel: 0, upperBound: 18.5 },
	{ label: "Normal", obesityLevel: 0, upperBound: 25 },
	{ label: "Sobrepeso", obesityLevel: 1, upperBound: 30 },
	{ label: "Obesidade", obesityLevel: 2, upperBound: 40 },
	{ label: "Obesidade Grave", obesityLevel: 3, upperBound: null },
];

function getBMIClassification(weight, height) {
	const bmi = weight / (height * height);

	for (const classification of classifications) {
		if (
			classification.upperBound === null ||
			bmi < classification.upperBound
		) {
			return {
				bmi,
				label: classification.label,
				obesityLevel: classification.obesityLevel,
			};
		}
	}

	return { bmi, label: "Desconhecido", obesityLevel: 0 };
}

function calculate(event) {
	event.preventDefault();

	const height = parseFloat(document.getElementById("height").value);
	const weight = parseFloat(document.getElementById("weight").value);
	const resultSection = document.getElementById("imcResult");

	const result = getBMIClassification(weight, height);
	const degree =
		result.obesityLevel === 0 ? "0" : "I".repeat(result.obesityLevel);

	resultSection.innerHTML = `
      <h2>Resultado</h2>
      <p><strong>IMC:</strong> ${result.bmi.toFixed(2).replace(".", ",")}</p>
      <p><strong>Classificação:</strong> ${result.label}</p>
      <p><strong>Obesidade (Grau):</strong> ${degree}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("imcForm").addEventListener("submit", calculate);
});
