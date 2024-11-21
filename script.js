// Variables globales
let score = 0;
const scoreHistory = [];
const scoreElement = document.getElementById('score');
const scoreChangeIndicator = document.getElementById('scoreChangeIndicator');

// Gestion des menus
const mainMenu = document.getElementById('mainMenu');
const notesSubmenu = document.getElementById('notesSubmenu');
const lifeSubmenu = document.getElementById('lifeSubmenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');

// Boutons principaux
document.getElementById('notesMenuButton').addEventListener('click', () => {
    toggleMenu(mainMenu, notesSubmenu);
});

document.getElementById('lifeMenuButton').addEventListener('click', () => {
    toggleMenu(mainMenu, lifeSubmenu);
});

document.getElementById('viewGraphButton').addEventListener('click', showGraph);

// Boutons de retour
document.getElementById('backToMenuNotes').addEventListener('click', () => {
    toggleMenu(notesSubmenu, mainMenu);
});

document.getElementById('backToMenuLife').addEventListener('click', () => {
    toggleMenu(lifeSubmenu, mainMenu);
});

// Boutons de gestion du score
document.getElementById('setInitialScore').addEventListener('click', () => {
    const initialScore = parseInt(prompt('Entrez le score initial :', '0'), 10);
    if (!isNaN(initialScore)) {
        score = initialScore;
        updateScore();
    }
});

document.getElementById('resetScore').addEventListener('click', () => {
    score = 0;
    updateScore();
});

// Boutons des sous-menus
document.querySelectorAll('.noteButton, .lifeButton').forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'), 10);
        if (!isNaN(points)) {
            score += points;
            showScoreChange(points);
            updateScore();
        }
    });
});

// Fermer le graphique
document.getElementById('closeGraph').addEventListener('click', () => {
    toggleMenu(scoreGraphContainer, mainMenu);
});

// Mise à jour du score
function updateScore() {
    scoreElement.textContent = score;
    logScoreChange(score);
}

// Affichage du changement de score
function showScoreChange(change) {
    scoreChangeIndicator.textContent = (change > 0 ? '+' : '') + change;
    scoreChangeIndicator.classList.remove('hidden');
    setTimeout(() => scoreChangeIndicator.classList.add('hidden'), 2000);
}

// Historique des scores
function logScoreChange(newScore) {
    const timestamp = new Date().toLocaleTimeString();
    scoreHistory.push({ timestamp, score: newScore });
}

// Basculer les menus
function toggleMenu(hideElement, showElement) {
    hideElement.classList.add('hidden');
    showElement.classList.remove('hidden');
}

// Afficher le graphique
function showGraph() {
	toggleMenu(mainMenu, scoreGraphContainer);

    // Détruire l'ancien graphique s'il existe
    if (window.scoreChart) {
        window.scoreChart.destroy();
    }

    // Vérifier si l'historique contient des données
    if (scoreHistory.length === 0) {
        alert("Pas de données à afficher dans le graphique !");
        toggleMenu(scoreGraphContainer, mainMenu);
        return;
    }

    // Créer le graphique
    const ctx = document.getElementById('scoreChart').getContext('2d');
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
                fill: true,
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


// Initialiser
updateScore();
