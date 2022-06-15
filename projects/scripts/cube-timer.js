let resultsArray = []
let time = 0
let timerIsRunning = false
const clock = document.getElementById('clock')
const results = document.getElementById('results')

const displayTime = () => {
  time = Date.now() - startTime
  let formatted = formatTime(time)
  clock.innerHTML = formatted
}

const startTimer = () => {
  startTime = Date.now()
  timer = setInterval(displayTime, 10)
}

const stopTimer = () => {
  clearInterval(timer)
  resultsArray.push(time)
  refresh_results()
}

const refresh_results = () => {
  while (results.firstChild) {
    results.removeChild(results.firstChild)
  }
  resultsArray.forEach((element) => {
    let p = document.createElement('li')
    p.innerHTML = formatTime(element)
    results.appendChild(p)
  })
}

document.addEventListener('keyup', (event) => {
  if (event.code !== 'Space') {
    return
  }
  if (!timerIsRunning) {
    timerIsRunning = true
    startTimer()
  } else {
    timerIsRunning = false
    stopTimer()
  }
})

const formatTime = (ms) => {
  let centiseconds = parseInt(ms / 10) % 100
  let seconds = parseInt(ms / 1000) % 60
  let minutes = parseInt(ms / 1000 / 60) % 60

  centiseconds = centiseconds < 10 ? `0${centiseconds}` : centiseconds
  seconds = seconds < 10 ? `0${seconds}` : seconds
  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${minutes}:${seconds}.${centiseconds}`
}
