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

const createDeck = (numberCombos) => {
  const deck = []
  let digit1, digit2
  for (let idx in numberCombos) {
    ;[digit1, digit2] = numberCombos[idx]
    deck.push(new Card(digit1, digit2, 'multiplication'))
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

