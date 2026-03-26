const saludoHTML = document.querySelector("#helloUser");
const botonExtracciones = document.querySelector("#withdrawal");
const botonSaldo = document.querySelector("#getBalance");
const usuariosRegistradosRecuperados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
const usuariosNuevosRecuperados = JSON.parse(localStorage.getItem("usuariosNuevos"));
const datosUsuarioEnSesionRecuperados = JSON.parse(localStorage.getItem("datosUsuarioEnSesion"));
let usuarioEnSesion = undefined;
if(datosUsuarioEnSesionRecuperados.antiguedad === "viejo") {
  usuarioEnSesion = usuariosRegistrados[datosUsuarioEnSesion.indice];
} else if(datosUsuarioEnSesionRecuperados.antiguedad === "nuevo") {
  usuarioEnSesion = usuariosNuevosRecuperados[datosUsuarioEnSesionRecuperados.indice];
};
let saldoUsuarioEnSesion = usuarioEnSesion.saldo;

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