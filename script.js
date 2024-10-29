//Tastatur einblenden

//https://wordlefinder.ixtomix.codes/api/words/by-length?length=5&page=1
function getRandomNoun(arr) {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex].toUpperCase();
}

const fiveLetterNouns = [
	"Apfel",
	"Blume",
	"Tisch",
	"Stuhl",
	"Feder",
	"Licht",
	"Rauch",
	"Socke",
	"Traum",
	"Blüte",
	"Mütze",
	"Glanz",
	"Müsli",
	"Fisch",
	"Sonne",
	"Mutti",
	"Pirat",
	"Vater",
	"Motiv",
	"Enorm"
];

let wordToGuess;     
const maxAttempts = 6; // Maximale Versuche
let attempts = 0;

const board = document.getElementById("board");
const guessInput = document.getElementById("guess");
const messageDiv = document.getElementById("message");

addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		if(messageDiv.textContent) {
			resetGame();
		} else {
			submitGuess();
		}
	}
});

function createBoard() {
	for (let i = 0; i < maxAttempts; i++) {
		const row = document.createElement("div");
		row.classList.add("row");
		for (let j = 0; j < 5; j++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");
			row.appendChild(cell);
		}
		board.appendChild(row);
	}
}

function resetGame() {
	attempts = 0;
	board.innerHTML = '';
	messageDiv.textContent = '';
	guessInput.value = '';
	wordToGuess = getRandomNoun(fiveLetterNouns);
	console.log(wordToGuess); // Für Debugging
	createBoard();			
	guessInput.style.display = 'inline';
}

function submitGuess() {
	const guess = guessInput.value.toUpperCase();
	if (guess.length !== 5) {
		alert("Bitte ein 5-buchstabiges Wort eingeben.");
		return;
	}
	if (attempts < maxAttempts) {
		const row = board.children[attempts];
		for (let i = 0; i < 5; i++) {
			const cell = row.children[i];
			cell.textContent = guess[i];
			if (guess[i] === wordToGuess[i]) {
				cell.classList.add("correct");
			} else if (wordToGuess.includes(guess[i])) {
				cell.classList.add("wrong-position");
			} else {
				cell.classList.add("wrong");
			}
		}
		attempts++;
		guessInput.value = "";
		if (guess === wordToGuess) {
			messageDiv.textContent = "Glückwunsch! Du hast das Wort erraten!";
			guessInput.style.display = 'none';
		} else if (attempts === maxAttempts) {
			messageDiv.textContent = `Leider verloren! Das gesuchte Wort war: ${wordToGuess}`;
			guessInput.style.display = 'none';
		}
	}
}


resetGame(); // Spiel beim Laden initialisieren