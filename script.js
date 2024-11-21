// Variables globales
let score = 0; // Score initial
let scoreHistory = []; // Historique des scores
let actionsHistory = []; // Historique des actions

// Récupération des éléments DOM
const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderMessage = document.getElementById('sliderMessage');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const mainMenu = document.getElementById('mainMenu');
const notesSubMenu = document.getElementById('notesSubMenu');
const lifeSubMenu = document.getElementById('lifeSubMenu');
const closeGraphButton = document.getElementById('closeGraph');

// Boutons principaux
const resetScoreButton = document.getElementById('resetScore');
const showNotesButton = document.getElementById('showNotes');
const showLifeButton = document.getElementById('showLife');
const showGraphButton = document.getElementById('showGraph');

// Boutons des sous-menus
const noteButtons = document.querySelectorAll('#notesSubMenu button');
const lifeButtons = document.querySelectorAll('#lifeSubMenu button');

// Fonction pour afficher un sous-menu
function showSubMenu(subMenu) {
    notesSubMenu.classList.add('hidden');
    lifeSubMenu.classList.add('hidden');
    subMenu.classList.remove('hidden');
}

// Fonction pour afficher le message dynamique en fonction du score
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
        sliderMessage.textContent = "15 mn de jeu en plus pour 4 jours";
        sliderMessage.style.color = "green";
    } else if (score >= 18 && score < 20) {
        sliderMessage.textContent = "30 mn de jeu en plus pour 4 jours";
        sliderMessage.style.color = "green";
    } else if (score >= 20) {
        sliderMessage.textContent = "VBUCKS";
        sliderMessage.style.color = "blue";
    }
}

// Fonction pour mettre à jour l'affichage du score
function updateScore(points, action) {
    score += points;
    scoreElement.textContent = score;
    scoreSlider.value = score;
    scoreHistory.push(score);
    actionsHistory.push(action);
    updateSliderMessage(score);

    // Afficher le changement en grand
    const changeDisplay = document.createElement('div');
    changeDisplay.textContent = points > 0 ? `+${points}` : points;
    changeDisplay.style.position = 'fixed';
    changeDisplay.style.top = '50%';
    changeDisplay.style.left = '50%';
    changeDisplay.style.transform = 'translate(-50%, -50%)';
    changeDisplay.style.fontSize = '4rem';
    changeDisplay.style.color = points > 0 ? 'green' : 'red';
    changeDisplay.style.zIndex = 1000;
    document.body.appendChild(changeDisplay);

    // Supprimer après 1 seconde
    setTimeout(() => {
        changeDisplay.remove();
    }, 1000);
}

// Fonction pour réinitialiser le score
resetScoreButton.addEventListener('click', () => {
    const initialScore = prompt("Entrez le score initial :");
    if (!isNaN(initialScore) && initialScore !== null) {
        score = parseInt(initialScore);
        scoreHistory = [score];
        actionsHistory = ["Initialisation"];
        updateScore(0, "Initialisation");
    }
});

// Afficher le sous-menu Notes
showNotesButton.addEventListener('click', () => {
    showSubMenu(notesSubMenu);
});

// Afficher le sous-menu Vie courante
showLifeButton.addEventListener('click', () => {
    showSubMenu(lifeSubMenu);
});

// Ajouter des événements aux boutons des sous-menus
noteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'));
        const action = button.textContent.trim();
        updateScore(points, action);
    });
});

lifeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'));
        const action = button.textContent.trim();
        updateScore(points, action);
    });
});

// Afficher le graphique
showGraphButton.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    scoreGraphContainer.classList.remove('hidden');

    // Générer le graphique
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
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                }
            },
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
                    }
                }
            }
        }
    });
});

// Fermer le graphique
closeGraphButton.addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Initialisation
updateSliderMessage(score);
