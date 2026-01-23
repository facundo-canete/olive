let usuariosRegistrados = ['Facundo'];

function pedirDatos() {
    let nombreUsuario = prompt('¿Cuál es su nombre?');
    while (typeof nombreUsuario !== 'string' || nombreUsuario === '') {
        console.log(`El usuario escribió "${nombreUsuario}" y falló en ingresar al sistema.`);
        alert('El nombre que ingresó es inválido. Por favor, ingrese un nombre válido.');
        
        nombreUsuario = prompt('¿Cuál es su nombre?');
    };
    return nombreUsuario;
};

let usuarioIngresado = pedirDatos();

function verifDatos (usuarioAVerificar, listaUsuarios) {
    let verifUsuario = listaUsuarios.includes(usuarioAVerificar);
    
    if (verifUsuario === true) {
        console.log(`El usuario ${usuarioAVerificar} ingresó al sistema.`);
        alert(`Bienvenido/a de nuevo, ${usuarioAVerificar}.`);
    } else {
        console.log(`El usuario ${usuarioAVerificar} no está registrado en el sistema.`);
        let registrarse = confirm('Usted no está registrado en el sistema. ¿Desea registrarse?');
    
        if (registrarse === true) {
            usuariosRegistrados.push(usuarioAVerificar);
            console.log(`El usuario ${usuarioAVerificar} ha sido registrado e ingresado al sistema correctamente.`);
            alert(`Usted se registró correctamente. Bienvenido/a a olive ATM, ${usuarioAVerificar}.`);
        } else {
            console.log('El usuario no pudo ingresar al sistema.');
            alert('Tenga un buen día.')
        }
    };
};
    
verifDatos(usuarioIngresado, usuariosRegistrados);