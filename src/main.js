/* All cost and purchase amounts */
let score = 0;
let spacemenCost = 20;
let spacemenPurchased = 0;
let spaceCrewCost = 50;
let spaceCrewPurchased = 0;
let spaceCorpCost = 100;
let spaceCorpPurchased = 0;

/* on click it'll do these functions and update everytime */
function updateButtons() {
    document.getElementById('spacemen').disabled = true;
    document.getElementById('spaceCrew').disabled = true;
    document.getElementById('spaceCorp').disabled = true;

    if (score >= spacemenCost) {
        document.getElementById('spacemen').disabled = false;
    }
    if (score >= spaceCrewCost) {
        document.getElementById('spaceCrew').disabled = false;
    }
    if (score >= spaceCorpCost) {
        document.getElementById('spaceCorp').disabled = false;
    }

    document.getElementById(
        'spacemen'
    ).innerText = `Buy Spacemen - Cost: ${spacemenCost}, Purchased: ${spacemenPurchased}
    1 Sun discovered every 3 seconds`;
    document.getElementById(
        'spaceCrew'
    ).innerText = `Buy Space Crew - Cost: ${spaceCrewCost}, Purchased: ${spaceCrewPurchased}
    20 Suns Discovered every 10 seconds`;
    document.getElementById(
        'spaceCorp'
    ).innerText = `Buy the Space Corporation - Cost: ${spaceCorpCost}, Purchased: ${spaceCorpPurchased}
    50 Suns Discovered every 15 seconds`;
}

const clickSound = new Audio('styles/sound/splash.wav');
const purchaseSound = new Audio('styles/sound/cash.mp3');

const achievementThresholds = {
    100: "Congratulations! You've reached 100 score!",
    500: "Amazing! You've reached 500 score!",
    1000: "Incredible! You've reached 1000 score!",
    1000000: "You've taken over the industry of fishing!",
};

// Set to store achieved milestones
const achievedMilestones = new Set();

// Function to check for achievements
function checkAchievements(score) {
    for (const threshold in achievementThresholds) {
        if (
            score >= parseInt(threshold) &&
            !achievedMilestones.has(threshold)
        ) {
            // Display achievement message
            alert(achievementThresholds[threshold]);
            achievedMilestones.add(threshold); // Add the milestone to the achieved set
            // You can also use a modal or other UI element to display the achievement message
        }
    }
}

/* on click add score as well as update game and button conditions */
document.getElementById('clicker').addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    score++;
    updateGame();
    updateButtons();
    checkAchievements(score);
});

/* on click buy the next clicker which is the spaceman, also has a price increase */
document.getElementById('spacemen').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= spacemenCost) {
        score -= spacemenCost;
        spacemenPurchased++;
        spacemenCost = Math.ceil(spacemenCost * 1.15);
        updateGame();
        updateButtons();
        startspacemen();
    }
});

/* on click buy space crew which autoclicks even more suns, also has a price increase */
document.getElementById('spaceCrew').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= spaceCrewCost) {
        score -= spaceCrewCost;
        spaceCrewPurchased++;
        spaceCrewCost = Math.ceil(spaceCrewCost * 1.15);
        updateGame();
        updateButtons();
        startSpaceCrew();
    }
});

/* on click buy spaceman corporation which earns you a lot of suns every so often also increases pricing */
document.getElementById('spaceCorp').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= spaceCorpCost) {
        score -= spaceCorpCost;
        spaceCorpPurchased++;
        spaceCorpCost = Math.ceil(spaceCorpCost * 1.15);
        updateGame();
        updateButtons();
        startspaceCorp();
    }
});

/* all these are time intervals for the auto clickers which change depending on each one */
function startspacemen() {
    setInterval(() => {
        score += spacemenPurchased;
        updateGame();
    }, 3000);
}

function startSpaceCrew() {
    setInterval(() => {
        score += 20 * spaceCrewPurchased;
        updateGame();
    }, 10000);
}

function startspaceCorp() {
    setInterval(() => {
        score += 50 * spaceCorpPurchased;
        updateGame();
    }, 15000);
}

/* update the game constantly */
function updateGame() {
    const building = new Building(
        score,
        spacemenCost,
        spacemenPurchased,
        spaceCrewCost,
        spaceCrewPurchased,
        spceCorpCost,
        spaceCorpPurchased
    );
    building.update();
    checkAchievements(score);
    updateButtons();
}
