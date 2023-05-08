import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MONSTER_HEIGHT,
  MONSTER_WIDTH
} from './game_vars.js'
import { monsterSprites } from './sprites.js'

export default class Monster {
  constructor(speed) {
    this.sprite = this.getRandomSprite()
    this.height = MONSTER_HEIGHT
    this.width = MONSTER_WIDTH
    this.x = CANVAS_WIDTH
    this.y = this.getRandomInt(CANVAS_HEIGHT - this.height)
    this.frameX = 0
    this.frameY = 3
    this.speed = this.getRandomInt(5) + speed
    this.frame = {
      up: 2,
      down: 0,
      left: 3
    }
  }

  centerX = () => this.x + this.width / 2
  centerY = () => this.y + this.height / 2
  getRandomInt = (maxInt) => Math.floor(Math.random() * maxInt)

  getRandomSprite() {
    return monsterSprites[this.getRandomInt(monsterSprites.length)]
  }

  update(x, y) {
    this.setDirection(x, y)
    this.updateLocation(x, y)
    this.updateFrame()
  }

  setDirection(x, y) {
    if (x < 0) this.frameY = this.frame.left
    if (y < 0) this.frameY = this.frame.up
    if (y > 0) this.frameY = this.frame.down
  }

  updateLocation(x, y) {
    if (this.y <= 0 || this.y >= CANVAS_HEIGHT - this.height) {
      this.x -= this.speed
    } else {
      this.x += x * this.speed
      this.y += y * this.speed
    }
  }

  updateFrame() {
    if (this.frameX < 2) this.frameX++
    else this.frameX = 0
  }
}
