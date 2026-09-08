document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.querySelector(".gallery");

    if (!gallery) return;

    const items = gallery.querySelectorAll(".gallery-item");

    if (!items.length) return;

    const mobileQuery = window.matchMedia("(max-width: 699px)");

    let currentIndex = 0;
    let startX = 0;
    let startScrollLeft = 0;
    let currentX = 0;
    let isDragging = false;

    const swipeThreshold = 50;


    function enableMobileGallery() {

        gallery.style.display = "flex";
        gallery.style.overflowX = "hidden";
        gallery.style.overflowY = "hidden";
        gallery.style.touchAction = "pan-y";

        items.forEach(item => {
            item.style.flex = "0 0 100%";
            item.style.minWidth = "100%";
        });

        currentIndex = 0;

        gallery.scrollLeft = 0;
    }


    function goTo(index, smooth = true) {

        currentIndex = Math.max(
            0,
            Math.min(index, items.length - 1)
        );

        const width = gallery.clientWidth;

        gallery.scrollTo({
            left: currentIndex * width,
            behavior: smooth ? "smooth" : "auto"
        });
    }


    gallery.addEventListener("touchstart", event => {

        if (!mobileQuery.matches) return;

        startX = event.touches[0].clientX;
        currentX = startX;

        startScrollLeft = gallery.scrollLeft;

        isDragging = true;

    }, { passive: true });


    gallery.addEventListener("touchmove", event => {

        if (!isDragging || !mobileQuery.matches) return;

        currentX = event.touches[0].clientX;

        const movement = currentX - startX;

        gallery.scrollLeft =
            startScrollLeft - movement;

    }, { passive: true });


    gallery.addEventListener("touchend", () => {

        if (!isDragging || !mobileQuery.matches) return;

        isDragging = false;

        const movement = currentX - startX;


        if (movement < -swipeThreshold) {

            goTo(currentIndex + 1);

        } else if (movement > swipeThreshold) {

            goTo(currentIndex - 1);

        } else {

            goTo(currentIndex);

        }

    });


    window.addEventListener("resize", () => {

        if (!mobileQuery.matches) return;

        goTo(currentIndex, false);

    });


    mobileQuery.addEventListener("change", event => {

        if (event.matches) {

            enableMobileGallery();

        } else {

            gallery.style.display = "";
            gallery.style.overflowX = "";
            gallery.style.overflowY = "";
            gallery.style.touchAction = "";

            gallery.scrollLeft = 0;

            items.forEach(item => {
                item.style.flex = "";
                item.style.minWidth = "";
            });

        }

    });


    if (mobileQuery.matches) {
        enableMobileGallery();
    }

});
