const letras = ["u", "e", "a", "o", "i"]; // Lista de caracteres a sustituir en el texto a codificar (Exáctamente 5 caracteres vocales, consonantes o combinación de ambos)
const caracteres = '¿./bcdfghjklmnp.aeiouqrstv.wxyz0123>456<789'; // Lista de caracteres disponibles para combinar en la clave (Cualquier caracter y catidad son válidos)
let clave = []; //Almacena en un arreglo las sílabas generadas aleatoriamente y que componen la clave de encriptación
let indicesClave = []; // Almacena en un arreglo las primeras letras de cada item del arreglo clave
const textoAnalizar = document.querySelector("#input-texto");
const encriptarBoton = document.querySelector(".boton-encriptar")
const desencriptarBoton = document.querySelector(".boton-desencriptar")
const claveIngresada = document.querySelector("#clave-campo")
const copiarTextoBoton = document.querySelector(".copiar-btn")
const copiarClaveBoton = document.querySelector(".copiar-clave-btn")
let textoEncriptado = [];
let textoDesencriptado = [];

// Funciones ----------------------------------------------------->
// ---------------------------------------------------------------> 

function generarClave(juegoCaracteres) {

    var aleatorio = 0;
    var claveGenerada = []
    var itemClave

    for (var i = 0; i < 5; i++) {

        itemClave = letras[i];

        for (var x = 0; x < 2; x++) {  //En esta línea se puede cambiar el valor 2 por otro para aumentar o disminuir el # de letras que componen el ítem de la clave
            aleatorio = Math.floor(Math.random() * juegoCaracteres.length)
            itemClave += caracteres[aleatorio]
        }
        claveGenerada.push(itemClave);
    }
    return claveGenerada;
}
//-----------------------------------------------------> 
function obtenerIndicesClave(_clave) {  //Extrae las primeras letras de cada item del arreglo de clave

    var itemClave = ""; // almacena un item del arreglo clave
    var indices = [];

    for (var x = 0; x < 5; x++) {
        itemClave = _clave[x];
        indices.push(itemClave[0]); // Captura un arreglo con las primeras letras de cada item del arreglo clave
    }
    return indices // Devuelve un arreglo las primeras letras de cada item del arreglo clave
}
//----------------------------------------------------->        
function encriptar() {

    clave = generarClave(caracteres);
    indicesClave = obtenerIndicesClave(clave);
    textoAnalizar.value = textoAnalizar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    for (var i = 0; i < textoAnalizar.value.length; i++) {

        switch (textoAnalizar.value[i]) {

            case indicesClave[0]:
                textoEncriptado = textoEncriptado + clave[0];
                break;
            case indicesClave[1]:
                textoEncriptado = textoEncriptado + clave[1];
                break;
            case indicesClave[2]:
                textoEncriptado = textoEncriptado + clave[2];
                break;
            case indicesClave[3]:
                textoEncriptado = textoEncriptado + clave[3];
                break;
            case indicesClave[4]:
                textoEncriptado = textoEncriptado + clave[4];
                break;
            default:
                textoEncriptado += textoAnalizar.value[i];
        }
    }
}
//-----------------------------------------------------> 
function obtenerClaveUsuario() {

    let claveUsuario = claveIngresada.value.split('-');
    return claveUsuario;
}
//-----------------------------------------------------> 
function desencriptar() {

    var saltar = 0;
    clave = obtenerClaveUsuario();
    indicesClave = obtenerIndicesClave(clave);
    textoEncriptado = textoAnalizar.value;

    for (var i = 0; i < textoEncriptado.length; i++) {

        if (saltar == 0) {

            switch (textoEncriptado[i]) {

                case indicesClave[0]:
                    saltar = clave[0].length;
                    break;
                case indicesClave[1]:
                    saltar = clave[1].length;
                    break;
                case indicesClave[2]:
                    saltar = clave[2].length;
                    break;
                case indicesClave[3]:
                    saltar = clave[3].length;
                    break;
                case indicesClave[4]:
                    saltar = clave[4].length;
                    break;
            }
            textoDesencriptado += textoEncriptado[i];
        }
        if (saltar != 0) {
            saltar--;
        }
    }
}
//----------------------------------------------------->
function mostrarResultado(texto) {

    document.querySelector("#resultado").textContent = texto;
}
//----------------------------------------------------->
function mostrarClave() {

    document.querySelector("#clave-resultado").value = (clave[0] + "-" + clave[1] + "-" + clave[2] + "-" + clave[3] + "-" + clave[4]);
}
//----------------------------------------------------->
function ocultarAnuncio() {
    document.querySelector("#anuncio").classList.add('oculto')
    document.querySelector("#resultados").classList.remove('oculto')
}
//----------------------------------------------------->
function copiar(elemento, mensaje) {

    let contenido = document.querySelector(elemento);
    
    contenido.select();
    contenido.setSelectionRange(0, 99999); // Para dispositivos móviles
    navigator.clipboard.writeText(contenido.value);
    alert(mensaje);
}

//----------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------->

encriptarBoton.addEventListener("click", () => {
    if (textoAnalizar.value) {
        encriptar();
        ocultarAnuncio();
        mostrarResultado(textoEncriptado);
        mostrarClave();
    }
});

desencriptarBoton.addEventListener("click", () => {
    if (textoAnalizar.value) {
        desencriptar();
        ocultarAnuncio();
        mostrarResultado(textoDesencriptado);
    }
});

copiarTextoBoton.addEventListener("click", () => {
    copiar("#resultado", "El texto encriptado se ha copiado al portatpapeles")
})

copiarClaveBoton.addEventListener("click", () => {
    copiar("#clave-resultado", "La clave de encriptado se ha copiado al portatpapeles")
})
