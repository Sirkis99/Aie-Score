// Variables globales
let score = 0;
let scoreHistory = [];
let buttonHistory = [];
let scoreChart = null;  // Variable pour le graphique

// Éléments du DOM
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');
const subMenuButtons = document.getElementById('subMenuButtons');
const mainMenu = document.getElementById('mainMenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const closeGraphButton = document.getElementById('closeGraph');
const backToMenuButtons = document.querySelectorAll('#backToMenu'); // Récupère tous les boutons "Retour"

// Mise à jour du score
function updateScore(change = 0, buttonLabel = "") {
    score += change;
    scoreElement.textContent = score;
    sliderValue.textContent = score;

    if (change !== 0) {
        scoreHistory.push(score);
        buttonHistory.push(buttonLabel);
    }

    sliderMessage.textContent = score < 0 ? "Faible" : score < 10 ? "Moyenne" : "Élevé";

    // Afficher le message temporaire
    showTemporaryMessage(change);
}

// Affichage temporaire des points
function showTemporaryMessage(points) {
    const message = document.createElement('div');
    message.classList.add('tempMessage');
    message.textContent = points > 0 ? `+${points}` : `${points}`;
    message.style.color = points > 0 ? 'green' : 'red';
    setTimeout(() => message.remove(), 1500);
}

// Gestion des sous-menus
function showSubMenu(menuType) {
    mainMenu.classList.add('hidden');
    document.getElementById(menuType).classList.remove('hidden');

    // Configuration des boutons en fonction du sous-menu
    if (menuType === "notesMenu") {
        subMenuButtons.innerHTML = ''; // Réinitialiser les boutons
        const notesButtons = [
            { label: "Entre 18 et 20", points: 4 },
            { label: "Entre 16 et 18", points: 2 },
            { label: "Entre 15 et 16", points: 1 },
            { label: "Entre 12 et 14", points: -1 },
            { label: "Entre 10 et 12", points: -2 },
            { label: "Entre 5 et 10", points: -3 },
            { label: "Entre 0 et 5", points: -4 }
        ];
        notesButtons.forEach(({ label, points }) => {
            const button = document.createElement('button');
            button.textContent = label;
            button.addEventListener('click', () => updateScore(points, label));
            subMenuButtons.appendChild(button);
        });
    } else if (menuType === "lifeMenu") {
        subMenuButtons.innerHTML = ''; // Réinitialiser les boutons
        const lifeButtons = [
            { label: "Oubli d'affaires", points: -1 },
            { label: "Retrouvé le lendemain", points: 1 },
            { label: "Non retrouvé", points: -1 },
            { label: "Non retrouvé au bout de 3 jours", points: -5 }
        ];
        lifeButtons.forEach(({ label, points }) => {
            const button = document.createElement('button');
            button.textContent = label;
            button.addEventListener('click', () => updateScore(points, label));
            subMenuButtons.appendChild(button);
        });
    }
}

// Gestion des événements
document.getElementById('resetScoreButton').addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = score;
    scoreHistory = [];
    buttonHistory = [];
});

document.getElementById('showNotesMenu').addEventListener('click', () => {
    showSubMenu("notesMenu");
});

document.getElementById('showLifeMenu').addEventListener('click', () => {
    showSubMenu("lifeMenu");
});

backToMenuButtons.forEach(button => {
    button.addEventListener('click', () => {
        mainMenu.classList.remove('hidden');
        scoreGraphContainer.classList.add('hidden');
        document.getElementById('notesMenu').classList.add('hidden');
        document.getElementById('lifeMenu').classList.add('hidden');
    });
});

// Affichage et mise à jour du graphique
document.getElementById('showGraphButton').addEventListener('click', () => {
    scoreGraphContainer.classList.remove('hidden');
    mainMenu.classList.add('hidden');

    if (!scoreChart) {
        const ctx = document.getElementById('scoreChart').getContext('2d');
        scoreChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: buttonHistory,
                datasets: [{
                    label: 'Score',
                    data: scoreHistory,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Actions'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Score'
                        },
                        min: 0,
                    }
                }
            }
        });
    } else {
        scoreChart.data.labels = buttonHistory;
        scoreChart.data.datasets[0].data = scoreHistory;
        scoreChart.update();
    }
});

closeGraphButton.addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});
