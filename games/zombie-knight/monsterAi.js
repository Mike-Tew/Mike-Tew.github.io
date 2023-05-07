class MonsterAi {
  constructor() {
    this.proximity = 100
    this.aiLevel = 2
  }

  calculateAi(monsterX, monsterY, playerX, playerY) {
    if (this.aiLevel == 1) {
      return this.advancedAi(monsterX, monsterY, playerX, playerY)
    }
    if (this.aiLevel == 2) {
      return this.expertAi(monsterX, monsterY, playerX, playerY)
    }
    return this.beginnerAi()
  }

  beginnerAi() {
    return [-1, 0]
  }

  advancedAi(monsterX, monsterY, playerX, playerY) {}

  expertAi(monsterX, monsterY, playerX, playerY) {
    if (this.isAhead(monsterX, playerX)) return [-1, 0]
    if (!this.isNear(monsterX, monsterY, playerX, playerY)) return [-1, 0]
    if (this.isAbove(monsterY, playerY)) return [0, -1]
    if (this.isBelow(monsterY, playerY)) return [0, 1]
    return [-1, 0]
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
