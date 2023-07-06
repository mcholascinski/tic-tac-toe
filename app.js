const newGame = document.querySelector(".new-game");
const chooseX = document.querySelector("#choose-x-btn");
const chooseO = document.querySelector("#choose-o-btn");
const newGamePlayer = document.querySelector("#new-game-player");
const game = document.querySelector(".game");
// all cells on the game board
const cells = document.querySelectorAll(".cell");
// restart game button
const playerX = document.querySelector("#x-player");
const playerO = document.querySelector("#o-player");
const xPoints = document.querySelector("#x-points");
const oPoints = document.querySelector("#o-points");
const tiesPoints = document.querySelector("#ties-points");
const restartBtn = document.querySelector("#restart");
const modalBackground = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");
const modalSmallHeader = document.querySelector("#modal-small-header");
const modalLargeHeader = document.querySelector("#modal-large-header");
const modalLargeHeaderText = document.querySelector("#modal-large-header-text");
const winnerIcon = document.querySelector("#winner-icon");
const modalBtnOne = document.querySelector("#modal-btn-one");
const modalBtnTwo = document.querySelector("#modal-btn-two");
const modalBtnOneRestart = document.querySelector("#modal-btn-one-restart");
const modalBtnTwoRestart = document.querySelector("#modal-btn-two-restart");

// all possible wins
const possibleWins = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"]
];

// all variables modified in functions
let possibleMoves;
let userXMoves;
let userOMoves;
let currentUser;
let scoreX;
let scoreO;
let playerOne;
let chosenPlayer;

function showModalWin() {
    modalBtnOneRestart.style.display = "none";
    modalBtnTwoRestart.style.display = "none";
    modalBtnOne.style.display = "inline";
    modalBtnTwo.style.display = "inline";
    modalBackground.style.display = "block";
    modal.style.display = "flex";
    modalBtnOne.textContent = "Quit";
    modalBtnTwo.textContent = "Next Round";
    currentUser === playerOne ? modalSmallHeader.innerHTML = "Player 1 wins!" : modalSmallHeader.innerHTML = "Player 2 wins!";
    winnerIcon.innerHTML = currentUser === "X" ? `<img src="./assets/icon-x.svg" alt=""></img>` : `<img src="./assets/icon-o.svg" alt=""></img>`;
    modalLargeHeaderText.innerHTML = "takes the round";
    modalLargeHeaderText.classList = currentUser === "X" ? "blue-text" : "yellow-text";
    modalBtnOne.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        game.style.display = "none";
        newGame.style.display = "block";
        chooseX.classList.add("mark-btn-light");
        chooseO.classList.remove("mark-btn-light");
    })
    modalBtnTwo.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        startGame("next", playerOne);
    })
}

function showModalTie() {
    modalBtnOneRestart.style.display = "none";
    modalBtnTwoRestart.style.display = "none";
    modalBtnOne.style.display = "inline";
    modalBtnTwo.style.display = "inline";
    modalBackground.style.display = "block";
    modal.style.display = "flex";
    modalBtnOne.textContent = "Quit";
    modalBtnTwo.textContent = "Next Round";
    modalLargeHeaderText.textContent = "Round tied";
    modalLargeHeaderText.classList = "silver-text";
    winnerIcon.innerHTML = null;
    modalBtnOne.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        game.style.display = "none";
        newGame.style.display = "block";
        chooseX.classList.add("mark-btn-light");
        chooseO.classList.remove("mark-btn-light");
    })
    modalBtnTwo.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        startGame("next", playerOne);
    })
}

function showModalRestart() {
    modalBtnOneRestart.style.display = "inline";
    modalBtnTwoRestart.style.display = "inline";
    modalBtnOne.style.display = "none";
    modalBtnTwo.style.display = "none";
    modalBackground.style.display = "block";
    modal.style.display = "flex";
    modalBtnOneRestart.textContent = "No, cancel";
    modalBtnTwoRestart.textContent = "Yes, restart";
    modalLargeHeaderText.textContent = "Restart game?";
    modalLargeHeaderText.classList = "silver-text";
    winnerIcon.innerHTML = null;
    modalBtnOneRestart.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
    })
    modalBtnTwoRestart.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        startGame("new", playerOne);
    })
}

function move(clickedCellId) {
    if (!possibleMoves.includes(clickedCellId)) {
        return;
    }
    possibleMoves = possibleMoves.filter(id => id !== clickedCellId); // remove clicked cell from possible moves array
    if (currentUser === "X") {
        cells[parseInt(clickedCellId)].innerHTML = `<img src="./assets/icon-x.svg" alt=""></img>`; // add proper icon on clicked cell
        userXMoves.push(clickedCellId); // add clicked cell to array of all user's clicked cells in current round
        currentUserMoves = userXMoves; // set this user's moves as the current moves just to pass them to the function that checks if user wins
    } else {
        cells[parseInt(clickedCellId)].innerHTML = `<img src="./assets/icon-o.svg" alt=""></img>`;
        userOMoves.push(clickedCellId);
        currentUserMoves = userOMoves;
    }
    currentUserMoves.length >= 3 ? isWinner(currentUserMoves) : currentUser === "X" ? currentUser = "O" : currentUser = "X"; // if user has minimum of 3 moves, check if they win in isWinner function; if not, change the current user
}

function isDraw() {
    if (possibleMoves.length === 0) {
        ties++;
        tiesPoints.textContent = ties;
        showModalTie();
    } else {
        currentUser === "X" ? currentUser = "O" : currentUser = "X";
    }
  }

function isWinner(currentUserMoves) {
    // check if
    let result = possibleWins.find(win => win.every(pos => currentUserMoves.includes(pos)));
    let isWinningMove = {
        isWinning: !!result,
        winningArray: result || []
    };
    if (isWinningMove.isWinning) {
        isWinningMove.winningArray.forEach((e) => cells[e].classList.add("cell-win"));
        currentUser === "X" ? scoreX++ : scoreO++;
        xPoints.textContent = scoreX;
        oPoints.textContent = scoreO;
        showModalWin();
    } else {
        isDraw();
    }
}

function hover(cell) {
    if (possibleMoves.some(id => id === cell.id) && cells[cell.id].innerHTML === "") {
        currentUser === "X" ? cells[cell.id].innerHTML = `<img src="./assets/icon-x-outline.svg" alt=""></img>` : cells[cell.id].innerHTML = `<img src="./assets/icon-o-outline.svg" alt=""></img>`;
    } else {
        return
    }
}

function removeHover(cell) {
    if (possibleMoves.some(id => id === cell.id)) {
        cells[cell.id].innerHTML = "";
    }
}

function startGame(state, player) {
    player == null ? playerOne = "X" : playerOne = player;
    possibleMoves = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    userXMoves = [];
    userOMoves = [];
    currentUser = "X";
    if (playerOne === "X") {
        playerX.textContent = "P1";
        playerO.textContent = "P2";
    } else {
        playerX.textContent = "P2";
        playerO.textContent = "P1";
    }
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("cell-win");
    });
    if (state === "new") {
        ties = 0;
        scoreX = 0;
        scoreO = 0;
        tiesPoints.textContent = ties;
        xPoints.textContent = scoreX;
        oPoints.textContent = scoreO;
    }
}

chooseX.addEventListener("click", () => {
    chosenPlayer = "X";
    chooseX.classList.add("mark-btn-light");
    chooseO.classList.remove("mark-btn-light");
});

chooseO.addEventListener("click", () => {
    chosenPlayer = "O";
    chooseO.classList.add("mark-btn-light");
    chooseX.classList.remove("mark-btn-light");
});

newGamePlayer.addEventListener("click", () => {
    newGame.style.display = "none";
    game.style.display = "block";
    startGame("new", chosenPlayer);
})

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const clickedCellId = cell.id;
      move(clickedCellId);
    });
    cell.addEventListener("mouseenter", () => {
      hover(cell);
    });
    cell.addEventListener("mouseleave", () => {
      removeHover(cell);
    });
  });

restartBtn.addEventListener("click", showModalRestart);