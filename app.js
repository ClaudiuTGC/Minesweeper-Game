
const gameTable = document.querySelector('.board');
const rows = 10;
const columns = 10;
const bombs = 15;
var squares = [];
var isGameOver = false;

createBoard();

function createBoard() {
    var bombsArray = Array(bombs).fill('bomb');
    var emptyArray = Array(rows * columns - bombs).fill('empty');
    var gameArray = emptyArray.concat(bombsArray);
    var randomArray = gameArray.sort(() => Math.random() -0.5);

    for (let i = 0; i < rows * columns; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add(randomArray[i]);
        gameTable.appendChild(square);
        squares.push(square);
        square.addEventListener('click', function(e) { click(square); }); 
    }

    for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = (i % rows === 0);
        const isRightEdge = (i % rows === rows - 1);
        if (squares[i].classList.contains('empty')) {
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) {
                total++;
            }
            if (i > 9 && !isRightEdge && squares[i + 1 - rows].classList.contains('bomb')) {
                total++;
            }
            if (i > 10 && squares[i - rows].classList.contains('bomb')) {
                total++;
            }
            if (i > 11 && !isLeftEdge && squares[i - 1 - rows].classList.contains('bomb')) {
                total++;
            }
            if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) {
                total++;
            }
            if (i < 90 && !isLeftEdge && squares[i - 1 + rows].classList.contains('bomb')) {
                total++;
            }
            if (i < 88 && !isRightEdge && squares[i + 1 + rows].classList.contains('bomb')) {
                total++;
            }
            if (i < 89 && squares[i + rows].classList.contains('bomb')) {
                total++;
            }
            squares[i].setAttribute('data', total);
        }
    }
}

function click(square) {
  let currentId = square.id;
  if (isGameOver)
    return;
  if (square.classList.contains('checked'))
    return;
  if (square.classList.contains('bomb')) {
      square.innerHTML = "B";
      square.style.color = 'white';
      square.style.backgroundColor = 'black';
      alert('Game Over! You stepped on a bomb. You lost. Please press F5 to play again!');
  } else {
      let total = square.getAttribute('data');
      if (total != 0 ) {
        square.classList.add('checked');
        square.innerHTML = total;
        isGameWon();
        return; 
      }
      checkSquare(square, currentId);

  }
  square.classList.add('checked');
  isGameWon();
}

 function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % rows === 0)
    const isRightEdge = (currentId % rows === rows -1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - rows].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId - rows)].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - rows].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + rows].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + rows].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + rows].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

function isGameWon() {
  let totalSquares = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains('checked') && !squares[i].classList.contains('bomb')) {
      totalSquares++;
    }
  }
  if (totalSquares == (100 - bombs)) {
    isGameOver = true;
    alert("Congratulations! You WON! To play again press F5.")
  }
}



