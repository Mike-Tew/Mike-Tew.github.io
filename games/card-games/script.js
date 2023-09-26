class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }
}

class Deck {
  cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  cardSuits = ['hearts', 'spades', 'diamonds', 'clubs']
  cards = []

  constructor() {
    this.cards = this.buildDeck(this.cardSuits, this.cardValues)
    this.shuffleDeck()
  }

  buildDeck(cardSuits, cardValues) {
    const cards = []
    for (const suit of cardSuits) {
      for (const value of cardValues) {
        cards.push(new Card(suit, value))
      }
    }

    return cards
  }

  shuffleDeck() {
    for (let i = 1; i < 4; i++) {
      this.cards.sort(() => Math.random() - 0.5)
    }
  }
}

const deck = new Deck()
console.log(deck.cards);