// Variables globales
let score = 0;
let scoreHistory = [0];
let actionsHistory = ["Début"];

// Récupérer les éléments DOM
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderMessage = document.getElementById('sliderMessage');
const mainMenu = document.getElementById('mainMenu');
const notesSubMenu = document.getElementById('notesSubMenu');
const lifeSubMenu = document.getElementById('lifeSubMenu');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');

// Boutons principaux
const resetScoreButton = document.getElementById('resetScore');
const showNotesButton = document.getElementById('showNotes');
const showLifeButton = document.getElementById('showLife');
const showGraphButton = document.getElementById('showGraph');
const closeGraphButton = document.getElementById('closeGraph');

// Boutons des sous-menus
const noteButtons = document.querySelectorAll('#notesSubMenu button');
const lifeButtons = document.querySelectorAll('#lifeSubMenu button');

// Mettre à jour l'affichage du score
function updateScore(points = 0, action = "") {
    score += points;
    scoreElement.textContent = score;
    scoreSlider.value = score;
    scoreHistory.push(score);
    actionsHistory.push(action);

    // Message dynamique
    if (points !== 0) {
        const message = document.createElement('div');
        message.textContent = points > 0 ? `+${points}` : points;
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontSize = '4rem';
        message.style.color = points > 0 ? 'green' : 'red';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 1000);
    }

    // Mettre à jour le message du curseur
    sliderMessage.textContent = score > 0 ? "Positif" : "Négatif";
}

// Réinitialiser le score
resetScoreButton.addEventListener('click', () => {
    const initialScore = prompt("Entrez le score initial :");
    if (!isNaN(initialScore) && initialScore !== null) {
        score = parseInt(initialScore);
        scoreHistory = [score];
        actionsHistory = ["Réinitialisé"];
        updateScore(0);
    }
});

// Afficher les sous-menus
showNotesButton.addEventListener('click', () => {
    notesSubMenu.classList.remove('hidden');
    lifeSubMenu.classList.add('hidden');
});

showLifeButton.addEventListener('click', () => {
    lifeSubMenu.classList.remove('hidden');
    notesSubMenu.classList.add('hidden');
});

// Ajouter des événements aux sous-menus
[noteButtons, lifeButtons].forEach(buttons => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const points = parseInt(button.getAttribute('data-points'));
            updateScore(points, button.textContent.trim());
        });
    });
});

// Afficher le graphique
showGraphButton.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    scoreGraphContainer.classList.remove('hidden');
    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: actionsHistory,
            datasets: [{
                label: 'Évolution du score',
                data: scoreHistory,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
    });
});

// Fermer le graphique
closeGraphButton.addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Initialisation
updateScore();
