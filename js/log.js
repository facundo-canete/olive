const usuariosRegistrados = [
  {
    nombres: "Facundo Agustin", 
    apellidos: "Cañete", 
    edad: "22", 
    dni: "12345678", 
    email: "facundocanete.example@gmail.com", 
    pin: "1234", 
    genero: "Masculino", 
  }, 
];

const nombresUsuarioNuevo = document.querySelector("#nombres");
const apellidosUsuarioNuevo = document.querySelector("#apellidos");
const edadUsuarioNuevo = document.querySelector("#edad");
const dniUsuarioNuevo = document.querySelector("#dni");
const emailUsuarioNuevo = document.querySelector("#emailSU");
const pinUsuarioNuevo = document.querySelector("#pinSU");
const generoUsuarioNuevo = document.querySelector("#genero");
generoUsuarioNuevo.addEventListener("change", function() {
  return generoUsuarioNuevo;
});
const emailUsuarioRegistrado = document.querySelector("#emailLI");
const pinUsuarioRegistrado = document.querySelector("#pinLI");


// SIGN UP:

const botonRegistrarse = document.querySelector('#registrarse');

class Usuario {
  constructor(nombres, apellidos, edad, dni, email, pin, genero) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.edad = edad;
    this.dni = dni;
    this.email = email;
    this.pin = pin;
    this.genero = genero;
  };
  mostrarDatos() {
    console.log(`Nombre/s: ${this.nombres} \nApellido/s: ${this.apellidos} \nEdad: ${this.edad} \nDNI: ${this.dni} \nEmail: ${this.email} \nPIN: ${this.pin} \nGénero: ${this.genero}`)
  };
  revisarDuplicado() {
    if(usuariosRegistrados.some(usuarioDuplicado => usuarioDuplicado.dni === this.dni)) {
      console.warn(`El usuario escribió "${this.dni}" como DNI y ya se encuentra registrado.`);
      alert('Usted ya tiene una cuenta registrada con este número de DNI. Por favor, inicie sesión.');
    } else {
      return false;
    };
  };
  revisarDatos() {
    if(this.nombres === "") {
      console.warn(`El usuario escribió "${this.nombres}" como nombre y falló en registrarse.`); // Los mensajes en consola son para informar todo lo que va ocurriendo entre el usuario y el sistema. No están dirigidos al usuario.
      alert('Usted dejó vacío el campo de los nombres y no es válido. Por favor, ingrese su/s nombre/s correctamente.');
    } else if(this.apellidos === "") {
      console.warn(`El usuario escribió "${this.apellidos}" como apellido y falló en registrarse.`);
      alert('Usted dejó vacío el campo de los apellidos y no es válido. Por favor, ingrese su/s apellido/s correctamente.');
    } else if(this.edad === "") {
      console.warn(`El usuario escribió "${this.edad}" como edad y falló en registrarse.`);
      alert('Usted dejó vacío el campo de la edad y no es válido. Por favor, ingrese su edad correctamente.');
    } else if(this.edad < "18") {
      console.warn(`El usuario escribió "${this.edad}" como edad y falló en registrarse.`);
      alert('Usted es menor de edad. Para registrarse en nuestro sistema tiene que ser mayor de edad.');
    } else if(this.dni === "") {
      console.warn(`El usuario escribió "${this.dni}" como DNI y falló en registrarse.`);
      alert('Usted dejó vacío el campo del DNI y no es válido. Por favor, ingrese su DNI correctamente.');
    } else if(this.dni.length > 8) {
      console.warn(`El usuario escribió "${this.dni}" como DNI y falló en registrarse.`);
      alert('Usted introdujo un número de DNI que no es válido. Por favor, ingrese su DNI correctamente.');
    } else if(this.email === "") {
      console.warn(`El usuario escribió "${this.email}" como email y falló en registrarse.`);
      alert('Usted dejó vacío el campo del email y no es válido. Por favor, ingrese su email correctamente.');
    } else if(this.pin === "") {
      console.warn(`El usuario escribió "${this.pin}" como PIN y falló en registrarse.`);
      alert('Usted dejó vacío el campo del PIN y no es válido. Por favor, ingrese su PIN correctamente.');
    } else if(this.genero === "-") {
      console.warn(`El usuario escribió "${this.genero}" como género y falló en registrarse.`);
      alert('Usted dejó vacío el campo de su género y no es válido. Por favor, corrija su respuesta.');
    } else {
      return true;
    };
  };
  darBienvenida() {
    console.info(`El usuario se registró correctamente. Se lo redirecciona al inicio de sesión.`);
    if(this.genero === "Femenino") {
      alert(`Usted se registró correctamente. Bienvenida, ${this.nombres}.`);
      window.location.href = "./logIn.html";
    } else if(this.genero === "Masculino") {
      alert(`Usted se registró correctamente. Bienvenido, ${this.nombres}.`);
      window.location.href = "./logIn.html";
    } else {
      alert(`Usted se registró correctamente. Le damos la bienvenida, ${this.nombres}.`);
      window.location.href = "./logIn.html";
    };
  };
};

botonRegistrarse.addEventListener("click", function() {  
  const usuarioNuevo = new Usuario(nombresUsuarioNuevo.value, apellidosUsuarioNuevo.value, edadUsuarioNuevo.value, dniUsuarioNuevo.value, emailUsuarioNuevo.value, pinUsuarioNuevo.value, generoUsuarioNuevo.value);
  usuarioNuevo.mostrarDatos();

  if(usuarioNuevo.revisarDuplicado() === false && usuarioNuevo.revisarDatos() === true) {
    usuariosRegistrados.push(usuarioNuevo);
    usuarioNuevo.darBienvenida();
  };
});

