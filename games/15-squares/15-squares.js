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
    square = squareNums.pop()
    row.push(square)
  }
  board.push(row)
}

console.log(board)
console.log(board.flat())

// =============== Draw Board =================
const drawBoard = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.forEach((row, row_idx) => {
    row.forEach((square, col_idx) => {
      ctx.strokeRect(
        col_idx * SQUARE_LEN,
        row_idx * SQUARE_LEN,
        SQUARE_LEN,
        SQUARE_LEN
      )
      ctx.fillText(
        square,
        col_idx * SQUARE_LEN + SQUARE_LEN / 2,
        row_idx * SQUARE_LEN + SQUARE_LEN / 2
      )
    })
  })
}

let blankSquare = 1
board.flat().forEach((square) => {
  if (square.val == ' ') blankSquare = square
})
canvas.addEventListener('click', (event) => {
  x = blankSquare.x
  y = blankSquare.y + canvas.offsetTop
  if (
    event.x > x &&
    event.x < x + SQUARE_LEN &&
    event.y > y &&
    event.y < y + SQUARE_LEN
  ) {
    console.log('object')
    console.log(blankSquare)
  }
})
console.log(canvas.offsetTop)
const swapSquares = () => {}
swapSquares()
drawBoard()
