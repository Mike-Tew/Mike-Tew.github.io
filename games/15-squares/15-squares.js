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

const shuffle = (boardArr) => {
  let boardLen = boardArr.length,
    randomNumIndex,
    randomNum
  while (--boardLen > 0) {
    randomNumIndex = Math.floor(Math.random() * (boardLen + 1))
    randomNum = boardArr[randomNumIndex]
    boardArr[randomNumIndex] = boardArr[boardLen]
    boardArr[boardLen] = randomNum
  }
  return boardArr
}

const isSolvable = (puzzle) => {
  let parity = 0
  let gridWidth = 4
  let row = 0
  let blankRow = 0
  for (let i = 0; i < puzzle.length; i++) {
    if (i % gridWidth == 0) {
      row++
    }
    if (puzzle[i] == ' ') {
      blankRow = row
      continue
    }
    for (var j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[j] != 0) {
        parity++
      }
    }
  }

  if (gridWidth % 2 == 0) {
    if (blankRow % 2 == 0) {
      return parity % 2 == 0
    } else {
      return parity % 2 != 0
    }
  } else {
    return parity % 2 == 0
  }
}

const createBoard = (shuffled) => {
  const shuffledBoard = []

  while (shuffled.length > 0) {
    let row = []
    while (row.length < 4) {
      square = shuffled.pop()
      row.push(square)
    }
    shuffledBoard.push(row)
  }
  return shuffledBoard
}

const squareNums = [...Array(16).keys()]
squareNums[0] = ' '
let shuffledNums = squareNums

while (isSolvable(shuffledNums) === false) {
  shuffledNums = shuffle(squareNums)
}

const board = createBoard(shuffledNums)

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
  checkWin()
}

const checkWin = () => {
  const solvedBoard = [...Array(16).keys()]
  solvedBoard[0] = ' '
  solvedBoard.push(solvedBoard.shift())
  let difference = solvedBoard.filter((x) => !board.flat().includes(x))
  console.log(difference);
  // console.log(board.flat());
  // console.log(solvedBoard);
}

drawBoard()
