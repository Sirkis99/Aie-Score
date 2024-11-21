let score = 0; // Score initial
let scoreHistory = []; // Historique des scores

// Sélection des éléments principaux
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');
const mainMenu = document.getElementById('mainMenu');
const notesSubmenu = document.getElementById('notesSubmenu');
const lifeSubmenu = document.getElementById('lifeSubmenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const scoreChartCanvas = document.getElementById('scoreChart');
const resetScoreButton = document.getElementById('resetScore');
const closeGraphButton = document.getElementById('closeGraph');

// Met à jour l'affichage du score et sauvegarde dans l'historique
function updateScore(points = 0) {
    score += points;
    scoreElement.textContent = score;
    sliderValue.textContent = score;
    scoreSlider.value = score;
    updateSliderMessage(score);

    // Enregistre l'évolution du score
    const timestamp = new Date().toLocaleTimeString();
    scoreHistory.push({ timestamp, score });
}

// Met à jour le message affiché en fonction du score
function updateSliderMessage(score) {
    if (score < 0) {
        sliderMessage.textContent = "Plus rien";
        sliderMessage.style.color = "red";
    } else if (score >= 0 && score < 4) {
        sliderMessage.textContent = "Plus de console ni de TV";
        sliderMessage.style.color = "orange";
    } else if (score >= 4 && score < 8) {
        sliderMessage.textContent = "Plus de console";
        sliderMessage.style.color = "orange";
    } else if (score >= 8 && score < 14) {
        sliderMessage.textContent = "Normal";
        sliderMessage.style.color = "green";
    } else if (score >= 14 && score < 18) {
        sliderMessage.textContent = "15 min de jeu en plus pour 4 jours";
        sliderMessage.style.color = "green";
    } else if (score >= 18 && score < 20) {
        sliderMessage.textContent = "30 min de jeu en plus pour 4 jours";
        sliderMessage.style.color = "green";
    } else if (score >= 20) {
        sliderMessage.textContent = "V-BUCKS";
        sliderMessage.style.color = "blue";
    }
}

// Basculer entre menus
function toggleMenu(hideMenu, showMenu) {
    hideMenu.classList.add('hidden');
    showMenu.classList.remove('hidden');
}

// Réinitialiser le score
resetScoreButton.addEventListener('click', () => {
    const newScore = prompt("Entrez le score initial :", "0");
    if (newScore !== null && !isNaN(parseInt(newScore))) {
        score = parseInt(newScore);
        scoreHistory = [];
        updateScore(0); // Met à jour sans modifier le score
    }
});

// Gestion des boutons de sous-menus
document.querySelectorAll('.noteButton').forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.dataset.points);
        updateScore(points);
    });
});

document.querySelectorAll('.lifeButton').forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.dataset.points);
        updateScore(points);
    });
});

// Afficher le graphique d'évolution du score
function showGraph() {
    toggleMenu(mainMenu, scoreGraphContainer);

    // Détruire l'ancien graphique s'il existe
    if (window.scoreChart) {
        window.scoreChart.destroy();
    }

    // Vérifie si des données existent
    if (scoreHistory.length === 0) {
        alert("Pas de données à afficher dans le graphique !");
        toggleMenu(scoreGraphContainer, mainMenu);
        return;
    }

    // Crée le graphique
    const ctx = scoreChartCanvas.getContext('2d');
    window.scoreChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: scoreHistory.map(entry => entry.timestamp),
            datasets: [{
                label: 'Évolution du Score',
                data: scoreHistory.map(entry => entry.score),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { callbacks: { label: ctx => `Score : ${ctx.raw}` } }
            },
            scales: {
                x: { title: { display: true, text: 'Temps' } },
                y: { beginAtZero: true, title: { display: true, text: 'Score' } }
            }
        }
    });
}

// Fermer le graphique
closeGraphButton.addEventListener('click', () => {
    toggleMenu(scoreGraphContainer, mainMenu);
});

// Interaction avec le slider
scoreSlider.addEventListener('input', () => {
    score = parseInt(scoreSlider.value);
    updateScore(0); // Met à jour sans modifier le score
});

// Navigation dans les sous-menus
document.getElementById('notesButton').addEventListener('click', () => {
    toggleMenu(mainMenu, notesSubmenu);
});

document.getElementById('lifeButton').addEventListener('click', () => {
    toggleMenu(mainMenu, lifeSubmenu);
});

// Retour au menu principal
document.querySelectorAll('.backButton').forEach(button => {
    button.addEventListener('click', () => {
        toggleMenu(button.parentNode, mainMenu);
    });
});

// Afficher le graphique via le bouton principal
document.getElementById('showGraphButton').addEventListener('click', showGraph);

// Initialisation
updateScore(0); // Score initial
