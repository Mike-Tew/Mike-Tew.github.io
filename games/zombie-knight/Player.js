import canvas from './Canvas.js'
import game from './Game.js'
import { playerSprite } from './sprites.js'

class Player {
  constructor() {
    this.sprite = playerSprite
    this.x = 800 / 2,
    this.y = 600 / 2,
    this.width = 64,
    this.height = 64,
    this.frameX = 0,
    this.frameY = 0,
    this.moving = false,
    this.speed = 10
  }

  clickLoc(clickX, clickY) {
    if (this.x > clickX) {
      this.x -= this.speed
    }
    if (this.x < clickX) {
      this.x += this.speed
    }
    if (this.y > clickY) {
      this.y -= this.speed
    }
    if (this.y < clickY) {
      this.y += this.speed
    }
  }

  updateFrame() {
    if (this.frameX < 4 && this.moving) this.frameX++
    else this.frameX = 0
  }

  updateLocation() {
    if ((game.keys['ArrowUp'] || game.keys['w']) && this.y > 0) {
      this.y -= this.speed
      this.frameY = 1
      this.moving = true
    }
    if ((game.keys['ArrowLeft'] || game.keys['a']) && this.x > 0) {
      this.x -= this.speed
      this.frameY = 3
      this.moving = true
    }
    if (
      (game.keys['ArrowDown'] || game.keys['s']) &&
      this.y < canvas.height - this.height
    ) {
      this.y += this.speed
      this.frameY = 0
      this.moving = true
    }
    if (
      (game.keys['ArrowRight'] || game.keys['d']) &&
      this.x < canvas.width - this.width
    ) {
      this.x += this.speed
      this.frameY = 2
      this.moving = true
    }
  }
}

const player = new Player()

export default player
