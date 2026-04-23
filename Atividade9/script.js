function max(nums) {
	if (nums.length <= 0) return null;

	let value = nums[0];

	for (const num of nums.slice(1)) {
		value = Math.max(value, num);
	}

	return value;
}

function sort(nums) {
	const sorted = structuredClone(nums);

	sorted.sort((a, b) => a - b);

	return sorted;
}

function isPalindrome(str) {
	if (!str) return false;

	const cleanStr = str.trim().toUpperCase();
	const reverseStr = cleanStr.split("").reverse().join("");

	return cleanStr === reverseStr;
}

function isSubset(str, subStr) {
	if (!str || !subStr) return "erro";

	if (str.includes(subStr)) {
		return "é um subconjunto";
	}

	return "não é um subconjunto";
}

function weekDay(dateString) {
	if (!dateString) return "";

	const date = new Date(dateString + "T00:00:00");

	const dias = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];

	return dias[date.getDay()];
}

function action(event) {
	event.preventDefault();

	const n1 = Number(document.getElementById("num1").value);
	const n2 = Number(document.getElementById("num2").value);
	const n3 = Number(document.getElementById("num3").value);

	const nums = [n1, n2, n3];

	const pal = document.getElementById("palindromo").value;
	const p1 = document.getElementById("palavra1").value;
	const p2 = document.getElementById("palavra2").value;
	const dataStr = document.getElementById("data").value;

	document.getElementById("res-max").textContent = max(nums);
	document.getElementById("res-sort").textContent = sort(nums).join(", ");
	document.getElementById("res-pal").textContent = pal
		? isPalindrome(pal)
			? "Sim"
			: "Não"
		: "-";
	document.getElementById("res-sub").textContent = isSubset(p1, p2);
	document.getElementById("res-date").textContent = weekDay(dataStr);
}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("form").addEventListener("submit", action);
});
