import Deck from './Deck.js'
import Settings from './Settings.js'

const mainCard = document.getElementById('main-card')
const saveButton = document.getElementById('save-button')

const deck = new Deck()
const settings = new Settings(mainCard)

saveButton.addEventListener('click', () => {
  settings.save()
  deck.createDeck(settings.getOperations())
  console.log(deck.cardStack)
})

mainCard.addEventListener('click', () => {
  const currentCard = deck.cardStack[0]

  if (currentCard.isActive) {
    showSolution(currentCard)
    deck.nextCard()
  } else {
    showProblem(currentCard)
    currentCard.isActive = !currentCard.isActive
  }
})

const showProblem = (card) => {
  mainCard.innerHTML = card.getProblem()
}

const showSolution = (card) => {
  card.getSolution()
  mainCard.innerHTML = card.getSolution()
}
