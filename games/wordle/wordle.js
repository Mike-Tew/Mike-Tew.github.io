import { allWords } from './allWords.js'
// import { wordList } from './words.js'

const guessContainer = document.getElementById('guess-container')
const keyboard = document.getElementById('keyboard')
const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', '1ZXCVBNM0']
const toastMsgs = ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew']
let turn,
  currentGuess,
  grayKeys,
  greenKeys,
  yellowKeys,
  currentRow,
  keyNodes,
  word,
  animationRunning

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

const toastPopup = (msg) => {
  const toastContainer = document.getElementById('toast-container')
  const toast = document.createElement('div')
  toast.textContent = msg
  toast.classList.add('toast-message')
  toastContainer.prepend(toast)
  setTimeout(() => toast.remove(), 1500)
}

const keyPress = (e) => {
  if (animationRunning) return

  const letter = e.type == 'keydown' ? e.key.toUpperCase() : e.target.textContent

  if (currentGuess.length < 5 && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letter)) {
    displayLetter(letter)
  } else if (letter === 'BACKSPACE' || letter === 'BACK') {
    removeLetter()
  } else if (letter === 'ENTER') {
    if (currentGuess.length === 5) {
      checkGuess()
    } else {
      wrongGuess()
      toastPopup('Not enough letters')
    }
  }
}

const checkGuess = () => {
  if (!allWords.has(currentGuess.join('').toLowerCase())) {
    wrongGuess()
    toastPopup('Not in word list')
    return
  }

  changeBoxColors()
  animationRunning = true

  setTimeout(() => {
    if (currentGuess.join('') === word) {
      gameWin()
      return
    }

    chageKeyColors()
    turn++
    currentRow = document.querySelectorAll('.row')[turn].childNodes
    animationRunning = false
    currentGuess = []

    if (turn === 6) gameLoss()
  }, 2000)
}

const gameWin = () => {
  winAnimation()
  toastPopup(toastMsgs[turn])
  setTimeout(() => openMenu(), 2000)
}

const gameLoss = () => {
  toastPopup(word)
  setTimeout(() => openMenu(), 2000)
}

const wrongGuess = () => {
  const row = document.querySelectorAll('.row')[turn]
  row.classList.remove('shake')
  row.offsetWidth
  row.classList.add('shake')
}

const winAnimation = () => {
  currentRow.forEach((square, idx) => {
    square.style.backgroundColor = 'var(--green)'
    square.style.border = 'none'
    square.style.animation = `0.6s row-win ${idx * 0.1}s forwards`
  })
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
      keyNode.style.backgroundColor = 'var(--green)'
    } else if (yellowKeys.has(keyNode.innerText)) {
      keyNode.style.backgroundColor = 'var(--yellow)'
    } else if (grayKeys.has(keyNode.innerText)) {
      keyNode.style.backgroundColor = 'var(--gray)'
    }
  })
}

const changeBoxColors = () => {
  currentGuess.forEach((letter, idx) => {
    if (letter === word[idx]) {
      currentRow[idx].style.animation = `0.4s flip-green ${idx * 0.4}s forwards`
    } else if (word.includes(letter)) {
      currentRow[idx].style.animation = `0.4s flip-yellow ${idx * 0.4}s forwards`
    } else {
      currentRow[idx].style.animation = `0.4s flip-gray ${idx * 0.4}s forwards`
    }
  })
}

const removeLetter = () => {
  currentGuess.pop()
  currentRow[currentGuess.length].classList.remove('show-letter')
  currentRow[currentGuess.length].textContent = ''
}

const displayLetter = (letter) => {
  currentGuess.push(letter)
  currentRow[currentGuess.length - 1].classList.add('show-letter')
  currentRow[currentGuess.length - 1].textContent = letter
}

const resetGame = () => {
  closeMenu()

  keyboard.innerHTML = ''
  guessContainer.innerHTML = ''
  createBoard()
  createKeyboard()
  grayKeys = new Set()
  greenKeys = new Set()
  yellowKeys = new Set()
  turn = 0
  currentGuess = []
  animationRunning = false
  // word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
  word = 'PARTY'

  currentRow = document.querySelectorAll('.row')[turn].childNodes
  keyNodes = document.querySelectorAll('.key')
}

const openMenu = () => {
  modal.showModal()
  modal.classList.add('active')
  animationRunning = true
}

const closeMenu = () => {
  modal.close()
  modal.classList.remove('active')
  animationRunning = false
}

document.getElementById('menu').onclick = openMenu
document.getElementById('modal-close').onclick = closeMenu
document.getElementById('play-again').onclick = resetGame
document.onkeydown = keyPress
document.body.onload = resetGame
