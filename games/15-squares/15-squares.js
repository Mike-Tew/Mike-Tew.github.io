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

const getBlankSquareIndex = () => {
  const index = board.flat().indexOf(' ')
  const row = parseInt(index / 4)
  const col = index % 4
  return [row, col]
}

const squareCoords = () => {}

const clickDetection = (clickCoords, squareCoords) => {
  const [clickX, clickY] = clickCoords
  const [squareX, squareY] = squareCoords
  return (
    clickX > squareX &&
    clickX < squareX + SQUARE_LEN &&
    clickY > squareY &&
    clickY < squareY + SQUARE_LEN
  )
}

canvas.addEventListener('click', (event) => {
  const [row, col] = getBlankSquareIndex()
  y = row * 100 + canvas.offsetTop
  x = col * 100

  if (clickDetection([event.x, event.y], [x, y])) {
    console.log('blank square')
  } else if (clickDetection([event.x, event.y + SQUARE_LEN], [x, y])) {
    console.log('up')
  } else if (clickDetection([event.x - SQUARE_LEN, event.y], [x, y])) {
    console.log('right')
  } else if (clickDetection([event.x, event.y - SQUARE_LEN], [x, y])) {
    console.log('down')
  } else if (clickDetection([event.x + SQUARE_LEN, event.y], [x, y])) {
    console.log('left')
  }
})
const swapSquares = () => {
  ;[board[1][1], board[0][1]] = [board[0][1], board[1][1]]
}
swapSquares()
drawBoard()
