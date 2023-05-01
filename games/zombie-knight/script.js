import Monster from './Monster.js'
import Player from './Player.js'
import { canvas, ctx } from './canvas.js'
import settings from './game-settings.js'

// ================ Game Setup ===============
const background = new Image()
background.src = 'assests/canvas-image.jpg'
const keys = []
let monsters = []
const player = new Player()

const setMonsterDirection = (monster) => {
  if (isAbove(monster)) {
    monster.setDirection('up')
  } else if (isBelow(monster)) {
    monster.setDirection('down')
  } else {
    monster.setDirection('left')
  }
}

const isAbove = (monster) => {
  return (
    monster.x > player.x &&
    monster.x - player.x < 100 &&
    monster.y < player.y &&
    player.y - monster.y < 100
  )
}

const isBelow = (monster) => {
  return (
    monster.x > player.x &&
    monster.x - player.x < 100 &&
    monster.y > player.y &&
    monster.y - player.y < 100
  )
}

const handleMonsterCollision = (monster) => {
  return (
    monster.x < player.x + player.width - 20 &&
    monster.x + monster.width > player.x + 40 &&
    monster.y < player.y + player.height &&
    monster.y + monster.height > player.y
  )
}

const movePlayer = () => {
  if ((keys['ArrowUp'] || keys['w']) && player.y > 0) {
    player.y -= player.speed
    player.frameY = 1
    player.moving = true
  }
  if ((keys['ArrowLeft'] || keys['a']) && player.x > 0) {
    player.x -= player.speed
    player.frameY = 3
    player.moving = true
  }
  if (
    (keys['ArrowDown'] || keys['s']) &&
    player.y < canvas.height - player.height
  ) {
    player.y += player.speed
    player.frameY = 0
    player.moving = true
  }
  if (
    (keys['ArrowRight'] || keys['d']) &&
    player.x < canvas.width - player.width
  ) {
    player.x += player.speed
    player.frameY = 2
    player.moving = true
  }
}

window.addEventListener('keydown', (e) => {
  keys[e.key] = true
})

window.addEventListener('keyup', (e) => {
  delete keys[e.key]
  player.moving = false
})

// ============ Animation Loop =============
let fps, fpsInterval, startTime, now, then, elapsed
let countdown = Date.now() + 4000

const startAnimation = (fps) => {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  animate()
}

const resetGame = () => {
  settings.lives = 5
  settings.score = 0
  settings.levelScore = 0
  settings.gameLevel = 1
  monsters = []
  countdown = Date.now() + 4000
}

const animate = () => {
  if (
    Date.now() - settings.prevSpawn > settings.spawnRate &&
    countdown <= Date.now()
  ) {
    monsters.push(new Monster())
    settings.prevSpawn = Date.now()
  }

  now = Date.now()
  elapsed = now - then
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 36px Arial'
    ctx.fillStyle = '#ee1c27'
    ctx.fillText(`SCORE   ${settings.score}`, 525, 70)
    ctx.strokeText(`SCORE   ${settings.score}`, 525, 70)
    ctx.fillStyle = '#2bb3ed'
    ctx.fillText(`LIVES   ${settings.lives}`, 50, 70)
    ctx.strokeText(`LIVES   ${settings.lives}`, 50, 70)

    if (countdown > Date.now()) {
      ctx.font = 'bold 50px Arial'
      ctx.fillStyle = '#ee1c27'
      ctx.fillText('GET READY', 250, 300)
      ctx.strokeText('GET READY', 250, 300)
      ctx.fillStyle = '#fff30a'
      ctx.fillText(`Round ${settings.gameLevel}`, 300, 200)
      ctx.strokeText(`Round ${settings.gameLevel}`, 300, 200)
    }

    ctx.drawImage(
      player.sprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    )
    movePlayer()
    player.updateFrame()

    monsters.forEach((monster, index) => {
      if (handleMonsterCollision(monster)) {
        monsters.splice(index, 1)
        settings.score += monster.speed + settings.gameLevel
        settings.levelScore++
        if (settings.levelScore >= 20) {
          monsters = []
          settings.gameLevel += 1
          settings.levelScore = 0
          settings.lives++
          countdown = Date.now() + 4000
        }
      }
    })

    monsters.forEach((monster) => {
      setMonsterDirection(monster)
      monster.updateLocation()
      monster.draw()
      if (monster.x <= 50) {
        settings.lives -= 1
        monster.remove = true
      }
    })
    monsters = monsters.filter((monster) => monster.remove != true)

    if (settings.lives <= 0) {
      resetGame()
    }
  }

  requestAnimationFrame(animate)
}

startAnimation(30)
