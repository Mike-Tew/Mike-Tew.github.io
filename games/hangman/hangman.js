const letters = Array.from(document.getElementsByClassName('letter'));
let randomWord;
let guessCount;
let letterBox;
let letterClass;

function gameStart() {
  guessCount = 8;
  randomWord = wordList[Math.floor(Math.random() * wordList.length) - 1];
  letterBox = document.createElement('div');
  letterClass = document.getElementsByClassName('letter-guess');
  letterBox.setAttribute('class', 'letter-guess');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gallows();
  document.getElementById('chosen-word').innerHTML = '';
  for (let i = 1; i <= randomWord.length; i += 1) {
    document.getElementById('chosen-word').appendChild(letterBox);
    letterBox = letterBox.cloneNode();
  }
  document.getElementById('turns').innerHTML = 'YOU HAVE <span id="turns-left">8</span> TURNS LEFT</h1>';
  document.getElementById('overlay').style.display = 'none';
  letters.forEach((element) => {
    element.style.pointerEvents = 'auto';
    element.style.background = 'white';
  });
}

gameStart();

/*
This function takes the letter input and
checks if it is present in the word.
*/
function takeTurn(letter) {
  for (const i of letters) {
    if (i.innerHTML === letter.toUpperCase()) {
      i.style.background = 'gray';
      i.style.pointerEvents = 'none';
    }
  }
  if (randomWord.indexOf(letter) === -1) {
    draw();
    if (guessCount > 1) {
      guessCount -= 1;
      document.getElementById('turns-left').innerHTML = guessCount;
    } else {
      document.getElementById('victory').innerHTML = "We're sorry, YOU LOSE";
      document.getElementById('word').innerHTML = randomWord.toUpperCase();
      document.getElementById('overlay').style.display = 'block';
      for (const i of letters) {
        i.style.pointerEvents = 'none';
      }
    }
  } else {
    for (const i in randomWord) {
      if (letter === randomWord[i]) {
        letterClass[i].innerHTML = letter.toUpperCase();
      }
    }
  }

  // Check for win condition
  let winCount = 0;
  for (const i of letterClass) {
    if (i.innerHTML !== '') {
      winCount += 1;
      if (winCount === randomWord.length) {
        document.getElementById('victory').innerHTML = 'Congratulations YOU WIN!';
        document.getElementById('word').innerHTML = randomWord.toUpperCase();
        document.getElementById('overlay').style.display = 'block';
        for (const i of letters) {
          i.style.pointerEvents = 'none';
        }
      }
    }
  }
}
