const clickSquare = document.getElementById('click-container')
const resultText = document.getElementById('result-text')
const COLORS = {
  DEFAULT: 'rgb(228, 228, 228)',
  FAIL: 'red',
  SUCCESS: 'blue',
  ACTIVE: 'yellow'
}

const start = () => {
  clickSquare.style.backgroundColor = COLORS.ACTIVE
  setClickTime()
}

const clickFail = () => {
  resultText.innerHTML = 'Too Soon'
  clickSquare.style.backgroundColor = COLORS.FAIL
  gameReset()
}

const clickSuccess = () => {
  resultText.innerHTML = new Date().getTime() - activeTime
  clickSquare.style.backgroundColor = COLORS.SUCCESS
  gameReset()
}

const setClickTime = () => {
  startTime = new Date().getTime()
  delay = (Math.random() * (5 - 3) + 3) * 1000
  clickTime = startTime + delay
  timeoutID = setTimeout(() => {
    activeTime = new Date().getTime()
    clickSquare.style.backgroundColor = 'green'
  }, delay)
}

clickSquare.addEventListener('click', () => {
  if (isRunning && activeTime) {
    clickSuccess()
    isRunning = false
    activeTime = 0
  } else if (!isRunning) {
    start()
    isRunning = true
  } else {
    clickFail()
    isRunning = false
  }
})

const gameReset = () => {
  startTime = 0
  delay = 0
  clickTime = 0
  activeTime = 0
  isRunning = false
  if (typeof(timeoutID) !== 'undefined') clearTimeout(timeoutID)
}

gameReset()
