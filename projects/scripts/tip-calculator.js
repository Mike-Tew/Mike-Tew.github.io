const calculateTip = () => {
  const bill = +document.getElementById('bill').value
  const tipPercent = 0.2
  const total = bill + bill * tipPercent
  document.getElementById('bill-total').innerHTML = `$${total.toFixed(2)}`

  const service = document.getElementById('service')
  const serviceOption = service.options[service.selectedIndex].text
  document.getElementById('report').innerHTML = serviceOption

  const personCount = document.getElementById('people').value
  document.getElementById('person').innerHTML = personCount
  document.getElementById('per-person').innerHTML = `$${(
    total / personCount
  ).toFixed(2)}`
}

document.getElementById('calculate').addEventListener('click', calculateTip)
