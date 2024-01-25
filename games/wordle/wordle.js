const keyboard = document.getElementById('keyboard')
const guessContainer = document.getElementById('guess-container')
const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', '1ZXCVBNM0']
const grayKeys = new Set()
const greenKeys = new Set()
const yellowKeys = new Set()
let turn = 0
let currentRow
let keyNodes
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
    // checkGuess()
    chageKeyColors()
  } else if (currentGuess.length < 5) {
    displayLetter(letter)
  }
}

const checkGuess = () => {
  if (currentGuess.join('') === word) {
    console.log('You Win!')
  }
}

const chageKeyColors = () => {
  if (currentGuess.length !== 5) return
  currentGuess.forEach((letter) => {
    if (!word.includes(letter)) {
      grayKeys.add(letter)
    } else if (word.indexOf(letter) === currentGuess.indexOf(letter)) {
      greenKeys.add(letter)
    } else {
      yellowKeys.add(letter)
    }
  })

  keyNodes.forEach((keyNode) => {
    if (greenKeys.has(keyNode.innerText)) {
      keyNode.classList.add('bg-green')
    } else if (yellowKeys.has(keyNode.innerText)) {
      keyNode.classList.add('bg-yellow')
    } else if (grayKeys.has(keyNode.innerText)) {
      keyNode.classList.add('bg-gray')
    }
  })
}

const removeLetter = () => {
  currentGuess.pop()
  currentRow[currentGuess.length].textContent = ""
}

const displayLetter = (letter) => {
  currentGuess.push(letter)
  currentRow[currentGuess.length - 1].textContent = letter
}

const resetGame = () => {
  createKeyboard()
  createBoard()
  currentRow = document.querySelectorAll('.row')[turn].childNodes
  keyNodes = document.querySelectorAll('.key')
}

document.body.onload = resetGame
