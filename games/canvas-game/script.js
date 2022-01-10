// Todos
// Add a title
// Add mob collision detection
// Label things better
// Add some kind of score
// Add a background

// ================ Canvas Setup ===============
const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600
const keys = []

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
monsterImages.forEach(image => {
  const sprite = new Image()
  sprite.src = image
  monsterSprites.push(sprite)
});
console.log(monsterSprites);


// ========== Player And Monsters Objects =========
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

class Monster {
  constructor(src, y, speed) {
    this.sprite = new Image()
    this.sprite.src = src
    this.x = canvas.width
    this.y = y
    this.height = 36
    this.width = 46
    this.spriteHeight = 36
    this.spriteWidth = 46
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

monsters = []
const createMonster = () => {
  if (!document.hasFocus()) return

  sprite = getRandomInt(6)
  y = getRandomInt(canvas.height - 50)
  speed = getRandomInt(5) + 5
  monster = new Monster(`assests/zombie-${sprite}.png`, y, speed)
  monsters.push(monster)
}

setInterval(createMonster, 1000)

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

window.addEventListener('keydown', (e) => {
  keys[e.key] = true
  player.moving = true
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
    monsters.forEach((monster, index) => {
      handleMonsterMovement(monster)
      if (monster.x < player.x) {
        monsters.splice(index, 1)
      }
      monster.draw()
    });
  }
}

startAnimating(30)
