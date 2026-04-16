const Choices = {
	ROCK: "Pedra",
	PAPER: "Papel",
	SCISSORS: "Tesoura",
};

const Difficulties = {
	NORMAL: "Normal",
	IMPOSSIBLE: "Impossível",
};

function chooseRandom() {
	const keys = Object.keys(Choices);

	const i = Math.floor(Math.random() * keys.length);

	return Choices[keys[i]];
}

function chooseBestAgainst(choice) {
	if (choice === Choices.ROCK) return Choices.PAPER;

	if (choice === Choices.PAPER) return Choices.SCISSORS;

	return Choices.ROCK;
}

function populateSelects() {
	const choicesSelect = document.getElementById("choices");
	const difficultySelect = document.getElementById("difficulty");

	Object.values(Choices).forEach((choice) => {
		const option = document.createElement("option");

		option.value = choice;
		option.textContent = choice;

		choicesSelect.appendChild(option);
	});

	Object.values(Difficulties).forEach((difficulty) => {
		const option = document.createElement("option");

		option.value = difficulty;
		option.textContent = difficulty;

		difficultySelect.appendChild(option);
	});
}

function play(event) {
	event.preventDefault();

	const playerChoice = document.getElementById("choices").value;
	const difficulty = document.getElementById("difficulty").value;

	const resultSection = document.getElementById("gameResult");

	const computerChoice =
		difficulty === Difficulties.NORMAL
			? chooseRandom()
			: chooseBestAgainst(playerChoice);

	let outcomeMessage = "";

	if (playerChoice === computerChoice) {
		outcomeMessage = "Empate!";
	} else if (playerChoice === chooseBestAgainst(computerChoice)) {
		outcomeMessage = "Você venceu!";
	} else {
		outcomeMessage = "O computador venceu!";
	}

	resultSection.innerHTML = `
        <h2>Resultado</h2>
        <p><strong>Sua jogada:</strong> ${playerChoice}</p>
        <p><strong>Computador:</strong> ${computerChoice}</p>
        <p><strong>Veredito:</strong> ${outcomeMessage}</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
	populateSelects();

	document.getElementById("gameForm").addEventListener("submit", play);
});
