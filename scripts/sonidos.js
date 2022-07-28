/* ------------------- Audio Agregar Producto------------ */

const ctxAgr = new AudioContext();
let audioAgr;

fetch ('../sounds/productoAgregado.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctxAgr.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
    audioAgr = decodedAudio;
    });
function audioAgregar() {
    const playSound = ctxAgr.createBufferSource();
    playSound.buffer = audioAgr;
    playSound.connect(ctxAgr.destination);
    playSound.start(ctxAgr.currentTime);
}

/* ------------------------------- */


                /* ------------------- Audio Eliminar Producto------------ */

                const ctxEliminarP = new AudioContext();
                let audioEliminarPro;
                
                fetch ('../sounds/productoEliminado.mp3')
                    .then(data => data.arrayBuffer())
                    .then(arrayBuffer => ctxEliminarP.decodeAudioData(arrayBuffer))
                    .then(decodedAudio => {
                    audioEliminarPro = decodedAudio;
                    });
                function audioEliminarPP() {
                    const playSound = ctxEliminarP.createBufferSource();
                    playSound.buffer = audioEliminarPro;
                    playSound.connect(ctxEliminarP.destination);
                    playSound.start(ctxEliminarP.currentTime);
                }
                

                /* ------------------------------- */



/* ------------------- Audio Vaciar Carrito------------ */

const ctxVaciar = new AudioContext();
let audioVaciarC;

fetch ('../sounds/carritoVaciado.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctxVaciar.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
    audioVaciarC = decodedAudio;
    });
function audioVaciarCarrito() {
    const playSound = ctxVaciar.createBufferSource();
    playSound.buffer = audioVaciarC;
    playSound.connect(ctxVaciar.destination);
    playSound.start(ctxVaciar.currentTime);
}

/* ------------------------------- */