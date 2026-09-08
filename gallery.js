/* =========================================================
   GALERIA MOBILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTOS
    ========================= */

    const gallery = document.querySelector(".gallery");

    if (!gallery) {
        return;
    }

    const items = gallery.querySelectorAll(".gallery-item");

    if (items.length === 0) {
        return;
    }


    /* =========================
       SOMENTE MOBILE
    ========================= */

    const mobileQuery =
        window.matchMedia("(max-width: 699px)");


    if (!mobileQuery.matches) {
        return;
    }


    /* =========================
       ESTADO
    ========================= */

    let currentIndex = 0;

    let startX = 0;
    let currentX = 0;

    let isDragging = false;

    const swipeThreshold = 50;


    /* =========================
       POSIÇÃO
    ========================= */

    function updatePosition(animate = true) {

        const offset =
            currentIndex * gallery.clientWidth;

        gallery.style.transition =
            animate
                ? "transform 0.3s ease"
                : "none";

        gallery.style.transform =
            `translateX(-${offset}px)`;

    }


    /* =========================
       INÍCIO DO TOQUE
    ========================= */

    gallery.addEventListener(
        "touchstart",
        (event) => {

            if (!mobileQuery.matches) {
                return;
            }

            startX =
                event.touches[0].clientX;

            currentX = startX;

            isDragging = true;

            gallery.style.transition = "none";

        },
        { passive: true }
    );


    /* =========================
       MOVIMENTO
    ========================= */

    gallery.addEventListener(
        "touchmove",
        (event) => {

            if (!isDragging || !mobileQuery.matches) {
                return;
            }

            currentX =
                event.touches[0].clientX;

            const movement =
                currentX - startX;

            const baseOffset =
                currentIndex * gallery.clientWidth;

            gallery.style.transform =
                `translateX(${
                    -baseOffset + movement
                }px)`;

        },
        { passive: true }
    );


    /* =========================
       FINAL DO TOQUE
    ========================= */

    gallery.addEventListener(
        "touchend",
        () => {

            if (!isDragging || !mobileQuery.matches) {
                return;
            }

            isDragging = false;

            const movement =
                currentX - startX;


            /* =========================
               ESQUERDA
            ========================= */

            if (
                movement < -swipeThreshold &&
                currentIndex < items.length - 1
            ) {

                currentIndex++;

            }


            /* =========================
               DIREITA
            ========================= */

            else if (
                movement > swipeThreshold &&
                currentIndex > 0
            ) {

                currentIndex--;

            }


            /* =========================
               VOLTA / ENCAIXA
            ========================= */

            updatePosition(true);

        }
    );


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener(
        "resize",
        () => {

            if (!mobileQuery.matches) {
                return;
            }

            updatePosition(false);

        }
    );


    /* =========================
       POSIÇÃO INICIAL
    ========================= */

    updatePosition(false);

});
