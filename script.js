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
const subMenu = document.getElementById('subMenu');
const subMenuButtons = document.getElementById('subMenuButtons');
const mainMenu = document.getElementById('mainMenu');
const tempMessageContainer = document.getElementById('tempMessageContainer');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const closeGraphButton = document.getElementById('closeGraph');

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
    tempMessageContainer.appendChild(message);

    setTimeout(() => message.remove(), 1500);
}

// Gestion des sous-menus
function showSubMenu(buttons) {
    mainMenu.classList.add('hidden');
    subMenu.classList.remove('hidden');
    subMenuButtons.innerHTML = '';

    buttons.forEach(({ label, points }) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => updateScore(points, label));
        subMenuButtons.appendChild(button);
    });
}

// Gestion des menus
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

// Gestion du bouton pour afficher l'évolution du score
document.getElementById('showGraphButton').addEventListener('click', () => {
    scoreGraphContainer.classList.remove('hidden'); // Afficher le graphique
    mainMenu.classList.add('hidden'); // Masquer le menu principal

    // Si le graphique n'a pas encore été créé, le créer
    if (!scoreChart) {
        const ctx = document.getElementById('scoreChart').getContext('2d');
        scoreChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: buttonHistory, // Les labels sont les noms des boutons
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
        // Si le graphique existe déjà, on met à jour les données
        scoreChart.data.labels = buttonHistory;
        scoreChart.data.datasets[0].data = scoreHistory;
        scoreChart.update();
    }
});

// Fermeture du graphique
closeGraphButton.addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});
