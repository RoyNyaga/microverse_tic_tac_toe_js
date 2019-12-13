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