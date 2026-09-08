/* =========================================================
   GALERIA MOBILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const gallery =
        document.querySelector(".gallery");

    if (!gallery) {
        return;
    }


    const items =
        gallery.querySelectorAll(".gallery-item");

    if (items.length === 0) {
        return;
    }


    /* =====================================================
       CONTROLE MOBILE
    ===================================================== */

    const mobileQuery =
        window.matchMedia("(max-width: 699px)");


    let currentIndex = 0;

    let startX = 0;

    let currentX = 0;

    let isDragging = false;

    let horizontalDrag = false;


    const swipeThreshold = 50;


    /* =====================================================
       ATIVAR GALERIA MOBILE
    ===================================================== */

    function enableMobileGallery() {

        gallery.style.display = "flex";

        gallery.style.flexDirection = "row";

        gallery.style.overflowX = "hidden";

        gallery.style.overflowY = "hidden";

        gallery.style.touchAction = "pan-y";


        items.forEach(item => {

            item.style.flex = "0 0 100%";

            item.style.minWidth = "100%";

        });


        updatePosition(false);

    }


    /* =====================================================
       POSICIONAR GALERIA
    ===================================================== */

    function updatePosition(animate = true) {

        const width =
            gallery.clientWidth;


        const offset =
            currentIndex * width;


        gallery.style.transition =
            animate
                ? "transform 0.3s ease"
                : "none";


        gallery.style.transform =
            `translateX(-${offset}px)`;

    }


    /* =====================================================
       INÍCIO DO TOQUE
    ===================================================== */

    gallery.addEventListener(
        "touchstart",
        event => {

            if (!mobileQuery.matches) {
                return;
            }


            startX =
                event.touches[0].clientX;

            currentX =
                startX;

            isDragging = true;

            horizontalDrag = false;


            gallery.style.transition =
                "none";

        },
        { passive: true }
    );


    /* =====================================================
       MOVIMENTO DO DEDO
    ===================================================== */

    gallery.addEventListener(
        "touchmove",
        event => {

            if (
                !isDragging ||
                !mobileQuery.matches
            ) {
                return;
            }


            currentX =
                event.touches[0].clientX;


            const movement =
                currentX - startX;


            /*
               Só consideramos como arrasto horizontal
               depois de alguns pixels.
            */

            if (
                Math.abs(movement) > 10
            ) {

                horizontalDrag = true;

            }


            if (!horizontalDrag) {
                return;
            }


            const width =
                gallery.clientWidth;


            const basePosition =
                currentIndex * width;


            /*
               Resistência nas extremidades.
            */

            let position =
                -basePosition + movement;


            if (
                currentIndex === 0 &&
                movement > 0
            ) {

                position =
                    movement * 0.35;

            }


            if (
                currentIndex === items.length - 1 &&
                movement < 0
            ) {

                const maxMovement =
                    movement * 0.35;

                position =
                    -basePosition + maxMovement;

            }


            gallery.style.transform =
                `translateX(${position}px)`;

        },
        { passive: true }
    );


    /* =====================================================
       FINAL DO TOQUE
    ===================================================== */

    gallery.addEventListener(
        "touchend",
        () => {

            if (
                !isDragging ||
                !mobileQuery.matches
            ) {
                return;
            }


            isDragging = false;


            const movement =
                currentX - startX;


            /* =============================================
               PRÓXIMA IMAGEM
            ============================================= */

            if (
                horizontalDrag &&
                movement < -swipeThreshold &&
                currentIndex < items.length - 1
            ) {

                currentIndex++;

            }


            /* =============================================
               IMAGEM ANTERIOR
            ============================================= */

            else if (
                horizontalDrag &&
                movement > swipeThreshold &&
                currentIndex > 0
            ) {

                currentIndex--;

            }


            /*
               Volta para a posição correta.
            */

            updatePosition(true);


            horizontalDrag = false;

        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (!mobileQuery.matches) {
                return;
            }


            updatePosition(false);

        }
    );


    /* =====================================================
       MUDANÇA MOBILE / DESKTOP
    ===================================================== */

    mobileQuery.addEventListener(
        "change",
        event => {

            if (event.matches) {

                enableMobileGallery();

            } else {

                /*
                   Limpa tudo que o JavaScript colocou
                   na galeria.

                   Assim o CSS original do desktop
                   volta a controlar a galeria.
                */

                gallery.style.display = "";

                gallery.style.flexDirection = "";

                gallery.style.overflowX = "";

                gallery.style.overflowY = "";

                gallery.style.touchAction = "";

                gallery.style.transition = "";

                gallery.style.transform = "";


                items.forEach(item => {

                    item.style.flex = "";

                    item.style.minWidth = "";

                });

            }

        }
    );


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    if (mobileQuery.matches) {

        enableMobileGallery();

    }

});
