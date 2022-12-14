const $digits = document.getElementById("digits");
const $board = document.getElementById("board");
const $errors = document.getElementById("errors");

const board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---",
];

const solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763",
];

const numArray = new Array(10).fill(0);
let numSelected = null;
let tileSelected = null;
let errors = 0;

window.onload = function () {
  init();
};

function init() {
  for (let i = 1; i <= 9; i++) {
    const $number = document.createElement("div");

    $number.id = i;
    $number.className = "number";
    $number.innerText = i;
    $number.addEventListener("click", selectNumber);
    $digits.append($number);
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const $tile = document.createElement("div");

      if (board[r][c] != "-") {
        $tile.innerText = board[r][c];
        $tile.classList.add("tile-start");
        numArray[board[r][c]]++;

        if (numArray[solution[r][c]] === 9) {
          document.getElementById(`${solution[r][c]}`).classList.add("end");
        }
      }

      if (r == 2 || r == 5) {
        $tile.classList.add("horizontal-line");
      }

      if (c == 2 || c == 5) {
        $tile.classList.add("vertical-line");
      }

      $tile.id = `${r}-${c}`;
      $tile.classList.add("tile");
      $tile.addEventListener("click", selectTile);
      $board.append($tile);
    }
  }
  console.log(numArray);
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (!numSelected || this.innerText) {
    return;
  }

  const coords = this.id.split("-"); //["0", "0"]
  const r = parseInt(coords[0]);
  const c = parseInt(coords[1]);

  if (solution[r][c] == numSelected.id) {
    this.innerText = numSelected.id;
    numArray[solution[r][c]]++;

    if (numArray[solution[r][c]] === 9) {
      document.getElementById(`${solution[r][c]}`).classList.add("end");
      numSelected = null;
    }

    if (numArray.reduce((a, b) => a + b, 0) === 81) {
      setTimeout(() => window.alert("???????????????."), 100);
    }
  } else {
    errors += 1;
    $errors.innerText = errors;
  }
}
