localStorage.removeItem("datosUsuarioEnSesion");

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
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Hubo un error al cargar la base de datos. Por favor, recargue la página o inténtelo más tarde.",
      showConfirmButton: true,
      confirmButtonText: "Recargar"
    }).then((result) => {
      if(result.isConfirmed) {
        window.location.href = "./logIn.html";
      };
    });
    throw new Error("No se pudo conseguir la lista de usuarios registrados.");
  } finally {
    console.info("Proceso de obtención de base de datos finalizado.");
  };
};

conseguirLista();

function verificarUsuario(dniIngresado, pinIngresado) {
  const usuarioRVerificado = usuariosRegistrados.find(usuarioR => Number(usuarioR.dni) === Number(dniIngresado) && Number(usuarioR.pin) === Number(pinIngresado));
  const usuarioNVerificado = usuariosNuevos.find(usuarioN => Number(usuarioN.dni) === Number(dniIngresado) && Number(usuarioN.pin) === Number(pinIngresado));
  let usuarioEnSesion = {
    indice: undefined,
    antiguedad: undefined
  };

  if(usuarioRVerificado !== undefined && usuarioNVerificado === undefined) {
    usuarioEnSesion.indice = usuariosRegistrados.indexOf(usuarioRVerificado);
    usuarioEnSesion.antiguedad = "viejo";
    localStorage.setItem("datosUsuarioEnSesion", JSON.stringify(usuarioEnSesion));
    console.info(`El usuario ${usuarioRVerificado.dni} ya estaba registrado e ingresó correctamente al sistema.`);
    window.location.href = "./home.html";
  } else if(usuarioNVerificado !== undefined && usuarioRVerificado === undefined) {
    usuarioEnSesion.indice = usuariosNuevos.indexOf(usuarioNVerificado);
    usuarioEnSesion.antiguedad = "nuevo";
    localStorage.setItem("datosUsuarioEnSesion", JSON.stringify(usuarioEnSesion));
    console.info(`El usuario ${usuarioNVerificado.dni} es nuevo e ingresó correctamente al sistema.`);
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