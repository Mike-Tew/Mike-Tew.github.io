const keyboard = document.getElementById('keyboard')
const guessContainer = document.getElementById('guess-container')
const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', '1ZXCVBNM0']
let turn = 1
let currentGuess = []
let word = 'PARTY'

const createBoard = () => {
  for (let i = 1; i < 7; i++) {
    const guessRow = document.createElement('div')
    guessRow.classList.add('row')
    guessContainer.appendChild(guessRow)
    for (let j = 1; j < 6; j++) {
      const square = document.createElement('div')
      square.classList.add('square')
      guessRow.appendChild(square)
    }
  }
}

const createKeyboard = () => {
  LETTERS.forEach((row) => {
    const keyRow = document.createElement('div')
    keyRow.classList.add('row')
    keyboard.appendChild(keyRow)
    row.split('').forEach((letter) => {
      const keyEl = document.createElement('div')
      keyEl.classList.add('key')
      keyEl.innerText = letter
      keyEl.onclick = chooseLetter
      keyRow.appendChild(keyEl)
    })
  })
}

const chooseLetter = (e) => {
  const letter = e.target.textContent
  if (letter === '0') {
    currentGuess.pop()
  } else if (letter === '1') {
    checkGuess()
  } else if (currentGuess.length < 6) {
    currentGuess.push(letter)
  }
  console.log(currentGuess, currentGuess.length)
}

const checkGuess = () => {
  console.log(currentGuess.join(''), word)
  if (currentGuess.join('') === word) {
    console.log('You Win!')
  }
}

const resetGame = () => {
  createKeyboard()
  createBoard()
}

document.body.onload = resetGame
