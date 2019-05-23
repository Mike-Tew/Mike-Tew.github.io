$(function () {
    $("#navbar").load("navbar.html");
});

// Declaring timing intervals
let intMilliseconds = 0;
let intSeconds = 0;
let intMinutes = 0;
let intHours = 0;

// Declaring HTML variables
let milliseconds = document.getElementById("milliseconds");
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let hours = document.getElementById("hours");
let timer;

// Function that stops the timer
function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

// Function that starts the timer
function startTimer() {
    stopTimer();
    timer = setInterval(start, 10);
}

function start() {
    if (intMinutes == 60) {
        intMinutes = 0;
        intHours++;
        hours.innerHTML = (intHours < 10 ? "0"
            + intHours : intHours) + ":";
        minutes.innerHTML = "0" + intMinutes + ":";
    } else if (intSeconds == 60) {
        intSeconds = 0;
        intMinutes++;
        minutes.innerHTML = (intMinutes < 10 ? "0"
            + intMinutes : intMinutes) + ":";
        seconds.innerHTML = "0" + intSeconds + ".";
    } else if (intMilliseconds == 93) {
        intMilliseconds = 0;
        intSeconds++;
        seconds.innerHTML = (intSeconds < 10 ? "0"
            + intSeconds : intSeconds) + ".";
    } else {
        intMilliseconds++
        milliseconds.innerHTML = (intMilliseconds < 10 ? "0"
            + intMilliseconds : intMilliseconds);
    }
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    intMilliseconds = 0;
    intSeconds = 0;
    intMinutes = 0;
    intHours = 0;
    milliseconds.innerHTML = "00";
    seconds.innerHTML = "00.";
    minutes.innerHTML = "00:";
    hours.innerHTML = "00:";
});
