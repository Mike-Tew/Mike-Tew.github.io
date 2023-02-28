import { createDeck, generateNumberCombos } from './deck-utils.js'

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const numberCombos = generateNumberCombos(nums)

const checkForDivision = (digit1, digit2) => {
  if (!digit1 || !digit2) return false
  if (digit1 % digit2 != 0) return false
  return true
}

const deck = createDeck(numberCombos)

console.log(deck)

const mainCard = document.getElementById('main-card')
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
const additionCheck = document.getElementById('addition-check')
const subtractionCheck = document.getElementById('subtraction-check')
const multiplicationCheck = document.getElementById('multiplication-check')
const divisionCheck = document.getElementById('division-check')
const saveButton = document.getElementById('save-button')

const saveSettings = () => {
  console.log('object')
}
saveButton.addEventListener('click', saveSettings)
