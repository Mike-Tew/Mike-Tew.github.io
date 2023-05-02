import canvas from './Canvas.js'
import game from './Game.js'
import player from './Player.js'

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
    canvas.resetCanvas()

    if (game.countdown > Date.now()) {
      canvas.drawNewRound()
    }
    canvas.drawScore()
    player.updateLocation()
    player.updateFrame()
    canvas.drawSprite(player)

    game.checkMonsterStatus()
    game.handleMonsterMovement()
    game.removeDeadMonsters()
    game.monsters.forEach((monster) => canvas.drawSprite(monster))

    if (game.lives <= 0) {
      game.reset()
    }
  }

  requestAnimationFrame(animate)
}

startAnimation(30)
