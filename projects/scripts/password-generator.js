const password = document.getElementById('password')
const passwordLength = document.getElementById('password-length')
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

passwordLength.addEventListener('input', () => {
  if (passwordLength.value > 20) passwordLength.value = 20
  slider.value = passwordLength.value
  generatePassword()
})

slider.addEventListener('input', () => {
  passwordLength.value = slider.value
  generatePassword()
})

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
  changePwdStr()
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(password.innerHTML)
}

const changePwdStr = () => {
  const pwdBackground = document.getElementById('pwd-background')
  const pwdStrength = document.getElementById('pwd-strength')
  pwdStrength.innerHTML = "Weak"
  pwdStrength.style.color = "red"
  if (slider.value < 7) {
    pwdBackground.style.backgroundColor = '#eddbdb'
    pwdBackground.style.borderBottomColor = '#d32d27'
    pwdStrength.style.color = '#d32d27'
    pwdStrength.innerHTML = 'Weak'

  } else if (slider.value < 9) {
    pwdBackground.style.backgroundColor = '#f1edd8'
    pwdBackground.style.borderBottomColor = '#edbf0e'
    pwdStrength.style.color = '#edbf0e'
    pwdStrength.innerHTML = 'Average'
  } else if (slider.value < 12) {
    pwdBackground.style.backgroundColor = '#d3eae5'
    pwdBackground.style.borderBottomColor = '#00a878'
    pwdStrength.style.color = '#00a878'
    pwdStrength.innerHTML = 'Strong'
  } else {
    pwdBackground.style.backgroundColor = '#d3eae5'
    pwdBackground.style.borderBottomColor = '#00a878'
    pwdStrength.style.color = '#00a878'
    pwdStrength.innerHTML = 'Very strong'
  }
  console.log(pwdBackground)
}



generatePassword()
