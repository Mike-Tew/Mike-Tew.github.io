document.getElementById('calculate').addEventListener('click', () => {
  // Get all user inputs from form
  const age = +(document.getElementById('age').value);
  const weight = +(document.getElementById('weight').value);
  const chest = +(document.getElementById('chest').value);
  const abdominal = +(document.getElementById('abdominal').value);
  const thigh = +(document.getElementById('thigh').value);

  // Formula for body fat
  const fatTotal = chest + abdominal + thigh;
  const fatSquared = Math.pow(fatTotal, 2);
  const density = (
    1.10938
    - (0.0008267 * fatTotal)
    + (0.0000016 * fatSquared)
    - (0.0002574 * age));
  const bodyFat = (4.57 / density - 4.142) * 100;

  // Insert results into document
  const fatMass = (weight * bodyFat * 0.01).toFixed(1);
  document.getElementById('percentage').innerHTML = `${bodyFat.toFixed(1)}%`;
  document.getElementById('fat-mass').innerHTML = `${fatMass} lb`;
  document.getElementById('lean-mass').innerHTML = `${weight - fatMass} lb`;

  console.log(fatTotal, fatSquared, density, bodyFat);
});
