const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')
const LENGTH = 500
const SQUARE_LEN = LENGTH / 5
canvas.width = LENGTH
canvas.height = LENGTH

ctx.lineWidth = 10
ctx.font = '50px serif'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

// ================= Square Objects ================
class Square {
  constructor(val, x, y) {
    this.val = val
    this.x = x
    this.y = y
  }

  draw() {
    ctx.strokeRect(this.x, this.y, SQUARE_LEN, SQUARE_LEN)
  }
}

const squareNums = [
  ' ',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15'
]

const board = []
while (squareNums.length > 0) {
  let row = []
  while (row.length < 4) {
    x = row.length * SQUARE_LEN
    y = board.length * SQUARE_LEN
    square = new Square(squareNums.pop(), x, y)
    row.push(square)
  }
  board.push(row)
}

console.log(board)
console.log(board.flat())

// =============== Draw Board =================
board.flat().forEach((square) => {
  ctx.strokeRect(square.x, square.y, SQUARE_LEN, SQUARE_LEN)
  ctx.fillText(square.val, square.x + SQUARE_LEN / 2, square.y + SQUARE_LEN / 2)
})
