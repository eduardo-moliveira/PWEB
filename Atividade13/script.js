const titleElem = document.getElementById("title");
const imageElem = document.getElementById("image");

let broken = false;

imageElem.addEventListener("mouseleave", () => {
	if (broken) return;

	titleElem.innerText = "Janela fechada";
	imageElem.src = "assets/janela-fechada.png";
	imageElem.alt = "Janela fechada";
});

imageElem.addEventListener("mouseenter", () => {
	if (broken) return;

	titleElem.innerText = "Janela aberta";
	imageElem.src = "assets/janela-aberta.png";
	imageElem.alt = "Janela aberta";
});

imageElem.addEventListener("click", () => {
	if (broken) return;

	broken = true;

	titleElem.innerText = "Janela quebrada";
	imageElem.src = "assets/janela-quebrada.png";
	imageElem.alt = "Janela quebrada";
});
