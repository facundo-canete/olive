let usuariosRegistrados = ['Facundo'];

function pedirDatos() {
    let nombreUsuario = prompt('¿Cuál es su nombre?');
    while (typeof nombreUsuario !== 'string' || nombreUsuario === '') {
        console.log(`El usuario escribió "${nombreUsuario}" y falló en ingresar al sistema.`); // Los mensajes en consola son para informar todo lo que va ocurriendo entre el usuario y el sistema. No están dirigidos al usuario.
        alert('El nombre que ingresó es inválido. Por favor, ingrese un nombre válido.');
        
        nombreUsuario = prompt('¿Cuál es su nombre?');
    };
    return nombreUsuario;
};

let usuarioIngresado = pedirDatos();

function verifDatos (usuarioAVerificar, listaUsuarios) {
    let verifUsuario = listaUsuarios.includes(usuarioAVerificar);
    
    if (verifUsuario === true) {
        let indiceUsuarioConocido = listaUsuarios.indexOf(usuarioAVerificar);
        console.log(`El usuario ${usuarioAVerificar} ingresó al sistema. Su índice es: ${indiceUsuarioConocido}.`);
        alert(`Bienvenido/a de nuevo, ${usuarioAVerificar}.`);
        return indiceUsuarioConocido;
    } else {
        console.log(`El usuario ${usuarioAVerificar} no está registrado en el sistema.`);
        let registrarse = confirm('Usted no está registrado en el sistema. ¿Desea registrarse?');
    
        if (registrarse === true) {
            listaUsuarios.push(usuarioAVerificar);
            let indiceUsuarioNuevo = listaUsuarios.indexOf(usuarioAVerificar);
            console.log(`El usuario ${usuarioAVerificar} ha sido registrado e ingresado al sistema correctamente. Su índice es: ${indiceUsuarioNuevo}.`);
            alert(`Usted se registró correctamente. Bienvenido/a a olive ATM, ${usuarioAVerificar}.`);
            return indiceUsuarioNuevo;
        } else {
            console.log(`El usuario ${usuarioAVerificar} no pudo ingresar al sistema.`);
            alert('Tenga un buen día.');
        };
    };
};

let indiceUsuarioEnSesion = (verifDatos(usuarioIngresado, usuariosRegistrados));
console.log(`El índice del usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} en sesión es: ${indiceUsuarioEnSesion}.`); // Hasta acá solamente valida el usuario.

function elegirOperacion() {
    let accion = prompt('Si usted quiere retirar dinero ingrese "1". Si usted quiere depositar dinero ingrese "2".');
    while (typeof accion !== 'string' || accion === '') {
        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} ingresó "${accion}" y no es una opción válida.`);
        alert('La opción que usted ingresó no existe. Por favor, ingrese una opción válida.');
        
        accion = prompt('Si usted quiere retirar dinero ingrese "1". Si usted quiere depositar dinero ingrese "2".');
    };

    return accion;
}

let accionElegida = elegirOperacion();
ejecutarAccion(accionElegida);

function retiroDeDinero() {
    function pedirDatosRetiro() {
        let monto = prompt('Ingrese el monto que desea retirar sin el signo pesos, espacios, puntos ni comas, por favor. Tenga en cuenta que este cajero no entrega billetes menores a $1 000.');
        while (typeof monto !== 'string' || monto === '' || isNaN(Number(monto)) || monto <= 0) {
            console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} escribió "${monto}" y es un valor no válido.`);
            alert('El monto que ingresó no es válido. Por favor, ingrese un monto válido.');
            
            monto = prompt('Ingrese el monto que desea retirar sin el signo pesos, espacios, puntos ni comas, por favor. Tenga en cuenta que este cajero no entrega billetes menores a $1 000.')
        };
        
        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} ingresó el monto: ${monto}.`);
        monto = Number(monto);
            
        return monto;
    };
    
    let montoIngresado = pedirDatosRetiro() // Va a tomar el valor "monto". Este va a ser el valor que se va a usar el función final de esta operación.
    
    while (montoIngresado % 1000 !== 0) {
        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} ingresó un monto que el cajero no puede entregar.`);
        alert('Usted ingresó un monto que el cajero no puede entregar. Por favor revise el monto ingresado.');

        montoIngresado = pedirDatosRetiro();
    }
    
    function retirarDinero(montoARetirar) {
        let billetes20k = parseInt(montoARetirar / 20000);
        
        montoARetirar = montoARetirar - (billetes20k * 20000);
        let billetes10k = parseInt(montoARetirar / 10000);
        
        montoARetirar = montoARetirar - (billetes10k * 10000);
        let billetes2k = parseInt(montoARetirar / 2000);
        
        montoARetirar = montoARetirar - (billetes2k * 2000);
        let billetes1k = parseInt(montoARetirar / 1000);

        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} retiró dinero exitosamente.`)
        alert(`Son: \n ${billetes20k} billete/s de $20 000, \n ${billetes10k} billete/s de $10 000, \n ${billetes2k} billete/s de $2 000, \n ${billetes1k} billete/s de $1 000.`);
    };
    
    let montoRetirado = retirarDinero(montoIngresado);
    
}

function ejecutarAccion(operacionElegida) {
    if (operacionElegida === "1") { 
        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} eligió la opción 1: retirar dinero.`);
        retiroDeDinero();
    } else if (operacionElegida === "2") {
        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} eligió la opción 2: depositar dinero.`);
        alert('Esta función todavía no está disponible. Disculpe la molestia.')
        alert('Checkpoint reached.👍🏻');
    } else {
        console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} ingresó "${operacionElegida}" y no es una opción válida.`);
        alert('La opción que usted ingresó no existe.');
        let corregirAccion = confirm('¿Desea corregir la opción elegida?');
        if (corregirAccion === true) {
            console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} quiere corregir la opción elegida.`)
            accionElegida = elegirOperacion();
            ejecutarAccion(accionElegida);
        } else {
            console.log(`El usuario ${usuariosRegistrados[indiceUsuarioEnSesion]} no quiere corregir la opción elegida y sale del sistema.`)
            alert(`Hasta la próxima, ${usuariosRegistrados[indiceUsuarioEnSesion]}. Que tenga un buen día.`)
        };
    };
};