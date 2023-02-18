const password = document.getElementById('password')
const passwordLength = document.getElementById('password-length')
const slider = document.getElementById('length-slider')
const uppercase = document.getElementById('upper-check')
const lowercase = document.getElementById('lower-check')
const numbers = document.getElementById('numbers-check')
const symbols = document.getElementById('symbols-check')

passwordLength.addEventListener('input', () => {
  if (passwordLength.value > 20) passwordLength.value = 20
  slider.value = passwordLength.value
  generatePassword()
})

slider.addEventListener('input', () => {
  passwordLength.value = slider.value
  generatePassword()
})

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
  if (!characterList) return (password.innerHTML = 'PASSWORD')

  let newPassword = ''
  while (newPassword.length < slider.value) {
    newPassword += characterList.charAt(
      Math.floor(Math.random() * characterList.length)
    )
  }

  password.innerHTML = newPassword
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(password.innerHTML)
}

generatePassword()
