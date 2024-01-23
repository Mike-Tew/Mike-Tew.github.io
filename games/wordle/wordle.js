const keyboard = document.getElementById('keyboard')
const LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM'

const createEle = () => {
  LETTERS.split('').forEach((letter) => {
    keyboard.innerHTML += `
    <div class="key">${letter}</div>
    `
  })
}

document.body.onload = createEle
