const keyboard = document.getElementById('keyboard')
const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

const createKeyboard = () => {
  LETTERS.forEach((row) => {
    const keyRow = document.createElement('div')
    keyRow.classList.add('row')
    keyboard.appendChild(keyRow)
    row.split('').forEach((letter) => {
        keyRow.innerHTML += `<div class="key">${letter}</div>`
    })
  })
}

document.body.onload = createKeyboard
