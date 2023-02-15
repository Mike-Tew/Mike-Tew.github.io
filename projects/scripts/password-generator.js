const password = document.getElementById('password')
const slider = document.getElementById('length-slider')
const lowercase = document.getElementById('lower-check')
const numbers = document.getElementById('numbers-check')
const symbols = document.getElementById('symbols-check')

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'
}

console.log(lowercase.checked)
const generatePassword = () => {
  passwordLength = slider.value
  password.innerHTML = '123'
}

const sliderFunc = () => {}

generatePassword()
