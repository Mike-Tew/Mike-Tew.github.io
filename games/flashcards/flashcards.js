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

class Settings {
  constructor() {
    this.operations = []
    this.colorChoices = document.querySelectorAll('.color-choices div')
    this.currentColor = 'blue'

    this.colorChoices.forEach((color) => {
      color.addEventListener('click', () => {
        this.updateColorBorders()
        color.style.borderColor = 'rgb(100 116 139)'
        this.currentColor = color.getAttribute('name')
      })
    })
  }

  updateColorBorders = () => {
    this.colorChoices.forEach((color) => {
      color.style.borderColor = 'rgb(226 232 240)'
    })
  }

  getOperations = () => {
    this.operations = []
    if (additionCheck.checked) this.operations.push('addition')
    if (subtractionCheck.checked) this.operations.push('subtraction')
    if (multiplicationCheck.checked) this.operations.push('multiplication')
    if (divisionCheck.checked) this.operations.push('division')
    deck = createDeck(numberCombos, this.operations)
  }

  updateDeckColor = () => {
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

    if (this.currentColor == 'blue')
      mainCard.classList.add('bg-blue-300', 'hover:bg-blue-200')
    if (this.currentColor == 'red')
      mainCard.classList.add('bg-red-300', 'hover:bg-red-200')
    if (this.currentColor == 'yellow')
      mainCard.classList.add('bg-yellow-300', 'hover:bg-yellow-200')
    if (this.currentColor == 'green')
      mainCard.classList.add('bg-green-300', 'hover:bg-green-200')
  }

  save = () => {
    this.getOperations()
    this.updateDeckColor()
  }
}

// saveButton.addEventListener('click', saveSettings)
const settings = new Settings()
saveButton.addEventListener('click', settings.save)
