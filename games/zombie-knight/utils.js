import { ctx } from './canvas.js'

const drawSprite = (sprite) => {
  ctx.drawImage(
    sprite.sprite,
    sprite.width * sprite.frameX,
    sprite.height * sprite.frameY,
    sprite.width,
    sprite.height,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height
  )
}

const handleMonsterCollision = (monster, player) => {
  return (
    monster.x < player.x + player.width - 20 &&
    monster.x + monster.width > player.x + 40 &&
    monster.y < player.y + player.height &&
    monster.y + monster.height > player.y
  )
}

export { drawSprite, handleMonsterCollision }

