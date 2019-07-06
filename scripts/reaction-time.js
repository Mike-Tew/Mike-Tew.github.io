$(function () {
  $("#navbar").load("navbar.html");
});

let startTime, endTime, randNum, reactionTime, delay;
const clickySquare = document.getElementById("container");
const color = "rgb(228, 228, 228)"
clickySquare.style.backgroundColor = color;

clickySquare.addEventListener("click", () => {
  if (clickySquare.style.backgroundColor === color) {
    clickySquare.children[0].innerHTML = "";
    clickySquare.style.backgroundColor = "red";
    randNum = (Math.random() * (5 - 3) + 3) * 1000;
    delay = setTimeout(function () {
      clickySquare.style.backgroundColor = "green";
    }, randNum);
    startTime = new Date().getTime();
  } else if (clickySquare.style.backgroundColor === "green") {
    endTime = new Date().getTime();
    reactionTime = Math.floor(endTime - startTime - randNum) / 1000;
    document.getElementById("reaction-time")
      .innerHTML = `${reactionTime} Seconds.`;
    clickySquare.style.backgroundColor = 'blue';
  } else if (clickySquare.style.backgroundColor === "red") {
    clickySquare.children[0].innerHTML = "You clicked too soon!";
    clearTimeout(delay);
  }
})

function reset() {
  document.getElementById("reaction-time").innerHTML = '';
  clickySquare.style.backgroundColor = color;
  clickySquare.children[0].innerHTML = "Click to start";
  startTime = 0;
  endTime = 0;
  reactionTime = 0;
  randNum = 0;
}