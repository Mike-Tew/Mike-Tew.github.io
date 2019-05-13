$(function () {
    $("#navbar").load("navbar.html");
});

/* 
A function that calculates a person's BMI and displays it.
*/
function calculate() {
    let weight = +(document.getElementById("weight").value);
    let feet = +(document.getElementById("feet").value);
    let inches = +(document.getElementById("inches").value);
    let height = feet * 12 + inches;
    let bmi = (weight * 703) / (Math.pow(height, 2));
    document.getElementById("bmi").innerHTML = bmi.toFixed(1);
    let bmiText = document.getElementById("bmi-text");
    if (bmi < 16) {
        bmiText.innerHTML = "Severe Thinness";
    } else if (bmi < 17) {
        bmiText.innerHTML = "Moderate Thinness";
    } else if (bmi < 18.5) {
        bmiText.innerHTML = "Mild Thinness";
    } else if (bmi < 25) {
        bmiText.innerHTML = "Normal";
    } else if (bmi < 30) {
        bmiText.innerHTML = "Overweight";
    } else if (bmi < 35) {
        bmiText.innerHTML = "Obese Class I";
    } else if (bmi < 40) {
        bmiText.innerHTML = "Obese Class II";
    } else {
        bmiText.innerHTML = "Obese Class III";
    }
}