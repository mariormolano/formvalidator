import { valida } from "./validaciones.js";

const inputElemets = document.querySelectorAll('input');

inputElemets.forEach( event => {
    event.addEventListener('blur', (event) => {
        valida(event.target);
    })
})
