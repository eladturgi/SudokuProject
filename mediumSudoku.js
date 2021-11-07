const length = 9;

const mediumLevel = Math.floor(length * length * 0.5);

function generateGameBoardMediumLevel() {
  let shownMat = [[], [], [], [], [], [], [], [], []];

  let row = 0;
  let col = 0;
  let val = 0;
  //let counter = 0;
  let flag = true;

  for (let i = 0; i < mediumLevel; i++) {
    flag = true;
    while (flag) {
      row = Math.floor(Math.random() * 9); //0-8
      col = Math.floor(Math.random() * 9); //0-8
      val = Math.floor(Math.random() * 9) + 1; // 1 - 9
      if (
        shownMat[row][col] == undefined &&
        checkSuitability(shownMat, row, col, val)
      ) {
        shownMat[row][col] = val;
        flag = false;
        //counter++;
        console.log(shownMat[row][col] + " " + i);
      }
    }
  }

  printshownMat(shownMat);
}

function checkSuitability(shownMat, row, col, val) {
  if (
    checkRow(shownMat, row, val) &&
    checkCol(shownMat, col, val) &&
    checkCube(shownMat, row, col, val)
  )
    return true;

  return false;
}
function checkRow(shownMat, row, val) {
  for (let i = 0; i < length; i++) {
    if (shownMat[row][i] == val) return false;
  }

  return true;
}
function checkCol(shownMat, col, val) {
  for (let i = 0; i < length; i++) {
    if (shownMat[i][col] == val) return false;
  }

  return true;
}
function checkCube(shownMat, row, col, val) {
  let startCubeRow = row - (row % 3);
  let startCubeCol = col - (col % 3);

  for (let i = startCubeRow; i <= startCubeRow + 2; i++) {
    for (let j = startCubeCol; j <= startCubeCol + 2; j++) {
      if (shownMat[i][j] == val) return false;
    }
  }

  return true;
}
function printshownMat(shownMat) {
  let counter = 0;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (shownMat[i][j] == "") {
        document.write("_,   ");
      } else {
        document.write(shownMat[i][j] + ",   ");
        counter++;
      }
    }
    document.write("</br>");
  }
  document.write(counter);
}
function sudokuMediumLevel() {
  let mediumLevelMatrice = [
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
  //val = Math.floor(Math.random() * 9) + 1; // 1 - 9
  for (let i = 0; i < 41; i++) {
    flag = true;
    while (flag) {
      row = Math.floor(Math.random() * 9); //0-8
      col = Math.floor(Math.random() * 9); //0-8
      if (mediumLevelMatrice[row][col] != "") {
        mediumLevelMatrice[row][col] = "";
        flag = false;
      }
    }
  }
  //printshownMat(easyLevelMatrice);
  return mediumLevelMatrice;
}
game(sudokuMediumLevel());

function game(mat) {
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      let rowID = row.toString();
      let box = document.createElement("div");
      box.setAttribute("id", rowID);
      box.setAttribute("class", "grid-item");
      if (mat[row][col] == "") {
        let input = document.createElement("input");
        input.setAttribute("class", "input-box");
        input.setAttribute("oninput", "limitInput()");
        box.innerHTML = "";
        document.getElementById("grid-container").appendChild(box);
        box.appendChild(input);
      } else {
        box.innerHTML = mat[row][col];
        document.getElementById("grid-container").appendChild(box);
      }
    }
  }
}

function limitInput() {
  let inputArray = document.getElementsByTagName("input");
  console.log(inputArray);
  for (let i = 0; i < 21; i++) {
    if (
      !(
        document.getElementsByTagName("input")[i].value >= 1 &&
        document.getElementsByTagName("input")[i].value <= 9
      )
    ) {
      if (
        document.getElementsByTagName("input")[i].value > 9 &&
        document.getElementsByTagName("input")[i].value % 10 != 0
      ) {
        document.getElementsByTagName("input")[i].value =
          document.getElementsByTagName("input")[i].value % 10;
      } else {
        document.getElementsByTagName("input")[i].value = "";
      }
    }
  }
}
