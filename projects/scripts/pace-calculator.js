document.getElementById('time-submit').addEventListener('click', () => {
  const distance = document.getElementById('distance-miles').value;
  const paceHours = document.getElementById('pace-hours').value;
  const paceMinutes = document.getElementById('pace-minutes').value;
  const paceSeconds = document.getElementById('pace-seconds').value;
  const pace = (paceHours * 3600) + (paceMinutes * 60) + (+(paceSeconds));
  const time = pace * distance;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time % 3600 / 60);
  const seconds = Math.floor(time % 3600 % 60);
  document.getElementById('time-hours').value = hours;
  document.getElementById('time-minutes').value = minutes;
  document.getElementById('time-seconds').value = seconds;
});


document.getElementById('distance-submit').addEventListener('click', () => {
  const timeHours = document.getElementById('time-hours').value;
  const timeMinutes = document.getElementById('time-minutes').value;
  const timeSeconds = document.getElementById('time-seconds').value;
  const paceHours = document.getElementById('pace-hours').value;
  const paceMinutes = document.getElementById('pace-minutes').value;
  const paceSeconds = document.getElementById('pace-seconds').value;
  const time = (timeHours * 3600) + (timeMinutes * 60) + (+(timeSeconds));
  const pace = (paceHours * 3600) + (paceMinutes * 60) + (+(paceSeconds));
  const distance = (time / pace).toFixed(2);
  document.getElementById('distance-miles').value = distance;
});

document.getElementById('pace-submit').addEventListener('click', () => {
  const timeHours = document.getElementById('time-hours').value;
  const timeMinutes = document.getElementById('time-minutes').value;
  const timeSeconds = document.getElementById('time-seconds').value;
  const distance = document.getElementById('distance-miles').value;
  let time = (timeHours * 3600) + (timeMinutes * 60) + (+(timeSeconds));
  time /= distance;

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time % 3600 / 60);
  const seconds = Math.floor(time % 3600 % 60);
  document.getElementById('pace-hours').value = hours;
  document.getElementById('pace-minutes').value = minutes;
  document.getElementById('pace-seconds').value = seconds;
});
