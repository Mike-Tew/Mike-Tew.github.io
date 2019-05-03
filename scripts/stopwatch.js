$(function () {
    $("#navbar").load("navbar.html");
});

let timer;

function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

function startTimer() {
    stopTimer();
    timer = setInterval(test, 10);
}

let interval = 0;
let seconds = 0;
function test() {
    if (interval < 100) {
        interval++
        document.getElementById("milliseconds").innerHTML = interval;
    } else {
        interval = 0;
        seconds++;
        document.getElementById("seconds").innerHTML = seconds + ":";
    }
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("clock", reset);