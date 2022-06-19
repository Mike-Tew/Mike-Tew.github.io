let time = 0
let timerIsRunning = false
const defaultTime = '00:00.00'
const clock = document.getElementById('clock')
const timesEl = document.getElementById('times')
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
  timesArr.push(time)
  refresh()
}

const getAverage = (times) => {
  const sum = times.reduce((partialSum, num) => partialSum + num, 0)
  const average = sum / times.length
  return average
}

const getBestAvg = (times, len) => {
  let start = 0
  let stop = len
  let bestAvg = 999999999999
  if (times.length < len) {
    return 0
  }

  while (stop <= times.length) {
    croppedTimes = times.slice(start, stop)
    timesAvg = getAverage(removeMinMax(croppedTimes))
    bestAvg = timesAvg < bestAvg ? timesAvg : bestAvg

    start += 1
    stop += 1
  }

  return bestAvg
}

const removeMinMax = (times) => {
  times.sort((first, second) => {
    return first - second
  })
  times.shift()
  times.pop()
  return times
}

const refreshStats = () => {
  let average = getAverage(timesArr)
  let bestTime = Math.min(...timesArr)
  if (timesArr.length < 1) {
    average = 0
    bestTime = 0
  }
  let avgOfFive = getBestAvg(timesArr, 5)
  let avgOfTwelve = getBestAvg(timesArr, 12)

  avg.innerHTML = `Average: ${formatTime(average)}`
  best.innerHTML = `Best: ${formatTime(bestTime)}`
  avg5.innerHTML = `3 of 5: ${formatTime(avgOfFive)}`
  avg12.innerHTML = `10 of 12: ${formatTime(avgOfTwelve)}`
}

const refreshResults = () => {
  while (timesEl.firstChild) {
    timesEl.removeChild(timesEl.firstChild)
  }
  timesArr.forEach((time, index) => {
    let li = document.createElement('li')
    li.innerHTML = `${index + 1}: ${formatTime(time)}`
    timesEl.prepend(li)
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
  let jsonStr = JSON.stringify(timesArr)
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
  timesArr = []
  refresh()
}

const refresh = () => {
  saveCookie()
  refreshResults()
  refreshStats()
}

cookie = JSON.parse(getCookie('results'))
let timesArr = cookie == null ? [] : cookie
refresh()
