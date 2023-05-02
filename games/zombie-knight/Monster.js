import canvas from './Canvas.js'
import game from './Game.js'
import { monsterSprites } from './sprites.js'

export default class Monster {
  constructor() {
    this.sprite = this.getRandomSprite()
    this.x = canvas.width
    this.y = this.getRandomInt(canvas.height - 50)
    this.height = 36
    this.width = 46
    this.frameX = 0
    this.frameY = 3
    this.speed = this.getRandomInt(5) + game.round
    this.direction = 'left'
  }

  getRandomInt(maxInt) {
    return Math.floor(Math.random() * maxInt)
  }

  getRandomSprite() {
    return monsterSprites[this.getRandomInt(monsterSprites.length)]
  }

  setDirection(direction) {
    this.direction = direction
    if (direction == 'left') this.frameY = 3
    if (direction == 'down') this.frameY = 0
    if (direction == 'up') this.frameY = 2
    this.updateFrame()
  }

  updateFrame() {
    if (this.frameX < 2) this.frameX++
    else this.frameX = 0
  }

  updateLocation() {
    if (
      this.direction == 'left' ||
      this.y < 0 ||
      this.y > canvas.height - this.height
    ) {
      this.x -= this.speed
    } else if (this.direction == 'down') {
      this.y += this.speed
    } else if (this.direction == 'up') {
      this.y -= this.speed
    }
  }
}
