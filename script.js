'use strict';

const cardPlayer0 = document.querySelector('.player--0');
const cardPlayer1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');

const imgDiceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

initNewGame();

rollDiceBtn.addEventListener('click', onRollDiceClick);
holdBtn.addEventListener('click', onHoldBtnClick);
newGameBtn.addEventListener('click', initNewGame);

function onRollDiceClick(e) {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    imgDiceEl.classList.remove('hidden');
    imgDiceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swichPlayer();
    }
  }
}

function onHoldBtnClick(e) {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      imgDiceEl.classList.add('hidden');
      playing = false;
    } else {
      swichPlayer();
    }
  }
}

function swichPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  cardPlayer0.classList.toggle('player--active');
  cardPlayer1.classList.toggle('player--active');
}

function initNewGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];

  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;

  imgDiceEl.classList.add('hidden');

  playing = true;
  cardPlayer0.classList.remove('player--winner');
  cardPlayer1.classList.remove('player--winner');
  cardPlayer0.classList.add('player--active');
  cardPlayer1.classList.remove('player--active');
}
