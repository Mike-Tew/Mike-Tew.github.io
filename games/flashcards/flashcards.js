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

const saveSettings = () => {
  operations = []
  if (additionCheck.checked) operations.push('addition')
  if (subtractionCheck.checked) operations.push('subtraction')
  if (multiplicationCheck.checked) operations.push('multiplication')
  if (divisionCheck.checked) operations.push('division')
  deck = createDeck(numberCombos, operations)

  mainCard.classList.remove(
    'bg-blue-300',
    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'hover:bg-blue-200',
    'hover:bg-red-200',
    'hover:bg-yellow-200',
    'hover:bg-green-200'
  )

  if (currentColor == 'blue')
    mainCard.classList.add('bg-blue-300', 'hover:bg-blue-200')
  if (currentColor == 'red')
    mainCard.classList.add('bg-red-300', 'hover:bg-red-200')
  if (currentColor == 'yellow')
    mainCard.classList.add('bg-yellow-300', 'hover:bg-yellow-200')
  if (currentColor == 'green')
    mainCard.classList.add('bg-green-300', 'hover:bg-green-200')
}

saveButton.addEventListener('click', saveSettings)

const deckColor = document.querySelectorAll('.deck-color div')
let currentColor

const resetColorBorders = () => {
  deckColor.forEach((color) => {
    color.style.borderColor = 'rgb(226 232 240)'
  })
}

deckColor.forEach((color) => {
  color.addEventListener('click', () => {
    resetColorBorders()
    color.style.borderColor = 'rgb(100 116 139)'
    currentColor = color.getAttribute('name')
  })
})
