class MonsterAi {
  constructor() {
    this.proximity = 100
    this.aiLevel = 'beginner'
    this.directions = {
      n: [0, -1],
      s: [0, 1],
      w: [-1, 0],
      sw: [-1, 1],
      nw: [-1, -1]
    }
  }

  calcAi(monsterX, monsterY, playerX, playerY) {
    if (!this.isInRange(monsterX, monsterY, playerX, playerY)) {
      return this.directions.w
    }
    if (monsterY < playerY) {
      return this.isAbove()
    } else {
      return this.isBelow()
    }
  }

  isAbove() {
    if (this.aiLevel == 'beginner') return this.directions.w
    if (this.aiLevel == 'advanced') return this.directions.nw
    if (this.aiLevel == 'expert') return this.directions.n
  }

  isBelow() {
    if (this.aiLevel == 'beginner') return this.directions.w
    if (this.aiLevel == 'advanced') return this.directions.sw
    if (this.aiLevel == 'expert') return this.directions.s
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
}

const monsterAi = new MonsterAi()

export default monsterAi
