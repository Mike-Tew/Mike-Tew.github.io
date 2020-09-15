document.getElementById('calculate').addEventListener('click', () => {
  bill = parseFloat(document.getElementById('bill').value) * 1.2;
  document.getElementById('bill-total').innerHTML = '$' + bill.toFixed(2);
  const e = document.getElementById('service');
  const test = e.options[e.selectedIndex].text;
  document.getElementById('report').innerHTML = test;
  const people = document.getElementById('people').value;
  console.log(people);
  document.getElementById('person').innerHTML = people;
  document.getElementById('per-person').innerHTML =        '$' + (bill / people).toFixed(2);
});
