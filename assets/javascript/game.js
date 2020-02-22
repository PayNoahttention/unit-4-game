// game function

const CrystalCollector = function() {
  
    // Variables for the game
    const numPages = $(".page").length;
    let   currentPage = 0;
    
    const numCrystals = 4;
    let   crystalValues = new Array(numCrystals);
    
    // visual variables
    let numWins = 0, numLosses = 0;
    let targetSum, currentSum;


  // New Game

    this.startNewGame = function() {
        // Sets everything to 0
        targetSum  = 0;
        currentSum = 0;

        // This gives a number between 1 and 12 to the crystals
        for (let i = 0; i < numCrystals; i++) {
            crystalValues[i] = randomInteger(1, 12);

            targetSum += randomInteger(1, 6) * crystalValues[i];
        }

        // Number betwqeen 19 and 120
        while (targetSum < 19 || targetSum > 120) {
            targetSum = 0;

            for (let i = 0; i < numCrystals; i++) {
                targetSum += randomInteger(1, 6) * crystalValues[i];
            }
        }

        // Output
        displayCurrentPage();
        displayNumWins();
        displayNumLosses();
        displayTargetSum();
        displayCurrentSum();
    }

    
    //display

    function displayCurrentPage() {
        $(".page").css({"display": "none"});
        $(`.page:nth-of-type(${currentPage + 1})`).css({"display": "block"});
    }

    this.displayLightBox = function(lightBoxOn) {
        $("#lightBox_background, #lightBox").css({"display": (lightBoxOn ? "block" : "none")});
    }

    function displayNumWins() {
        $("#numWins").text(numWins);
    }

    function displayNumLosses() {
        $("#numLosses").text(numLosses);
    }

    function displayTargetSum() {
        $("#targetSum").text(targetSum);
    }

    function displayCurrentSum() {
        $("#currentSum").text(currentSum);
    }


    // update the functions
    this.updatePage = function(changeBy) {
        currentPage = (currentPage + changeBy + numPages) % numPages;

        displayCurrentPage();
    }

    function updateNumWins(changeBy) {
        numWins += changeBy;
    }

    function updateNumLosses(changeBy) {
        numLosses += changeBy;
    }


    // Game tyme

    //random number generation
    function randomInteger(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }
    
    this.collectCrystal = function(index) {
        // Update sum
        currentSum += crystalValues[index];

        displayCurrentSum();

        if (currentSum < targetSum) {
            return;

        } else if (currentSum === targetSum) {
            updateNumWins(1);

            this.displayLightBox(true);
            
            this.startNewGame();

        } else {
            updateNumLosses(1);

            this.displayLightBox(true);
            
            this.startNewGame();

        }
    }
}



// New game on load

let game;

$(document).ready(function() {
    game = new CrystalCollector();

    game.startNewGame();

    
    // Click on the crystals

    // Game mechanics
    $(".crystals").on("click", function() {
        game.collectCrystal($(".crystals").index(this));
    });

});
