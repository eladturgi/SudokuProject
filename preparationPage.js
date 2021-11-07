let level;
let blabla = 0;

function renderEasyLevel() {
  document.getElementById("easyButton").onclick = location.href =
    "gameboard.html";
  level = Math.floor(length * length * 0.75);
  blabla++;
}

function renderMediumLevel() {
  document.getElementById("mediumButton").onclick = location.href =
    "gameboard.html";
  level = currentLevel = Math.floor(length * length * 0.5);
  blabla++;
}
function renderHardLevel() {
  document.getElementById("hardButton").onclick = location.href =
    "gameboard.html";
  level = currentLevel = Math.floor(length * length * 0.25);
  blabla++;
}
