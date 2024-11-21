let score = 10;
const history = [{ time: new Date().toLocaleTimeString(), score }];

const scoreElement = document.getElementById('score');
const scoreSlider = document.getElementById('scoreSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderMessage = document.getElementById('sliderMessage');

const mainMenu = document.getElementById('mainMenu');
const notesMenu = document.getElementById('notesMenu');
const lifeMenu = document.getElementById('lifeMenu');

const showNotesButton = document.getElementById('showNotes');
const showLifeButton = document.getElementById('showLife');
const initializeScoreButton = document.getElementById('initializeScore');
const resetScoreButton = document.getElementById('resetScore');

const showScoreGraphButton = document.getElementById('showScoreGraph');
const scoreGraphContainer = document.getElementById('scoreGraphContainer');
const closeGraphButton = document.getElementById('closeGraph');

function updateScore() {
    scoreElement.textContent = score;
    scoreSlider.value = score;
    sliderValue.textContent = score;
    sliderMessage.textContent = score >= 0 ? 'Normal' : 'Attention!';
    history.push({ time: new Date().toLocaleTimeString(), score });
}

function toggleMenu(menu) {
    notesMenu.classList.add('hidden');
    lifeMenu.classList.add('hidden');
    menu.classList.toggle('hidden');
}

showNotesButton.addEventListener('click', () => toggleMenu(notesMenu));
showLifeButton.addEventListener('click', () => toggleMenu(lifeMenu));

initializeScoreButton.addEventListener('click', () => {
    const newScore = parseInt(prompt('Entrez le score initial:', '10'), 10);
    if (!isNaN(newScore)) {
        score = newScore;
        updateScore();
    }
});

resetScoreButton.addEventListener('click', () => {
    score = 10;
    updateScore();
});

document.querySelectorAll('.noteButton, .lifeButton').forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.getAttribute('data-points'));
        score += points;
        updateScore();
    });
});

showScoreGraphButton.addEventListener('click', () => {
    scoreGraphContainer.classList.remove('hidden');
    renderChart();
});

closeGraphButton.addEventListener('click', () => {
    scoreGraphContainer.classList.add('hidden');
});

function renderChart() {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const times = history.map(entry => entry.time);
    const scores = history.map(entry => entry.score);

    if (window.scoreChart) window.scoreChart.destroy();

    window.scoreChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Évolution du score',
                data: scores,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Temps' } },
                y: { title: { display: true, text: 'Score' } }
            }
        }
    });
}
