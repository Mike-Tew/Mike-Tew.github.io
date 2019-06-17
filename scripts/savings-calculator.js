const $ = window.$;
$(function () {
  $('#navbar').load('navbar.html');
});

document.getElementById('calculate').addEventListener('click', () => {
  let balance = +(document.getElementById('balance').value);
  let monthly = +(document.getElementById('monthly').value);
  let intervals = +(document.getElementById('intervals').value);
  let interest = +(document.getElementById('interest').value) * 0.01;

  let total = (balance + (monthly * 12));

  for (let i = 0; i < intervals; i++) {
    let dangles = total * interest;
    total = total + dangles;
    console.log(total);
  }

  document.getElementById('total').innerHTML = total.toFixed(2);
});