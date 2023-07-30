function calculate() {
  const weight = +(document.getElementById('weight').value);
  const feet = +(document.getElementById('feet').value);
  const inches = +(document.getElementById('inches').value);
  const height = feet * 12 + inches;
  const bmi = (weight * 703) / (Math.pow(height, 2));
  document.getElementById('bmi').innerHTML = bmi.toFixed(1);
  const bmiText = document.getElementById('bmi-text');
  if (bmi < 16) {
    bmiText.innerHTML = 'Severe Thinness';
  } else if (bmi < 17) {
    bmiText.innerHTML = 'Moderate Thinness';
  } else if (bmi < 18.5) {
    bmiText.innerHTML = 'Mild Thinness';
  } else if (bmi < 25) {
    bmiText.innerHTML = 'Normal';
  } else if (bmi < 30) {
    bmiText.innerHTML = 'Overweight';
  } else if (bmi < 35) {
    bmiText.innerHTML = 'Obese Class I';
  } else if (bmi < 40) {
    bmiText.innerHTML = 'Obese Class II';
  } else {
    bmiText.innerHTML = 'Obese Class III';
  }
}
