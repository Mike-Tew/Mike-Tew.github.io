// Declaring variables.
let timer;
let display;
let centiseconds;
let seconds;
let minutes;
let hours;
let now = 0;
let interval = 0;
let difference = 0;

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

function start() {
  interval = Date.now();
  difference = (interval - now);
  centiseconds = Math.floor(difference / 10) % 100;
  seconds = Math.floor(difference / 100 / 10) % 60;
  minutes = Math.floor(difference / 100 / 60 / 10) % 60;
  hours = Math.floor(difference / 100 / 60 / 60 / 10);

  // Padding numbers to 2 digits.
  centiseconds = (centiseconds < 10 ? `0${centiseconds}` : centiseconds);
  seconds = (seconds < 10 ? `0${seconds}` : seconds);
  minutes = (minutes < 10 ? `0${minutes}` : minutes);
  display = `${hours}:${minutes}:${seconds}:${centiseconds}`;
  document.getElementById('timer').innerHTML = display;
}

function startTimer() {
  now = Date.now() - difference;
  stopTimer();
  timer = setInterval(start, 10);
}

function reset() {
  clearInterval(timer);
  document.getElementById('timer').innerHTML = '0:00:00:00';
  timer = null;
  now = 0;
  interval = 0;
  difference = 0;
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
}
