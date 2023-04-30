import Monster from './Monster.js'
import { canvas, ctx } from './canvas.js'

// ================ Game Setup ===============
let prevMonsterSpawn = 0
let gameLevel = 1
let levelScore = 0
let lives = 5
let score = 0
const spawnRate = 1000
const keys = []
const background = new Image()
background.src = 'assests/canvas-image.jpg'

// ======== Player And Monsters Sprites =========
const playerSprite = new Image()
playerSprite.src = 'assests/player.png'

const monsterImages = [
  'assests/zombie-0.png',
  'assests/zombie-1.png',
  'assests/zombie-2.png',
  'assests/zombie-3.png',
  'assests/zombie-4.png',
  'assests/zombie-5.png'
]
const monsterSprites = []
monsterImages.forEach((image) => {
  const sprite = new Image()
  sprite.src = image
  monsterSprites.push(sprite)
})

// ========== Player And Monsters Objects =========
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 64,
  height: 64,
  frameX: 0,
  frameY: 0,
  moving: false,
  speed: 10
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

let monsters = []

const createMonster = () => {
  const tttt = getRandomInt(canvas.height - 50)
  const speed = getRandomInt(5) + gameLevel
  const sprite =
    monsterSprites[Math.floor(Math.random() * monsterSprites.length)]
  monsters.push(new Monster(sprite, tttt, speed))
}

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

const movePlayer = () => {
  if (keys['w'] && player.y > 0) {
    player.y -= player.speed
    player.frameY = 1
    player.moving = true
  }
  if (keys['a'] && player.x > 0) {
    player.x -= player.speed
    player.frameY = 3
    player.moving = true
  }
  if (keys['s'] && player.y < canvas.height - player.height) {
    player.y += player.speed
    player.frameY = 0
    player.moving = true
  }
  if (keys['d'] && player.x < canvas.width - player.width) {
    player.x += player.speed
    player.frameY = 2
    player.moving = true
  }
}

const handlePlayerFrame = () => {
  if (player.frameX < 4 && player.moving) player.frameX++
  else player.frameX = 0
}

const handleMonsterCollision = (monster) => {
  return (
    monster.x < player.x + player.width - 20 &&
    monster.x + monster.width > player.x + 40 &&
    monster.y < player.y + player.height &&
    monster.y + monster.height > player.y
  )
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
  lives = 5
  score = 0
  levelScore = 0
  gameLevel = 1
  monsters = []
  countdown = Date.now() + 4000
}

const animate = () => {
  if (Date.now() - prevMonsterSpawn > spawnRate && countdown <= Date.now()) {
    createMonster()
    prevMonsterSpawn = Date.now()
  }

  now = Date.now()
  elapsed = now - then
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 36px Arial'
    ctx.fillStyle = '#ee1c27'
    ctx.fillText(`SCORE   ${score}`, 525, 70)
    ctx.strokeText(`SCORE   ${score}`, 525, 70)
    ctx.fillStyle = '#2bb3ed'
    ctx.fillText(`LIVES   ${lives}`, 50, 70)
    ctx.strokeText(`LIVES   ${lives}`, 50, 70)

    if (countdown > Date.now()) {
      ctx.font = 'bold 50px Arial'
      ctx.fillStyle = '#ee1c27'
      ctx.fillText('GET READY', 250, 300)
      ctx.strokeText('GET READY', 250, 300)
      ctx.fillStyle = '#fff30a'
      ctx.fillText(`Round ${gameLevel}`, 300, 200)
      ctx.strokeText(`Round ${gameLevel}`, 300, 200)
    }

    ctx.drawImage(
      playerSprite,
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
    handlePlayerFrame()

    monsters.forEach((monster, index) => {
      if (handleMonsterCollision(monster)) {
        monsters.splice(index, 1)
        score += monster.speed + gameLevel
        levelScore++
        if (levelScore >= 20) {
          monsters = []
          gameLevel += 1
          levelScore = 0
          lives++
          countdown = Date.now() + 4000
        }
      }
    })

    monsters.forEach((monster) => {
      setMonsterDirection(monster)
      monster.updateLocation()
      monster.draw()
      if (monster.x <= 50) {
        lives -= 1
        monster.remove = true
      }
    })
    monsters = monsters.filter((monster) => monster.remove != true)

    if (lives <= 0) {
      resetGame()
    }
  }

  requestAnimationFrame(animate)
}

startAnimation(30)
