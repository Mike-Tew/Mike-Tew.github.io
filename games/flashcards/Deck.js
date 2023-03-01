import Card from './Card.js'

export default class Deck {
  constructor() {
    this.cardStack = []
    this.digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.generateNumberCombos()
  }

  generateNumberCombos = () => {
    this.numberCombos = []
    for (let i = 1; i < this.digits.length + 1; i++) {
      for (let j = 1; j < this.digits.length + 1; j++) {
        this.numberCombos.push([i, j])
      }
    }
  }

  shuffleDeck = () => {
    const deck = this.cardStack
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
  }

  createDeck = (operations) => {
    this.cardStack = []
    let digit1, digit2

    for (let operationIdx in operations) {
      let operation = operations[operationIdx]

      for (let idx in this.numberCombos) {
        ;[digit1, digit2] = this.numberCombos[idx]
        if (operation == 'division' && !this.checkDivision(digit1, digit2))
          continue
        if (
          operation == 'subtraction' &&
          !this.checkSubtraction(digit1, digit2)
        )
          continue

        this.cardStack.push(new Card(digit1, digit2, operation))
      }
    }
    this.shuffleDeck()
  }

  checkDivision = (digit1, digit2) => {
    // Remove solutions with a remainder or with a zero digit.
    if (!digit1 || !digit2) return false
    if (digit1 % digit2 != 0) return false
    return true
  }

  checkSubtraction = (digit1, digit2) => {
    // Remove solutions with a negative result.
    if (digit1 - digit2 < 0) return false
    return true
  }

  nextCard = () => {
    this.cardStack.shift()
  }
}
