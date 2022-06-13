let timerIsRunning = false
const clock = document.getElementById('clock')

const displayTime = () => {
  let time = Date.now() - startTime
  let formatted = formatTime(time)
  clock.innerHTML = formatted
}

const startTimer = () => {
  startTime = Date.now()
  timer = setInterval(displayTime, 10)
}

const stopTimer = () => {
  clearInterval(timer)
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
