$(function () {
    $("#navbar").load("navbar.html");
});

function start() {
    let time = Date.now(),
        seconds,
        minutes,
        fiveMinutes = 5 * 60;
    document.getElementById("timer").innerHTML = fiveMinutes;
}