
let score0 = 0;        
let score1 = 0;        
let currentScore = 0;  
let activePlayer = 0;  
let playing = true;    

const diceEl = document.getElementById("dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--1");
const player1El = document.querySelector(".player--2");

const btnNew = document.getElementById("btn--new");
const btnRoll = document.getElementById("btn--roll");
const btnHold = document.getElementById("btn--hold");

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function init() {
  score0 = 0;
  score1 = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = "block";
  diceEl.src = "dice1.jpg";

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.style.background = "";
  player1El.style.background = "";
}


btnRoll.addEventListener("click", function () {
  if (!playing) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice${dice}.jpg`;
  switch (dice) {
    case 1:
      switchPlayer();
      break;
    default:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      break;
  }
});

btnHold.addEventListener("click", function () {
  if (!playing) return;
  switch (activePlayer) {
    case 0:
      score0 += currentScore;
      score0El.textContent = score0;
      if (score0 >= 100) {
        endGame(0);
      } else {
        switchPlayer();
      }
      break;
    case 1:
      score1 += currentScore;
      score1El.textContent = score1;
      if (score1 >= 100) {
        endGame(1);
      } else {
        switchPlayer();
      }
      break;
  }
});

function endGame(winner) {
  playing = false;
  document.querySelector(`.player--${winner + 1}`).style.background = "#28a745";
  diceEl.style.display = "none";
}

btnNew.addEventListener("click", init);

init();