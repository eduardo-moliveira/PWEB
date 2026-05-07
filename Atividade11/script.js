const container = document.getElementById("cards-container");

function renderCard(title, method, funcionario) {
	const card = document.createElement("div");
	card.className = "card";

	card.innerHTML = `
        <h2>${title}</h2>
        <span class="card__tag">${method}</span>
        <p><strong>Matrícula:</strong> ${funcionario.matricula}</p>
        <p><strong>Nome:</strong> ${funcionario.nome}</p>
        <p><strong>Função:</strong> ${funcionario.funcao}</p>
    `;

	container.appendChild(card);
}

const funcionario1 = {};
funcionario1.matricula = "001";
funcionario1.nome = "Denilce";
funcionario1.funcao = "Professor";

renderCard("Funcionário 1", "Atribuição Direta", funcionario1);

const funcionario2 = {
	matricula: "002",
	nome: "Denilse",
	funcao: "Coordenador",
};

renderCard("Funcionário 2", "Object Literal", funcionario2);

const funcionario3 = new (function () {
	this.matricula = "003";
	this.nome = "Denilsse";
	this.funcao = "Diretor";
})();

renderCard("Funcionário 3", "Função Construtora Anônima", funcionario3);

const funcionario4 = new Function(
	'return { matricula: "004", nome: "eclineD", funcao: "Supervisor" }',
)();

renderCard("Funcionário 4", "new Function()", funcionario4);

const funcionario5 = Object.create(new Object(), {
	matricula: {
		value: "005",
		enumerable: true,
	},
	nome: {
		value: "Decline",
		enumerable: true,
	},
	funcao: {
		value: "Secretário",
		enumerable: true,
	},
});

renderCard("Funcionário 5", "Object.create()", funcionario5);

const funcionario6 = Object.fromEntries([
	["matricula", "006"],
	["nome", "Denilseis"],
	["funcao", "Orientador"],
]);

renderCard("Funcionário 6", "Object.fromEntries()", funcionario6);

const funcionario7 = JSON.parse(
	'{"matricula":"007","nome":"Denilsete","funcao":"Bibliotecário"}',
);

renderCard("Funcionário 7", "JSON.parse()", funcionario7);
