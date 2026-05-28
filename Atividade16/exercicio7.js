const http = require("http");

const server = http.createServer((req, res) => {
	const path = req.url;

	switch (path) {
		case "/historia":
			res.end("<html><body>Historia da Fatec Sorocaba</body></html>");
			break;

		case "/cursos":
			res.end("<html><body>Cursos</body></html>");
			break;

		case "/professores":
			res.end("<html><body>Professores</body></html>");
			break;

		default:
			res.end("<html><body>Site da Fatec Sorocaba</body></html>");
			break;
	}
});

server.listen(3000);

console.log("Server started!");
