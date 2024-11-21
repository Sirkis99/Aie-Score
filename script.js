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

// Mise à jour du score et de l'affichage
function updateScore(change = 0, buttonLabel = "") {
    score += change;
    scoreElement.textContent = score;
    sliderValue.textContent = score;
    scoreSlider.value = score;

    // Historique
    if (change !== 0) {
        scoreHistory.push(score);
        buttonHistory.push(buttonLabel);
    }

    // Mise à jour du message en fonction du score
    if (score < 0) {
        sliderMessage.textContent = "Faible";
    } else if (score < 10) {
        sliderMessage.textContent = "Moyen";
    } else {
        sliderMessage.textContent = "Élevé";
    }

    // Affichage temporaire du message de points gagnés/perdus
    if (change !== 0) {
        showTempMessage(change);
    }
}

// Affichage du message temporaire pour les points gagnés/perdus
function showTempMessage(change) {
    const message = document.createElement('div');
    message.classList.add('tempMessage');
    message.textContent = (change > 0 ? `+${change}` : `${change}`);
    
    tempMessageContainer.appendChild(message);

    // Animation d'entrée et de sortie
    setTimeout(() => {
        message.classList.add('visible');
    }, 100); // Délais pour l'animation d'entrée

    // Disparaît après 2 secondes
    setTimeout(() => {
        message.classList.remove('visible');
        setTimeout(() => message.remove(), 500); // Retirer après la disparition
    }, 2000);
}

// Gestion des sous-menus
function showSubMenu(buttons) {
    mainMenu.classList.add('hidden');  // Masquer le menu principal
    subMenu.innerHTML = "";  // Réinitialiser le sous-menu
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
    subMenu.classList.add('hidden');  // Masquer le sous-menu
}

// Réinitialiser le score
document.getElementById('resetScore').addEventListener('click', () => {
    const initialScore = prompt("Score initial :", "0");
    score = parseInt(initialScore) || 0;  // Si l'utilisateur annule ou entre une valeur invalide, score sera 0
    scoreHistory = [];
    updateScore(0);  // Mettre à jour le score affiché avec la valeur initiale
});

// Gestion des clics des boutons principaux
document.getElementById('showNotes').addEventListener('click', () => {
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

document.getElementById('showLife').addEventListener('click', () => {
    showSubMenu([
        { label: "Oubli d'affaires", points: -2 },
        { label: "Retrouvé", points: 2 },
    ]);
});

// Affichage du graphique
document.getElementById('showGraph').addEventListener('click', displayGraph);

// Fermeture du graphique
document.getElementById('closeGraph').addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');  // Réafficher le menu principal
});

// Initialisation du score
updateScore(0);  // Mettre à jour l'affichage avec le score initial
