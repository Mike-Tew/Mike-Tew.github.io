// Todos
// Implement mobs
// Add a title
// Add mob collision detection
// Label things better
// Add some kind of score
// Add a background

const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600

const keys = []

// Player
const player = {
  x: 200,
  y: 200,
  width: 64,
  height: 64,
  frameX: 0,
  frameY: 0,
  moving: false,
  spriteWidth: 64,
  spriteHeight: 64,
  speed: 10
}

const playerSprite = new Image()
playerSprite.src = 'assests/player.png'

// Monsters
class Monster {
  constructor(src) {
    this.sprite = new Image()
    this.sprite.src = src
    this.x = canvas.width - 100
    this.y = 200
    this.height = 36
    this.width = 46
    this.spriteHeight = 36
    this.spriteWidth = 46
    this.frameX = 0
    this.frameY = 3
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

monster = new Monster('assests/zombie-1.png')

const handleMonsterMovement = () => {
  monster.x -= 5
  if (monster.frameX < 2) monster.frameX++
  else monster.frameX = 0
}

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

const movePlayer = () => {
  if (keys['ArrowUp'] && player.y > 0) {
    player.y -= player.speed
    player.frameY = 1
    player.moving = true
  }
  if (keys['ArrowLeft'] && player.x > 0) {
    player.x -= player.speed
    player.frameY = 3
    player.moving = true
  }
  if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
    player.y += player.speed
    player.frameY = 0
    player.moving = true
  }
  if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
    player.x += player.speed
    player.frameY = 2
    player.moving = true
  }
}

const handlePlayerFrame = () => {
  if (player.frameX < 4 && player.moving) player.frameX++
  else player.frameX = 0
}

window.addEventListener('keydown', (e) => {
  keys[e.key] = true
  player.moving = true
})

window.addEventListener('keyup', (e) => {
  delete keys[e.key]
  player.moving = false
})

// Animation Loop
let fps, fpsInterval, startTime, now, then, elapsed

const startAnimating = (fps) => {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  now = Date.now()
  elapsed = now - then
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.drawImage()
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
    handleMonsterMovement()
    monster.draw()
  }
}

startAnimating(30)
