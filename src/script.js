/* eslint-disable no-alert, no-param-reassign,
no-use-before-define, no-shadow, func-names */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[game,gameBoard,startButton]" }] */
const startButton = document.querySelector('#start-button');
const gameBoard = document.querySelector('#game-board');
const nameStorage = [];

const Tools = (() => {
  const toggleDisplay = (form) => form.classList.toggle('toggle-form');

  const resetBoard = (board) => {
    board.positions.forEach((element) => {
      element.innerText = '-';
    });
  };
  const playerName = (nameStorage) => {
    nameStorage.length = 0;
    nameStorage.push(document.querySelector('#playerOneName').value);
    nameStorage.push(document.querySelector('#playerTwoName').value);
  };
  const displayGeneralInfo = (info) => {
    const displayDiv = document.querySelector('#main-info');
    displayDiv.innerHTML = info;
  };
  const instructions = (info) => {
    const sideInfoDiv = document.querySelector('#side-info');
    sideInfoDiv.innerHTML = info;
  };
  const isStart = (value) => {
    if (value === 'start-button') {
      return true;
    }
    return false;
  };
  const effectTurn = (turn, playerOne, playerTwo, element) => {
    if (turn % 2 === 0) {
      turn = playerOne.takeTurn(element, turn);
    } else {
      turn = playerTwo.takeTurn(element, turn);
    }
    return turn;
  };
  const switchStartButton = () => {
    document.querySelector('#start-button').firstChild.data = 'Reset';
  };
  return {
    toggleDisplay,
    playerName,
    displayGeneralInfo,
    instructions,
    resetBoard,
    isStart,
    effectTurn,
    switchStartButton,
  };
})();

const TicTacToeGame = () => {
  const board = Board();
  let turn = 0;

  const start = (event) => {
    turn = 0;
    const idValue = event.target.attributes.id.value;
    Tools.resetBoard(board);
    Tools.switchStartButton();
    Tools.displayGeneralInfo('Tic-Tac-Toe');

    Tools.playerName(nameStorage);
    const playerOne = player(board, nameStorage[0], 'X');
    const playerTwo = player(board, nameStorage[1], 'O');


    board.positions.forEach((element) => {
      element.addEventListener('click', (event) => {
        takeTurn(playerOne, playerTwo, element);
        event.stopImmediatePropagation();
      });
    });
  };

  function takeTurn(playerOne, playerTwo, element) {
    if (board.checkForWinner() || board.isDraw(turn, board)) {
      return;
    }
    turn = Tools.effectTurn(turn, playerOne, playerTwo, element);

    board.declareWinner(turn, board, playerOne, playerTwo);
    board.isDraw(turn, board);
  }


  return {
    start,
  };
};

const Board = () => {
  const positions = Array.from(document.querySelectorAll('.col'));
  const declareWinner = (turn, board) => {
    if (board.checkForWinner()) {
      if (turn % 2 === 0) {
        Tools.displayGeneralInfo(`AND THE WINNER IS ${nameStorage[0].toUpperCase()}!`);
      } else {
        Tools.displayGeneralInfo(`AND THE WINNER IS ${nameStorage[1].toUpperCase()}!`);
      }
    }
  };
  const isDraw = (turn, board) => {
    if (turn === 9 && board.checkForWinner() === false) {
      Tools.displayGeneralInfo("It's a Draw, click the restart button for Another round");
      return true;
    }
    return false;
  };
  const checkForWinner = function () {
    let winner = false;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    const { positions } = this;
    winningCombinations.forEach((winningCombi) => {
      const pos0InnerText = positions[winningCombi[0]].innerText;
      const pos1InnerText = positions[winningCombi[1]].innerText;
      const pos2InnerText = positions[winningCombi[2]].innerText;
      const isWinningCombi = pos0InnerText !== '-'
                && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
      if (isWinningCombi) {
        winner = true;
        winningCombi.forEach((index) => {
          positions[index].className += ' winner';
        });
      }
    });
    return winner;
  };
  return {
    positions,
    checkForWinner,
    declareWinner,
    isDraw,
  };
};

const player = (board, name, mark) => {
  const takeTurn = (element, turn) => {
    if (element.innerHTML === 'O' || element.innerHTML === 'X') {
      alert('position has already been taken');
    } else {
      turn += 1;
      element.innerText = mark;
    }
    return turn;
  };

  return {
    name,
    board,
    mark,
    takeTurn,
  };
};


const game = TicTacToeGame();
