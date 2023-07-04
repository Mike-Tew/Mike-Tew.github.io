let endTime
let randNum
let reactionTime
const clickSquare = document.getElementById('click-container')
const DEFAULT_COLOR = 'rgb(228, 228, 228)'
clickSquare.style.backgroundColor = 'green'

let startTime
let delay
let isRunning = false

const start = () => {
  console.log('Start')
  setColor('red')
  startTime = new Date().getTime()
  delay = (Math.random() * (5 - 3) + 3) * 1000
}

const stop = () => {
  console.log('Stop')
  setColor('green')

}

const setColor = (color) => {
  clickSquare.style.backgroundColor = color
}

clickSquare.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true
    start()
  } else {
    isRunning = false
    stop()
  }
})

// clickSquare.addEventListener('click', () => {
//   if (clickSquare.style.backgroundColor === DEFAULT_COLOR) {
//     clickSquare.children[0].innerHTML = ''
//     clickSquare.style.backgroundColor = 'red'
//     randNum = (Math.random() * (5 - 3) + 3) * 1000
//     delay = setTimeout(() => {
//       clickSquare.style.backgroundColor = 'green'
//     }, randNum)
//     startTime = new Date().getTime()
//   } else if (clickSquare.style.backgroundColor === 'green') {
//     endTime = new Date().getTime()
//     reactionTime = Math.floor(endTime - startTime - randNum) / 1000
//     document.getElementById(
//       'reaction-time'
//     ).innerHTML = `${reactionTime} Seconds.`
//     clickSquare.style.backgroundColor = 'blue'
//   } else if (clickSquare.style.backgroundColor === 'red') {
//     clickSquare.children[0].innerHTML = 'You clicked too soon!'
//     clearTimeout(delay)
//   }
// })

function reset() {
  document.getElementById('reaction-time').innerHTML = ''
  clickSquare.style.backgroundColor = DEFAULT_COLOR
  clickSquare.children[0].innerHTML = 'Click To Start'
  startTime = 0
  endTime = 0
  reactionTime = 0
  randNum = 0
}

document.getElementById('reset-button').addEventListener('click', reset)
