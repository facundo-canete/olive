const botonLogIn = document.querySelector("#logIn");
const botonSignUp = document.querySelector("#signUp");

botonLogIn.addEventListener("click", function() {
  window.location.href = "./pages/logIn.html";
});

botonSignUp.addEventListener("click", function() {
  window.location.href = "./pages/signUp.html";
});