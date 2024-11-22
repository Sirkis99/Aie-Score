// Variables globales
let score = 0;
let scoreHistory = [];
let buttonHistory = [];

// Éléments du DOM
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');
const tempMessageContainer = document.getElementById('tempMessageContainer');
const mainMenu = document.getElementById('mainMenu');
const notesMenu = document.getElementById('notesMenu');
const lifeMenu = document.getElementById('lifeMenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const scoreChartElement = document.getElementById('scoreChart');

// Mise à jour du score
function updateScore(change = 0, buttonLabel = "") {
    score += change;
    scoreElement.textContent = score;
    sliderValue.textContent = score;

    // Historique
    if (change !== 0) {
        scoreHistory.push(score);  // Ajoute le score au tableau d'historique
        buttonHistory.push(buttonLabel);  // Ajoute l'étiquette du bouton
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

// Gestion de l'affichage des sous-menus
function showMenu(menuToShow) {
    // Masquer tous les menus
    notesMenu.classList.add('hidden');
    lifeMenu.classList.add('hidden');
    mainMenu.classList.add('hidden');
    scoreGraphContainer.classList.add('hidden');

    // Afficher le menu sélectionné
    console.log("Affichage du menu:", menuToShow);  // Log pour vérifier quel menu est affiché
    menuToShow.classList.remove('hidden');
}

// Affichage du graphique
function displayGraph() {
    if (scoreHistory.length < 2) {
        alert("Vous devez avoir au moins 2 scores pour afficher le graphique.");
        return;
    }

    const ctx = scoreChartElement.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: buttonHistory,
            datasets: [{
                label: 'Évolution du score',
                data: scoreHistory,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });

    // Afficher le conteneur du graphique
    scoreGraphContainer.classList.remove('hidden');
}

// Gestion des clics sur les boutons du sous-menu
function handleSubMenuButtons(menu, buttonClass) {
    const buttons = menu.querySelectorAll(buttonClass);
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const points = parseInt(button.dataset.points);
            updateScore(points, button.textContent); // Mettre à jour le score et l'historique
            showMenu(mainMenu); // Retourner au menu principal
        });
    });
}

// Événements de clic
document.getElementById('showNotesMenu').addEventListener('click', () => {
    console.log("Affichage du menu Notes");
    showMenu(notesMenu);
});
document.getElementById('showLifeMenu').addEventListener('click', () => {
    console.log("Affichage du menu Vie courante");
    showMenu(lifeMenu);
});
document.getElementById('resetScoreButton').addEventListener('click', () => {
    score = parseInt(prompt("Score initial :", "0")) || 0;
    scoreHistory = [];
    updateScore(0);
});
document.getElementById('showGraphButton').addEventListener('click', () => {
    console.log("Affichage du graphique");
    displayGraph();
});
document.getElementById('closeGraph').addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
});

// Initialisation du DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé et prêt");
    handleSubMenuButtons(notesMenu, '.noteButton');
    handleSubMenuButtons(lifeMenu, '.lifeButton');
});
