module.exports = (app) => {
	app.get("/formulario-adicionar-usuario", (req, res) => {
		res.render("admin/adicionar_usuario");
	});
};
