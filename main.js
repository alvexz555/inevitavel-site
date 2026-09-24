(() => {
    "use strict";

    /* =========================================================
       INEVITÁVEL
       CAMADA JAVASCRIPT MODULAR
       
       Regra:
       Este arquivo NÃO modifica o JavaScript legado.
       Novas funcionalidades entram aqui.
    ========================================================= */

    const Inevitable = {
        version: "1.0.0",

        elements: {},

        init() {
            console.log(
                `[INEVITÁVEL] Camada modular ${this.version} iniciando...`
            );

            this.cacheElements();
            this.diagnostics();

            console.log(
                "[INEVITÁVEL] Camada modular carregada com sucesso."
            );
        },

        /* =====================================================
           ELEMENTOS
        ===================================================== */

        cacheElements() {
            this.elements = {
                menuButton: document.getElementById("menuButton"),
                menu: document.getElementById("menu"),

                deathTagline: document.getElementById("deathTagline"),
                manifestoText: document.getElementById("manifestoText"),
                survivalText: document.getElementById("survivalText"),

                surveyTitle: document.getElementById("surveyTitle"),
                surveyForm: document.getElementById("surveyForm"),

                darkEngineZones:
                    document.querySelectorAll(".dark-engine-zone"),

                inevitableTexts:
                    document.querySelectorAll(".inevitable-text"),

                inevitableClickables:
                    document.querySelectorAll(".inevitable-clickable")
            };
        },

        /* =====================================================
           DIAGNÓSTICO
        ===================================================== */

        diagnostics() {
            const elements = this.elements;

            const checks = {
                menuButton: !!elements.menuButton,
                menu: !!elements.menu,

                deathTagline: !!elements.deathTagline,
                manifestoText: !!elements.manifestoText,
                survivalText: !!elements.survivalText,

                surveyTitle: !!elements.surveyTitle,
                surveyForm: !!elements.surveyForm,

                darkEngineZones:
                    elements.darkEngineZones.length,

                inevitableTexts:
                    elements.inevitableTexts.length,

                inevitableClickables:
                    elements.inevitableClickables.length
            };

            console.table(checks);

            console.log(
                "[INEVITÁVEL] Diagnóstico da camada modular concluído."
            );
        }
    };


    /* =========================================================
       INICIALIZAÇÃO
    ========================================================= */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            () => Inevitable.init(),
            { once: true }
        );

    } else {

        Inevitable.init();

    }

})();
