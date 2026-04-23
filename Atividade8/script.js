const Genders = {
	MALE: "Masculino",
	FEMALE: "Feminino",
	OTHER: "Outro",
};

const Opinions = {
	EXCELLENT: "Ótimo",
	GOOD: "Bom",
	AVERAGE: "Regular",
	POOR: "Péssimo",
};

const votes = [];

const ageTable = { avg: null, max: null, min: null };

const genderTable = Object.keys(Genders).reduce((acc, key) => {
	acc[key] = 0;
	return acc;
}, {});

const opinionTable = Object.keys(Opinions).reduce((acc, key) => {
	acc[key] = 0;
	return acc;
}, {});

function populateAgeTable() {
	const tbody = document.querySelector("#ageTable tbody");

	if (!tbody) return;

	tbody.innerHTML = `
		<tr>
			<th>Média</th>
			<td>${ageTable.avg === null ? "" : ageTable.avg.toFixed(1)}</td>
		</tr>
		<tr>
			<th>Menor</th>
			<td>${ageTable.min ?? ""}</td>
		</tr>
		<tr>
			<th>Maior</th>
			<td>${ageTable.max ?? ""}</td>
		</tr>
	`;

	console.log(ageTable);
}

function populateGenderTable() {
	const tbody = document.querySelector("#genderTable tbody");

	if (!tbody) return;

	tbody.innerHTML = "";

	for (const key of Object.keys(Genders)) {
		const percentage =
			votes.length !== 0
				? `${((genderTable[key] * 100) / votes.length).toFixed(1)}%`
				: "";

		tbody.innerHTML += `
			<tr>
				<th>${Genders[key]}</th>
				<td>${genderTable[key]}</td>
				<td>${percentage}</td>
			</tr>
		`;
	}
}

function populateOpinionTable() {
	const tbody = document.querySelector("#opinionTable tbody");

	if (!tbody) return;

	tbody.innerHTML = "";

	for (const key of Object.keys(Opinions)) {
		const percentage =
			votes.length !== 0
				? `${((opinionTable[key] * 100) / votes.length).toFixed(1)}%`
				: "";

		tbody.innerHTML += `
			<tr>
				<th>${Opinions[key]}</th>
				<td>${opinionTable[key]}</td>
				<td>${percentage}</td>
			</tr>
		`;
	}
}

function vote(event) {
	event.preventDefault();

	const ageInput = document.getElementById("age");
	const genderInput = document.querySelector('input[name="gender"]:checked');
	const opinionInput = document.querySelector(
		'input[name="opinion"]:checked',
	);

	if (!ageInput || !genderInput || !opinionInput) return;

	const age = Number(ageInput.value);
	const gender = genderInput.value ?? null;
	const opinion = opinionInput.value ?? null;

	if (isNaN(age) || age <= 0) return;

	votes.push({ age, gender, opinion });

	ageTable.avg =
		((ageTable.avg ?? age) * (votes.length - 1) + age) / votes.length;

	ageTable.min = Math.min(ageTable.min ?? age, age);
	ageTable.max = Math.max(ageTable.max ?? age, age);

	genderTable[gender]++;
	opinionTable[opinion]++;

	populateAgeTable();
	populateGenderTable();
	populateOpinionTable();

	ageInput.value = "";
	genderInput.checked = false;
	opinionInput.checked = false;
}

function populateRadios() {
	const genderRadioGroup = document.getElementById("gender-radio-group");
	const opinionRadioGroup = document.getElementById("opinion-radio-group");

	const getRadioField = (name, id, value, label) => {
		const html = `<div class="radio-option">
			<input type="radio" name="${name}" id="${id}" value="${value}" required />
			<label for="${id}">${label}</label>
		</div>`;

		const template = document.createElement("template");
		template.innerHTML = html.trim();

		return template.content.firstElementChild;
	};

	for (const gender of Object.keys(Genders)) {
		const radioField = getRadioField(
			"gender",
			gender,
			gender,
			Genders[gender],
		);

		genderRadioGroup?.appendChild(radioField);
	}

	for (const opinion of Object.keys(Opinions)) {
		const radioField = getRadioField(
			"opinion",
			opinion,
			opinion,
			Opinions[opinion],
		);

		opinionRadioGroup?.appendChild(radioField);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	populateRadios();

	populateAgeTable();
	populateGenderTable();
	populateOpinionTable();

	document.getElementById("form").addEventListener("submit", vote);
});
