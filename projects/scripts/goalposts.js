$(() => {
  $('#navbar').load('../navbar.html');
});

let goalId = 1;
const goalArray = [];
let totalPercent = 0;

// This function creates a goal element and adds it to the DOM.
function createDiv(name, id) {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${name}</h3>`;
  div.classList.add('goal');
  div.id = id;
  document.getElementById('goals').appendChild(div);
}

function setPercent(percent, id) {
  const goal = document.getElementById(id);
  goal.style.background = `linear-gradient(to right, red ${percent}%,
    white ${percent - 100}%, white)`;
}

class MainGoal {
  constructor(name) {
    this.name = name;
    this.id = 'main-goal';
    createDiv(this.name, this.id);
  }

  setMain() {
    setPercent(totalPercent / goalArray.length, this.id);
  }
}

const mainGoal = new MainGoal('Do The Main Thing');

// This class creates goal instances
class Goal {
  constructor(name, percent) {
    this.name = name;
    this.percent = percent;
    this.id = `goal-${goalId}`;
    goalId += 1;
    createDiv(this.name, this.id);
    this.setPercent(percent);
    totalPercent += this.percent;
    goalArray.push(this.id);
  }

  // This method sets the percent of the goal
  setPercent(newPercent) {
    totalPercent -= this.percent;
    this.percent = newPercent;
    totalPercent += this.percent;
    setPercent(newPercent, this.id);
    mainGoal.setMain();
  }
}

const firstGoal = new Goal('Fix Sink', 20);
const firstGoal2 = new Goal('Clean Gutters', 60);

console.log(firstGoal);
