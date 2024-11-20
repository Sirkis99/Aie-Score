// Variables globales
let score = 0; // Score par défaut
let scoreInitialized = false;

// Récupérer les éléments du DOM
const scoreElement = document.getElementById('score');
const resetScoreButton = document.getElementById('resetScore');
const initScoreButton = document.getElementById('initScore');
const scoreInitInput = document.getElementById('scoreInit');
const scoreInitContainer = document.getElementById('scoreInitContainer');
const mainButtons = document.querySelectorAll('.main-buttons button');
const noteButtons = document.querySelectorAll('.noteButton');
const lifeButtons = document.querySelectorAll('.lifeButton');
const categories = document.querySelectorAll('.category');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');

// Ajouter un conteneur pour l'affichage temporaire des points
const container = document.querySelector('.container');
const pointsDisplay = document.createElement('div');
pointsDisplay.id = 'pointsDisplay';
container.appendChild(pointsDisplay);

// Fonction pour afficher temporairement les points gagnés ou perdus
function showPointsChange(points) {
    pointsDisplay.textContent = points > 0 ? `+${points}` : points;
    pointsDisplay.style.opacity = '1';
    pointsDisplay.style.fontSize = '36px';
    pointsDisplay.style.color = points > 0 ? 'green' : 'red';
    pointsDisplay.style.transition = 'opacity 1.5s ease';

    // Masquer après une seconde
    setTimeout(() => {
        pointsDisplay.style.opacity = '0';
    }, 1000);
}

// Fonction pour mettre à jour le score et l'affichage
function updateScore() {
    scoreElement.textContent = score;
    scoreSlider.value = score; // Synchroniser avec le slider
    sliderValue.textContent = score;
    updateSliderMessage(score);
}

// Fonction pour afficher le message en fonction du score
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

// Gérer les boutons principaux pour afficher les sous-menus
mainButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        categories.forEach((category, i) => {
            category.classList.toggle('hidden', i !== index); // Afficher la bonne catégorie
        });
    });
});

// Gérer les boutons "Notes"
noteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'));
        score += points;
        updateScore();
        showPointsChange(points);
    });
});

// Gérer les boutons "Vie courante"
lifeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'));
        score += points;
        updateScore();
        showPointsChange(points);
    });
});

// Réinitialisation avec saisie du score initial
initScoreButton.addEventListener('click', () => {
    const initialScore = parseInt(scoreInitInput.value); // Lire la valeur saisie
    if (!isNaN(initialScore)) {
        score = initialScore; // Appliquer le score initial
        // scoreInitialized = true;
        updateScore();
        scoreInitContainer.classList.add('hidden'); // Masquer la zone d'initialisation
    } else {
        alert("Veuillez entrer un nombre valide !");
    }
});

// Réinitialiser le score avec affichage du champ d'initialisation
resetScoreButton.addEventListener('click', () => {
    // scoreInitialized = false;
    scoreInitContainer.classList.remove('hidden'); // Afficher la zone d'initialisation
    scoreInitInput.value = ''; // Réinitialiser l'input pour éviter les valeurs résiduelles
});

// Synchroniser le curseur avec le score
scoreSlider.addEventListener('input', () => {
    score = parseInt(scoreSlider.value);
    updateScore();
});

// Masquer les sous-menus au chargement
categories.forEach(category => category.classList.add('hidden'));

// Masquer la zone de réinitialisation au chargement
scoreInitContainer.classList.add('hidden');
