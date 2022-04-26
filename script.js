"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const currentScorePlayer0 = document.getElementById("current--0");
const currentScorePlayer1 = document.getElementById("current--1");
const player0SectionEl = document.querySelector(".player--0");
const player1SectionEl = document.querySelector(".player--1");

let playing, activePlayer, score, currentScore;

const init = function () {
  playing = true;
  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  player0SectionEl.classList.remove("player--winner");
  player1SectionEl.classList.remove("player--winner");
  player1SectionEl.classList.remove("player--active");
  player0SectionEl.classList.add("player--active");
};

// Initialize the game
init();

// Rolling dice functionality
btnRollDice.addEventListener("click", function () {
  if (playing) {
    console.log("reacting to roll dice button click event");

    // 1. Generating a random dice roll
    const diceVal = Math.trunc(Math.random() * 6) + 1;
    console.log(`dice value : ${diceVal}`);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceVal}.png`;

    // 3. Check for rolled 1: if true,
    if (diceVal !== 1) {
      currentScore += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      // check if active player's score is >= 100, if true active player wins
      // Finish the game
      console.log(`Player ${activePlayer + 1} wins !!`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      // swithc the player
      switchPlayer();
    }
  }
});

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0SectionEl.classList.toggle("player--active");
  player1SectionEl.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

/***************** Reset The Game ************************/
btnNewGame.addEventListener("click", init);
