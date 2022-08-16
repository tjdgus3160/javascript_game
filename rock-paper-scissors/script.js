const $choices = document.getElementById("choices");
const $myChoice = document.getElementById("my-choice");
const $myScore = document.getElementById("my-score");
const $opponentChoice = document.getElementById("opponent-choice");
const $opponentScore = document.getElementById("opponent-score");

const choices = ["rock", "paper", "scissors"];
let myScore = 0;
let opponentScore = 0;

window.onload = function () {
  for (let i = 0; i < 3; i++) {
    const choice = document.createElement("img");

    choice.id = choices[i];
    choice.src = `./images/${choices[i]}.png`;
    choice.addEventListener("click", selectChoice);
    $choices.append(choice);
  }
};

function selectChoice() {
  const me = this.id;
  $myChoice.src = `./images/${me}.png`;

  const opponent = choices[Math.floor(Math.random() * 3)];
  $opponentChoice.src = `./images/${opponent}.png`;

  const result = battle(me, opponent);

  if (result === 0) {
    myScore += 1;
    opponentScore += 1;
  } else if (result === -1) {
    opponentScore += 1;
  } else {
    myScore += 1;
  }

  $myScore.innerText = myScore;
  $opponentScore.innerText = opponentScore;

  if (myScore === 10 && opponentScore === 10) {
    window.alert("무승부");
  }

  if (myScore === 10) {
    window.alert("나의 승리");
  }

  if (opponentScore === 10) {
    window.alert("나의 패배");
  }
}

function battle(me, opponent) {
  const m = choices.findIndex((v) => v === me);
  const o = choices.findIndex((v) => v === opponent);

  if (m === o) {
    return 0;
  } else if (Math.abs(m - o) === 1) {
    return m > o ? 1 : -1;
  } else {
    return m > o ? -1 : 1;
  }
}
