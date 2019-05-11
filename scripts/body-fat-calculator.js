$(function () {
    $("#navbar").load("navbar.html");
});

document.getElementById("calculate").addEventListener("click", () => {
    // Get all user inputs from form
    let age = +(document.getElementById("age").value);
    let weight = +(document.getElementById("weight").value);
    let chest = +(document.getElementById("chest").value);
    let abdominal = +(document.getElementById("abdominal").value);
    let thigh = +(document.getElementById("thigh").value);

    // Formula for body fat
    let fatTotal = chest + abdominal + thigh;
    let fatSquared = Math.pow(fatTotal, 2);
    let density = (
        1.10938
        - (0.0008267 * fatTotal)
        + (0.0000016 * fatSquared)
        - (0.0002574 * age));
    let bodyFat = (4.57 / density - 4.142) * 100

    // Insert results into document
    let fatMass = (weight * bodyFat * 0.01).toFixed(1);
    document.getElementById("percentage").innerHTML = bodyFat.toFixed(1) + "%";
    document.getElementById("fat-mass").innerHTML = fatMass + " lb";
    document.getElementById("lean-mass").innerHTML = weight - fatMass + " lb";

    console.log(fatTotal, fatSquared, density, bodyFat);
})