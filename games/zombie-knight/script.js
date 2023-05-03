import game from './Game.js'
import player from './Player.js'

window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true
})

window.addEventListener('keyup', (e) => {
  delete game.keys[e.key]
  player.moving = false
})

const canvas = document.getElementById('game-canvas')
canvas.addEventListener('click', (e) => {
  const canvasOffset = canvas.getBoundingClientRect()
  const clickX = e.x - canvasOffset.left
  const clickY = e.y - canvasOffset.top

  player.clickLoc(clickX, clickY)

})

// ============ Animation Loop =============
let fps, fpsInterval, startTime, now, then, elapsed

const animate = () => {
  now = Date.now()
  elapsed = now - then
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    game.gameLoop()
  }

  requestAnimationFrame(animate)
}

const startAnimation = (fps) => {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  animate()
}

startAnimation(30)
