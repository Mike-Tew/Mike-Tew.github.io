import game from './Game.js'
import Monster from './Monster.js'
import monsterAi from './MonsterAi.js'
import player from './Player.js'
import { drawNewRound, drawScore, drawSprite, resetCanvas } from './canvasUtils.js'

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
  if (
    Date.now() - game.prevSpawn > game.spawnRate &&
    game.countdown <= Date.now()
  ) {
    game.monsters.push(new Monster())
    game.prevSpawn = Date.now()
  }

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

    game.monsters.forEach((monster) => {
      const direction = monsterAi.calculateAi(
        monster.x,
        monster.y,
        player.x,
        player.y
      )

      monster.setDirection(direction)
      monster.updateLocation()
      drawSprite(monster)

      if (monster.x < 0) {
        game.lives -= 1
        monster.remove = true
      }
    })

    game.removeDeadMonsters()

    if (game.lives <= 0) {
      game.reset()
    }
  }

  requestAnimationFrame(animate)
}

startAnimation(30)
