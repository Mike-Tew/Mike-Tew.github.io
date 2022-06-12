const clock = document.getElementById('clock');
let timer;
let startTime;
let stopTime;

const displayTime = () => {
  let time = Date.now() - startTime;
  let formatted = formatTime(time)
  clock.innerHTML = time;
};

const startTimer = () => {
  startTime = Date.now();
  timer = setInterval(displayTime, 10);
};

const stopTimer = () => {
  clearInterval(timer);
};

const formatTime = (ms) => {
  const centiseconds = parseInt(ms / 10) % 100
  const seconds = parseInt(ms / 1000) % 60
  const minutes = parseInt(ms / 1000 / 60) % 60
  console.log(minutes, seconds, centiseconds);
  // console.log(typeof seconds);
};
