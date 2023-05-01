import { canvas } from './canvas.js'
import settings from './game-settings.js'
import { playerSprite } from './sprites.js'

export default class Player {
  constructor() {
    this.sprite = playerSprite
    this.x =  canvas.width / 2,
    this.y = canvas.height / 2,
    this.width = 64,
    this.height = 64,
    this.frameX = 0,
    this.frameY = 0,
    this.moving = false,
    this.speed = 10
  }

  updateFrame() {
    if (this.frameX < 4 && this.moving) this.frameX++
    else this.frameX = 0
  }

  updateLocation() {
    if ((settings.keys['ArrowUp'] || settings.keys['w']) && this.y > 0) {
      this.y -= this.speed
      this.frameY = 1
      this.moving = true
    }
    if ((settings.keys['ArrowLeft'] || settings.keys['a']) && this.x > 0) {
      this.x -= this.speed
      this.frameY = 3
      this.moving = true
    }
    if (
      (settings.keys['ArrowDown'] || settings.keys['s']) &&
      this.y < canvas.height - this.height
    ) {
      this.y += this.speed
      this.frameY = 0
      this.moving = true
    }
    if (
      (settings.keys['ArrowRight'] || settings.keys['d']) &&
      this.x < canvas.width - this.width
    ) {
      this.x += this.speed
      this.frameY = 2
      this.moving = true
    }
  }
}
