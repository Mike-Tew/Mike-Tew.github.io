let playerOne = true;
const s1 = document.getElementById('square-1');
const s2 = document.getElementById('square-2');
const s3 = document.getElementById('square-3');
const s4 = document.getElementById('square-4');
const s5 = document.getElementById('square-5');
const s6 = document.getElementById('square-6');
const s7 = document.getElementById('square-7');
const s8 = document.getElementById('square-8');
const s9 = document.getElementById('square-9');

function takeTurn() {
  if (event.target.innerHTML === '' && playerOne === true) {
    event.target.innerHTML = 'O';
    playerOne = !playerOne
  } else if (event.target.innerHTML === '' && playerOne === false) {
    event.target.innerHTML = 'X';
    playerOne = !playerOne
  }
  switch (true) {
    case s1.innerHTML + s2.innerHTML + s3.innerHTML === 'OOO':
    case s4.innerHTML + s5.innerHTML + s6.innerHTML === 'OOO':
    case s7.innerHTML + s8.innerHTML + s9.innerHTML === 'OOO':
    case s1.innerHTML + s4.innerHTML + s7.innerHTML === 'OOO':
    case s2.innerHTML + s5.innerHTML + s8.innerHTML === 'OOO':
    case s3.innerHTML + s6.innerHTML + s9.innerHTML === 'OOO':
    case s1.innerHTML + s5.innerHTML + s9.innerHTML === 'OOO':
    case s3.innerHTML + s5.innerHTML + s7.innerHTML === 'OOO':
      alert('Player 1 Wins!');
      resetGame();
      document.getElementById('score-1').innerHTML++;
  }
  switch (true) {
    case s1.innerHTML + s2.innerHTML + s3.innerHTML === 'XXX':
    case s4.innerHTML + s5.innerHTML + s6.innerHTML === 'XXX':
    case s7.innerHTML + s8.innerHTML + s9.innerHTML === 'XXX':
    case s1.innerHTML + s4.innerHTML + s7.innerHTML === 'XXX':
    case s2.innerHTML + s5.innerHTML + s8.innerHTML === 'XXX':
    case s3.innerHTML + s6.innerHTML + s9.innerHTML === 'XXX':
    case s1.innerHTML + s5.innerHTML + s9.innerHTML === 'XXX':
    case s3.innerHTML + s5.innerHTML + s7.innerHTML === 'XXX':
      alert('Player 2 Wins!');
      resetGame();
      document.getElementById('score-2').innerHTML++;
  }
};

function resetGame() {
  playerOne = true;
  let test = document.getElementsByClassName('squares');
  Array.from(test).forEach((square) => {
    square.innerHTML = '';
  });
};