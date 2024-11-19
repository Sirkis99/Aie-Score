// Charger le score depuis le localStorage, sinon utiliser la valeur par défaut de 10
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 10;

// Récupérer les éléments du DOM
const scoreElement = document.getElementById('score');
const resetScoreButton = document.getElementById('resetScore');
const noteButtons = document.querySelectorAll('.noteButton'); // Sélectionner tous les boutons de la catégorie "Notes"
const lifeButtons = document.querySelectorAll('.lifeButton'); // Sélectionner tous les boutons de la catégorie "Vie courante"
const scoreSlider = document.getElementById('scoreSlider'); // Récupérer le curseur
const sliderValue = document.getElementById('sliderValue'); // Récupérer la valeur du curseur
const sliderMessage = document.getElementById('sliderMessage'); // Récupérer l'élément pour afficher le message

// Fonction pour mettre à jour l'affichage du score et le sauvegarder dans localStorage
function updateScore() {
    scoreElement.textContent = score;
    scoreSlider.value = score; // Mettre à jour la position du curseur
    sliderValue.textContent = score; // Afficher la valeur actuelle du score à côté du curseur
    updateSliderMessage(score); // Mettre à jour le message en fonction du score
    // Sauvegarder le score dans le localStorage
    localStorage.setItem('score', score);
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

// Ajouter un événement à chaque bouton de la catégorie "Notes"
noteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points')); // Récupérer la valeur des points du bouton
        score += points; // Modifier le score en fonction de la valeur du bouton
        updateScore(); // Mettre à jour l'affichage
    });
});

// Ajouter un événement à chaque bouton de la catégorie "Vie courante"
lifeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points')); // Récupérer la valeur des points du bouton
        score += points; // Modifier le score en fonction de la valeur du bouton
        updateScore(); // Mettre à jour l'affichage
    });
});

// Réinitialiser le score
resetScoreButton.addEventListener('click', () => {
    score = 10; // Réinitialiser à 10 points
    updateScore();
});

// Synchroniser le curseur avec le score
scoreSlider.addEventListener('input', () => {
    score = parseInt(scoreSlider.value); // Récupérer la valeur du curseur
    updateScore(); // Mettre à jour l'affichage
});

// Initialisation du score sur la page
updateScore();

// Variables pour gérer le nom d'utilisateur et les scores
let username = localStorage.getItem('currentUser') || ''; // Charger le dernier utilisateur connecté
let userScores = JSON.parse(localStorage.getItem('userScores')) || {}; // Charger les scores de tous les utilisateurs

// Récupérer les éléments pour la gestion de l'utilisateur
const usernameInput = document.getElementById('username');
const saveUserButton = document.getElementById('saveUser');

// Fonction pour charger le score de l'utilisateur
function loadUserScore() {
    if (username && userScores[username] !== undefined) {
        score = userScores[username]; // Charger le score de l'utilisateur
    } else {
        score = 10; // Score par défaut si l'utilisateur est nouveau
    }
    updateScore(); // Mettre à jour l'affichage
}

// Sauvegarder le score pour l'utilisateur actuel
function saveUserScore() {
    userScores[username] = score; // Associer le score au nom d'utilisateur
    localStorage.setItem('userScores', JSON.stringify(userScores)); // Sauvegarder les scores dans le localStorage
}

// Gestion de la connexion de l'utilisateur
saveUserButton.addEventListener('click', () => {
    username = usernameInput.value.trim(); // Récupérer le nom saisi
    if (username) {
        localStorage.setItem('currentUser', username); // Sauvegarder l'utilisateur actif
        loadUserScore(); // Charger le score correspondant
        alert(`Bienvenue, ${username} !`);
    } else {
        alert("Veuillez entrer un nom d'utilisateur.");
    }
});

// Mise à jour du score lors des modifications
function updateScore() {
    scoreElement.textContent = score;
    scoreSlider.value = score; // Mettre à jour la position du curseur
    sliderValue.textContent = score; // Afficher la valeur actuelle du score à côté du curseur
    updateSliderMessage(score); // Mettre à jour le message en fonction du score
    saveUserScore(); // Sauvegarder le score
}

// Charger le dernier utilisateur et son score au démarrage
if (username) {
    usernameInput.value = username; // Pré-remplir le champ avec le dernier nom d'utilisateur
    loadUserScore(); // Charger le score associé
} else {
    updateScore(); // Mettre à jour avec un score par défaut si aucun utilisateur
}

