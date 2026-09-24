/* =========================
   CONTADOR
========================= */

const fechaInicio =
new Date("2026-05-23T00:00:00");


function actualizarContador(){

    const ahora =
        new Date();

    let diferencia =
        ahora - fechaInicio;


    if(diferencia < 0){

        diferencia = 0;

    }


    const segundosTotales =
        Math.floor(
            diferencia / 1000
        );


    const dias =
        Math.floor(
            segundosTotales / 86400
        );


    const horas =
        Math.floor(
            (segundosTotales % 86400)
            / 3600
        );


    const minutos =
        Math.floor(
            (segundosTotales % 3600)
            / 60
        );


    const segundos =
        segundosTotales % 60;


    document.getElementById("dias")
        .textContent = dias;


    document.getElementById("horas")
        .textContent =
        horas.toString()
        .padStart(2,"0");


    document.getElementById("minutos")
        .textContent =
        minutos.toString()
        .padStart(2,"0");


    document.getElementById("segundos")
        .textContent =
        segundos.toString()
        .padStart(2,"0");

}


actualizarContador();

setInterval(
    actualizarContador,
    1000
);


/* =========================
   CARTA
========================= */

function abrirCarta(){

    const carta =
        document.getElementById("carta");

    carta.classList.toggle("show");

}


/* =========================
   VALES
========================= */

function usarVale(boton){

    boton.parentElement.innerHTML = `

        <div class="voucher-icon">
        ♡
        </div>

        <h3>
        Canjeado
        </h3>

        <p class="redeemed">
        Este vale queda guardado para nosotros.
        </p>

    `;

}


/* =========================
   GALERÍAS DE FOTOS
========================= */

function toggleGaleria(id, boton){

    const galeria =
        document.getElementById(id);

    const abierta =
        galeria.classList.toggle("show");


    if(abierta){

        if(id === "secretGallery"){

            boton.textContent =
                "Cerrar nuestros secretos ♡";

        }else{

            boton.textContent =
                "Cerrar nuestros recuerdos ♡";

        }

    }else{

        if(id === "secretGallery"){

            boton.textContent =
                "Abrir nuestros secretos ♡";

        }else{

            boton.textContent =
                "Abrir nuestros recuerdos ♡";

        }

    }

}


/* =========================
   VISOR DE FOTOS
========================= */

function abrirFoto(src){

    const modal =
        document.getElementById("modal");

    const imagen =
        document.getElementById("modalImg");

    imagen.src = src;

    modal.classList.add("show");

}


function cerrarFoto(){

    document
        .getElementById("modal")
        .classList.remove("show");

}


/* =========================
   MÚSICA
========================= */

function iniciarMusica(){

    const player =
        document.getElementById(
            "youtubePlayer"
        );


    player.contentWindow.postMessage(

        '{"event":"command","func":"playVideo","args":""}',

        "*"

    );

}


/* =========================
   CÁPSULA DEL TIEMPO
========================= */

/*
   La relación comenzó:
   23 de mayo de 2026

   La cápsula se abre:
   cada día 23

   Primera apertura:
   23 de septiembre de 2026
*/


function obtenerProximoDia23(){

    const ahora =
        new Date();


    let anio =
        ahora.getFullYear();


    let mes =
        ahora.getMonth();


    let fechaObjetivo =
        new Date(
            anio,
            mes,
            23,
            0,
            0,
            0
        );


    if(ahora >= fechaObjetivo){

        mes++;

        if(mes > 11){

            mes = 0;

            anio++;

        }

        fechaObjetivo =
            new Date(
                anio,
                mes,
                23,
                0,
                0,
                0
            );

    }


    return fechaObjetivo;

}


function actualizarCapsula(){

    const ahora =
        new Date();


    if(ahora.getDate() === 23){

        mostrarCapsulaDesbloqueada();

        return;

    }


    const objetivo =
        obtenerProximoDia23();


    const diferencia =
        objetivo - ahora;


    const totalSegundos =
        Math.max(
            0,
            Math.floor(
                diferencia / 1000
            )
        );


    const dias =
        Math.floor(
            totalSegundos / 86400
        );


    const horas =
        Math.floor(
            (totalSegundos % 86400)
            / 3600
        );


    const minutos =
        Math.floor(
            (totalSegundos % 3600)
            / 60
        );


    const segundos =
        totalSegundos % 60;


    document.getElementById(
        "capsuleDays"
    ).textContent =
        dias;


    document.getElementById(
        "capsuleHours"
    ).textContent =
        horas.toString()
        .padStart(2,"0");


    document.getElementById(
        "capsuleMinutes"
    ).textContent =
        minutos.toString()
        .padStart(2,"0");


    document.getElementById(
        "capsuleSeconds"
    ).textContent =
        segundos.toString()
        .padStart(2,"0");


    const meses = [

        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"

    ];


    document.getElementById(
        "capsuleDateText"
    ).textContent =
        "Se abrirá el 23 de " +
        meses[objetivo.getMonth()] +
        " ♡";

}


function mostrarCapsulaDesbloqueada(){

    document.getElementById(
        "capsuleLocked"
    ).style.display = "none";


    document.getElementById(
        "capsuleUnlocked"
    ).style.display = "block";


    document.getElementById(
        "openCapsuleButton"
    ).style.display =
        "inline-block";

}


function abrirCapsula(){

    const mensaje =
        document.getElementById(
            "capsuleMessage"
        );


    const corazones =
        document.getElementById(
            "capsuleHearts"
        );


    mensaje.classList.add("show");

    corazones.classList.add("show");


    mensaje.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}


actualizarCapsula();

setInterval(
    actualizarCapsula,
    1000
);


/* =========================
   PREGUNTA SÍ / NO
========================= */

const noButton =
    document.getElementById(
        "noButton"
    );


function moverNo(){

    const area =
        document.querySelector(
            ".question-buttons"
        );


    const anchoDisponible =
        area.clientWidth -
        noButton.offsetWidth;


    const altoDisponible =
        area.clientHeight -
        noButton.offsetHeight;


    const x =
        Math.random() *
        Math.max(0,anchoDisponible)
        -
        Math.max(0,anchoDisponible) / 2;


    const y =
        Math.random() *
        Math.max(0,altoDisponible)
        -
        Math.max(0,altoDisponible) / 2;


    noButton.style.position =
        "absolute";


    noButton.style.transform =
        `translate(${x}px,${y}px)`;

}


noButton.addEventListener(
    "mouseenter",
    moverNo
);


noButton.addEventListener(
    "touchstart",
    function(e){

        e.preventDefault();

        moverNo();

    }
);


noButton.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        moverNo();

    }
);


/* =========================
   RESPUESTA SÍ
========================= */

function respuestaSi(){

    const mensaje =
        document.getElementById(
            "yesMessage"
        );


    mensaje.classList.add("show");


    mensaje.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}
