const BOARD_HEIGHT = 6
const BOARD_WIDTH = 7 
const boardContainer = document.getElementById('board-container')
let playerTurn = "red"
const turnDisplay = document.getElementById('turn-display')
const turnText = document.getElementById('turn-text')
const boardArr = new Array(BOARD_HEIGHT)

const createBoard = () => {
  for (let i = 0; i < 6; i++) {
    boardArr[i] = new Array(BOARD_WIDTH)
    const boardRow = document.createElement('div')
    boardRow.classList.add('row')
    boardContainer.appendChild(boardRow)
    for (let j = 0; j < 7; j++) {
      const square = document.createElement('div')
      square.setAttribute('column-value', j)
      square.classList.add('square')
      boardRow.appendChild(square)
      boardRow.addEventListener('click', clickSquare)
    }
  }
}

const clickSquare = (e) => {
  const colVal = e.target.getAttribute('column-value')
  for (let i = boardArr.length - 1; i > -1; i--) {
    if (boardArr[i][colVal] === undefined) {
      boardArr[i][colVal] = playerTurn
      columnEles = document.querySelectorAll(`[column-value="${colVal}"]`)
      playerTurn === "red" ? columnEles[i].classList.add('bg-red') : columnEles[i].classList.add('bg-yellow')
      turnText.textContent = playerTurn === "red" ? "PLAYER 2'S TURN" : "PLAYER 1'S TURN"
      playerTurn = playerTurn === "red" ? "yellow" : "red"
      turnDisplay.style.backgroundColor = playerTurn
      break
    }
  }
  checkForWin()
}

const checkForWin = () => {
  // Check rows
  for (const arr of boardArr) {
    console.log(checkFourInARow(arr, 'yellow'))
  }

  // Check columns
  for (let i = 0; i <= BOARD_WIDTH; i++) {
    const checkArr = []
    for (const arr of boardArr) {
      checkArr.push(arr[i])
    }
    console.log(checkFourInARow(checkArr, 'yellow'))
  }
}

const checkFourInARow = (arr, color) => {
  for (let i = 0; i <= arr.length - 4; i++) {
    if (arr[i] === color && arr[i + 1] === color && arr[i + 2] === color && arr[i + 3] === color)  {
      return true
    }
  }
  return false
}

createBoard()
turnDisplay.style.backgroundColor = playerTurn
