let colorContainer = document.getElementById('color-container');
let colorToGuess = document.getElementById('color-to-guess');
let buttonContainer = document.getElementById('button-container');
let pointsSpan = document.getElementById('points');
let livesSpan = document.getElementById('lives');
const highScoreSpan = document.getElementById('high-score');
const messageText = document.getElementById('message');
const levelSpan = document.getElementById('level');
const statusBar = document.getElementById('status-bar');

const defaultContainerColor = 'cornsilk';

let lives = 5;
let points = 0;
let highScore = 0;
let levelNumber = 1;
let chosenColor;
let levelComplete = false;
let previousGuesses = [];
let arrayOfIds = [];
let secretColorId = generateGame(levelNumber);

function newColor () {
    return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
}

function getNewColors (howMany) {
        const arrayOfColors =[];
    for (let i = 0; i < howMany; i++) {
        arrayOfColors.push(newColor());
    }
    return arrayOfColors;
}

function generateGame (levelNumberCheck) {
    levelComplete = false;
    previousGuesses = [];
    statusBar.style.backgroundColor = defaultContainerColor;
    while (colorContainer.firstChild) {
        colorContainer.removeChild(colorContainer.firstChild);
    }
    levelNumberCheck < 5 ? gameSize = 3 : levelNumberCheck < 10 ? gameSize = 6 : gameSize = 9;
    let arrayOfColors = getNewColors(gameSize);
    for (let i = 0; i < gameSize; i++) {
        let newDiv = document.createElement('div');
        newDiv.id = `color-` + i;
        //newDiv.innerHTML = 'random color ' + i;
        newDiv.style.backgroundColor = arrayOfColors[i];
        colorContainer.appendChild(newDiv);
        newDiv.addEventListener('click', checkGuess);
        arrayOfIds.push(newDiv.id);
    }
    let chosenPosition = Math.floor(Math.random()*gameSize);
    chosenColor = arrayOfColors[chosenPosition];
    let chosenId = 'color-' + chosenPosition;
    colorToGuess.innerHTML = chosenColor //+ ' and chosen position is: ' + chosenPosition;
    messageText.innerHTML = 'Which colour matches the RGB value given?';
    levelSpan.innerHTML = levelNumber;
    return chosenId;
}

function checkGuess (event) {
    let clickedId = event.target.id;
    if (previousGuesses.indexOf(clickedId) < 0) {
        previousGuesses.push(event.target.id);
        if (levelComplete === false) {
            console.log(event);
            if (clickedId === secretColorId) {
                console.log('correct pick');
                correctGuess();
                levelComplete = true;
            } else {
                incorrectGuess(clickedId);
            }
        }
    }
}

function correctGuess () {
    if (levelNumber < 5) {
        points += 5;
    } else if (levelNumber > 9) {
        points +=20;
    } else {
        points +=10;
    }
    levelNumber ++;
    pointsSpan.innerHTML = points;
    messageText.innerHTML = 'WELL DONE! click here to continue...';
    statusBar.style.backgroundColor = 'honeydew';
    colorToGuess.style.backgroundColor = 'honeydew';
    colorContainer.style.backgroundColor = 'honeydew';
    statusBar.addEventListener('click', nextLevel);
    statusBar.style.cursor = 'pointer';
    arrayOfIds.forEach(function (id) {
        document.getElementById(id).style.backgroundColor = chosenColor;
    })
    /*
    const continueButton = document.createElement('button');
    continueButton.id = 'continue-button';
    continueButton.innerHTML = 'Next Level';
    buttonContainer.appendChild(continueButton);
    continueButton.addEventListener('click', nextLevel);
    */

}

function incorrectGuess (idToHide) {
    let toHide = document.getElementById(idToHide);
    toHide.style.backgroundColor = 'white';
    statusBar.style.backgroundColor = 'lavenderblush';
    colorToGuess.style.backgroundColor = 'lavenderblush';
    colorContainer.style.backgroundColor = 'lavenderblush';
    if (lives > 1) {
        if (lives === 2) {livesSpan.style.color = 'red'};
        lives --;
        livesSpan.innerHTML = lives;
        messageText.innerHTML = 'TRY AGAIN!';
    } else {
        levelComplete = true;
        livesSpan.innerHTML = '0';
        gameOver()
    };
    
}

function gameOver () {
    arrayOfIds.forEach(function (id) {
        document.getElementById(id).style.backgroundColor = 'white';
    });
    alert('Game Over!');
    messageText.innerHTML = 'GAME OVER!'
    if (points > highScore) {
        highScore = points;
        messageText.innerHTML += '<br>WELL DONE! YOU GOT A NEW HIGH SCORE!'
        statusBar.style.backgroundColor = 'powderblue';
    }
    highScoreSpan.innerHTML = highScore;
    const newGameButton = document.createElement('button');
    newGameButton.innerHTML = 'New Game';
    newGameButton.id ='new-game-button';
    buttonContainer.appendChild(newGameButton);
    newGameButton.addEventListener('click', newGame);
}

function nextLevel () {
    statusBar.removeEventListener('click', nextLevel);
    statusBar.style.cursor = 'auto';
    statusBar.style.backgroundColor = defaultContainerColor;
    colorToGuess.style.backgroundColor = defaultContainerColor;
    colorContainer.style.backgroundColor = defaultContainerColor;
    //const toRemove = document.getElementById('continue-button');
    //buttonContainer.removeChild(toRemove);
    secretColorId = generateGame(levelNumber);
}

function newGame () {
    const toRemove = document.getElementById('new-game-button');
    buttonContainer.removeChild(toRemove);
    livesSpan.style.color = 'black';
    lives = 5;
    points = 0;
    levelNumber = 1;
    arrayOfIds = [];
    secretColorId = generateGame(levelNumber);
}