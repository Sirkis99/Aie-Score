// Initialisation des variables
const scoreDisplay = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');

const mainMenu = document.getElementById('mainMenu');
const notesMenu = document.getElementById('notesMenu');
const lifeMenu = document.getElementById('lifeMenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const scoreChartCanvas = document.getElementById('scoreChart');
const backToMenuButtons = document.querySelectorAll('#backToMenuNotes, #backToMenuLife');

// Variables pour les sous-menus
const subMenuButtons = document.getElementById('subMenuButtons');

// Graphique des scores
let scores = [];
let chart;

// Fonction de mise à jour du score
function updateScore(points, description) {
    const currentScore = parseInt(scoreDisplay.textContent);
    const newScore = currentScore + points;
    scoreDisplay.textContent = newScore;
    scores.push({ x: new Date(), y: newScore });
    if (chart) {
        chart.update();
    }

    // Affichage du message temporaire pour le score
    sliderMessage.textContent = `${description}: ${points >= 0 ? "+" : ""}${points} points`;
    setTimeout(() => {
        sliderMessage.textContent = "Cliquez sur un bouton";
    }, 2000);
}

// Fonction de réinitialisation du score
function resetScore() {
    scoreDisplay.textContent = "0";
    scores = [];
    if (chart) {
        chart.update();
    }
}

// Affichage du graphique
function showGraph() {
    scoreGraphContainer.classList.remove('hidden');
    const data = {
        datasets: [{
            label: 'Évolution du score',
            data: scores,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    },
                    title: {
                        display: true,
                        text: 'Temps'
                    }
                },
                y: {
                    min: 0,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            }
        }
    };

    chart = new Chart(scoreChartCanvas, config);
}

// Fermeture du graphique
function closeGraph() {
    scoreGraphContainer.classList.add('hidden');
}

// Affichage du sous-menu Notes
function showNotesMenu() {
    mainMenu.classList.add('hidden');
    notesMenu.classList.remove('hidden');
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
}

// Affichage du sous-menu Vie courante
function showLifeMenu() {
    mainMenu.classList.add('hidden');
    lifeMenu.classList.remove('hidden');
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

// Gestion des événements
document.getElementById('showNotesMenu').addEventListener('click', showNotesMenu);
document.getElementById('showLifeMenu').addEventListener('click', showLifeMenu);
document.getElementById('resetScoreButton').addEventListener('click', resetScore);
document.getElementById('showGraphButton').addEventListener('click', showGraph);
document.getElementById('closeGraph').addEventListener('click', closeGraph);

// Retour au menu principal
backToMenuButtons.forEach(button => {
    button.addEventListener('click', () => {
        mainMenu.classList.remove('hidden');
        notesMenu.classList.add('hidden');
        lifeMenu.classList.add('hidden');
    });
});
