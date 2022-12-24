'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0E1 = document.querySelector('#score--0');
const score1E1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0E1 = document.getElementById('current--0');
const current1E1 = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/*const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;*/
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0E1.textContent = 0;
  score1E1.textContent = 0;
  current0E1.textContent = 0;
  current1E1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Starting condition
score0E1.textContent = 0;
score1E1.textContent = 0;
diceEl.classList.add('hidden');

//Rolling dice Functionality

btnRoll.addEventListener('click', function () {
  // 1.Genrating a RANDOM dice Roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check For Rolled 1 :
    if (dice !== 1) {
      //add current score
      currentScore = currentScore + dice; // currentscoure += dice also,
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0E1.textContent = currentScore;
    } else {
      //Switch TO next Player
      /*document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');*/
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's
    scores[activePlayer] += currentScore;
    //scores[1]= scores[1] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      //finsh game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
