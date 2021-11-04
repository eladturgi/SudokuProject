const length = 9;
const easyLevel = Math.floor(length * length * 0.75);

const mediumLevel = Math.floor(length * length * 0.5);

const hardLevel = Math.floor(length * length * 0.25);
generateGameBoardEasyLevel();
function generateGameBoardEasyLevel() {
  let mat = [[], [], [], [], [], [], [], [], []];

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
      if (checkSuitability(mat, row, col, val)) {
        mat[row][col] = val;
        flag = false;
        //counter++;
        console.log(val + " " + i);
      }
    }
  }

  printMat(mat);
}

function checkSuitability(mat, row, col, val) {
  if (
    checkRow(mat, row, val) &&
    checkCol(mat, col, val) &&
    checkCube(mat, row, col, val)
  )
    return true;
  return false;
}
function checkRow(mat, row, val) {
  for (let i = 0; i < length; i++) {
    if (mat[row][i] == val) return false;
  }
  return true;
}
function checkCol(mat, col, val) {
  for (let i = 0; i < length; i++) {
    if (mat[i][col] == val) return false;
  }
  return true;
}
function checkCube(mat, row, col, val) {
  let startCubeRow = row - (row % 3);
  let startCubeCol = row - (row % 3);
  for (let i = startCubeRow; i <= startCubeRow + 2; i++) {
    for (let j = startCubeCol; j <= startCubeCol + 2; j++) {
      if (mat[i][j] == val) return false;
    }
  }
  return true;

  //   if (row >= 0 && row <= 2) {
  //     if (col >= 0 && col <= 2) {
  //       for (let i = 0; i <= 2; i++) {
  //         for (let j = 0; j <= 2; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 3 && col <= 5) {
  //       for (let i = 0; i <= 2; i++) {
  //         for (let j = 3; j <= 5; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 6 && col <= 8) {
  //       for (let i = 0; i <= 2; i++) {
  //         for (let j = 6; j <= 8; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //   } else if (row >= 3 && row <= 5) {
  //     if (col >= 0 && col <= 2) {
  //       for (let i = 3; i <= 5; i++) {
  //         for (let j = 0; j <= 2; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 3 && col <= 5) {
  //       for (let i = 3; i <= 5; i++) {
  //         for (let j = 3; j <= 5; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 6 && col <= 8) {
  //       for (let i = 3; i <= 5; i++) {
  //         for (let j = 6; j <= 8; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //   } else {
  //     if (col >= 0 && col <= 2) {
  //       for (let i = 6; i <= 8; i++) {
  //         for (let j = 0; j <= 2; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 3 && col <= 5) {
  //       for (let i = 6; i <= 8; i++) {
  //         for (let j = 3; j <= 5; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //     if (col >= 6 && col <= 8) {
  //       for (let i = 6; i <= 8; i++) {
  //         for (let j = 6; j <= 8; j++) {
  //           if (mat[i][j] == val) return false;
  //         }
  //       }
  //       return true;
  //     }
  //   }
}
function printMat(mat) {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      document.write(mat[i][j] + ",   ");
    }
    document.write("</br>");
  }
}
