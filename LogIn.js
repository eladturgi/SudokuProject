const username = "abcd";
const password = 1234;

function login() {
  let passwordInput = document.getElementById("passwordField").value;
  let usernameInput = document.getElementById("usernameField").value;

  if (usernameInput != username || passwordInput != password) {
    document.getElementById("error-message").innerHTML =
      "The account name or password that you have entered is incorrect.";
  } else {
    document.getElementById("submit").onclick = location.href =
      "preparationpage.html?user=" + usernameInput;
  }
}
