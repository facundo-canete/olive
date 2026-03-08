const saludoHTML = document.querySelector("#helloUser");
const botonExtracciones = document.querySelector("#withdrawal");
const botonSaldo = document.querySelector("#getBalance");
const usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));
const saldoUsuarioEnSesion = usuarioEnSesion.saldo;

saludoHTML.innerText = `Hola, ${usuarioEnSesion.nombres}`;

function verSaldo() {
  Swal.fire({
    title: "Su saldo:",
    text: `$${saldoUsuarioEnSesion}`,
    icon: "info"
  });
  console.info("Se muestra el saldo del usuario.");
};

botonSaldo.addEventListener("click", () => {
  verSaldo();
});

botonExtracciones.addEventListener("click", () => {
  console.info("Se redirige al usuario a la página de extracciones de dinero.");
  window.location.href = "./withdrawals.html";
});