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
}

const shuffleCards = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

const createDeck = (numberCombos) => {
  const deck = []
  for (let idx in numberCombos) {
    ;[digit1, digit2] = numberCombos[idx]
    deck.push(new Card(digit1, digit2, 'addition'))
  }
  return shuffleCards(deck)
}

const deck = createDeck(numberCombos)

console.log(deck)

const mainCard = document.getElementById('main-card')
document.addEventListener('click', () => {
  if (deck[0].isActive) {
    showSolution(deck[0])
    deck.shift()
  } else {
    showProblem(deck[0])
    deck[0].isActive = !deck[0].isActive
  }
  console.log(deck)
})

const showProblem = (card) => {
  mainCard.innerHTML = `${card.digit1} + ${card.digit2}`
}

const showSolution = (card) => {
  mainCard.innerHTML = card.solution
}
