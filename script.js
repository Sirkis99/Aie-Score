// Charger le score depuis le localStorage ou utiliser la valeur par défaut
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 10;

// Récupérer les éléments du DOM
const scoreElement = document.getElementById('score');
const resetScoreButton = document.getElementById('resetScore');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');
const initialScoreInput = document.getElementById('initialScore');
const setInitialScoreButton = document.getElementById('setInitialScore');
const scoreInitContainer = document.getElementById('scoreInitContainer');

// Boutons pour afficher les sous-menus
const showNotesButton = document.getElementById('showNotes');
const showLifeButton = document.getElementById('showLife');

// Sous-menus
const notesMenu = document.getElementById('notesMenu');
const lifeMenu = document.getElementById('lifeMenu');

// Fonction pour mettre à jour l'affichage du score
function updateScore() {
    scoreElement.textContent = score;
    scoreSlider.value = score;
    sliderValue.textContent = score;
    updateSliderMessage(score);
    localStorage.setItem('score', score);
}

// Fonction pour mettre à jour le message dynamique
function updateSliderMessage(score) {
    if (score < 0) {
        sliderMessage.textContent = "Plus rien";
        sliderMessage.style.color = "red";
    } else if (score < 4) {
        sliderMessage.textContent = "Plus de console ni de TV";
        sliderMessage.style.color = "orange";
    } else if (score < 8) {
        sliderMessage.textContent = "Plus de console";
        sliderMessage.style.color = "orange";
    } else if (score < 14) {
        sliderMessage.textContent = "Normal";
        sliderMessage.style.color = "green";
    } else if (score < 18) {
        sliderMessage.textContent = "15 mn de jeu en plus pour 4 jours";
        sliderMessage.style.color = "green";
    } else if (score < 20) {
        sliderMessage.textContent = "30 mn de jeu en plus pour 4 jours";
        sliderMessage.style.color = "green";
    } else {
        sliderMessage.textContent = "VBUCKS";
        sliderMessage.style.color = "blue";
    }
}

// Afficher le menu Notes
showNotesButton.addEventListener('click', () => {
    notesMenu.classList.toggle('hidden');
    lifeMenu.classList.add('hidden');
});

// Afficher le menu Vie courante
showLifeButton.addEventListener('click', () => {
    lifeMenu.classList.toggle('hidden');
    notesMenu.classList.add('hidden');
});

// Ajouter des événements sur les boutons des sous-menus
document.querySelectorAll('.noteButton, .lifeButton').forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'));
        score += points;
        updateScore();
    });
});

// Aff
