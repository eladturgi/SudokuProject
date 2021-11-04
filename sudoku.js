const length = 9;
const easyLevel = Math.floor(length * length * 0.75);

const mediumLevel = Math.floor(length * length * 0.5);

const hardLevel = Math.floor(length * length * 0.25);
generateGameBoardEasyLevel();
function generateGameBoardEasyLevel() {
  let shownMat = [[], [], [], [], [], [], [], [], []];
  
  let row = 0;
  let col = 0;
  let val = 0;
  //let counter = 0;
  let flag = true;

  for (let i = 0; i < easyLevel; i++) {
    flag = true;
    while (flag) {
      row = Math.floor(Math.random() * 9); //0-8
      col = Math.floor(Math.random() * 9); //0-8
      val = Math.floor(Math.random() * 9) + 1; // 1 - 9
      if ( shownMat[row][col] ==undefined && checkSuitability(shownMat, row, col, val) ) {
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
  ) return true;

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

//   document.write(startCubeCol+" "+startCubeRow)
//   document.write("</br>")
  for (let i = startCubeRow; i <= startCubeRow + 2; i++) {
    for (let j = startCubeCol; j <= startCubeCol + 2; j++) {
      if (shownMat[i][j] == val) return false;
    }
  }

  return true;

  //   if (row >= 0 && row <= 2) {
  //     if (col >= 0 && col <= 2) {
  //       for (let i = 0; i <= 2; i++) {
  //         for (let j = 0; j <= 2; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 3 && col <= 5) {
  //       for (let i = 0; i <= 2; i++) {
  //         for (let j = 3; j <= 5; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 6 && col <= 8) {
  //       for (let i = 0; i <= 2; i++) {
  //         for (let j = 6; j <= 8; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //   } else if (row >= 3 && row <= 5) {
  //     if (col >= 0 && col <= 2) {
  //       for (let i = 3; i <= 5; i++) {
  //         for (let j = 0; j <= 2; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 3 && col <= 5) {
  //       for (let i = 3; i <= 5; i++) {
  //         for (let j = 3; j <= 5; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 6 && col <= 8) {
  //       for (let i = 3; i <= 5; i++) {
  //         for (let j = 6; j <= 8; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //   } else {
  //     if (col >= 0 && col <= 2) {
  //       for (let i = 6; i <= 8; i++) {
  //         for (let j = 0; j <= 2; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 3 && col <= 5) {
  //       for (let i = 6; i <= 8; i++) {
  //         for (let j = 3; j <= 5; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 6 && col <= 8) {
  //       for (let i = 6; i <= 8; i++) {
  //         for (let j = 6; j <= 8; j++) {
  //           if (shownMat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //   }
}
function printshownMat(shownMat) {
  let counter = 0;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
        if(shownMat[i][j] == undefined) {
            document.write("_,   ");
        }
        else{
            document.write(shownMat[i][j] + ",   ");
            counter++;
        }
    }
    document.write("</br>");
  }
  document.write(counter);
}
