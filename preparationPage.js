//Dynamic welcome to username
let user = parent.document.URL.substring(
  parent.document.URL.indexOf("=") + 1,
  parent.document.URL.length
);
document.getElementById("usernameSpan").innerHTML = user;

function renderEasyLevel() {
  document.getElementById("easyButton").onclick = location.href =
    "gameboard.html?level=EASY";
}

function renderMediumLevel() {
  document.getElementById("mediumButton").onclick = location.href =
    "gameboard.html?level=MEDIUM";
}
function renderHardLevel() {
  document.getElementById("hardButton").onclick = location.href =
    "gameboard.html?level=HARD";
}
