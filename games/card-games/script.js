import Deck from './Deck/Deck.js'

const playerArea = document.getElementById('player-area')
const dealerArea = document.getElementById('dealer-area')

const deck = new Deck()
const playerHand = []
const dealerHand = []

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
}

gameStart()

document.getElementById('next').addEventListener('click', () => {
  const card = deck.cards.shift()
  console.log(card);
  playerHand.push(card)
  showCard(playerArea, card)
  console.log(playerHand);
})
