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
  constructor(digit1, digit2) {
    this.digit1 = digit1
    this.digit2 = digit2
    this.answer = digit1 + digit2
  }
}

const cards = []
for (let idx in numberCombos) {
  ;[digit1, digit2] = numberCombos[idx]
  cards.push(new Card(digit1, digit2))
}

console.log(cards)
