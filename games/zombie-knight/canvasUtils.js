import game from './Game.js'
import { canvas, ctx } from './canvas.js'
import { canvasImg } from './sprites.js'

const resetCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(canvasImg, 0, 0, canvas.width, canvas.height)
}

const drawSprite = (sprite) => {
  ctx.drawImage(
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

const drawScore = () => {
  ctx.font = 'bold 36px Arial'
  ctx.fillStyle = '#ee1c27'
  ctx.fillText(`SCORE   ${game.score}`, 525, 70)
  ctx.strokeText(`SCORE   ${game.score}`, 525, 70)
  ctx.fillStyle = '#2bb3ed'
  ctx.fillText(`LIVES   ${game.lives}`, 50, 70)
  ctx.strokeText(`LIVES   ${game.lives}`, 50, 70)
}

const drawNewRound = () => {
  ctx.font = 'bold 50px Arial'
  ctx.fillStyle = '#ee1c27'
  ctx.fillText('GET READY', 250, 300)
  ctx.strokeText('GET READY', 250, 300)
  ctx.fillStyle = '#fff30a'
  ctx.fillText(`Round ${game.round}`, 300, 200)
  ctx.strokeText(`Round ${game.round}`, 300, 200)
}

export { drawScore, drawNewRound, drawSprite, resetCanvas }

