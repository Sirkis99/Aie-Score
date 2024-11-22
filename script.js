// Variables globales
let score = 0;
let scoreHistory = [];
let buttonHistory = [];

// Éléments du DOM
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');
const subMenu = document.getElementById('subMenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const scoreChartElement = document.getElementById('scoreChart');
const mainMenu = document.getElementById('mainMenu');
const tempMessageContainer = document.getElementById('tempMessageContainer');
let scoreChart; // Pour gérer le graphique

// Mise à jour du score
function updateScore(change = 0, buttonLabel = "") {
    score += change;
    scoreElement.textContent = score;
    sliderValue.textContent = score;

    // Historique
    if (change !== 0) {
        scoreHistory.push(score);
        buttonHistory.push(buttonLabel);
    }

    // Message en fonction du score
    sliderMessage.textContent =
        score < 0 ? "Faible" : score < 10 ? "Moyenne" : "Élevé";

    // Message temporaire
    showTemporaryMessage(change);
}

// Affichage temporaire des points
function showTemporaryMessage(points) {
    const message = document.createElement("div");
    message.classList.add("tempMessage");
    message.textContent = points > 0 ? `+${points}` : `${points}`;
    tempMessageContainer.appendChild(message);

    setTimeout(() => message.remove(), 2000);
}

// Afficher un sous-menu
function showSubMenu(buttons) {
    mainMenu.classList.add("hidden");
    subMenu.classList.remove("hidden");
    subMenu.innerHTML = ""; // Nettoyage

    // Ajouter les boutons
    buttons.forEach(({ label, points }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.addEventListener("click", () => {
            updateScore(points, label);
        });
        subMenu.appendChild(button);
    });

    // Bouton retour
    const backButton = document.createElement("button");
    backButton.textContent = "Retour";
    backButton.classList.add("backToMenu");
    backButton.addEventListener("click", () => {
        subMenu.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });
    subMenu.appendChild(backButton);
}

// Afficher le graphique
function displayGraph() {
    if (scoreChart) scoreChart.destroy(); // Supprimer le graphique précédent

    const ctx = scoreChartElement.getContext("2d");
    scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: scoreHistory.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: "Évolution du score",
                    data: scoreHistory,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                },
            ],
        },
    });

    scoreGraphContainer.classList.remove("hidden");
    mainMenu.classList.add("hidden");
}

// Gestion des clics sur les boutons
document.getElementById("showNotesMenu").addEventListener("click", () => {
    showSubMenu([
        { label: "Entre 18 et 20", points: 4 },
        { label: "Entre 16 et 18", points: 2 },
        { label: "Entre 15 et 16", points: 1 },
        { label: "Entre 12 et 14", points: -1 },
        { label: "Entre 10 et 12", points: -2 },
        { label: "Entre 5 et 10", points: -3 },
        { label: "Entre 0 et 5", points: -4 },
    ]);
});

document.getElementById("showLifeMenu").addEventListener("click", () => {
    showSubMenu([
        { label: "Oubli d'affaires", points: -1 },
        { label: "Retrouvé le lendemain", points: 1 },
        { label: "Non retrouvé", points: -1 },
        { label: "Non retrouvé au bout de 3 jours", points: -5 },
    ]);
});

document.getElementById("resetScoreButton").addEventListener("click", () => {
    score = parseInt(prompt("Score initial :", "0")) || 0;
    scoreHistory = [];
    updateScore(0);
});

document.getElementById("showGraphButton").addEventListener("click", displayGraph);

document.getElementById("closeGraph").addEventLi
