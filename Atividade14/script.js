const Casings = {
	Lowercase: {
		label: "Minúsculas",
		transform: (text = "") => text.toLowerCase(),
	},
	Uppercase: {
		label: "Maiúsculas",
		transform: (text = "") => text.toUpperCase(),
	},
};

function handleForm(form) {
	const data = new FormData(form);

	const text = data.get("sourceText");
	const casing = data.get("casing");

	const selected = Casings[casing];

	if (!selected) return;

	form.elements.sourceText.value = selected.transform(text);
}

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("form");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		handleForm(form);
	});

	const radios = document.getElementById("radios");

	const casingEntries = Object.entries(Casings);
	const [[firstCasing]] = casingEntries;

	for (const [key, { label }] of casingEntries) {
		const radio = document.createElement("label");
		radio.className = "field";

		radio.innerHTML = `
				<input
					type="radio"
					name="casing"
					value="${key}"
					${key === firstCasing ? "checked" : ""}
				/>
				<span>${label}</span>
			`;

		radios.appendChild(radio);
	}
});
