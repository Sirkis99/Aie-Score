let score = 0;
let scoreHistory = [];

const scoreElement = document.getElementById("score");
const scoreSlider = document.getElementById("scoreSlider");
const sliderValue = document.getElementById("sliderValue");
const sliderMessage = document.getElementById("sliderMessage");

const resetScoreButton = document.getElementById("resetScoreButton");
const showNotesMenu = document.getElementById("showNotesMenu");
const showLifeMenu = document.getElementById("showLifeMenu");
const showGraphButton = document.getElementById("showGraphButton");

const notesMenu = document.getElementById("notesMenu");
const lifeMenu = document.getElementById("lifeMenu");
const mainMenu = document.getElementById("mainMenu");

const scoreGraphContainer = document.getElementById("scoreGraphContainer");
const scoreChartCanvas = document.getElementById("scoreChart");
const closeGraph = document.getElementById("closeGraph");

document.querySelectorAll(".backToMenu").forEach(button => {
    button.addEventListener("click", () => {
        notesMenu.classList.add("hidden");
        lifeMenu.classList.add("hidden");
        scoreGraphContainer.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });
});

function updateScore() {
    scoreElement.textContent = score;
    scoreSlider.value = score;
    sliderValue.textContent = score;
    scoreHistory.push(score);
}

resetScoreButton.addEventListener("click", () => {
    const initialScore = prompt("Entrez le score initial :");
    if (!isNaN(initialScore)) {
        score = parseInt(initialScore);
        scoreHistory = [score];
        updateScore();
    }
});

showNotesMenu.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    notesMenu.classList.remove("hidden");
});

showLifeMenu.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    lifeMenu.classList.remove("hidden");
});

showGraphButton.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    notesMenu.classList.add("hidden");
    lifeMenu.classList.add("hidden");
    scoreGraphContainer.classList.remove("hidden");
    renderGraph();
});

closeGraph.addEventListener("click", () => {
    scoreGraphContainer.classList.add("hidden");
    mainMenu.classList.remove("hidden");
});

function renderGraph() {
    const ctx = scoreChartCanvas.getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: scoreHistory.map((_, i) => i + 1),
            datasets: [{
                label: "Évolution du score",
                data: scoreHistory,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)"
            }]
        },
        options: { responsive: true }
    });
}

document.querySelectorAll(".noteButton, .lifeButton").forEach(button => {
    button.addEventListener("click", () => {
        const points = parseInt(button.getAttribute("data-points"));
        score += points;
        updateScore();
    });
});

updateScore();
