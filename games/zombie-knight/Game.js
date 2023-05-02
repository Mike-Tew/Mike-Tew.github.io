import player from './Player.js'

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

  checkMonsterStatus() {
    this.monsters.forEach((monster) => {
      if (this.handleMonsterCollision(monster, player)) {
        monster.remove = true
        this.score += monster.speed + this.round
        this.roundScore++
        if (this.roundScore >= 20) {
          this.nextRound()
        }
      }
    })
  }

  handleMonsterCollision(monster, player) {
    return (
      monster.x < player.x + player.width - 20 &&
      monster.x + monster.width > player.x + 40 &&
      monster.y < player.y + player.height &&
      monster.y + monster.height > player.y
    )
  }

  removeDeadMonsters() {
    this.monsters = this.monsters.filter((monster) => monster.remove != true)
  }

  nextRound() {
    this.monsters = []
    this.round += 1
    this.roundScore = 0
    this.lives++
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
