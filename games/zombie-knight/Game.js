class Game {
  constructor() {
    this.prevSpawn = 0
    this.round = 1
    this.roundScore = 0
    this.lives = 5
    this.score = 0
    this.spawnRate = 1000
    this.keys = []
    this.monsters = []
    this.countdown = Date.now() + 4000
  }

  reset() {
    this.lives = 5
    this.score = 0
    this.roundScore = 0
    this.round = 1
    this.monsters = []
    this.countdown = Date.now() + 4000
  }
}

const game = new Game()
export default game
