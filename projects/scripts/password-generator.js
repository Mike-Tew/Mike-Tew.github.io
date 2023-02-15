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

  const passwordLength = slider.value
  let password = ''
  while (password.length < slider.value) {
    password += characterList.charAt(
      Math.floor(Math.random() * characterList.length)
    )
  }
  console.log(password)
  return password
}

const sliderFunc = () => {}

password.innerHTML = generatePassword()
