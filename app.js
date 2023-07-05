const game = document.querySelector(".game")
// all cells on the game board
const cells = document.querySelectorAll(".cell");
// restart game button
const restartBtn = document.querySelector("#restart");
const modalBackground = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");
const modalSmallHeader = document.querySelector("#modal-small-header");
const modalLargeHeader = document.querySelector("#modal-large-header");
const winnerIcon = document.querySelector("#winner-icon");
const modalBtnOne = document.querySelector("#modal-btn-one");
const modalBtnTwo = document.querySelector("#modal-btn-two");

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

function showModalWin() {
    modalBackground.style.display = "block";
    modal.style.display = "flex";
    modalBtnOne.textContent = "Quit";
    modalBtnTwo.textContent = "Next Round";
    currentUser === playerOne ? modalSmallHeader.textContent = "Player 1 wins!" : modalSmallHeader.textContent = "Player 2 wins!";
    winnerIcon.innerHTML = currentUser === "X" ? `<img src="./assets/icon-x.svg" alt=""></img>` : `<img src="./assets/icon-o.svg" alt=""></img>`;
    modalLargeHeader.classList = currentUser === "X" ? "blue-text" : "yellow-text";
    modalBtnOne.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        game.style.display = "none";
    })
    modalBtnTwo.addEventListener("click", () => {
        modalBackground.style.display = "none";
        modal.style.display = "none";
        startGame("next", playerOne);
    })
}

function move(clickedCellId) {
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
        console.log("draw!")
        scoreX++;
        scoreO++;
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
    playerOne = player;
    possibleMoves = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    userXMoves = [];
    userOMoves = [];
    currentUser = "X";
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("cell-win");
    });
    if (state === "new") {
        scoreX = 0;
        scoreO = 0;
    }
}

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

restartBtn.addEventListener("click", () => {
    startGame("new");
  });

startGame("new", "X");