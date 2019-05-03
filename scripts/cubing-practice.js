$(function () {
    $("#navbar").load("navbar.html");
});

let timer;
let delay = 1000;

function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

function startTimer() {
    stopTimer();
    timer = setInterval(generateImg, delay);
}

function generateImg() {
    const number = Math.floor(Math.random() * 19);
    document.getElementById("image").src = "images/cube-images/" + number + ".gif";
}

document.getElementById("start").addEventListener("click", startTimer);

document.getElementById("stop").addEventListener("click", stopTimer);

document.getElementById("time").addEventListener("click", () => {
    stopTimer();
    delay = document.getElementById("delay").value;
    startTimer();
})