const canvas = document.getElementById('game-canvas')
const LENGTH = 400
const SQUARE_LEN = LENGTH / 4
canvas.width = LENGTH
canvas.height = LENGTH

const ctx = canvas.getContext('2d')
ctx.lineWidth = 10
ctx.font = '50px serif'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

const squareNums = [...Array(16).keys()]
squareNums[0] = ' '

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

document.addEventListener('keydown', (event) => {
  console.log(event.key)
  const key = event.key
  if (key == 'ArrowDown') {
    swapSquares('up')
  } else if (key == 'ArrowRight') {
    swapSquares('left')
  } else if (key == 'ArrowUp') {
    swapSquares('down')
  } else if (key == 'ArrowLeft') {
    swapSquares('right')
  }
})

canvas.addEventListener('click', (event) => {
  const offset = canvas.getBoundingClientRect()
  const clickX = event.x - offset.left
  const clickY = event.y - offset.top

  const [row, col] = getBlankSquareIndex()
  y = row * 100
  x = col * 100

  if (clickDetection([clickX, clickY], [x, y])) {
  } else if (clickDetection([clickX, clickY + SQUARE_LEN], [x, y])) {
    swapSquares('up')
  } else if (clickDetection([clickX - SQUARE_LEN, clickY], [x, y])) {
    swapSquares('right')
  } else if (clickDetection([clickX, clickY - SQUARE_LEN], [x, y])) {
    swapSquares('down')
  } else if (clickDetection([clickX + SQUARE_LEN, clickY], [x, y])) {
    swapSquares('left')
  }
})

const swapSquares = (direction) => {
  const [x, y] = getBlankSquareIndex()
  switch (direction) {
    case 'up':
      if (x == 0) return
      ;[board[x][y], board[x - 1][y]] = [board[x - 1][y], board[x][y]]
      break
    case 'right':
      if (y == 3) return
      ;[board[x][y], board[x][y + 1]] = [board[x][y + 1], board[x][y]]
      break
    case 'down':
      if (x == 3) return
      ;[board[x][y], board[x + 1][y]] = [board[x + 1][y], board[x][y]]
      break
    case 'left':
      if (y == 0) return
      ;[board[x][y], board[x][y - 1]] = [board[x][y - 1], board[x][y]]
      break
  }

  drawBoard()
}

drawBoard()
