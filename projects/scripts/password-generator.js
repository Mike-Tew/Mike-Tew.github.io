const password = document.getElementById('password')
const slider = document.getElementById('length-slider')
const uppercase = document.getElementById('upper-check')
const lowercase = document.getElementById('lower-check')
const numbers = document.getElementById('numbers-check')
const symbols = document.getElementById('symbols-check')

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'
}

const generatePassword = () => {
  let characterList = ''
  if (lowercase.checked) characterList += characters.lowercase
  if (uppercase.checked) characterList += characters.uppercase
  if (numbers.checked) characterList += characters.numbers
  if (symbols.checked) characterList += characters.symbols
  if (!characterList) return password.innerHTML = '(none)'

  const passwordLength = slider.value
  let newPassword = ''
  while (newPassword.length < slider.value) {
    newPassword += characterList.charAt(
      Math.floor(Math.random() * characterList.length)
    )
  }
  console.log(newPassword)
  password.innerHTML = newPassword
}

const sliderFunc = () => {}

generatePassword()
