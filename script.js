const fechaInicio =
new Date("2026-05-23T00:00:00");


/*
==========================================
CONTROL DEL CONTADOR
==========================================

true  = contador PAUSADO
false = contador FUNCIONANDO

Solo cambia esta línea cuando quieras.
==========================================
*/

const contadorPausado = true;


/*
==========================================
TIEMPO CONGELADO
==========================================

Este valor se guarda automáticamente
cuando el contador está funcionando.

Si el contador está pausado, utiliza
el último tiempo guardado.
==========================================
*/

const tiempoPausado =
    0;

    );


/*
==========================================
ACTUALIZAR CONTADOR
==========================================
*/

function actualizarContador(){

    let diferencia;


    if(contadorPausado){

        if(tiempoPausado !== null){

            diferencia =
                Number(tiempoPausado);

        }else{

            diferencia =
                new Date() - fechaInicio;

        }

    }else{

        diferencia =
            new Date() - fechaInicio;

        localStorage.setItem(
            "tiempoContadorPausado",
            diferencia
        );

    }


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

    const vale =
        boton.closest(".voucher");

    const indice =
        vale.dataset.indice;

    const semana =
        obtenerNumeroSemana();

    localStorage.setItem(
        "valeCanjeado_" + semana + "_" + indice,
        "true"
    );

    mostrarValeCanjeado(vale);

}


function mostrarValeCanjeado(vale){

    vale.innerHTML = `

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
   VALES SEMANALES
========================= */

const valesSemanales = [

   [
        ["💋", "Besos sin límite", "Vale por todos los besos que quieras... y algunos que no esperabas."],
        ["🫦", "Ven aquí", "Un momento cerquita de mí, sin excusas y sin interrupciones."],
        ["🔥", "Masaje especial", "Un masaje lento, con permiso para ponerse bastante interesante."],
        ["😈", "Hoy mandas tú", "Tú decides qué pequeño capricho quieres que cumpla."],
        ["👀", "Tú eliges", "Tú eliges cómo empieza nuestro momento especial."],
        ["🌙", "Noche prohibida", "Una noche para nosotros, con muchas ganas y pocas distracciones."],
        ["🖤", "Nuestro secreto", "Un deseo secreto que solamente nosotros dos conocemos."]
    ],

    [
        ["💋", "Un beso peligroso", "Un beso largo... de esos que hacen olvidar qué hora es."],
        ["😏", "Acércate", "Vale por tenerte muy, muy cerca de mí durante un buen rato."],
        ["🔥", "Masaje con intención", "Un masaje relajante que puede terminar siendo bastante menos relajante."],
        ["🫦", "Mimos atrevidos", "Mimos, caricias y todo lo que nos haga sonreír."],
        ["👀", "Yo elijo", "Esta vez yo decido nuestro pequeño momento picarón."],
        ["🌙", "Solo nosotros", "Una noche sin interrupciones, dedicada completamente a nosotros."],
        ["😈", "Reto secreto", "Un reto atrevido que solo se revela cuando se canjea."]
    ],

    [
        ["💋", "Besos de recompensa", "Cada vez que me hagas sonreír, te ganas un beso."],
        ["🔥", "Una hora de mimos", "Una hora completa para consentirnos sin mirar el reloj."],
        ["😏", "Antojo secreto", "Puedes pedirme un pequeño deseo... y veremos si me resisto."],
        ["🫦", "Muy cerquita", "Vale por una sesión de abrazos, caricias y mucha cercanía."],
        ["👀", "Sin preguntas", "Durante un ratito, tú decides y yo sigo el juego."],
        ["🖤", "Deseo reservado", "Un deseo que queda guardado solamente para nosotros."],
        ["🌙", "Después de medianoche", "Un vale especial para cuando la noche se pone interesante."]
    ],

    [
        ["😈", "Tú mandas", "Durante nuestro momento especial, tú tienes el control."],
        ["💋", "Beso robado", "Vale por un beso inesperado en el momento menos esperado."],
        ["🔥", "Noche intensa", "Una noche para apagar el mundo y encender nuestro pequeño universo."],
        ["🫦", "Caricias", "Un momento lento, cercano y lleno de cariño."],
        ["👀", "Elige mi look", "Tú decides qué quiero ponerme para nuestra cita."],
        ["😏", "Sorpresa picarona", "No sabrás qué es hasta que decidas canjearlo."],
        ["🖤", "Solo tú y yo", "Un momento íntimo para desconectarnos de todo lo demás."]
    ]

];


function obtenerNumeroSemana(){

    const fecha =
        new Date();

    const inicio =
        new Date(2026, 4, 23);

    const diferencia =
        fecha.getTime() -
        inicio.getTime();

    const semana =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24 * 7)
        );

    return Math.max(0, semana);

}


function cargarVales(){

    const contenedor =
        document.getElementById(
            "vouchersContainer"
        );

    if(!contenedor){
        return;
    }

    const semana =
        obtenerNumeroSemana();

    const grupo =
        valesSemanales[
            semana %
            valesSemanales.length
        ];

    contenedor.innerHTML = "";

    grupo.forEach(
        function(vale, indice){

            const tarjeta =
                document.createElement("div");

            tarjeta.className =
                "voucher";

            tarjeta.dataset.indice =
                indice;

            tarjeta.innerHTML = `

                <div class="voucher-icon">
                ${vale[0]}
                </div>

                <h3>
                ${vale[1]}
                </h3>

                <p>
                ${vale[2]}
                </p>

                <button
                class="redeem"
                onclick="usarVale(this)">

                Canjear ♡

                </button>

            `;

            const canjeado =
                localStorage.getItem(
                    "valeCanjeado_" +
                    semana +
                    "_" +
                    indice
                );

            if(canjeado === "true"){

                mostrarValeCanjeado(
                    tarjeta
                );

            }

            contenedor.appendChild(
                tarjeta
            );

        }
    );

}


cargarVales();

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
let albumActual = null;
let indiceFotoActual = 0;

function abrirFoto(src, albumId){

    const modal =
        document.getElementById("modal");

    const imagen =
        document.getElementById("modalImg");

    imagen.src = src;

    /*
    Si la foto pertenece a un álbum,
    guardamos cuál es.
    */

    if(albumId){

        const album =
            document.getElementById(albumId);

        if(album){

            const fotos =
                album.querySelectorAll("img");

            albumActual = albumId;

            fotos.forEach(function(foto, indice){

                if(foto.src === src){

                    indiceFotoActual = indice;

                }

            });

        }

    }

   modal.classList.add("show");

document.body.style.overflow = "hidden";

}


function cambiarFoto(direccion){
   
    if(!albumActual){

        return;

    }

    const album =
        document.getElementById(albumActual);

    if(!album){

        return;

    }

    const fotos =
        album.querySelectorAll("img");

    if(fotos.length === 0){

        return;

    }

    indiceFotoActual += direccion;

    if(indiceFotoActual < 0){

        indiceFotoActual =
            fotos.length - 1;

    }

    if(indiceFotoActual >= fotos.length){

        indiceFotoActual = 0;

    }

    document.getElementById(
        "modalImg"
    ).src =
        fotos[indiceFotoActual].src;

}
function cerrarFoto(){

    const modal =
        document.getElementById("modal");

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/*
==========================================
CERRAR CON LA TECLA ESC
==========================================
*/

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            cerrarFoto();

        }

    }
);


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

    const ahora = new Date();

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

    const mensajesCapsula = [
        "Enero: Que este nuevo año nos encuentre eligiéndonos una vez más, con todo lo bonito que todavía nos queda por vivir. ♡",

        "Febrero: Entre tantos días, mi favorito siempre será cualquiera en el que pueda compartir algo contigo. 💕",

        "Marzo: Me encanta pensar que nuestra historia todavía tiene muchísimas páginas que aún no hemos escrito. 🌿",

        "Abril: Si pudiera guardar un solo sentimiento de nosotros, sería esta tranquilidad de saber que te tengo. ♡",

        "Mayo: Desde nuestro comienzo hasta hoy, cada pequeño momento contigo se ha convertido en parte de mi historia favorita. 💌",

        "Junio: Gracias por existir de esa manera tan tuya que hace que incluso los días normales se sientan especiales. 🌙",

        "Julio: Hay recuerdos que el tiempo no borra. Los nuestros son de esos que quiero seguir acumulando contigo. ❤️",

        "Agosto: No necesito que todos los días sean perfectos. Solo quiero seguir viviendo los imperfectos a tu lado. ✨",

        "Septiembre: Me gusta imaginar todo lo que todavía nos falta descubrir juntas. Y me emociona que sea contigo. 🌷",

        "Octubre: Si pudiera detener el tiempo en algún lugar, probablemente elegiría uno de esos momentos sencillos en los que estamos juntas. ♡",

        "Noviembre: Nuestra historia no necesita ser perfecta para ser especial. Me basta con que sea nuestra. 💚",

        "Diciembre: Otro año, otros recuerdos y otra razón para agradecer que nuestros caminos se hayan encontrado. 🎄♡"
    ];


    /*
    ==========================================
    CÁPSULA DEL MES
    ==========================================
    */

    if(ahora.getDate() === 23){

        mostrarCapsulaDesbloqueada();

        const mesActual =
            ahora.getMonth();

        const claveCapsula =
            "capsula-" +
            ahora.getFullYear() +
            "-" +
            mesActual;


        const capsuleMessage =
            document.getElementById(
                "capsuleMessage"
            );


        capsuleMessage.textContent =
            mensajesCapsula[mesActual];


        document.getElementById(
            "capsuleDateText"
        ).textContent =
            "Cápsula de " +
            meses[mesActual] +
            " ♡";


        /*
        Guardamos que esta cápsula
        ya fue abierta.
        */

        if(
            localStorage.getItem(
                claveCapsula
            )
        ){

            document.getElementById(
                "openCapsuleButton"
            ).textContent =
                "Volver a abrir ♡";

        }


        return;

    }


    /*
    ==========================================
    CUENTA REGRESIVA
    ==========================================
    */

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
        horas
        .toString()
        .padStart(2,"0");


    document.getElementById(
        "capsuleMinutes"
    ).textContent =
        minutos
        .toString()
        .padStart(2,"0");


    document.getElementById(
        "capsuleSeconds"
    ).textContent =
        segundos
        .toString()
        .padStart(2,"0");


    document.getElementById(
        "capsuleDateText"
    ).textContent =
        "Se abrirá el 23 de " +
        meses[objetivo.getMonth()] +
        " ♡";

}


/*
==========================================
MOSTRAR CÁPSULA
==========================================
*/

function mostrarCapsulaDesbloqueada(){

    document.getElementById(
        "capsuleLocked"
    ).style.display =
        "none";


    document.getElementById(
        "capsuleUnlocked"
    ).style.display =
        "block";


    document.getElementById(
        "openCapsuleButton"
    ).style.display =
        "inline-block";

}


/*
==========================================
ABRIR CÁPSULA
==========================================
*/

function abrirCapsula(){

    const mensaje =
        document.getElementById(
            "capsuleMessage"
        );


    const corazones =
        document.getElementById(
            "capsuleHearts"
        );


    mensaje.classList.add(
        "show"
    );


    corazones.classList.add(
        "show"
    );


    /*
    Guardamos la cápsula como abierta.
    */

    const ahora =
        new Date();


    const claveCapsula =
        "capsula-" +
        ahora.getFullYear() +
        "-" +
        ahora.getMonth();


    localStorage.setItem(
        claveCapsula,
        "abierta"
    );


    mensaje.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}


/*
==========================================
INICIO
==========================================
*/

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
