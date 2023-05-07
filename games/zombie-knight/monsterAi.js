class MonsterAi {
  constructor() {
    this.proximity = 100
    this.aiLevel = 1
    this.directions = {
      n: [0, -1],
      s: [0, 1],
      w: [-1, 0],
      sw: [-1, 1],
      nw: [-1, -1]
    }
  }

  calcAi(monsterX, monsterY, playerX, playerY) {
    if (this.aiLevel == 1) {
      return this.advancedAi(monsterX, monsterY, playerX, playerY)
    }
    if (this.aiLevel == 2) {
      return this.expertAi(monsterX, monsterY, playerX, playerY)
    }
    return this.beginnerAi()
  }

  beginnerAi() {
    return this.directions.w
  }

  advancedAi(monsterX, monsterY, playerX, playerY) {
    if (!this.isInRange(monsterX, monsterY, playerX, playerY))
      return this.directions.w
    if (this.isAbove(monsterY, playerY)) return this.directions.nw
    if (this.isBelow(monsterY, playerY)) return this.directions.sw
    return this.directions.w
  }

  expertAi(monsterX, monsterY, playerX, playerY) {
    if (!this.isInRange(monsterX, monsterY, playerX, playerY))
      return this.directions.w
    if (this.isAbove(monsterY, playerY)) return this.directions.n
    if (this.isBelow(monsterY, playerY)) return this.directions.s
    return this.directions.w
  }

  isInRange(monsterX, monsterY, playerX, playerY) {
    if (monsterX < playerX) return false
    if (
      monsterX < playerX + this.proximity &&
      monsterY < playerY + this.proximity &&
      monsterY > playerY - this.proximity
    ) {
      return true
    }
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
