const canvasImg = new Image()
canvasImg.src = 'assests/canvas-image.jpg'

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

export { canvasImg, monsterSprites, playerSprite }

