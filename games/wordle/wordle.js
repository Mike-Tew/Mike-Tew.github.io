import { wordList } from './words.js'

const guessContainer = document.getElementById('guess-container')
const keyboard = document.getElementById('keyboard')
const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', '1ZXCVBNM0']
let turn,
  currentGuess,
  grayKeys,
  greenKeys,
  yellowKeys,
  currentRow,
  keyNodes,
  word

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
      keyEl.onclick = keyPress
      if (letter === '1') {
        keyEl.innerText = 'ENTER'
        keyEl.classList.add('wide')
      }
      if (letter === '0') {
        keyEl.innerText = 'BACK'
        keyEl.classList.add('wide')
      }
      keyRow.appendChild(keyEl)
    })
  })
}

const keyPress = (e) => {
  const letter = e.type == 'keydown' ? e.key.toUpperCase() : e.target.textContent

  if (currentGuess.length < 5 && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letter)) {
    displayLetter(letter)
  } else if (letter === 'BACKSPACE' || letter === 'BACK') {
    removeLetter()
  } else if (letter === 'ENTER') {
    if (currentGuess.length === 5) {
      checkGuess()
    } else {
      shortGuess()
    }
  }
}

const checkGuess = () => {
  chageKeyColors()
  changeBoxColors()
  if (currentGuess.join('') === word) {
    console.log('You Win!')
    modal.showModal()
    resetGame()
    return
  }
  turn++
  currentRow = document.querySelectorAll('.row')[turn].childNodes
  currentGuess = []
}

const shortGuess = () => {
  const row = document.querySelectorAll('.row')[turn]
  row.classList.remove('shake')
  row.offsetWidth
  row.classList.add('shake')
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

const changeBoxColors = () => {
  currentGuess.forEach((letter, idx) => {
    if (letter === word[idx]) {
      currentRow[idx].classList.add('bg-green')
    } else if (word.includes(letter)) {
      currentRow[idx].classList.add('bg-yellow')
    }
  })
}

const removeLetter = () => {
  currentGuess.pop()
  currentRow[currentGuess.length].textContent = ''
}

const displayLetter = (letter) => {
  currentGuess.push(letter)
  currentRow[currentGuess.length - 1].classList.add('show-letter')
  currentRow[currentGuess.length - 1].textContent = letter
}

const resetGame = () => {
  keyboard.innerHTML = ''
  guessContainer.innerHTML = ''
  createBoard()
  createKeyboard()
  turn = 0
  currentGuess = []
  grayKeys = new Set()
  greenKeys = new Set()
  yellowKeys = new Set()
  word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()

  currentRow = document.querySelectorAll('.row')[turn].childNodes
  keyNodes = document.querySelectorAll('.key')
}

document.getElementById('modal').onclick = modal.close
document.onkeydown = keyPress
document.body.onload = resetGame
