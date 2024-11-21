// Variables globales
let score = 0;
let scoreHistory = [];
let buttonHistory = [];

// Éléments du DOM
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');
const mainMenu = document.getElementById('mainMenu');
const subMenu = document.getElementById('subMenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const scoreChartElement = document.getElementById('scoreChart');

// Mise à jour du score
function updateScore(change = 0, buttonLabel = "") {
    score += change;
    scoreElement.textContent = score;
    sliderValue.textContent = score;
    scoreSlider.value = score;

    // Sauvegarder l'historique
    if (change !== 0) {
        scoreHistory.push(score);
        buttonHistory.push(buttonLabel);
    }

    // Mettre à jour le message du curseur
    if (score < 0) {
        sliderMessage.textContent = "Plus rien";
    } else if (score < 10) {
        sliderMessage.textContent = "Normal";
    } else {
        sliderMessage.textContent = "VBUCKS !";
    }
}

// Gestion des sous-menus
function showSubMenu(buttons) {
    subMenu.innerHTML = "";
    buttons.forEach(({ label, points }) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => {
            updateScore(points, label);
        });
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
}

// Boutons principaux
document.getElementById('showNotes').addEventListener('click', () => {
    showSubMenu([
        { label: "Entre 18 et 20", points: 4 },
        { label: "Entre 16 et 18", points: 2 },
        { label: "Entre 0 et 5", points: -4 },
    ]);
});

document.getElementById('showLife').addEventListener('click', () => {
    showSubMenu([
        { label: "Oubli d'affaires", points: -1 },
        { label: "Retrouvé le lendemain", points: 1 },
    ]);
});

document.getElementById('resetScore').addEventListener('click', () => {
    score = parseInt(prompt("Score initial : ", "0")) || 0;
    scoreHistory = [];
    buttonHistory = [];
    updateScore(0);
});

document.getElementById('showGraph').addEventListener('click', displayGraph);
document.getElementById('closeGraph').addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
});

// Initialisation
updateScore(0);
