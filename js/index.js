const button_enter = document.querySelector("#btn-login");

if (localStorage.getItem("userLoggedIn") === "true") {
  button_enter.addEventListener("click", function () {
    window.location.href = "../home.html";
  });
} else {
  button_enter.addEventListener("click", function () {
    window.location.href = "../login.html";
  });
}
