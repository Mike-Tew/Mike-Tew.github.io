import Card from './Card.js'

const generateNumberCombos = (nums) => {
  const numberCombos = []
  for (let i = 1; i < nums.length + 1; i++) {
    for (let j = 1; j < nums.length + 1; j++) {
      numberCombos.push([i, j])
    }
  }

  return numberCombos
}

const checkDivision = (digit1, digit2) => {
  // Remove solutions with a remainder or with a zero digit.
  if (!digit1 || !digit2) return false
  if (digit1 % digit2 != 0) return false
  return true
}

const checkSubtraction = (digit1, digit2) => {
  // Remove solutions with a negative result.
  if (digit1 - digit2 < 0) return false
  return true
}

const createDeck = (numberCombos, operations) => {
  const deck = []
  let digit1, digit2

  for (let operationIdx in operations) {
    let operation = operations[operationIdx]

    for (let idx in numberCombos) {
      ;[digit1, digit2] = numberCombos[idx]
      if (operation == 'division' && !checkDivision(digit1, digit2)) continue
      if (operation == 'subtraction' && !checkSubtraction(digit1, digit2))
        continue

      deck.push(new Card(digit1, digit2, operation))
    }
  }
  return shuffleDeck(deck)
}

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export { generateNumberCombos, createDeck }

