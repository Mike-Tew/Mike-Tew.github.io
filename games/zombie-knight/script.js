import game from './Game.js'
import player from './Player.js'
import {
  drawNewRound,
  drawScore,
  drawSprite,
  resetCanvas
} from './canvasUtils.js'

window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true
})

window.addEventListener('keyup', (e) => {
  delete game.keys[e.key]
  player.moving = false
})

// ============ Animation Loop =============
let fps, fpsInterval, startTime, now, then, elapsed

const startAnimation = (fps) => {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  animate()
}

const animate = () => {
  game.spawnMonster()

  now = Date.now()
  elapsed = now - then
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    resetCanvas()

    if (game.countdown > Date.now()) {
      drawNewRound()
    }
    drawScore()
    player.updateLocation()
    player.updateFrame()
    drawSprite(player)

    game.checkMonsterStatus()
    game.handleMonsterMovement()
    game.removeDeadMonsters()
    game.monsters.forEach((monster) => drawSprite(monster))

    if (game.lives <= 0) {
      game.reset()
    }
  }

  requestAnimationFrame(animate)
}

startAnimation(30)
