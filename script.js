const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const WINING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton')
const board = document.getElementById('board')
const  winningmessagelement = document.getElementById('winningMessage')
const winningtextelement = document.querySelector('[data-winning-message-text]')
const startingPage = document.getElementById('startingGame')
const startButton = document.querySelector('.startGameBtn')
const quitButton = document.querySelector('.quitButton')
let circleTurn 

cellElements.forEach(cell =>{
    cell.addEventListener('click', handleClick, {once:true})
});

let myArray = [1,2,3,4,5,6,7,8,9]
console.log(myArray[Math.floor(Math.random()*myArray.length)])



restartButton.addEventListener('click', startGame)
startButton.addEventListener('click', startGame)
quitButton.addEventListener('click', endingPage)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
})
setBoardHoverClass()
winningmessagelement.classList.remove('show');
startingPage.classList.remove('show')

}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass)
    if(checkwin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
    // PlaceMark
    // Check for Win
    // Check for draw
    // Switch Turns
    

}

function endGame(draw){
    if(draw){
        winningtextelement.innerText = 'Draw!'
    }else{
        winningtextelement.innerText = `${circleTurn ? 'O': 'X'} Wins!`
    }
    winningmessagelement.classList.add('show')
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}
function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);

    }

}
function checkwin(currentClass){
    return WINING_COMBINATIONS.some(combinations =>{
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function endingPage(){
    startingPage.classList.add('show')
}
