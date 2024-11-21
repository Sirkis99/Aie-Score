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
        sliderMessage.textContent = "Moyenne";
    } else {
        sliderMessage.textContent = "Élevé";
    }

    // Afficher le message temporaire des points gagnés/perdus
    showTemporaryMessage(change);
}

// Affichage temporaire des points
function showTemporaryMessage(points) {
    const tempMessageContainer = document.getElementById('tempMessageContainer');
    const message = document.createElement('div');
    message.classList.add('tempMessage');
    message.textContent = points > 0 ? `+${points}` : `${points}`;
    tempMessageContainer.appendChild(message);

    // Animation de disparition du message après 1.5 secondes
    setTimeout(() => {
        message.style.opacity = 1;
        message.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        message.style.opacity = 0;
        message.style.transform = 'translateY(-20px)';
        setTimeout(() => message.remove(), 500); // Supprimer après animation
    }, 1500);
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
    const backButton = document.createElement('button');
    backButton.textContent = 'Retour';
    backButton.classList.add('backToMenu');
    backButton.addEventListener('click', () => {
        mainMenu.classList.remove('hidden');
        subMenu.classList.add('hidden');
    });
    subMenu.appendChild(backButton);
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

// Gestion des clics sur les boutons
document.getElementById('showNotesMenu').addEventListener('click', () => {
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

document.getElementById('showLifeMenu').addEventListener('click', () => {
    showSubMenu([
        { label: "Oubli d'affaires", points: -1 },
        { label: "Retrouvé le lendemain", points: 1 },
        { label: "Non retrouvé", points: -1 },
        { label: "Non retrouvé au bout de 3 jours", points: -5 },
    ]);
});

document.getElementById('resetScoreButton').addEventListener('click', () => {
    score = parseInt(prompt("Score initial :", "0")) || 0;
    scoreHistory = [];
    updateScore(0);
});

document.getElementById('showGraphButton').addEventListener('click', displayGraph);

document.getElementById('closeGraph').addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});
