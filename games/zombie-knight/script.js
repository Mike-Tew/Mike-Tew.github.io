// Todos
// Implement number of lives

// ================ Canvas Setup ===============
const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600
let prevMonsterSpawn = 0
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

class Monster {
  constructor(sprite, y, speed) {
    this.sprite = sprite
    this.x = canvas.width
    this.y = y
    this.height = 36
    this.width = 46
    this.frameX = 0
    this.frameY = 3
    this.speed = speed
  }

  draw() {
    drawSprite(
      this.sprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

let monsters = []
const createMonster = () => {
  y = getRandomInt(canvas.height - 50)
  speed = getRandomInt(5) + 5
  const sprite =
    monsterSprites[Math.floor(Math.random() * monsterSprites.length)]
  monsters.push(new Monster(sprite, y, speed))
}

const handleMonsterMovement = (monster) => {
  monster.x -= monster.speed
  if (monster.frameX < 2) monster.frameX++
  else monster.frameX = 0
}

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
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
    monster.x < player.x + player.width &&
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

const startAnimating = (fps) => {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  animate()
}

const animate = () => {
  if (Date.now() - prevMonsterSpawn > spawnRate) {
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

    drawSprite(
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
        score += 100
        if (score >= 2000) console.log('You Win')
      }
    })

    monsters.forEach((monster) => {
      handleMonsterMovement(monster)
      monster.draw()
    })
  }


  requestAnimationFrame(animate)
}

startAnimating(30)
