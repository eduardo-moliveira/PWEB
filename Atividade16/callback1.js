const prompter = require("prompt-sync");

const prompt = prompter();

function saudacao(nome) {
	console.log(`Oi, ${nome}`);
}

function entradaNome(callback) {
	const nome = prompt("Digite seu nome:");

	callback(nome);
}

entradaNome(saudacao);
