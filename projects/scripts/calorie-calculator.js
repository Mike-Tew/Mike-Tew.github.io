const metricEl = document.getElementById('metric')
const femaleEl = document.getElementById('female')
const ageEl = document.getElementById('age')
const weightEl = document.getElementById('weight')
const minutesEl = document.getElementById('minutes')
const heartRateEl = document.getElementById('heart-rate')
const results = document.getElementById('results')

const getResults = () => {
  const age = ageEl.value
  let weight = weightEl.value
  const minutes = minutesEl.value
  const heartRate = heartRateEl.value

  document.getElementById('weight-label').innerHTML = 'lb'
  if (metricEl.checked) {
    document.getElementById('weight-label').innerHTML = 'kg'
    weight = weight * 2.20462
  }

  let caloriesBurned = getMaleCalories(age, weight, heartRate, minutes)
  if (femaleEl.checked) {
    caloriesBurned = getFemaleCalories(age, weight, heartRate, minutes)
  }
  if (caloriesBurned < 0) caloriesBurned = 0

  results.innerHTML = Math.round(caloriesBurned)
}

const getMaleCalories = (age, weight, heartRate, minutes) => {
  return (
    ((-55.0969 +
      0.6309 * heartRate +
      0.1988 * (weight / 2.205) +
      0.2017 * age) /
      4.184) *
    minutes
  )
}

const getFemaleCalories = (age, weight, heartRate, minutes) => {
  return (
    ((-20.4022 + 0.4472 * heartRate - 0.1263 * (weight / 2.205) + 0.074 * age) /
      4.184) *
    minutes
  )
}

results.innerHTML = 'abc'
getResults()
