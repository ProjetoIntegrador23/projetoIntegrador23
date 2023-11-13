// HEADER
const header_navigation = document.querySelector(".navigation__menu");
const button_header_navigation = document.querySelector(
  ".navigation__menu-mobile"
);
const button_header_line1 = button_header_navigation.querySelector(".line-1");
const button_header_line2 = button_header_navigation.querySelector(".line-2");
const button_header_line3 = button_header_navigation.querySelector(".line-3");

button_header_navigation.addEventListener("click", () => {
  header_navigation.classList.toggle("active");
  if (header_navigation.classList.contains("active")) {
    button_header_line1.style.transform = "translateY(8px) rotate(45deg)";
    button_header_line1.style.backgroundColor = "#f7d90f";
    button_header_line2.style.opacity = "0";
    button_header_line3.style.transform = "translateY(-8px) rotate(-45deg)";
    button_header_line3.style.backgroundColor = "#f7d90f";
  } else {
    button_header_line1.style.transform = "unset";
    button_header_line1.style.backgroundColor = "#fff";
    button_header_line2.style.opacity = "1";
    button_header_line3.style.transform = "unset";
    button_header_line3.style.backgroundColor = "#fff";
  }
}); 

// FUNÇÕES GERAIS
function logout() {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("userData");
}

// CONDIÇÕES
if (localStorage.getItem("userLoggedIn") === "true") {
  console.log("Usuário está logado!");
  console.log(localStorage.getItem("userData"));
} else {
  console.log("Usuário não está logado!");
}
