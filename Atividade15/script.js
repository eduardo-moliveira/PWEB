const Validations = {
	isRequired: () => ({
		message: "Campo obrigatório.",
		validate: (value = "") => {
			return value.length !== 0;
		},
	}),

	minLength: (min) => ({
		message: `Deve ter pelo menos ${min} caracteres.`,
		validate: (value = "") => {
			return value.length >= min;
		},
	}),

	isEmail: () => ({
		message: `Deve ser um endereço de e-mail.`,
		validate: (value = "") => {
			const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

			return regex.test(value);
		},
	}),
};

function clearValue(str = "") {
	return str.replace(/\s+/g, " ").trim();
}

function validateInput(input) {
	const value = clearValue(input.self.value);

	const messages = input.validators
		.filter((v) => !v.validate(value))
		.map((v) => v.message);

	input.errors.innerHTML = "";

	for (const message of messages) {
		const span = document.createElement("span");
		span.innerText = message;

		input.errors.appendChild(span);
	}

	return messages.length === 0;
}

function validateForm(inputs) {
	for (const input of inputs) {
		if (!validateInput(input)) return false;
	}

	return true;
}

function handleForm(form, inputs, result) {
	const isValid = validateForm(inputs);

	if (!isValid) return;

	const data = new FormData(form);

	const firstTime = data.get("firstTime") === "yes";

	if (firstTime) {
		result.innerText = "Volte sempre à está página!";
	} else {
		result.innerText = "Que bom que você voltou a visitar esta página!";
	}

	form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("form");

	const nameInput = {
		self: document.forms.form["name"],
		errors: document.getElementById("name-errors"),
		validators: [Validations.isRequired(), Validations.minLength(10)],
	};

	const emailInput = {
		self: document.forms.form["email"],
		errors: document.getElementById("email-errors"),
		validators: [Validations.isRequired(), Validations.isEmail()],
	};

	const commentInput = {
		self: document.forms.form["comment"],
		errors: document.getElementById("comment-errors"),
		validators: [Validations.isRequired(), Validations.minLength(20)],
	};

	const firstTimeInput = {
		self: document.forms.form["firstTime"],
		errors: document.getElementById("firstTime-errors"),
		validators: [Validations.isRequired()],
	};

	const inputs = [nameInput, emailInput, commentInput, firstTimeInput];

	for (const input of inputs) {
		if (!input.self.addEventListener) continue;

		input.self.addEventListener("blur", () => {
			validateInput(input);
		});
	}

	const result = document.getElementById("result");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		handleForm(form, inputs, result);
	});
});
