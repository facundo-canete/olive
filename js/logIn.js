localStorage.removeItem("usuarioEnSesion");
usuariosRegistrados = [];
const usuariosNuevos = JSON.parse(localStorage.getItem("usuariosNuevos"));
const botonIniciarSesion = document.querySelector("#iniciarSesion");
botonIniciarSesion.disabled = true;
const dniLI = document.querySelector("#dniLI");
const pinLI = document.querySelector("#pinLI");

async function conseguirLista() {
  try {
    console.info("Proceso de obtención de base de datos inicializado.");
    const listaJSLIONLI = await fetch("../usuariosRegistrados.json");
    const listaJSLI = await listaJSLIONLI.json();
    
    usuariosRegistrados = listaJSLI;
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
    console.info("Lista de usuarios obtenida correctamente.")
    botonIniciarSesion.disabled = false;
  } catch(error) {
    throw new Error("No se pudo conseguir la lista de usuarios registrados.");
  } finally {
    console.info("Proceso de obtención de base de datos finalizado.");
  };
};

conseguirLista();

function verificarUsuario(dniIngresado, pinIngresado) {
  const usuarioVerificado = (usuariosRegistrados.find(usuario => Number(usuario.dni) === Number(dniIngresado) && Number(usuario.pin) === Number(pinIngresado))) || (usuariosNuevos.find(usuario => Number(usuario.dni) === Number(dniIngresado) && Number(usuario.pin) === Number(pinIngresado)));

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