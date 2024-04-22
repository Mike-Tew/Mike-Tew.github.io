const BOARD_HEIGHT = 6
const BOARD_WIDTH = 7 
const restartBtn = document.getElementById('restart-btn')
const boardContainer = document.getElementById('board-container')
const turnDisplay = document.getElementById('turn-display')
const turnText = document.getElementById('turn-text')
let playerTurn = "red"
let boardArr, p1Score, p2Score

const resetBoard = () => {
  boardContainer.innerHTML = ''
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

      if (checkForWin(playerTurn)) {
        gameWin(playerTurn)
        console.log(playerTurn, "wins")
        playerTurn === "red" ? p1Score++ : p2Score++
      }

      playerTurn = playerTurn === "red" ? "yellow" : "red"
      turnDisplay.style.backgroundColor = playerTurn
      break
    }
  }
}

const checkForWin = (playerTurn) => {
  // Check rows
  for (const arr of boardArr) {
    if (checkFourInARow(arr, playerTurn) == true) {
      return true
    }
  }

  // Check columns
  for (let i = 0; i <= BOARD_WIDTH; i++) {
    const checkArr = []
    for (const arr of boardArr) {
      checkArr.push(arr[i])
    }

    if (checkFourInARow(checkArr, playerTurn)) {
      return true
    }
  }
  return false
}

const checkFourInARow = (arr, color) => {
  for (let i = 0; i <= arr.length - 4; i++) {
    if (arr[i] === color && arr[i + 1] === color && arr[i + 2] === color && arr[i + 3] === color)  {
      return true
    }
  }
  return false
}

const gameWin = (playerTurn) => {
  document.getElementById('player-one-score').textContent = p1Score
  document.getElementById('player-two-score').textContent = p2Score

  // Trigger play again modal
}

const resetGame  = () => {
  p1Score = 0
  p2Score = 0
  boardArr = new Array(BOARD_HEIGHT)
  resetBoard()
  turnDisplay.style.backgroundColor = playerTurn
  turnText.textContent = 'PLAYER 1\'S TURN'
}

restartBtn.addEventListener('click', resetGame)

resetGame()

