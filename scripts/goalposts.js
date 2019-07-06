$(function () {
  $("#navbar").load("navbar.html");
});

let firstPercent = 0;
let secondPercent = 40;
let mainPercent = 0;

const firstGoal = document.getElementById('first-goal');
const secondGoal = document.getElementById('second-goal');
const mainGoal = document.getElementById('main-goal');

function changePercent(goal, percent) {
  let whiteSpace = percent - 100;
  goal.style.background = `linear-gradient(to right, \
    blue ${percent}%, white ${whiteSpace}%)`;
  mainPercent = (firstPercent + secondPercent) / 2;
  let mainWhite = mainPercent - 100;
  mainGoal.style.background = `linear-gradient(to right, \
    blue ${mainPercent}%, white ${mainWhite}%)`;
};