import { canvas } from './canvas.js'
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
}
