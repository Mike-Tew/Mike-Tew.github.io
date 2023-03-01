const additionCheck = document.getElementById('addition-check')
const subtractionCheck = document.getElementById('subtraction-check')
const multiplicationCheck = document.getElementById('multiplication-check')
const divisionCheck = document.getElementById('division-check')

export default class Settings {
  constructor(mainCard) {
    this.mainCard = mainCard
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

    return this.operations
  }

  updateDeckColor = () => {
    this.mainCard.classList.remove(
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
      this.mainCard.classList.add('bg-blue-300', 'hover:bg-blue-200')
    if (this.currentColor == 'red')
      this.mainCard.classList.add('bg-red-300', 'hover:bg-red-200')
    if (this.currentColor == 'yellow')
      this.mainCard.classList.add('bg-yellow-300', 'hover:bg-yellow-200')
    if (this.currentColor == 'green')
      this.mainCard.classList.add('bg-green-300', 'hover:bg-green-200')
  }

  save = () => {
    this.getOperations()
    this.updateDeckColor()
  }
}
