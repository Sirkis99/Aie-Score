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

// Fonction pour mettre à jour le score
function updateScore(change = 0, buttonLabel = "") {
    score += change;
    scoreElement.textContent = score;
    sliderValue.textContent = score;
	
	// Met à jour la valeur du curseur
    scoreSlider.value = score;  // Met à jour la position du curseur avec la nouvelle valeur du score

    // Historique
    if (change !== 0) {
        scoreHistory.push(score);  // Ajoute le score au tableau d'historique
        buttonHistory.push(buttonLabel);  // Ajoute l'étiquette du bouton
    }

    // Message du slider
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

// Affichage du message temporaire
function showTemporaryMessage(points) {
    const message = document.createElement('div');
    message.classList.add('tempMessage');
    message.textContent = points > 0 ? `+${points}` : `${points}`;
	// Ajouter une classe pour les points négatifs (rouge)
    if (points < 0) {
		message.textContent = `${points} 😡`; // Points négatifs
        message.style.backgroundColor = '#e74c3c'; // Rouge
    } else {
		message.textContent = `+${points} 😊`; // Points positifs
        message.style.backgroundColor = '#27ae60'; // Vert (points positifs)
    }
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

// Affichage des sous-menus
function showMenu(menuToShow) {
    // Masquer tous les menus
    notesMenu.classList.add('hidden');
    lifeMenu.classList.add('hidden');
    mainMenu.classList.add('hidden');
    scoreGraphContainer.classList.add('hidden');

    // Afficher le menu sélectionné
    menuToShow.classList.remove('hidden');
}

// Fonction pour afficher le graphique
function displayGraph() {
    console.log("Tentative d'affichage du graphique");

    if (scoreHistory.length < 2) {
        alert("Vous devez avoir au moins 2 scores pour afficher le graphique.");
        return;
    }

    // Si un graphique existe déjà, on le met à jour
    if (window.chart) {
        console.log("Mise à jour du graphique existant");
        window.chart.data.labels = buttonHistory;
        window.chart.data.datasets[0].data = scoreHistory;
        window.chart.update();
    } else {
        // Créer un nouveau graphique
        const ctx = scoreChartElement.getContext('2d');
        console.log("Création du graphique");

        window.chart = new Chart(ctx, {
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
    }

    // Afficher le conteneur du graphique
    scoreGraphContainer.classList.remove('hidden');
}

// Gestion des événements de clic
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé et prêt");

    // Attacher les événements sur les boutons principaux
    const showNotesMenuButton = document.getElementById('showNotesMenu');
    const showLifeMenuButton = document.getElementById('showLifeMenu');
    const resetScoreButton = document.getElementById('resetScoreButton');
    const showGraphButtonElement = document.getElementById('showGraphButton');
    const closeGraphButton = document.getElementById('closeGraph');

    if (showNotesMenuButton) {
        showNotesMenuButton.addEventListener('click', () => {
            console.log("Affichage du menu Notes");
            showMenu(notesMenu);
        });
    }

    if (showLifeMenuButton) {
        showLifeMenuButton.addEventListener('click', () => {
            console.log("Affichage du menu Vie courante");
            showMenu(lifeMenu);
        });
    }

    if (resetScoreButton) {
        resetScoreButton.addEventListener('click', () => {
            score = parseInt(prompt("Score initial :", "0")) || 0;
            scoreHistory = [];
            updateScore(0);
        });
    }

    if (showGraphButtonElement) {
        showGraphButtonElement.addEventListener('click', () => {
            console.log("Affichage du graphique");
            displayGraph();
        });
    }

    if (closeGraphButton) {
        closeGraphButton.addEventListener('click', () => {
            scoreGraphContainer.classList.add('hidden');
        });
    }

    // Attacher les événements pour les sous-menus
    handleSubMenuButtons(notesMenu, '.noteButton');
    handleSubMenuButtons(lifeMenu, '.lifeButton');
});

// Fonction pour gérer les boutons des sous-menus
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
