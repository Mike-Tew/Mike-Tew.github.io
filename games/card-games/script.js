import Deck from './Deck/Deck.js'

const playerArea = document.getElementById('player-area')
const dealerArea = document.getElementById('dealer-area')

const deck = new Deck()
const playerHand = []
const dealerHand = []
let playerScore = 0
let dealerScore = 0
let playerFinished = false

const showCard = (area, card) => {
  const img = document.createElement('img')
  img.classList.add('card')
  img.src = card.imgName
  area.appendChild(img)
}

const dealCard = (hand, area) => {
  const card = deck.cards.shift()
  hand.push(card)
  showCard(area, card)
}

const gameStart = () => {
  dealCard(playerHand, playerArea)
  dealCard(dealerHand, dealerArea)
  dealCard(playerHand, playerArea)
  dealCard(dealerHand, dealerArea)
  checkScores()
}

const getHandScore = (hand) => {
  let score = 0
  let aceCount = 0

  hand.forEach((card) => {
    if (card.value == 'A') {
      score += 11
      aceCount += 1
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10
    } else {
      score += +card.value
    }
  })

  while (aceCount) {
    if (score > 21) score -= 10
    aceCount -= 1
  }

  return score
}

const checkScores = () => {
  playerScore = getHandScore(playerHand)
  dealerScore = getHandScore(dealerHand)
  console.log(playerScore, dealerScore)

  if (playerScore == 21) playerWin()
  if (playerScore > 21) playerLose()
}

const hit = (hand, area) => {
  const card = deck.cards.shift()
  hand.push(card)
  showCard(area, card)
  checkScores()
}

const dealerPlay = () => {
  playerFinished = true
  while (dealerScore < 17) {
    hit(dealerHand, dealerArea)
  }
}

const playerWin = () => {
  console.log('You Win!');
}

const playerLose = () => {
  playerFinished = true
  console.log('Bust!');
}

gameStart()

document.getElementById('hit-button').addEventListener('click', () => {
  if (playerFinished) return

  hit(playerHand, playerArea)
})
document.getElementById('stay-button').addEventListener('click', dealerPlay)
