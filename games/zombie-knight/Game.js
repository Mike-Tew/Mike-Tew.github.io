import canvas from './Canvas.js'
import Monster from './Monster.js'
import monsterAi from './MonsterAi.js'
import player from './Player.js'

class Game {
  constructor() {
    this.keys = []
    this.prevSpawn = 0
    this.spawnRate = 1000
    this.reset()
  }

  gameLoop() {
    canvas.resetCanvas()
    canvas.drawScore()
    canvas.drawSprite(player)
    if (this.countdown) {
      canvas.drawNewRound()
    }

    player.move()

    this.spawnMonster()
    this.checkMonsterStatus()
    this.handleMonsterMovement()
    this.monsters.forEach((monster) => canvas.drawSprite(monster))

    this.update()
  }

  spawnMonster() {
    if (Date.now() - this.prevSpawn > this.spawnRate && !this.countdown) {
      this.monsters.push(new Monster(this.monsterSpeed))
      this.prevSpawn = Date.now()
    }
  }

  handleMonsterMovement() {
    this.monsters.forEach((monster) => {
      if (monster.x < 0) {
        this.lives -= 1
        monster.remove = true
      }

      const coords = monsterAi.calcAi(
        monster.centerX(),
        monster.centerY(),
        player.centerX(),
        player.centerY()
      )
      monster.update(...coords)
    })
  }

  checkMonsterStatus() {
    this.monsters.forEach((monster) => {
      if (!this.handleMonsterCollision(monster, player)) return

      monster.remove = true
      this.score += monster.speed + this.round
      this.roundScore++
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

  update() {
    if (this.roundScore >= 20) this.nextRound()
    this.monsters = this.monsters.filter((monster) => monster.remove != true)
    if (this.countdownTimer < Date.now()) this.countdown = false
    if (this.lives <= 0) this.reset()
  }

  nextRound() {
    this.lives++
    this.round += 1
    this.roundScore = 0
    this.monsters = []
    this.monsterSpeed += 1
    this.countdown = true
    this.countdownTimer = Date.now() + 4000
    if (this.round == 3) {
      monsterAi.aiLevel = 'advanced'
      this.monsterSpeed = 1
    }
    if (this.round == 5) {
      monsterAi.aiLevel = 'expert'
      this.monsterSpeed = 1
    }
  }

  reset() {
    this.lives = 5
    this.score = 0
    this.round = 1
    this.roundScore = 0
    this.monsters = []
    this.monsterSpeed = 1
    this.countdown = true
    this.countdownTimer = Date.now() + 4000
    monsterAi.aiLevel = 'beginner'
  }
}

const game = new Game()

export default game
