const express = require("express");

const app = express();

const texto = require("./modulo1");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/formulario-adicionar-usuario", (req, res) => {
	res.render("admin/adicionar_usuario");
});

app.get("/historia", (req, res) => {
	res.render("informacao/historia");
});

app.get("/cursos", (req, res) => {
	res.render("informacao/cursos");
});

app.get("/professores", (req, res) => {
	res.render("informacao/professores");
});

app.listen(3000, () => {
	console.log("Server started!");
	console.log(texto);
});
