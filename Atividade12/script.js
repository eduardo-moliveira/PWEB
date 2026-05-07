function Retangulo(base, altura) {
	this.base = base;
	this.altura = altura;

	this.calcularArea = function () {
		return this.base * this.altura;
	};
}

class Conta {
	#nome;
	#banco;
	#numeroConta;
	#saldo;

	set nome(nome) {
		this.#nome = nome;
	}
	get nome() {
		return this.#nome;
	}

	set banco(banco) {
		this.#banco = banco;
	}
	get banco() {
		return this.#banco;
	}

	set numeroConta(numeroConta) {
		this.#numeroConta = numeroConta;
	}
	get numeroConta() {
		return this.#numeroConta;
	}

	set saldo(saldo) {
		this.#saldo = saldo;
	}
	get saldo() {
		return this.#saldo;
	}
}

class ContaCorrente extends Conta {
	#saldoEspecial;

	set saldoEspecial(saldoEspecial) {
		this.#saldoEspecial = saldoEspecial;
	}
	get saldoEspecial() {
		return this.#saldoEspecial;
	}
}

class ContaPoupanca extends Conta {
	#juros;
	#dataVencimento;

	set juros(juros) {
		this.#juros = juros;
	}
	get juros() {
		return this.#juros;
	}

	set dataVencimento(dataVencimento) {
		this.#dataVencimento = dataVencimento;
	}
	get dataVencimento() {
		return this.#dataVencimento;
	}
}

document
	.getElementById("form-retangulo")
	.addEventListener("submit", (event) => {
		event.preventDefault();

		const base = parseFloat(document.getElementById("base").value);
		const altura = parseFloat(document.getElementById("altura").value);

		const retangulo = new Retangulo(base, altura);
		const area = retangulo.calcularArea();

		document.getElementById("res-retangulo").innerHTML = `
		<h2>Resultado</h2>
		<p><strong>Base:</strong> ${retangulo.base}</p>
		<p><strong>Altura:</strong> ${retangulo.altura}</p>
		<p><strong>Área:</strong> ${area}</p>
	`;
	});

document.getElementById("form-corrente").addEventListener("submit", (event) => {
	event.preventDefault();

	const conta = new ContaCorrente();
	conta.nome = document.getElementById("nome-corrente").value;
	conta.banco = document.getElementById("banco-corrente").value;
	conta.numeroConta = document.getElementById("numero-corrente").value;
	conta.saldo = parseFloat(document.getElementById("saldo-corrente").value);
	conta.saldoEspecial = parseFloat(
		document.getElementById("especial-corrente").value,
	);

	document.getElementById("res-corrente").innerHTML = `
		<h2>Conta Corrente Criada</h2>
		<p><strong>Nome:</strong> ${conta.nome}</p>
		<p><strong>Banco:</strong> ${conta.banco}</p>
		<p><strong>Número:</strong> ${conta.numeroConta}</p>
		<p><strong>Saldo:</strong> R$ ${conta.saldo.toFixed(2)}</p>
		<p><strong>Saldo Especial:</strong> R$ ${conta.saldoEspecial.toFixed(2)}</p>
	`;
});

document.getElementById("form-poupanca").addEventListener("submit", (event) => {
	event.preventDefault();

	const conta = new ContaPoupanca();
	conta.nome = document.getElementById("nome-poupanca").value;
	conta.banco = document.getElementById("banco-poupanca").value;
	conta.numeroConta = document.getElementById("numero-poupanca").value;
	conta.saldo = parseFloat(document.getElementById("saldo-poupanca").value);
	conta.juros = parseFloat(document.getElementById("juros-poupanca").value);
	conta.dataVencimento = document.getElementById("data-poupanca").value;

	document.getElementById("res-poupanca").innerHTML = `
		<h2>Conta Poupança Criada</h2>
		<p><strong>Nome:</strong> ${conta.nome}</p>
		<p><strong>Banco:</strong> ${conta.banco}</p>
		<p><strong>Número:</strong> ${conta.numeroConta}</p>
		<p><strong>Saldo:</strong> R$ ${conta.saldo.toFixed(2)}</p>
		<p><strong>Juros:</strong> ${conta.juros.toFixed(2)}%</p>
		<p><strong>Vencimento:</strong> ${conta.dataVencimento.split("-").reverse().join("/")}</p>
	`;
});
