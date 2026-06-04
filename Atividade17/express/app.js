const app = require("./app/config/server");

const rotaAdicionarUsuario = require("./app/routes/adicionar_usuario");
const rotaCursos = require("./app/routes/cursos");
const rotaHistoria = require("./app/routes/historia");
const rotaHome = require("./app/routes/home");
const rotaProfessores = require("./app/routes/professores");

rotaAdicionarUsuario(app);
rotaCursos(app);
rotaHistoria(app);
rotaHome(app);
rotaProfessores(app);

app.listen(3000, () => {
	console.log("Server started!");
});
