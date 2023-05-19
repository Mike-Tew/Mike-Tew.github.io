import game from './Game.js'
import player from './Player.js'

window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true
  player.clickMove = false
})

window.addEventListener('keyup', (e) => {
  delete game.keys[e.key]
})

const canvas = document.getElementById('game-canvas')
canvas.addEventListener('click', (e) => {
  const canvasOffset = canvas.getBoundingClientRect()
  const clickX = e.x - canvasOffset.left
  const clickY = e.y - canvasOffset.top

  player.clickMove = true
  player.clickX = clickX
  player.clickY = clickY
})

canvas.addEventListener('touchstart', (e) => {
  const canvasOffset = canvas.getBoundingClientRect()
  const clickX = e.changedTouches[0].clientX - canvasOffset.left
  const clickY = e.changedTouches[0].clientY - canvasOffset.top

  player.clickMove = true
  player.clickX = clickX
  player.clickY = clickY
})

// ============ Animation Loop =============
let msPrev = window.performance.now()
const fps = 30
const msPerFrame = 1000 / fps

function animate() {
  window.requestAnimationFrame(animate)

  const msNow = window.performance.now()
  const msPassed = msNow - msPrev

  if (msPassed < msPerFrame) return

  const excessTime = msPassed % msPerFrame
  msPrev = msNow - excessTime

  game.gameLoop()
  frames++
}

animate()
