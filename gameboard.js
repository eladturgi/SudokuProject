const length = 9;

//reads the selected level from the URL (EASY/MEDIUM/HARD)
let level = parent.document.URL.substring(
  parent.document.URL.indexOf("=") + 1,
  parent.document.URL.indexOf("_")
);
let user = parent.document.URL.substring(parent.document.URL.indexOf("_") + 1);

let inputsToFill = 0;
if (level == "EASY") {
  inputsToFill = length * length - Math.floor(length * length * 0.75);
} else if (level == "MEDIUM") {
  inputsToFill = length * length - Math.floor(length * length * 0.5);
} else inputsToFill = length * length - Math.floor(length * length * 0.25);

let counterToRowDelete = 0;
let counterToBoardDelete = 0;
let sudokuMatrice = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
// create visual board with html element
function createGridboard(mat) {
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      let box = document.createElement("div");

      let inputId = row.toString() + "-" + col.toString();
      box.setAttribute("id", inputId);
      box.setAttribute("class", "grid-item");
      if (mat[row][col] == "") {
        let input = document.createElement("input");
        input.setAttribute("id", inputId);
        input.setAttribute("class", "input-box");
        input.setAttribute("oninput", "limitInput();markInput(this);");
        document.getElementById("grid-container").appendChild(box);
        box.appendChild(input);
      } else {
        box.innerHTML = mat[row][col];
        document.getElementById("grid-container").appendChild(box);
      }
    }
  }
}
createGridboard(generateBoard());
//Limit the user input to only 1-9
function limitInput() {
  let inputArray = document.getElementsByTagName("input");

  for (let i = 0; i < inputsToFill; i++) {
    if (!(inputArray[i].value >= 1 && inputArray[i].value <= 9)) {
      if (inputArray[i].value > 9 && inputArray[i].value % 10 != 0) {
        inputArray[i].value = inputArray[i].value % 10;
      } else {
        inputArray[i].value = "";
      }
    }
  }
}
// Create matrice to control over visual representation of the input boxes
var tempMatrice = [[], [], [], [], [], [], [], [], []];
for (let row = 0; row < length; row++) {
  for (let col = 0; col < length; col++) {
    tempMatrice[row][col] = sudokuMatrice[row][col];
  }
}
//Array that will save all user inputs
var inputsRecord = new Array();
//Control the colors that shown to the user
function markInput(currentInput) {
  inputsRecord.forEach((item) => (item.style.backgroundColor = "white"));
  inputsRecord.push(currentInput);

  resetColor("white", tempMatrice);

  let id = currentInput.id;
  let row = parseInt(id.substring(0, 1));
  let col = parseInt(id.substring(2));
  if (currentInput.value >= 1 && currentInput.value <= 9) {
    sudokuMatrice[row][col] = parseInt(currentInput.value);

    if (checkSuitability(sudokuMatrice, row, col, currentInput.value)) {
      setColorForAllMatchValues(
        sudokuMatrice,
        "green",
        currentInput.value,
        currentInput
      );
    } else {
      setColorForAllMatchValues(
        sudokuMatrice,
        "red",
        currentInput.value,
        currentInput
      );
    }
  } else {
    sudokuMatrice[row][col] = "";
  }
}
//Set input boxes to white and filled boxes to lightblue
function resetColor(color, mat) {
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (mat[row][col] == "") {
        document.getElementById(
          row.toString() + "-" + col.toString()
        ).style.backgroundColor = color;
      } else {
        document.getElementById(
          row.toString() + "-" + col.toString()
        ).style.backgroundColor = "lightblue";
      }
    }
  }
}
//Colors the input to green if placed correctly and red otherwise
function setColorForAllMatchValues(sudokuMatrice, color, value, currentInput) {
  currentInput.style.backgroundColor = color;
  let id = currentInput.id;
  let i = parseInt(id.substring(0, 1));
  let j = parseInt(id.substring(2));
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (
        sudokuMatrice[row][col] == value &&
        (row == i ||
          col == j ||
          (row - (row % 3) == i - (i % 3) && col - (col % 3) == j - (j % 3)))
      ) {
        document.getElementById(
          row.toString() + "-" + col.toString()
        ).style.backgroundColor = color;
        for (let k = 0; k < inputsRecord.length; k++) {
          if (
            inputsRecord[k].id ==
            document.getElementById(row.toString() + "-" + col.toString()).id
          )
            inputsRecord[k].style.backgroundColor = color;
        }
      }
    }
  }
}
//Checks if the given number fits
function checkSuitability(board, row, col, val) {
  if (
    checkRow(board, row, col, val) &&
    checkCol(board, row, col, val) &&
    checkCube(board, row, col, val)
  )
    return true;

  return false;
}
function checkRow(board, row, col, val) {
  for (let i = 0; i < length; i++) {
    if (i == col) continue;
    if (board[row][i] == val) return false;
  }

  return true;
}
function checkCol(board, row, col, val) {
  for (let i = 0; i < length; i++) {
    if (i == row) continue;
    if (board[i][col] == val) return false;
  }

  return true;
}
function checkCube(board, row, col, val) {
  let startCubeRow = row - (row % 3); // 0
  let startCubeCol = col - (col % 3); // 6

  for (let i = startCubeRow; i <= startCubeRow + 2; i++) {
    for (let j = startCubeCol; j <= startCubeCol + 2; j++) {
      if (i == row && j == col) continue;
      if (board[i][j] == val) return false;
    }
  }

  return true;
}
//Check the user solution and prompt a message
function finish() {
  console.log(sudokuMatrice);
  console.log(tempMatrice);

  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (tempMatrice[row][col] != "") continue;
      if (
        sudokuMatrice[row][col] != "" &&
        checkSuitability(sudokuMatrice, row, col, sudokuMatrice[row][col])
      ) {
        continue;
      } else {
        console.log("im here" + sudokuMatrice[row][col] + "    ---");

        document.getElementById("game-message-container").style.color = "red";
        document.getElementById("game-message-container").innerHTML =
          "You failed! Try better next time.";
        return;
      }
    }
  }
  document.getElementById("game-message-container").style.color = "green";
  document.getElementById("game-message-container").innerHTML =
    "Well Done! You succeed to complete " + level + " level Sudoku!";
  resetColor("lightblue", tempMatrice);
  inputsRecord.forEach((item) => (item.style.backgroundColor = "lightblue"));
}
//Reset same grid
function again() {
  document.getElementById("game-message-container").innerHTML =
    "All inputs been reset!";
  document.getElementById("game-message-container").color = "black";

  setTimeout(function () {
    document.getElementById("game-message-container").innerHTML = "";
  }, 3000);

  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (tempMatrice[row][col] == "") {
        sudokuMatrice[row][col] = "";
      }
    }
  }
  inputsRecord.forEach((item) => {
    item.value = "";
    item.style.backgroundColor = "white";
  });
  resetColor("white", tempMatrice);
}
//Returns to preparation page
function changeLevel() {
  document.getElementById("change-level-btn").onclick =
    location.href = `preparationPage.html?user=${user}`;
}
//Step one in generating a unique board
//Trying to insert a value to the board, from left to right
//If the value doesnt fit after sum of iterations restart the generation
function generateBoard() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (!findNumber(row, col, Math.floor(Math.random() * 9) + 1)) {
        col = -1;
        counterToBoardDelete++;
        if (counterToBoardDelete > 20) {
          counterToBoardDelete = 0;
          console.log("delete");
          sudokuMatrice = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ];
          row = 0;
        }
      }
    }
  }
  //Deletes values from the board randomly by level selected
  for (let i = 0; i < inputsToFill; i++) {
    flag = true;
    while (flag) {
      row = Math.floor(Math.random() * 9); //0-8
      col = Math.floor(Math.random() * 9);
      if (sudokuMatrice[row][col] != "") {
        sudokuMatrice[row][col] = "";
        flag = false;
      }
    }
  }
  return sudokuMatrice;
}
//Try to insert a number to the board.
//If fails after 40 iterations resets the row
function findNumber(row, col, ranVal) {
  if (checkSuitability(sudokuMatrice, row, col, ranVal)) {
    sudokuMatrice[row][col] = ranVal;
    return true;
  }
  counterToRowDelete += 1;
  if (counterToRowDelete > 40) {
    counterToRowDelete = 0;
    deleteRow(row, col);
    return false;
  }
  return findNumber(row, col, Math.floor(Math.random() * 9) + 1);
}

function deleteRow(row, col) {
  for (let i = 0; i <= col; i++) {
    sudokuMatrice[row][i] = 0;
  }
}
