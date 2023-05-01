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
  }
}

const game = new Game()
export default game