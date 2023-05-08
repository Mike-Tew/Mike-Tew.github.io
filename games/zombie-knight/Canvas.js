import game from './Game.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './game_vars.js'

class Canvas {
  constructor() {
    const canvasEl = document.getElementById('game-canvas')
    this.width = CANVAS_WIDTH
    this.height = CANVAS_HEIGHT
    canvasEl.width = CANVAS_WIDTH
    canvasEl.height = CANVAS_HEIGHT

    this.ctx = canvasEl.getContext('2d')
    this.canvas = canvasEl
    this.canvasImg = new Image()
    this.canvasImg.src = 'assests/canvas-image.jpg'
  }

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(this.canvasImg, 0, 0, this.width, this.height)
  }

  drawScore() {
    this.ctx.font = 'bold 36px Arial'
    this.ctx.fillStyle = '#ee1c27'
    this.ctx.fillText(`SCORE   ${game.score}`, 525, 70)
    this.ctx.strokeText(`SCORE   ${game.score}`, 525, 70)
    this.ctx.fillStyle = '#2bb3ed'
    this.ctx.fillText(`LIVES   ${game.lives}`, 50, 70)
    this.ctx.strokeText(`LIVES   ${game.lives}`, 50, 70)
  }

  drawNewRound() {
    this.ctx.font = 'bold 50px Arial'
    this.ctx.fillStyle = '#ee1c27'
    this.ctx.fillText('GET READY', 250, 300)
    this.ctx.strokeText('GET READY', 250, 300)
    this.ctx.fillStyle = '#fff30a'
    this.ctx.fillText(`Round ${game.round}`, 300, 200)
    this.ctx.strokeText(`Round ${game.round}`, 300, 200)
  }

  drawSprite(sprite) {
    this.ctx.drawImage(
      sprite.sprite,
      sprite.width * sprite.frameX,
      sprite.height * sprite.frameY,
      sprite.width,
      sprite.height,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height
    )
  }
}

const canvas = new Canvas()

export default canvas
