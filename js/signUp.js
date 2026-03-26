let usuariosRegistrados = [];
let usuariosNuevos = [];

let botonRegistrarse = document.querySelector('#registrarse');
botonRegistrarse.disabled = true;

async function conseguirLista() {
  try {
    console.info("Proceso de obtención de base de datos inicializado."); // Los mensajes en consola son para informar todo lo que va ocurriendo entre el usuario y el sistema. No están dirigidos al usuario.
    const listaJSONSU = await fetch("../usuariosRegistrados.json");
    const listaJSSU = await listaJSONSU.json();
    
    usuariosRegistrados = listaJSSU;
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
    console.info("Lista de usuarios obtenida correctamente.")
    botonRegistrarse.disabled = false;
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
usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
usuariosNuevos = JSON.parse(localStorage.getItem("usuariosNuevos")) || [];

const nombresUsuarioNuevo = document.querySelector("#nombres");
const apellidosUsuarioNuevo = document.querySelector("#apellidos");
const edadUsuarioNuevo = document.getElementById("edad");
const dniUsuarioNuevo = document.querySelector("#dni");
const emailUsuarioNuevo = document.querySelector("#emailSU");
const pinUsuarioNuevo = document.querySelector("#pinSU");
const generoUsuarioNuevo = document.querySelector("#genero");
generoUsuarioNuevo.addEventListener("change", () => {
  return generoUsuarioNuevo;
});
const saldoUsuarioNuevo = 1000000;


class Usuario {
  constructor(nombres, apellidos, edad, dni, email, pin, genero, saldo) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.edad = edad;
    this.dni = dni;
    this.email = email;
    this.pin = pin;
    this.genero = genero;
    this.saldo = saldoUsuarioNuevo;
  };
  mostrarDatos() {
    console.log(`Nombre/s: ${this.nombres} \nApellido/s: ${this.apellidos} \nEdad: ${this.edad} \nDNI: ${this.dni} \nEmail: ${this.email} \nPIN: ${this.pin} \nGénero: ${this.genero} \nSaldo: ${this.saldo}`);
  };
  revisarDuplicado() {
    if(usuariosRegistrados.some(usuarioRDuplicado => Number(usuarioRDuplicado.dni) === Number(this.dni)) || usuariosNuevos.some(usuarioNDuplicado => Number(usuarioNDuplicado.dni) === Number(this.dni))) {
      console.warn(`El usuario escribió "${this.dni}" como DNI y ya se encuentra registrado.`);
      console.info(`Se redirecciona al usuario al inicio de sesión.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted ya tiene una cuenta registrada con este número de DNI. Por favor, inicie sesión.",
        showConfirmButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.href = "./logIn.html";
          return true;
        }
      });
    } else {
      return false;
    };
  };
  revisarDatos() {
    if(this.nombres === "") {
      console.warn(`El usuario escribió "${this.nombres}" como nombre y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted dejó vacío el campo de los nombres y no es válido. Por favor, ingrese su/s nombre/s correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.apellidos === "") {
      console.warn(`El usuario escribió "${this.apellidos}" como apellido y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted dejó vacío el campo de los apellidos y no es válido. Por favor, ingrese su/s apellido/s correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.edad === "") {
      console.warn(`El usuario escribió "${this.edad}" como edad y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted ingresó un valor que no es válido. Por favor, ingrese su edad correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.edad < 18) {
      console.warn(`El usuario escribió "${this.edad}" como edad y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted es menor de edad. Para registrarse en nuestro sistema tiene que ser mayor de edad.",
        showConfirmButton: true
      });
      return false;
    } else if(this.dni === "") {
      console.warn(`El usuario escribió "${this.dni}" como DNI y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted ingresó un valor que no es válido. Por favor, ingrese su DNI correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.dni.length > 8) {
      console.warn(`El usuario escribió "${this.dni}" como DNI y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted introdujo un número de DNI que no es válido. Por favor, ingrese su DNI correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.email === "") {
      console.warn(`El usuario escribió "${this.email}" como email y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted dejó vacío el campo del email y no es válido. Por favor, ingrese su email correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.pin === "") {
      console.warn(`El usuario escribió "${this.pin}" como PIN y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted ingresó un valor que no es válido. Por favor, ingrese su PIN correctamente.",
        showConfirmButton: true
      });
      return false;
    } else if(this.pin.length < 4) {
      console.warn(`El usuario escribió "${this.pin}" como PIN y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted ingresó un PIN demasiado corto. Por favor, ingrese su PIN con 4 dígitos como mínimo.",
        showConfirmButton: true
      });
      return false;
    } else if(this.genero === "-") {
      console.warn(`El usuario escribió "${this.genero}" como género y falló en registrarse.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted dejó vacío el campo de su género y no es válido. Por favor, corrija su respuesta.",
        showConfirmButton: true
      });
      return false;
    } else {
      return true;
    };
  };
  darBienvenida() {
    console.info(`El usuario se registró correctamente. Se lo redirecciona al inicio de sesión.`);
    if(this.genero === "Femenino") {
      Swal.fire({
        title: "Usted se registró correctamente",
        icon: "success",
        text: `Bienvenida, ${this.nombres}. Porque somos muy generosos (y todavía no tenemos la opción de depositar dinero disponible), le damos un bono de bienvenida de $1.000.000. Que los disfrute.`,
        showConfirmButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.href = "./logIn.html";
        };
      });
    } else if(this.genero === "Masculino") {
      Swal.fire({
        title: "Usted se registró correctamente",
        icon: "success",
        text: `Bienvenido, ${this.nombres}. Porque somos muy generosos (y todavía no tenemos la opción de depositar dinero disponible), le damos un bono de bienvenida de $1.000.000. Que los disfrute.`,
        showConfirmButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.href = "./logIn.html";
        };
      });
    } else {
      Swal.fire({
        title: "Usted se registró correctamente",
        icon: "success",
        text: `Le damos la bienvenida, ${this.nombres}. Porque somos muy generosos (y todavía no tenemos la opción de depositar dinero disponible), le damos un bono de bienvenida de $1.000.000. Que los disfrute.`,
        showConfirmButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.href = "./logIn.html";
        };
      });
    };
  };
};

botonRegistrarse.addEventListener("click", () => {  
  const usuarioNuevo = new Usuario(nombresUsuarioNuevo.value, apellidosUsuarioNuevo.value, edadUsuarioNuevo.value, dniUsuarioNuevo.value, emailUsuarioNuevo.value, pinUsuarioNuevo.value, generoUsuarioNuevo.value);
  usuarioNuevo.mostrarDatos();

  if(usuarioNuevo.revisarDuplicado() === false && usuarioNuevo.revisarDatos() === true) {
    usuariosNuevos.push(usuarioNuevo);
    localStorage.setItem("usuariosNuevos", JSON.stringify(usuariosNuevos));
    usuarioNuevo.darBienvenida();
  };
});

