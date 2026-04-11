'use strict';
// Selecting Elements:
const rollBtns = document.querySelectorAll('.roll');
const diceImage = document.querySelector('.dice-image__content');
const players = document.querySelectorAll('.player');
const holdBtns = document.querySelectorAll('.hold');

let activePlayer = 0;
let currentScore = 0;
let totalScore = [0, 0];

document.querySelectorAll('.controls').forEach(elem => {
  elem.style.display = 'none';
});
players[activePlayer].querySelector('.controls').style.display = 'flex';
rollBtns.forEach(btn => {
  btn.addEventListener('click', rollDice);
});
holdBtns.forEach(btn => {
  btn.addEventListener('click', holdScore);
});

const generateDice = function () {
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
};

function rollDice(e) {
  let btn = e.target;
  let playerElement = btn.closest('.player');
  if (!playerElement.classList.contains('active')) {
    return;
  }
  let diceValue = generateDice();
  diceImage.setAttribute('src', `./dice-${diceValue}.png`);
  let currentScoreElement = players[activePlayer].querySelector(
    '.current-score__container',
  );
  currentScore += diceValue;
  currentScoreElement.textContent = currentScore;
  if (diceValue === 1) {
    currentScore = 0;
    currentScoreElement.textContent = currentScore;
    switchPlayer();
  }
}

function holdScore(e) {
  let totalScoreElement = players[activePlayer].querySelector(
    '.player__total-score',
  );
  let btn = e.target;
  let playerElement = btn.closest('.player');

  if (!playerElement.classList.contains('active')) {
    return;
  }

  totalScore[activePlayer] += currentScore;
  totalScoreElement.textContent = totalScore[activePlayer];
  players[activePlayer].querySelector('.current-score__container').textContent =
    0;

  if (totalScore[activePlayer] >= 10) {
    stopGame();
    return;
  }
  currentScore = 0;

  switchPlayer();
}

function switchPlayer() {
  players[activePlayer].classList.remove('active');
  players[activePlayer].querySelector('.controls').style.display = 'none';
  activePlayer = activePlayer === 0 ? 1 : 0;
  players[activePlayer].classList.add('active');
  players[activePlayer].querySelector('.controls').style.display = 'flex';
}

function stopGame() {
  players[activePlayer].classList.add('winner');
  setTimeout(() => {
    showModal(`player ${activePlayer + 1} won the match 🏆,
      Please restart the game again!`);
  }, 1200);
  document.querySelectorAll('.controls').forEach(elem => {
    elem.style.display = 'none';
  });
  activePlayer = 0;
  currentScore = 0;
  totalScore[0] = 0;
  totalScore[1] = 0;

  players[activePlayer].querySelector('.controls').style.display = 'flex';
  players[activePlayer].querySelector('.controls').classList.add('disabled');
}

function showModal(message) {
  document.querySelector('.overlay').classList.add('show');
  document.querySelector('.overlay__content-message').textContent = message;
}
