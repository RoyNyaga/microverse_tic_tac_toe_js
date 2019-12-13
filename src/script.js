/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[game,gameBoard,startButton]" }] */
let startButton = document.querySelector("#start-button");
let gameBoard = document.querySelector("#game-board");
const nameStorage = [];

const Tools = (() => {

  const  toggleDisplay = form => form.classList.toggle("toggle-form");

  const resetBoard = (board) => {
    board.positions.forEach((element) => {
        element.innerText = "-";           
      })
  }
  const  playerName = () => {    
      nameStorage.push(document.querySelector("#playerOneName").value);
      console.log(nameStorage);
      nameStorage.push(document.querySelector("#playerTwoName").value);
      console.log(nameStorage);  
  }
  const displayGeneralInfo = (info) => {
    let displayDiv = document.querySelector("#main-info");
    displayDiv.innerHTML = info
  }
  const instructions = (info) => {
    let sideInfoDiv = document.querySelector("#side-info");
    sideInfoDiv.innerHTML = info;
  }
  const isStart = (value) => {
    if(value === "start-button"){
      return true;
    }else{
      return false;
    }
  };
  const effectTurn = (turn, playerOne, playerTwo, element) => {
     if(turn % 2 === 0){
      turn = playerOne.takeTurn(element, turn);
     } else {
      turn = playerTwo.takeTurn(element, turn);
     }
     return turn;
  };
  const switchStartButton = () => {
    document.querySelector("#start-button").firstChild.data = "Reset";
  };
  return{ toggleDisplay, playerName, displayGeneralInfo, instructions, resetBoard, isStart, effectTurn ,switchStartButton};
})();

const TicTacToeGame = () => {
  Tools.playerName();
  const board = Board();
  let turn = 0;

  const start = (event) => {

  turn = 0;
  var idValue = event.target.attributes.id.value;
  console.log(idValue); 
  Tools.resetBoard(board);
  Tools.switchStartButton();
  Tools.displayGeneralInfo("Tic-Tac-Toe");
   
  const playerOne = player(board, nameStorage[0], "X");
  const playerTwo = player(board, nameStorage[1], "O");

  console.log(playerOne.name, playerOne.mark),
  console.log(playerTwo.name, playerTwo.mark),
    
  board.positions.forEach((element) => {
    element.addEventListener("click", (event) =>{
      takeTurn(playerOne, playerTwo, element);
        event.stopImmediatePropagation();       
    })
  })  
  }

  function takeTurn(playerOne, playerTwo, element){
    console.log(turn);

    if(board.checkForWinner() || board.isDraw(turn, board)){
      return
    }
    turn = Tools.effectTurn(turn, playerOne, playerTwo, element);
   
    console.log(turn)
    board.declareWinner(turn, board, playerOne, playerTwo);
    board.isDraw(turn, board);
  }


  return { start }

}

const Board = () => {
  let positions = Array.from(document.querySelectorAll(".col"));
  const declareWinner = (turn, board, playerOne, playerTwo) => {
    if(board.checkForWinner()){
      if(turn % 2 === 0){
        Tools.displayGeneralInfo(`AND THE WINNER IS ${playerOne.name}!!!!!!`);
      }else{
        Tools.displayGeneralInfo(`AND THE WINNER IS ${playerTwo.name}!!!!!!`);
      }
    }
  };
  const isDraw = (turn, board) => {
    if(turn === 9 && board.checkForWinner() === false){
      Tools.displayGeneralInfo("It's a Draw, click the restart button for Another round");
      return true;
    }else{
      return false;
    }
  };
  let checkForWinner = function(){
    let winner = false;
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ];
    const positions = this.positions;
    winningCombinations.forEach((winningCombi) => {
      const pos0InnerText = positions[winningCombi[0]].innerText;
      const pos1InnerText = positions[winningCombi[1]].innerText;
      const pos2InnerText = positions[winningCombi[2]].innerText;
      const isWinningCombi = pos0InnerText !== "-" &&
       pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
       if(isWinningCombi){
        winner = true;
        winningCombi.forEach((index) => {
          positions[index].className += " winner";
        })
       }
    })
    return winner;
  }
  return { positions, checkForWinner, declareWinner, isDraw }
}

const player = (board, name, mark) => {

  const takeTurn = (element, turn) => {
    if(element.innerHTML === "O" || element.innerHTML === "X"){
      alert("position has already been taken");      
    }else{
      turn ++;
      console.log(turn)
      element.innerText = mark;
    }
    return turn;
  }

  return { name, board, mark, takeTurn };
};



let game = TicTacToeGame();