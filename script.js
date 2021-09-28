const cellElement = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".game--restart");
const statusDisplay = document.querySelector(".game--status");
// console.log(statusDisplay)

let gameActive = true;
let currentPlayer = "X";
let boardState = ["", "", "","", "", "", "", "", ""];


const getCurrentPlayerTurn = ()=>
    `It's Player ${currentPlayer === "X"? 1: 2} turn`;
statusDisplay.innerHTML = getCurrentPlayerTurn();

function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = getCurrentPlayerTurn();
}

function handleCellClick(e){
    const clickCell = e.target;
    const clickCellIndex = parseInt(clickCell.id) - 1;
    // console.log(clickCell, clickCellIndex)

    if(!gameActive || boardState[clickCellIndex] !=="")    return;

    boardState[clickCellIndex] = currentPlayer;
    clickCell.innerHTML = currentPlayer;

    handleResultValidation();
}

cellElement.forEach((cell)=>{
    cell.addEventListener("click", handleCellClick)
    // cell.onclick = handleCellClick;
});

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation(){
    let roundWon = false;
    winningConditions.forEach((cond)=>{
        let a = boardState[cond[0]];
        let b = boardState[cond[1]];
        let c = boardState[cond[2]];

        if(a==="" || b==="" || c==="" || roundWon)  return;
        if(a===b && b===c)  roundWon = true;
    });
    
    if(roundWon){
        statusDisplay.innerHTML = `Congratulations! Player ${currentPlayer==="X"? 1:2} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !boardState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = "Draw!"
        gameActive = false;
        return;
    }
    
    handlePlayerChange();
    
}

function handleRestartButton(){
    location.reload();
}

restartButton.addEventListener("click", handleRestartButton);