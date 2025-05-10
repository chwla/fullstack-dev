const colourCodeContainer = document.getElementById("colour_code");
const optionContainer = document.getElementById("options_container");
const scoreContainer = document.getElementById('score');
let randomColour = null;
let score = 0;

function generateRandomNumberBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateRandomColourRGB() {
    const red = generateRandomNumberBetween(0, 255);
    const green = generateRandomNumberBetween(0, 255);
    const blue = generateRandomNumberBetween(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function incrementScore() {
    score++;
    document.getElementById('score').innerText = score;
}

function validateResult(event) {
    const selectedColour = event.target.style.backgroundColor;
    if (selectedColour === randomColour) {
        incrementScore();
    } else {
        score = 0;
    }
    window.localStorage.setItem("score", score);
    startGame();
}

function startGame() {
    score = Number(window.localStorage.getItem('score') ?? 0);
    scoreContainer.innerText = score;
    optionContainer.innerHTML = null;
    randomColour = generateRandomColourRGB();
    colourCodeContainer.innerText = randomColour;

    const ansIndex = generateRandomNumberBetween(0, 5);

    for (let i = 0; i < 6; i++) {
        const div = document.createElement('div');
        div.addEventListener('click', validateResult);
        div.style.backgroundColor = i === ansIndex ? randomColour : generateRandomColourRGB();
        optionContainer.append(div);
    }
}

window.addEventListener('load', () => startGame());
