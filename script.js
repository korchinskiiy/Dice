'use strict';

//VARIABLES

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

let current;
let playing;
let activePlayer;
let scores;

const init = function () {
  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  scores = [0, 0];
  playing = true;
  current = 0;
  activePlayer = 0;
};

init();

//FUNCTiONS

const switchPlayer = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = current;
  activePlayer = 1 - activePlayer;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//STARTING POINT

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//ROLLING A DICE
// if (document.getElementById(`score--${activePlayer}`).textContent >= 100) {
//   document.getElementById(`score--${activePlayer}`).textContent = `You won`;
// }

rollBtn.addEventListener('click', function randomImage() {
  if (playing) {
    //Generating random number
    const num = Math.trunc(Math.random() * 6 + 1);

    //Displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${num}.png`;

    //Check if dice === 1
    if (num !== 1) {
      current += num;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

//HOLD BUTTON
hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//RESET GAME

newGame.addEventListener('click', init);
