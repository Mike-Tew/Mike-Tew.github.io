const clickSquare = document.getElementById('click-container')
const clickText = document.getElementById('click-text')
const DEFAULT_COLOR = 'rgb(228, 228, 228)'
clickSquare.style.backgroundColor = 'green'

let startTime
let delay
let clickTime
let activeTime
let isRunning = false

const start = () => {
  console.log('Start')
  setColor('red')
  setClickTime()
}

const clickFail = () => {
  console.log('Stop')
}

const clickSuccess = () => {
  clickText.innerHTML = new Date().getTime() - activeTime
}

const setClickTime = () => {
  startTime = new Date().getTime()
  delay = (Math.random() * (5 - 3) + 3) * 1000
  clickTime = startTime + delay
  setTimeout(() => {
    clickSquare.style.backgroundColor = 'green'
    activeTime = new Date().getTime()
  }, delay)
}

const setColor = (color) => {
  clickSquare.style.backgroundColor = color
}

clickSquare.addEventListener('click', () => {
  if (isRunning && activeTime) {
    clickSuccess()
    isRunning = false
    activeTime = 0
  }

  if (!isRunning) {
    start()
    isRunning = true
  } else {
    clickFail()
    isRunning = false
  }
})
