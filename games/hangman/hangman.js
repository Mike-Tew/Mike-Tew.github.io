let guessCount = 8;
const randomWord = wordList[Math.floor(Math.random() * wordList.length) - 1];
console.log(randomWord);

let letterBox = document.createElement('div');
let letterClass = document.getElementsByClassName('letter-guess');
letterBox.setAttribute('class', 'letter-guess');
for (let i = 1; i <= randomWord.length; i++) {
  document.getElementById('chosen-word').appendChild(letterBox);
  letterBox = letterBox.cloneNode();
}

/*
This function takes the letter input and
checks if it is present in the word.
*/
function takeTurn(letter) {
  console.log(letter);
  if (randomWord.indexOf(letter) >= 0) {
    letterClass[randomWord.indexOf(letter)].innerHTML = letter.toUpperCase();
  } else {
    guessCount -= 1;
    console.log(`You have ${guessCount} guesses left.`);
    if (guessCount === 0) {
      console.log('You lose!');
    }
  }
}