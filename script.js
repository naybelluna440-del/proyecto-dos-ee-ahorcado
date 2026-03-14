console.log("Bienvenidos al Juego del Ahorcado");

const CEDULA_PROGRAMADOR = "33.28.787"; 

async function getUserInput(question) {
    return new Promise((resolve) => {
        const answer = prompt(question);
        resolve(answer || "");
    });
}


let intentosBase = 3; 
let victorias = 0;
let derrotas = 0;
// Regra 3: Array con 100 palabras (Español, >6 caracteres, sin "ñ")
const InventarioPalabras = [
    "COMPUTADORA", "ESCRITORIO", "ESTUDIANTE", "BIBLIOTECA", "PROGRAMACION",
    "UNIVERSIDAD", "DICCIONARIO", "PANTALLA", "TECLADO", "ALGORITMO",
    "ESTRUCTURA", "VARIABLES", "CONSTANTE", "FUNCIONES", "PROYECTO",
    "DIPLOMADO", "CURRICULO", "TRABAJO", "ESFUERZO", "APRENDER",
    "SISTEMAS", "INTERNET", "CONEXION", "SERVIDOR", "MEMORIA",
    "PROCESADOR", "SOFTWARE", "HARDWARE", "APLICACION", "DESARROLLO",
    "INGENIERIA", "CIENCIAS", "MATEMATICA", "LOGISTICA", "TRANSPORTE",
    "AVENTURA", "CASTILLO", "DRAGONES", "GUERRERO", "HECHICERO",
    "PROTAGONISTA", "HISTORIA", "CAPITULO", "ELEFANTE", "COCODRILO",
    "LEOPARDO", "GUEPARDO", "DINOSAURIO", "ASTRONAUTA", "PLANETAS",
    "ESTRELLAS", "GALAXIAS", "UNIVERSO", "TELESCOPIO", "ATMOSFERA",
    "GRAVEDAD", "OXIGENO", "HIDROGENO", "QUIMICA", "BIOLOGIA",
    "GEOGRAFIA", "FILOSOFIA", "LITERATURA", "ORQUESTA", "GUITARRA",
    "PIANISTA", "SINFONIA", "CONCIERTO", "ACADEMIA", "GIMNASIO",
    "DEPORTES", "ATLETISMO", "NATACION", "BICICLETA", "AVENTURA",
    "MONTAÑA", "BOSQUEJAR", "CASCADA", "NATURALEZA", "ECOLOGIA",
    "MEDIOAMBIENTE", "RECICLAJE", "ELECTRICIDAD", "MAGNETISMO", "MECANICA",
    "DINAMICA", "EVOLUCION", "SOCIEDAD", "CULTURA", "TRADICION",
    "PATRIMONIO", "MUSEO", "EXPOSICION", "ESCULTURA", "PINTURA",
    "ARQUITECTO", "CONSTRUIR", "EDIFICIO", "CARRETERA", "CIUDADES"
];
let palabrasUsadas = [];


function iniciarPartida(nombreJugador) {
    console.log("Bienvenido: " + nombreJugador + ". Tienes " + intentosBase + " intentos.");
}

function calcularPuntaje(intentosRestantes) {
    return intentosRestantes * 100; 
}


async function startGame() {
    let nombre = await getUserInput("Introduce tu nombre:");
    iniciarPartida(nombre);


    while (palabrasUsadas.length < InventarioPalabras.length) {
        
     
        let palabra = InventarioPalabras[Math.floor(Math.random() * InventarioPalabras.length)];

 
        if (palabrasUsadas.includes(palabra)) { continue; }
        palabrasUsadas.push(palabra);

     
        let resultado = await jugarRonda(palabra);

        if (resultado === "CEDULA") break; 
    }
}

async function jugarRonda(palabraSecreta) {
    let intentos = 3;
    let progreso = [];

    for (let i = 0; i < palabraSecreta.length; i++) { progreso.push("_"); }

    while (intentos > 0) {
        console.log("Progreso: " + progreso.join(" "));
        let letra = await getUserInput("Vidas: " + intentos + ". Letra:");

   
        if (letra === CEDULA_PROGRAMADOR) return "CEDULA";

    
        let letraU = letra.toUpperCase();
        
        if (palabraSecreta.includes(letraU)) {
            alert("¡Acertaste!");
           
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letraU) progreso[i] = letraU;
            }
        } else {
            intentos = intentos - 1; 
            alert("Fallaste.");

            if (intentos === 1) {
                console.log("¡Cuidado! Te queda un solo intento.");
            }
        }

        if (!progreso.includes("_")) {
            victorias++;
            alert("Ganaste. Puntaje: " + calcularPuntaje(intentos));
            return "GANO";
        }
    }
    derrotas++;
    return "PERDIO";
}

startGame();

































































