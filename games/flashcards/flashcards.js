import Deck from './Deck.js'
import Settings from './Settings.js'

const mainCard = document.getElementById('main-card')
const modalButton = document.getElementById('modal-button')
const modal = document.getElementById('modal')
const saveButton = document.getElementById('save-button')

const deck = new Deck()
const settings = new Settings(mainCard)

modalButton.addEventListener('click', () => {
  modal.classList.remove('hidden')
})

mainCard.addEventListener('click', () => {
  if (deck.cardStack.length == 0) {
    deck.createDeck(settings.getOperations())
  }
  const currentCard = deck.cardStack[0]

  if (currentCard.isActive) {
    showSolution(currentCard)
    deck.nextCard()
  } else {
    showProblem(currentCard)
    currentCard.isActive = !currentCard.isActive
  }
})

const saveSettings = () => {
  settings.save()
  deck.createDeck(settings.getOperations())
  modal.classList.add('hidden')
}

saveButton.addEventListener('click', saveSettings)

const showProblem = (card) => {
  mainCard.innerHTML = card.getProblem()
}

const showSolution = (card) => {
  card.getSolution()
  mainCard.innerHTML = card.getSolution()
}

saveSettings()
