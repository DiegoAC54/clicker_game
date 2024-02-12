/* class containing our score and cost */
class Building {
    constructor(
        score,
        spacemenCost,
        spacemenPurchased,
        spaceCrewCost,
        spaceCrewPurchased,
        spaceCorpCost,
        spaceCorpPurchased
    ) {
        this.score = score;
        this.spacemenCost = spacemenCost;
        this.spacemenPurchased = spacemenPurchased;
        this.spaceCrewCost = spaceCrewCost;
        this.spaceCrewPurchased = spaceCrewPurchased;
        this.spaceCorpCost = spaceCorpCost;
        this.spaceCorpPurchased = spaceCorpPurchased;
    }

    /* Update the button to disable on price amount required as well as keep track of score*/
    update() {
        document.getElementById('score').textContent = ` ${this.score}`;

        if (this.score >= this.spacemenCost) {
            document.getElementById('spacemen').disabled = false;
        } else {
            document.getElementById('spacemen').disabled = true;
        }

        if (this.score >= this.spaceCrewCost) {
            document.getElementById('spaceCrew').disabled = false;
        } else {
            document.getElementById('spaceCrew').disabled = true;
        }

        if (this.score >= this.spaceCorpCost) {
            document.getElementById('spaceCorp').disabled = false;
        } else {
            document.getElementById('spaceCorp').disabled = true;
        }
    }
}
