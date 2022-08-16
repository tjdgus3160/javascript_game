const $board = document.getElementById("board");
const $score = document.getElementById("score");

const ROW = 4;
const COLUMN = 4;
let board = Array.from(Array(ROW), () => Array(COLUMN).fill(0));
let score = 0;

function init() {
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COLUMN; c++) {
      const tile = document.createElement("div");

      tile.classList.add("tile");
      tile.id = `${r}-${c}`;

      $board.append(tile);
    }
  }

  setTwo();
  setTwo();
}

function setTwo() {
  if (!board.flat().includes(0)) {
    return window.alert("You lose!");
  }

  while (true) {
    const r = Math.floor(Math.random() * ROW);
    const c = Math.floor(Math.random() * COLUMN);

    if (board[r][c] === 0) {
      const tile = document.getElementById(`${r}-${c}`);

      board[r][c] = 2;
      tile.innerText = "2";
      tile.classList.add("x2");
      break;
    }
  }

  $score.innerHTML = board.flat().reduce((a, b) => a + b, 0);
}

// 왼쪽으로 밀어짐
function slide() {
  const newBoard = new Array();

  for (let r = 0; r < ROW; r++) {
    const newArr = new Array(ROW).fill(0);
    let pointer = 0;
    let current = 0;

    for (let v of board[r]) {
      if (v === 0) {
        continue;
      }

      if (current === 0) {
        current = v;
      } else if (current === v) {
        newArr[pointer] = current * 2;
        current = 0;
        pointer++;
      } else {
        newArr[pointer] = current;
        current = v;
        pointer++;
      }
    }

    if (current) {
      newArr[pointer] = current;
    }

    newBoard.push(newArr);
  }

  board = newBoard;
}

// 오른쪽으로 90도 회전
function rotate() {
  const newBoard = Array.from(Array(ROW), () => Array(COLUMN).fill(0));

  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COLUMN; c++) {
      newBoard[c][COLUMN - r - 1] = board[r][c];
    }
  }

  board = newBoard;
}

function updateTile() {
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COLUMN; c++) {
      const tile = document.getElementById(`${r}-${c}`);
      const num = board[r][c];

      tile.className = "tile";
      if (num === 0) {
        tile.innerText = "";
      } else {
        tile.innerText = num;
        tile.classList.add(`x${num}`);
      }
    }
  }
}

window.onload = function () {
  init();
};

document.addEventListener("keyup", ({ code }) => {
  switch (code) {
    case "ArrowLeft": {
      slide();
      break;
    }
    case "ArrowRight": {
      rotate();
      rotate();
      slide();
      rotate();
      rotate();
      break;
    }
    case "ArrowUp": {
      rotate();
      rotate();
      rotate();
      slide();
      rotate();
      break;
    }
    case "ArrowDown": {
      rotate();
      slide();
      rotate();
      rotate();
      rotate();
      break;
    }
    default:
      break;
  }

  updateTile();
  setTwo();
});
