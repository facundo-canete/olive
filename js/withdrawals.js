const saludoHTML = document.querySelector("#helloUser");
const usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));
let saldoUsuarioEnSesion = usuarioEnSesion.saldo;
const botonExtraer = document.querySelector("#withdraw");

saludoHTML.innerText = `Hola, ${usuarioEnSesion.nombres}`;

function retiroDeDinero() {
  function pedirDatosRetiro() {
    const monto = document.querySelector("#amount");
    if(typeof monto.value !== 'string' || monto.value === '' || isNaN(Number(monto.value)) || monto.value <= 0 || monto.value > saldoUsuarioEnSesion) {
      console.warn(`El usuario escribió "${monto.value}" y no es un valor válido.`);
      Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "El monto que ingresó no es válido. Por favor, ingrese un monto válido."
      });
    } else {
      console.info(`El usuario ingresó el monto: ${monto.value}.`);
      return monto.value;
    };
        
  };
    
  const montoIngresado = pedirDatosRetiro(); // Va a tomar el valor "monto". Este va a ser el valor que se va a usar el función final de esta operación.
    
  if(montoIngresado % 1000 !== 0) {
    console.warn(`El usuario ingresó un monto que el cajero no puede entregar.`);
    Swal.fire({
        title: "Atención",
        icon: "warning",
        text: "Usted ingresó un monto que el cajero no puede entregar. Por favor revise el monto ingresado."
      });

    montoIngresado = pedirDatosRetiro();
  };
    
  function retirarDinero(montoARetirar) {
    const billetes20k = parseInt(montoARetirar / 20000);
        
    montoARetirar = montoARetirar - (billetes20k * 20000);
    const billetes10k = parseInt(montoARetirar / 10000);
        
    montoARetirar = montoARetirar - (billetes10k * 10000);
    const billetes2k = parseInt(montoARetirar / 2000);
        
    montoARetirar = montoARetirar - (billetes2k * 2000);
    const billetes1k = parseInt(montoARetirar / 1000);

    console.info(`El usuario retiró dinero exitosamente.`);
    Swal.fire({
        title: "Retiro exitoso",
        icon: "success",
        text: `Son: ${billetes20k} billete/s de $20 000, ${billetes10k} billete/s de $10 000, ${billetes2k} billete/s de $2 000, ${billetes1k} billete/s de $1 000.`
      });
    };
    
  retirarDinero(montoIngresado);
};

botonExtraer.addEventListener("click", () => {
  retiroDeDinero();
});