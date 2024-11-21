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

    // Message
    if (score < 0) {
        sliderMessage.textContent = "Faible";
    } else if (score < 10) {
        sliderMessage.textContent = "Moyen";
    } else {
        sliderMessage.textContent = "Élevé";
    }
}

// Gestion des sous-menus
function showSubMenu(buttons) {
    mainMenu.classList.add('hidden');  // Masquer le menu principal
    subMenu.innerHTML = "";
    buttons.forEach(({ label, points }) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => updateScore(points, label));
        subMenu.appendChild(button);
    });
    subMenu.classList.remove('hidden');
}

// Affichage du graphique
function displayGraph() {
    const ctx = scoreChartElement.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: scoreHistory.length }, (_, i) => i + 1),
            datasets: [{
                label: 'Évolution du score',
                data: scoreHistory,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
            }],
        },
    });
    scoreGraphContainer.classList.remove('hidden');
    mainMenu.classList.add('hidden'); // Masquer le menu principal
}

// Gestion des clics
document.getElementById('showNotes').addEventListener('click', () => {
    showSubMenu([
        { label: "18-20", points: 5 },
        { label: "16-18", points: 3 },
    ]);
});

document.getElementById('showLife').addEventListener('click', () => {
    showSubMenu([
        { label: "Oubli d'affaires", points: -2 },
        { label: "Retrouvé", points: 2 },
    ]);
});

document.getElementById('resetScore').addEventListener('click', () => {
    score = parseInt(prompt("Score initial :", "0")) || 0;
    scoreHistory = [];
    updateScore(0);
});

document.getElementById('showGraph').addEventListener('click', displayGraph);

document.getElementById('closeGraph').addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');  // Réafficher le menu principal
    subMenu.classList.add('hidden'); // Masquer le sous-menu
});

// Initialisation
updateScore(0);
