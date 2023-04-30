import { canvas, ctx } from './canvas.js'

export default class Monster {
  constructor(sprite, y, speed) {
    this.sprite = sprite
    this.x = canvas.width
    this.y = y
    this.height = 36
    this.width = 46
    this.frameX = 0
    this.frameY = 3
    this.speed = speed
    this.direction = 'left'
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

  draw() {
    ctx.drawImage(
      this.sprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
