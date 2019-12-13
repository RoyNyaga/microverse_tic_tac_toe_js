let playerOneButton = document.querySelector("#playerOneButton");
let playerTwoButton = document.querySelector("#playerTwoButton");
let formTogglePlayerOne = document.querySelector("#form-div-playerOne");
let formTogglePlayerTwo = document.querySelector("#form-div-playerTwo");
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
  const  playerName = (e) => {    
  	var buttonIdValue = e.target.attributes.id.value;	
  	if(buttonIdValue === "save-button-player-one"){
  		var nameValue = document.querySelector("#name-input-field-player-one").value;
      toggleDisplay(formTogglePlayerOne);
      displayGeneralInfo(`Initializing ${nameValue}'s data.......`);
      instructions("Player two click button bellow to enter your name");
      toggleDisplay(playerOneButton);
      toggleDisplay(playerTwoButton);
      nameStorage.push(nameValue) ;
  	}else{
  		var nameValue = document.querySelector("#name-input-field-player-two").value;
  		toggleDisplay(formTogglePlayerTwo);
  		displayGeneralInfo(`Initializing ${nameValue}'s data......`);
  		toggleDisplay(startButton);
  		instructions("CLICK START BUTTON TO START GAME")
  		toggleDisplay(playerTwoButton);
      nameStorage.push(nameValue)
    }   
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
     };
     return turn;
  };
  return{ toggleDisplay, playerName, displayGeneralInfo, instructions, resetBoard, isStart, effectTurn };
})();

const TicTacToeGame = () => {
  const board = Board();
  let turn = 0;

  const start = (event) => {

  turn = 0;
  var idValue = event.target.attributes.id.value;
  console.log(idValue); 
  Tools.resetBaord(board);

  if(Tools.isStart(idValue)){
    Tools.toggleDisplay(gameBoard);
    Tools.toggleDisplay(startButton);
  };
   
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

  const initialize = () => {

    playerOneButton.addEventListener("click", (e) => {
      Tools.toggleDisplay(formTogglePlayerOne);
      Tools.instructions("Player One click button bellow to enter your information")
    });

    playerTwoButton.addEventListener("click", (e) => {
      Tools.toggleDisplay(formTogglePlayerTwo);
    });

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


  return { start, initialize }

}