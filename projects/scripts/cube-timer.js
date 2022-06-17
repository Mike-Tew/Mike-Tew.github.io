let time = 0
let timerIsRunning = false
const clock = document.getElementById('clock')
const results = document.getElementById('results')
const avg = document.getElementById('avg')
const best = document.getElementById('best')
const avg5 = document.getElementById('avg5')
const avg12 = document.getElementById('avg12')

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
  saveCookie()
  refreshResults()
  refreshStats()
}

const getAverage = (numArr) => {
  const sum = numArr.reduce((partialSum, num) => partialSum + num, 0)
  const average = sum / numArr.length
  return average
}

const refreshStats = () => {
  const average = formatTime(getAverage(resultsArray))
  const bestTime = formatTime(Math.min(...resultsArray))
  avg.innerHTML = `Average: ${average}`
  best.innerHTML = `Best: ${bestTime}`
}

const refreshResults = () => {
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

const saveCookie = () => {
  let jsonStr = JSON.stringify(resultsArray)
  setCookie('results', jsonStr, 30)
}

const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie =
    name + '=' + (value || '') + expires + '; path=/;SameSite=Lax'
}

const getCookie = (name) => {
  let nameEQ = name + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const clearResults = () => {
  resultsArray = []
  saveCookie()
  refreshResults()
  refreshResults()
}

cookie = JSON.parse(getCookie('results'))
let resultsArray = cookie == null ? [] : cookie
refreshResults()

refreshStats()
