const keyboard = document.getElementById('keyboard')
const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', '1ZXCVBNM0']
let turn = 1
let currentGuess = []
let word = 'PARTY'

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

document.body.onload = createKeyboard
