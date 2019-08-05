$(() => {
  $('#navbar').load('../navbar.html');
});

const firstPercent = 0;
const secondPercent = 40;
let mainPercent = 0;

const firstGoal = document.getElementById('first-goal');
const secondGoal = document.getElementById('second-goal');
const mainGoal = document.getElementById('main-goal');

function changePercent(goal, percent) {
  const whiteSpace = percent - 100;
  goal.style.background = `linear-gradient(to right, \
    blue ${percent}%, white ${whiteSpace}%)`;
  mainPercent = (firstPercent + secondPercent) / 2;
  const mainWhite = mainPercent - 100;
  mainGoal.style.background = `linear-gradient(to right, \
    blue ${mainPercent}%, white ${mainWhite}%)`;
}
