localStorage.removeItem("usuarioEnSesion");

const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
const botonIniciarSesion = document.querySelector("#iniciarSesion");
const dniLI = document.querySelector("#dniLI");
const pinLI = document.querySelector("#pinLI");

function verificarUsuario(dniIngresado, pinIngresado) {
  const usuarioVerificado = usuariosRegistrados.find(usuario => Number(usuario.dni) === Number(dniIngresado) && Number(usuario.pin) === Number(pinIngresado));

  if(usuarioVerificado) {
    localStorage.setItem("usuarioEnSesion", JSON.stringify(usuarioVerificado));
    console.info(`El usuario ${usuarioVerificado.dni} ingresó correctamente al sistema.`)
    window.location.href = "./home.html";
  } else {
    console.warn("El usuario ingresó sus datos de manera incorrecta y no ingresa al sistema.");
    Swal.fire({
      title: "Atención",
      icon: "warning",
      text: "DNI o PIN incorrectos. Por favor, revise la información ingresada."
    });
  };
};

botonIniciarSesion.addEventListener("click", () => {
  verificarUsuario(Number(dniLI.value), Number(pinLI.value));
});