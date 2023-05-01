import game from './Game.js'
import Monster from './Monster.js'
import monsterAi from './MonsterAi.js'
import player from './Player.js'
import { canvas, ctx } from './canvas.js'
import { canvasImg } from './sprites.js'
import { drawSprite, handleMonsterCollision } from './utils.js'

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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(canvasImg, 0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 36px Arial'
    ctx.fillStyle = '#ee1c27'
    ctx.fillText(`SCORE   ${game.score}`, 525, 70)
    ctx.strokeText(`SCORE   ${game.score}`, 525, 70)
    ctx.fillStyle = '#2bb3ed'
    ctx.fillText(`LIVES   ${game.lives}`, 50, 70)
    ctx.strokeText(`LIVES   ${game.lives}`, 50, 70)

    if (game.countdown > Date.now()) {
      ctx.font = 'bold 50px Arial'
      ctx.fillStyle = '#ee1c27'
      ctx.fillText('GET READY', 250, 300)
      ctx.strokeText('GET READY', 250, 300)
      ctx.fillStyle = '#fff30a'
      ctx.fillText(`Round ${game.round}`, 300, 200)
      ctx.strokeText(`Round ${game.round}`, 300, 200)
    }

    player.updateLocation()
    player.updateFrame()
    drawSprite(player)

    game.monsters.forEach((monster) => {
      if (handleMonsterCollision(monster, player)) {
        monster.remove = true
        game.score += monster.speed + game.round
        game.roundScore++
        if (game.roundScore >= 20) {
          game.monsters = []
          game.round += 1
          game.roundScore = 0
          game.lives++
          game.countdown = Date.now() + 4000
        }
      }
    })

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
    game.monsters = game.monsters.filter((monster) => monster.remove != true)

    if (game.lives <= 0) {
      game.reset()
    }
  }

  requestAnimationFrame(animate)
}

startAnimation(30)
