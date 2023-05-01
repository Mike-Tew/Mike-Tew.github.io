class MonsterAi {
  constructor() {
    this.proximity = 100
  }

  calculateAi(monsterX, monsterY, playerX, playerY) {
    if (this.isAhead(monsterX, playerX)) return 'left'
    if (!this.isNear(monsterX, monsterY, playerX, playerY)) return 'left'
    if (this.isAbove(monsterY, playerY)) return 'up'
    if (this.isBelow(monsterY, playerY)) return 'down'
    return 'left'
  }

  isAhead(monsterX, playerX) {
    return monsterX < playerX
  }

  isNear(monsterX, monsterY, playerX, playerY) {
    const monsterDist = Math.hypot(playerX - monsterX, playerY - monsterY)
    return monsterDist < this.proximity
  }

  isAbove(monsterY, playerY) {
    return monsterY < playerY
  }

  isBelow(monsterY, playerY) {
    return monsterY > playerY
  }
}

const monsterAi = new MonsterAi()

export default monsterAi
