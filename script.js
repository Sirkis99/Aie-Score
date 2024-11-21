document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const history = [];
    const scoreElement = document.getElementById("score");
    const sliderValue = document.getElementById("sliderValue");
    const sliderMessage = document.getElementById("sliderMessage");
    const subMenu = document.getElementById("subMenu");
    const scoreGraphContainer = document.getElementById("scoreGraphContainer");
    const scoreSlider = document.getElementById("scoreSlider");

    const notesButtons = [
        { text: "Entre 18 et 20 (+4)", points: 4 },
        { text: "Entre 16 et 18 (+2)", points: 2 },
        { text: "Entre 15 et 16 (+1)", points: 1 },
        { text: "Entre 12 et 14 (-1)", points: -1 },
        { text: "Entre 10 et 12 (-2)", points: -2 },
    ];

    const lifeButtons = [
        { text: "Oubli d'affaires (-1)", points: -1 },
        { text: "Retrouvé le lendemain (+1)", points: 1 },
        { text: "Non retrouvé (-3)", points: -3 },
    ];

    // Update score display
    const updateScore = () => {
        scoreElement.textContent = score;
        sliderValue.textContent = score;
        scoreSlider.value = score;
        sliderMessage.textContent = score >= 0 ? "Normal" : "Attention";
        history.push(score);
    };

    // Populate submenu with buttons
    const populateSubMenu = (buttons) => {
        subMenu.innerHTML = "";
        buttons.forEach((btn) => {
            const button = document.createElement("button");
            button.textContent = btn.text;
            button.addEventListener("click", () => {
                score += btn.points;
                updateScore();
            });
            subMenu.appendChild(button);
        });
        subMenu.classList.remove("hidden");
    };

    // Show graph
    const showGraph = () => {
        scoreGraphContainer.classList.remove("hidden");
        const ctx = document.getElementById("scoreChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: Array.from({ length: history.length }, (_, i) => i + 1),
                datasets: [{
                    label: "Score",
                    data: history,
                    borderColor: "blue",
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
            },
        });
    };

    // Event listeners
    document.getElementById("showNotes").addEventListener("click", () => populateSubMenu(notesButtons));
    document.getElementById("showLife").addEventListener("click", () => populateSubMenu(lifeButtons));
    document.getElementById("resetScore").addEventListener("click", () => {
        const initial = prompt("Entrez le score initial :", "0");
        if (!isNaN(initial)) {
            score = parseInt(initial, 10);
            updateScore();
        }
    });
    document.getElementById("showGraph").addEventListener("click", showGraph);
    document.getElementById("closeGraph").addEventListener("click", () => scoreGraphContainer.classList.add("hidden"));

    // Initialize
    updateScore();
});
