export function valida(event){
    const tipoDeInput = event.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](event);
    }

    console.log(event.validity.valid)

    if (event.validity.valid) {
        event.parentElement.classList.remove('input-container--invalid');
        event.parentElement.querySelector('.input-message-error').innerHTML = "";
    }else{
        event.parentElement.classList.add('input-container--invalid');
        event.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, event);
    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError ={
    nombre: {
        valueMissing: "Campo obligatorio, ingrese un nombre"
    },
    email: {
        valueMissing: "Campo obligatorio, ingrese un correo",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "Campo obligatorio, ingrese una contraseña",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Campo obligatorio, ingrese una fecha de nacimiento",
        customError: "debes tener al menos dieciocho años de edad"
    },
    numero: {
        valueMissing: "Campo obligatorio, ingrese un número telefónico",
        patternMismatch: "Solamente números, máximo 10 números"
    },
    direccion: {
        valueMissing: "Campo obligatorio, ingrese una dirección",
        patternMismatch: "Ingrese una dirección valida"
    },
    ciudad: {
        valueMissing: "Campo obligatorio, ingrese una ciudad",
        patternMismatch: "Mínimo 4 a 40 caracteres"
    },
    estado: {
        valueMissing: "Campo obligatorio, ingrese un estado",
        patternMismatch: "Mínimo 4 a 40 caracteres"
    }


}

const validadores = {
    nacimiento:(input) => validarNacimiento(input)
}


function mostrarMensajeDeError (tipoDeInput, event){
    let mensaje = '';

    tiposDeErrores.forEach( error => {
        if (event.validity[error]) {
            console.log(error)
            console.log(event.validity[error])
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento (input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "debes tener al menos dieciocho años de edad";
    }
    
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date;
    const diferenciasFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciasFecha <= fechaActual;
}