document.getElementById('calculate').addEventListener('click', () => {
  const balance = +(document.getElementById('balance').value);
  const monthly = +(document.getElementById('monthly').value);
  const intervals = +(document.getElementById('intervals').value);
  const interest = +(document.getElementById('interest').value) * 0.01;

  let total = (balance + (monthly * 12));

  for (let i = 0; i < intervals; i++) {
    const dangles = total * interest;
    total += dangles;
    console.log(total);
  }

  document.getElementById('total').innerHTML = total.toFixed(2);
});
