import { createDeck, generateNumberCombos } from './deck-utils.js'

const mainCard = document.getElementById('main-card')
const additionCheck = document.getElementById('addition-check')
const subtractionCheck = document.getElementById('subtraction-check')
const multiplicationCheck = document.getElementById('multiplication-check')
const divisionCheck = document.getElementById('division-check')
const saveButton = document.getElementById('save-button')

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let operations = []
const numberCombos = generateNumberCombos(nums)
let deck = createDeck(numberCombos, operations)

mainCard.addEventListener('click', () => {
  const currentCard = deck[0]

  if (currentCard.isActive) {
    showSolution(currentCard)
    deck.shift()
  } else {
    showProblem(currentCard)
    currentCard.isActive = !currentCard.isActive
  }
  console.log(deck)
})

const showProblem = (card) => {
  mainCard.innerHTML = card.getProblem()
}

const showSolution = (card) => {
  card.getSolution()
  mainCard.innerHTML = card.getSolution()
}

// WIP: Modal Area
const saveSettings = () => {
  operations = []
  if (additionCheck.checked) operations.push('addition')
  if (subtractionCheck.checked) operations.push('subtraction')
  if (multiplicationCheck.checked) operations.push('multiplication')
  if (divisionCheck.checked) operations.push('division')
  console.log(operations)
  deck = createDeck(numberCombos, operations)
}
saveButton.addEventListener('click', saveSettings)
