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
    removeLetter()
  } else if (letter === '1') {
    checkGuess()
  } else if (currentGuess.length < 5) {
    displayLetter(letter)
  }
}

const checkGuess = () => {
  if (currentGuess.join('') === word) {
    console.log('You Win!')
  }
}

const removeLetter = () => {
  currentGuess.pop()
  const rows = document.querySelectorAll('.row')
  rows[turn - 1].childNodes[currentGuess.length].textContent = ""
}

const displayLetter = (letter) => {
  currentGuess.push(letter)
  const rows = document.querySelectorAll('.row')
  rows[turn - 1].childNodes[currentGuess.length - 1].textContent = letter
}

const resetGame = () => {
  createKeyboard()
  createBoard()
}

document.body.onload = resetGame
