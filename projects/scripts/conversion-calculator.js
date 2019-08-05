$(() => {
  $('#navbar').load('../navbar.html');
});

document.getElementById('lb').addEventListener('click', () => {
  lb = +(document.getElementById('weights')[0].value);
  document.getElementById('weights')[2].value = (lb * 16).toFixed(1);
  document.getElementById('weights')[4].value = (lb * 0.4536).toFixed(1);
  document.getElementById('weights')[6].value = (lb * 453.6).toFixed(1);
});

document.getElementById('oz').addEventListener('click', () => {
  oz = +(document.getElementById('weights')[2].value);
  document.getElementById('weights')[0].value = (oz * 0.0625).toFixed(1);
  document.getElementById('weights')[4].value = (oz * 0.0283495).toFixed(1);
  document.getElementById('weights')[6].value = (oz * 28.3495).toFixed(1);
});

document.getElementById('kg').addEventListener('click', () => {
  kg = +(document.getElementById('weights')[4].value);
  document.getElementById('weights')[0].value = (kg * 2.205).toFixed(1);
  document.getElementById('weights')[2].value = (kg * 35.274).toFixed(1);
  document.getElementById('weights')[6].value = (kg * 1000).toFixed(1);
});

document.getElementById('gram').addEventListener('click', () => {
  gram = +(document.getElementById('weights')[6].value);
  document.getElementById('weights')[0].value = (gram * 0.002205).toFixed(1);
  document.getElementById('weights')[2].value = (gram * 0.035274).toFixed(1);
  document.getElementById('weights')[4].value = (gram * 0.001).toFixed(1);
});

document.getElementById('inch').addEventListener('click', () => {
  inch = +(document.getElementById('length')[0].value);
  document.getElementById('length')[2].value = (inch * 0.08333333).toFixed(1);
  document.getElementById('length')[4].value = (inch * 25.4).toFixed(1);
  document.getElementById('length')[6].value = (inch * 2.54).toFixed(1);
});

document.getElementById('foot').addEventListener('click', () => {
  foot = +(document.getElementById('length')[2].value);
  document.getElementById('length')[0].value = (foot * 12).toFixed(1);
  document.getElementById('length')[4].value = (foot * 304.8).toFixed(1);
  document.getElementById('length')[6].value = (foot * 30.48).toFixed(1);
});

document.getElementById('mm').addEventListener('click', () => {
  mm = +(document.getElementById('length')[4].value);
  document.getElementById('length')[0].value = (mm * 0.03937).toFixed(1);
  document.getElementById('length')[2].value = (mm * 0.00328084).toFixed(1);
  document.getElementById('length')[6].value = (mm * 0.1).toFixed(1);
});

document.getElementById('cm').addEventListener('click', () => {
  cm = +(document.getElementById('length')[6].value);
  document.getElementById('length')[0].value = (cm * 0.3937).toFixed(1);
  document.getElementById('length')[2].value = (cm * 0.0328).toFixed(1);
  document.getElementById('length')[4].value = (cm * 10).toFixed(1);
});

document.getElementById('f').addEventListener('click', () => {
  f = +(document.getElementById('temp')[0].value);
  document.getElementById('temp')[2].value = ((f - 32) * 5 / 9).toFixed(1);
});

document.getElementById('c').addEventListener('click', () => {
  c = +(document.getElementById('temp')[2].value);
  document.getElementById('temp')[0].value = (c * (9 / 5) + 32).toFixed(1);
});
