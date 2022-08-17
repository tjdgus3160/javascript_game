const $board = document.getElementById("board");
const $score = document.getElementById("score");

//board
const BLOCK_SIZE = 25;
const ROW = 20;
const COL = 20;

let snakeHead = [BLOCK_SIZE * 5, BLOCK_SIZE * 5];
const snakeBody = [];
let food = [R(), R()];

let d = null; // 상(0) 우(1) 하(2) 좌(3)
const direct = [
  [0, -BLOCK_SIZE],
  [BLOCK_SIZE, 0],
  [0, BLOCK_SIZE],
  [-BLOCK_SIZE, 0],
];

let progress = null;

window.onload = function () {
  $board.height = ROW * BLOCK_SIZE;
  $board.width = COL * BLOCK_SIZE;
  context = $board.getContext("2d");

  update();

  document.addEventListener("keyup", (e) => {
    if (d === null) {
      progress = setInterval(update, 100);
    }

    changeDirection(e.code);
  });
};

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, $board.width, $board.height);

  context.fillStyle = "red";
  context.fillRect(food[0], food[1], BLOCK_SIZE, BLOCK_SIZE);

  if (isSame(snakeHead, food)) {
    snakeBody.push(food);
    food = [R(), R()];
    $score.innerText = snakeBody.length;
  }

  if (snakeBody.length) {
    snakeBody.unshift(snakeHead);
    snakeBody.pop();
  }

  if (d !== null) {
    snakeHead = [snakeHead[0] + direct[d][0], snakeHead[1] + direct[d][1]];
  }

  context.fillStyle = "lime";
  context.fillRect(snakeHead[0], snakeHead[1], BLOCK_SIZE, BLOCK_SIZE);
  snakeBody.forEach(([x, y]) => context.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE));

  if (isOut() || isCrash()) {
    clearInterval(progress);
    alert("Game Over");
  }
}

function changeDirection(code) {
  switch (code) {
    case "ArrowUp":
      d = 0;
      break;
    case "ArrowRight":
      d = 1;
      break;

    case "ArrowDown":
      d = 2;
      break;

    case "ArrowLeft":
      d = 3;
      break;
    default:
      break;
  }
}

function R() {
  return Math.floor(Math.random() * COL) * BLOCK_SIZE;
}

function isSame(arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

function isOut() {
  return snakeHead[0] < 0 || snakeHead[0] > COL * BLOCK_SIZE || snakeHead[1] < 0 || snakeHead[1] > ROW * BLOCK_SIZE;
}

function isCrash() {
  return snakeBody.map((v) => isSame(v, snakeHead)).includes(true);
}
