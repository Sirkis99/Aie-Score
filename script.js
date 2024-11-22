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
    menuToShow.classList.remove('hidden');
}


// Affichage du graphique
function displayGraph() {
    if (window.chart) {  // Si le graphique existe déjà
        window.chart.data.labels = Array.from({ length: scoreHistory.length }, (_, i) => i + 1);
        window.chart.data.datasets[0].data = scoreHistory;
        window.chart.update();  // Met à jour le graphique existant
    } else {  // Si le graphique n'existe pas, créez-le
        const ctx = scoreChartElement.getContext('2d');
        window.chart = new Chart(ctx, {
            type: 'line', // Type de graphique
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
    }

    showMenu(scoreGraphContainer);  // Affiche le conteneur du graphique
}



// Gestion des clics sur les boutons de sous-menus
function handleSubMenuButtons(menuElement, buttonClass) {
    const buttons = menuElement.querySelectorAll(buttonClass);
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const points = parseInt(button.getAttribute('data-points'), 10);
            const label = button.textContent;
            updateScore(points, label);
        });
    });

    // Gestion du bouton de retour
    const backButton = menuElement.querySelector('.backToMenu');
    if (backButton) {
        backButton.addEventListener('click', () => showMenu(mainMenu));
    }
}

// Gestion des clics sur les boutons du menu principal
document.getElementById('showNotesMenu').addEventListener('click', () => showMenu(notesMenu));
document.getElementById('showLifeMenu').addEventListener('click', () => showMenu(lifeMenu));
document.getElementById('resetScoreButton').addEventListener('click', () => {
    score = parseInt(prompt("Score initial :", "0")) || 0;
    scoreHistory = [];
    updateScore(0);
});
document.getElementById('showGraphButton').addEventListener('click', displayGraph);

// Gestion du bouton pour fermer le graphique
document.getElementById('closeGraph').addEventListener('click', () => showMenu(mainMenu));

// Initialisation des sous-menus
// Assurez-vous que le DOM est prêt avant d'ajouter des événements
document.addEventListener('DOMContentLoaded', () => {
handleSubMenuButtons(notesMenu, '.noteButton');
handleSubMenuButtons(lifeMenu, '.lifeButton');
});

