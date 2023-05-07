import game from './Game.js'
import { playerSprite } from './sprites.js'

class Player {
  constructor() {
    this.sprite = playerSprite
    this.x = 800 / 2
    this.y = 600 / 2
    this.width = 64
    this.height = 64
    this.frameX = 0
    this.frameY = 0
    this.speed = 10

    this.clickMove = false
    this.clickX = 0
    this.clickY = 0

    this.frame = {
      up: 1,
      down: 0,
      right: 2,
      left: 3
    }
  }

  centerX = () => this.x + this.width / 2
  centerY = () => this.y + this.height / 2

  move() {
    if (this.clickMove) {
      this.clickLoc()
    } else {
      this.keyboardMove()
    }
  }

  keyboardMove() {
    if (game.keys['ArrowUp'] || game.keys['w']) {
      this.update(0, -this.speed)
    }
    if ((game.keys['ArrowLeft'] || game.keys['a']) && this.x > 0) {
      this.update(-this.speed, 0)
    }
    if (game.keys['ArrowDown'] || game.keys['s']) {
      this.update(0, this.speed)
    }
    if (game.keys['ArrowRight'] || game.keys['d']) {
      this.update(this.speed, 0)
    }
  }

  clickLoc() {
    // Calculate the distance between the player and the loc of the click
    const targetX = this.clickX - this.centerX()
    const targetY = this.clickY - this.centerY()
    const dist = Math.sqrt(targetX * targetX + targetY * targetY)

    if (dist >= this.speed) {
      const velocityX = (targetX / dist) * this.speed
      const velocityY = (targetY / dist) * this.speed
      this.update(velocityX, velocityY)
    }
  }

  update(x, y) {
    this.updateLocation(x, y)
    this.setDirection(x, y)
    this.updateFrame()
  }

  updateLocation(x, y) {
    // Move player if x and y coordinates are inside the canvas area
    if (this.x + x >= 0 && this.x + x <= 800 - this.width) this.x += x
    if (this.y + y >= 0 && this.y + y <= 600 - this.height) this.y += y
  }

  updateFrame() {
    if (this.frameX < 4) this.frameX++
    else this.frameX = 0
  }

  setDirection(x, y) {
    if (Math.abs(y) > Math.abs(x)) {
      if (y < 0) {
        this.frameY = this.frame.down
      } else {
        this.frameY = this.frame.up
      }
    } else {
      if (x < 0) {
        this.frameY = this.frame.left
      } else {
        this.frameY = this.frame.right
      }
    }
  }
}

const player = new Player()

export default player
