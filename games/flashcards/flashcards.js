const generateNumberCombos = (nums) => {
  const numberCombos = []
  for (let i = 1; i < nums.length + 1; i++) {
    for (let j = 1; j < nums.length + 1; j++) {
      numberCombos.push([i, j])
    }
  }

  return numberCombos
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const numberCombos = generateNumberCombos(nums)

class Card {
  constructor(digit1, digit2, operation) {
    this.digit1 = digit1
    this.digit2 = digit2
    this.operation = operation
    this.solution = digit1 + digit2
    this.isActive = false
  }

  getProblem = () => {
    switch (this.operation) {
      case 'addition':
        return `${this.digit1} + ${this.digit2}`
      case 'subtraction':
        return this.digit1 - this.digit2
      case 'multiplication':
        return `${this.digit1} x ${this.digit2}`
      case 'division':
        return this.digit1 / this.digit2
      default:
        return 'Error'
    }
  }

  getSolution = () => {
    switch (this.operation) {
      case 'addition':
        return this.digit1 + this.digit2
      case 'subtraction':
        return this.digit1 - this.digit2
      case 'multiplication':
        return this.digit1 * this.digit2
      case 'division':
        return this.digit1 / this.digit2
      default:
        return 'Error'
    }
  }
}

const shuffleCards = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

const checkForDivision = (digit1, digit2) => {
  if (!digit1 || !digit2) return false
  if (digit1 % digit2 != 0) return false
  return true
}

const createDeck = (numberCombos) => {
  const deck = []
  for (let idx in numberCombos) {
    ;[digit1, digit2] = numberCombos[idx]
    deck.push(new Card(digit1, digit2, 'multiplication'))
  }
  return shuffleCards(deck)
}

const deck = createDeck(numberCombos)

console.log(deck)

const mainCard = document.getElementById('main-card')
document.addEventListener('click', () => {
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
