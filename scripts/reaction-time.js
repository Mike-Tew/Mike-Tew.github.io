$(function () {
    $("#navbar").load("navbar.html");
});

let startTime, endTime, randNum;
const clickySquare = document.getElementById("container");
const color = "rgb(228, 228, 228)"
clickySquare.style.backgroundColor = color;

clickySquare.addEventListener("click", () => {
    if (clickySquare.style.backgroundColor == color) {
        clickySquare.style.backgroundColor = "red";
        randNum = (Math.random() * (5 - 3) + 3) * 1000;
        setTimeout(function () {
            clickySquare.style.backgroundColor = "green";
        }, randNum);
        console.log(randNum);
        startTime = new Date().getTime();
    } else if (clickySquare.style.backgroundColor == "green") {
        endTime = new Date().getTime();
        console.log(Math.floor(endTime - startTime - randNum));
        document.getElementById("reaction-time").innerHTML = Math.floor(endTime - startTime - randNum);
    } else {
        clickySquare.children[0].innerHTML = "You clicked too soon!";
    }
})

