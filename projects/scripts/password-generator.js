const password = document.getElementById('password')
const pwdBackground = document.getElementById('pwd-background')
const pwdStrength = document.getElementById('pwd-strength')
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
  if (slider.value < 7) {
    stylePwdStr("Weak", "#eddbdb", "#d32d27")
  } else if (slider.value < 9) {
    stylePwdStr("Average", "#f1edd8", "#edbf0e")
  } else if (slider.value < 12) {
    stylePwdStr("Strong", "#d3eae5", "#00a878")
  } else {
    stylePwdStr("Very Strong", "#d3eae5", "#00a878")
  }
}

const stylePwdStr = (strText, bgColor, borderColor) => {
  pwdBackground.style.backgroundColor = bgColor
  pwdBackground.style.borderBottom = `3px solid ${borderColor}`
  pwdStrength.style.color = borderColor
  pwdStrength.innerHTML = strText
}

generatePassword()
