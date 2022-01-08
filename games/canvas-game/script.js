const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600

// Keypress Listeners
const keys = []

// Player
const player = {
  x: 100,
  y: 100,
  width: 64,
  height: 64,
  frameX: 0,
  frameY: 0,
  moving: false,
  spriteWidth: 64,
  spriteHeight: 64
}

const playerSprite = new Image()
playerSprite.src = 'assests/player.png'

// Monsters
class Monster {
  constructor() {
    this.x = 200
    this.y = 200
    this.spriteWidth = 50
    this.spriteHeight = 50
    this.frameX = 0
    this.frameY = 0
  }
}

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

// Animation Loop
const animate = () => {
  // ctx.drawImage()
  drawSprite(playerSprite, 0, 0, player.width, player.height, 0, 0, player.width, player.height)
  requestAnimationFrame(animate)
}

animate()
