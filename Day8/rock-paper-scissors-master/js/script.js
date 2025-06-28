//This function is used to play the game of Rock, Paper, Scissors, Lizard, Spock
function game() {
    //Array of possible actions
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    //Array of possible winning combinations
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    //Variables to store user and computer choices
    let userChoice = '';
    let compChoice = '';
    //Variables to store elements from the DOM
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');

    //Variable to store the current score
    let currentScore = null;

    //Event listener to start the game when the page loads
    window.addEventListener('load', () => {
        //Retrieve the score from local storage
        retrieveScoreFromLocalStorage();
    
        //Event listener to get the user's choice when they click on an action
        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                //Get the user's choice
                userChoice = getUserChoice(ev.target);
                //Get the computer's choice
                compChoice = getComputerChoice();
    
                //Start the game
                startGame();
            })
        });

        //Event listener to try again when the user clicks the button
        resultElement.querySelector('button').addEventListener('click', tryAgain);
    
    })
    
    //Function to start the game
    function startGame() {
        //Calculate the winner
        calculateWinner(userChoice, compChoice);
        //Hide the user choice element
        userChoiceElement.classList.add('hidden');
        //Show the picked element
        pickedElement.classList.remove('hidden');
        //Clear the result before appending
        clearResultBeforeAppend();
        //Build the choice elements
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);
    }
    
    //Function to get the user's choice
    function getUserChoice(target) {
        //Check if the target is an image
        if (target.nodeName === 'IMG') {
            //Return the class of the parent element
            return target.parentElement.classList[1];
        }
        //Return the class of the target
        return target.classList[1];
    }
    
    //Function to get the computer's choice
    function getComputerChoice() {
        //Return a random action from the actions array
        return actions[Math.floor(Math.random() * 5)];
    }

    //Function to calculate the winner
    function calculateWinner(user, comp) {
        //Check if the user and computer chose the same action
        if (user === comp) {
            //Set the result title to tie
            resultTitleElement.innerText = 'Tie';
        } else if (getUserWinsStatus(user + comp)) {
            //Set the result title to you win
            resultTitleElement.innerText = 'You win';
            //Calculate the score
            calculateScore(1);
        } else {
            //Set the result title to you lose
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    }

    function getUserWinsStatus(result) {
    //Function to check if the user wins
        return userWinResults.some(winStr => winStr === result);
        //Check if the result is in the userWinResults array
    }

    function buildChoiceElement(isItUserElement, className) {
    //Function to build the choice elements
        const el = document.createElement('div');
        //Create a new div element
        el.classList = [`game-card ${className}`];
        //Set the class of the element
        el.innerHTML = `<img src="./images/icon-${className}.svg" alt="${className}">`;
        //Set the innerHTML of the element
        if (isItUserElement) {
        //Check if the element is the user's choice
            userPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
            //Append the element to the computer pick element
    }

    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
    //Function to try again
        pickedElement.classList.add('hidden');
        //Show the user choice element
    }
        //Hide the picked element

    function clearResultBeforeAppend() {
        userPickElement.innerHTML = '';
    //Function to clear the result before appending
        pcPickElement.innerHTML = '';
        //Clear the user pick element
    }
        //Clear the computer pick element

    function calculateScore(roundResult) {
        currentScore += roundResult;
    //Function to calculate the score
        updateScoreBoard();
        //Add the round result to the current score
    }
        //Update the score board

    function retrieveScoreFromLocalStorage() {
        const score = +window.localStorage.getItem('gameScore') || 0;
    //Function to retrieve the score from local storage
        currentScore = score;
        //Get the score from local storage
        updateScoreBoard();
        //Set the current score to the score from local storage
    }
        //Update the score board

    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
    //Function to update the score board
        window.localStorage.setItem('gameScore', currentScore);
        //Set the text of the score count element to the current score
    }
        //Set the score in local storage to the current score

    //work with modal
    const rulesBtn = document.querySelector('.rules-btn');
    const modalBg = document.querySelector('.modal-bg');
    //Variables to store elements from the DOM
    const modal = document.querySelector('.modal');

    rulesBtn.addEventListener('click', () => {
        modal.classList.add('active');
    //Event listener to show the modal when the rules button is clicked
        modalBg.classList.add('active');
        //Add the active class to the modal and modal bg
    });

    modalBg.addEventListener('click', (event) => {
        if (event.target === modalBg) {
    //Event listener to hide the modal when the modal bg is clicked
            hideModal();
        //Check if the target is the modal bg
        }
            //Hide the modal
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    //Event listener to hide the modal when the close button is clicked
    function hideModal() {
        modal.classList.remove('active');
    //Function to hide the modal
        modalBg.classList.remove('active');  
        //Remove the active class from the modal and modal bg
    }
}

game();