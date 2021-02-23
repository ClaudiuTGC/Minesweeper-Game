const gameTable = document.querySelector('.board');
const width = 10;
const bombs = 15;
var squares = [];

createBoard();

function createBoard() {
  var bombsArray = Array(bombs).fill('bomb');
  var validArray = Array(width * width - bombs).fill('valid');
  var gameArray = validArray.concat(bombsArray);
  var randomArray = gameArray.sort(() => Math.random() -0.5);

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('id', i);
    square.classList.add(randomArray[i]);
    gameTable.appendChild(square);
    squares.push(square);
    square.addEventListener('click', function(e) { click(square); }); 
  }

  for (let i = 0; i < squares.length; i++) {
    let totalBombSquares = 0;
    const isLeftEdge = (i % width === 0);
    const isRightEdge = (i % width === width - 1);
    if (squares[i].classList.contains('valid')) {
      if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i > 10 && squares[i - width].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) {
        totalBombSquares++;
      }
      if (i < 89 && squares[i + width].classList.contains('bomb')) {
        totalBombSquares++;
      }
      squares[i].setAttribute('data', totalBombSquares);        
    }
  }
}

function click(square) {
  let currentId = square.id;
  if (square.classList.contains('checked')) {
    return;
  }
  if (square.classList.contains('bomb')) {
    square.innerHTML = "B";
    square.style.color = 'white';
    square.style.backgroundColor = 'black';
    alert('Game Over! You stepped on a bomb. You lost. Please press F5 to play again!');
    return;
  } 
  if (square.classList.contains('valid')) {
    let total = square.getAttribute('data');
    if (total != 0 ) {
      square.classList.add('checked');
      square.innerHTML = total;
      isGameWon();
      return; 
    } else {
      square.classList.add('checked');
      checkSquare(square, currentId);
      return;
    }
  }
  isGameWon();
}

function checkSquare(square, currentId) {
  const isLeftEdge = (currentId % width === 0)
  const isRightEdge = (currentId % width === width -1)

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId > 9 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 - width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId > 10) {
      const newId = squares[parseInt(currentId - width)].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId > 11 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 - width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 98 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 90 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 + width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 88 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 + width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 89) {
      const newId = squares[parseInt(currentId) + width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
  }, 10)
}

function isGameWon() {
  let totalValidSquares = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains('checked') && !squares[i].classList.contains('bomb')) {
      totalValidSquares++;
    }
  }
  if (totalValidSquares == (100 - bombs)) {
    alert("Congratulations! You WON! To play again press F5.")
  }
}
