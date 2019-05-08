$(function () {
    $("#navbar").load("navbar.html");
});


document.getElementById("time-submit").addEventListener("click", () => {
    let distance = document.getElementById("distance-miles").value;
    let paceHours = document.getElementById("pace-hours").value;
    let paceMinutes = document.getElementById("pace-minutes").value;
    let paceSeconds = document.getElementById("pace-seconds").value;
    let pace = (paceHours * 3600) + (paceMinutes * 60) + (+(paceSeconds));
    let time = pace * distance;
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time % 3600 / 60);
    let seconds = Math.floor(time % 3600 % 60);
    document.getElementById("time-hours").value = hours;
    document.getElementById("time-minutes").value = minutes;
    document.getElementById("time-seconds").value = seconds;
})



document.getElementById("distance-submit").addEventListener("click", () => {
    let timeHours = document.getElementById("time-hours").value;
    let timeMinutes = document.getElementById("time-minutes").value;
    let timeSeconds = document.getElementById("time-seconds").value;
    let paceHours = document.getElementById("pace-hours").value;
    let paceMinutes = document.getElementById("pace-minutes").value;
    let paceSeconds = document.getElementById("pace-seconds").value;
    let time = (timeHours * 3600) + (timeMinutes * 60) + (+(timeSeconds));
    let pace = (paceHours * 3600) + (paceMinutes * 60) + (+(paceSeconds));
    let distance = (time / pace).toFixed(2);
    document.getElementById("distance-miles").value = distance;
})

document.getElementById("pace-submit").addEventListener("click", () => {
    let timeHours = document.getElementById("time-hours").value;
    let timeMinutes = document.getElementById("time-minutes").value;
    let timeSeconds = document.getElementById("time-seconds").value;
    let distance = document.getElementById("distance-miles").value;
    let time = (timeHours * 3600) + (timeMinutes * 60) + (+(timeSeconds));
    time = time / distance;

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time % 3600 / 60);
    let seconds = Math.floor(time % 3600 % 60);
    document.getElementById("pace-hours").value = hours;
    document.getElementById("pace-minutes").value = minutes;
    document.getElementById("pace-seconds").value = seconds;
})