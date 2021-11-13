const length = 9;

//reads the selected level from the URL (EASY/MEDIUM/HARD)
let level = parent.document.URL.substring(
  parent.document.URL.indexOf("=") + 1,
  parent.document.URL.indexOf("_")
);
let user = parent.document.URL.substring(parent.document.URL.indexOf("_") + 1);
var sudokuMatrice;
let inputsToFill = 0;
if (level == "EASY") {
  inputsToFill = length * length - Math.floor(length * length * 0.75);
} else if (level == "MEDIUM") {
  inputsToFill = length * length - Math.floor(length * length * 0.5);
} else inputsToFill = length * length - Math.floor(length * length * 0.25);

function generateMatrice() {
  sudokuMatrice = [
    [6, 8, 1, 2, 9, 3, 5, 7, 4],
    [3, 7, 2, 5, 6, 4, 1, 8, 9],
    [4, 9, 5, 8, 7, 1, 2, 3, 6],
    [1, 6, 4, 3, 8, 2, 9, 5, 7],
    [8, 5, 9, 7, 4, 6, 3, 2, 1],
    [2, 3, 7, 9, 1, 5, 6, 4, 8],
    [5, 4, 8, 1, 2, 9, 7, 6, 3],
    [7, 1, 3, 6, 5, 8, 4, 9, 2],
    [9, 2, 6, 4, 3, 7, 8, 1, 5],
  ];
  let row = 0;
  let col = 0;
  let flag = true;

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
createGridboard(generateMatrice());

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

var tempMatrice = [[], [], [], [], [], [], [], [], []];
for (let row = 0; row < length; row++) {
  for (let col = 0; col < length; col++) {
    tempMatrice[row][col] = sudokuMatrice[row][col];
  }
}
var inputsRecord = new Array();

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
    //currentInput.backgroundColor = "white";
  }
}
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

function changeLevel() {
  document.getElementById("change-level-btn").onclick =
    location.href = `preparationPage.html?user=${user}`;
}
