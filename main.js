(() => {
    "use strict";

    /* =========================================================
       INEVITÁVEL
       BLOOD STATE MODULE
       
       Camada independente.
       NÃO modifica o JavaScript legado.
    ========================================================= */

    const BloodState = {

        version: "1.0.1",

        state: 0,
        maxState: 7,

        elements: {},

        states: [

            {
                title: "INEVITÁVEL",
                message: "A MORTE É APENAS O COMEÇO."
            },

            {
                title: "SIGNAL",
                message: "ALGUMA COISA MUDOU."
            },

            {
                title: "SPREAD",
                message: "ESTÁ SE ESPALHANDO."
            },

            {
                title: "CONTAMINATION",
                message: "A INTERFACE ESTÁ SENDO ALTERADA."
            },

            {
                title: "INVERSION",
                message: "AS CORES NÃO SÃO MAIS AS MESMAS."
            },

            {
                title: "DOMINANCE",
                message: "O VERMELHO ESTÁ TOMANDO CONTA."
            },

            {
                title: "COLLAPSE",
                message: "A INTERFACE ESTÁ FALHANDO."
            },

            {
                title: "END",
                message: "AGORA VOCÊ ESTÁ DENTRO."
            }

        ],

        init() {

            this.cacheElements();

            if (!this.elements.button) {
                console.warn(
                    "[BLOOD STATE] Nenhum gatilho encontrado."
                );

                return;
            }

            this.createStyle();

            this.update();

            this.elements.button.addEventListener(
                "click",
                () => this.next()
            );

            console.log(
                "[BLOOD STATE] Módulo carregado."
            );

        },


        /* =====================================================
           ELEMENTOS

           CORREÇÃO:
           O gatilho de clique e o texto "CONTINUAR/RECOMEÇAR"
           devem ser o <button> real (data-blood-button),
           e não o container (data-blood-state).

           O container [data-blood-state] continua existindo e
           pode ser usado no futuro para escopar seletores, mas
           não é mais usado como "botão".
        ===================================================== */

        cacheElements() {

            const root =
                document.querySelector(
                    "[data-blood-state]"
                );

            this.elements = {

                root,

                button:
                    root
                        ? root.querySelector(
                            "[data-blood-button]"
                        )
                        : document.querySelector(
                            "[data-blood-button]"
                        ),

                title:
                    document.querySelector(
                        "[data-blood-title]"
                    ),

                message:
                    document.querySelector(
                        "[data-blood-message]"
                    ),

                state:
                    document.querySelector(
                        "[data-blood-counter]"
                    )

            };

        },


        /* =====================================================
           AVANÇAR
        ===================================================== */

        next() {

            if (this.state < this.maxState) {

                this.state++;

                this.update();

                return;

            }

            this.reset();

        },


        /* =====================================================
           ATUALIZAR
        ===================================================== */

        update() {

            const current =
                this.states[this.state];

            if (!current) return;


            const progress =
                this.state / this.maxState;


            /*
             * Variáveis CSS próprias do módulo.
             *
             * Não usamos --blood para evitar conflito
             * com qualquer CSS existente.
             */

            document.documentElement.style.setProperty(
                "--inevitable-blood",
                progress
            );


            document.documentElement.style.setProperty(
                "--inevitable-red",
                Math.round(
                    20 + progress * 115
                )
            );


            document.documentElement.style.setProperty(
                "--inevitable-darkness",
                (progress * 0.8).toFixed(2)
            );


            /*
             * Conteúdo
             */

            if (this.elements.title) {

                this.elements.title.textContent =
                    current.title;

            }


            if (this.elements.message) {

                this.elements.message.textContent =
                    current.message;

            }


            if (this.elements.state) {

                this.elements.state.textContent =
                    `ESTADO ${this.state}`;

            }


            /*
             * Classes de estado
             */

            document.body.classList.remove(
                "blood-state-1",
                "blood-state-2",
                "blood-state-3",
                "blood-state-4",
                "blood-state-5",
                "blood-state-6",
                "blood-state-7"
            );


            if (this.state > 0) {

                document.body.classList.add(
                    `blood-state-${this.state}`
                );

            }


            /*
             * Glitch
             */

            if (this.state >= 6) {

                this.glitch();

            }


            /*
             * Estado final

             * CORREÇÃO:
             * Antes este trecho fazia
             * this.elements.button.textContent = "..."
             * usando uma referência que, por causa do bug
             * de seleção acima, apontava para o container
             * inteiro (com título, mensagem e contador
             * dentro). Isso apagava o card inteiro no
             * estado final.
             *
             * Agora elements.button é o <button> real,
             * então apenas o texto do próprio botão muda,
             * preservando o restante da interface.
             *
             * Ainda assim, para não depender de a estrutura
             * interna do botão ser só texto (ele tem um
             * <span> dentro), atualizamos apenas o <span>
             * quando ele existir.
             */

            if (this.elements.button) {

                const label =
                    this.elements.button.querySelector("span");

                const text =
                    this.state === this.maxState
                        ? "RECOMEÇAR"
                        : "CONTINUAR";

                if (label) {

                    label.textContent = text;

                } else {

                    this.elements.button.textContent = text;

                }

            }

        },


        /* =====================================================
           GLITCH
        ===================================================== */

        glitch() {

            const targets = [

                this.elements.title,
                this.elements.message,
                this.elements.button

            ].filter(Boolean);


            targets.forEach(element => {

                element.classList.remove(
                    "blood-state-glitch"
                );


                void element.offsetWidth;


                element.classList.add(
                    "blood-state-glitch"
                );

            });

        },


        /* =====================================================
           RESET
        ===================================================== */

        reset() {

            this.state = 0;

            document.body.classList.remove(
                "blood-state-final"
            );

            this.update();

        },


        /* =====================================================
           CSS ISOLADO
        ===================================================== */

        createStyle() {

            if (
                document.getElementById(
                    "inevitable-blood-state-style"
                )
            ) {
                return;
            }


            const style =
                document.createElement("style");

            style.id =
                "inevitable-blood-state-style";


            style.textContent = `

                /*
                 * ATMOSFERA
                 */

                body.blood-state-1 {
                    filter:
                        saturate(
                            calc(
                                1 +
                                var(
                                    --inevitable-blood
                                )
                            )
                        );
                }


                body.blood-state-2 {
                    background:
                        radial-gradient(
                            circle at center,
                            rgb(
                                var(--inevitable-red),
                                0,
                                0
                            ),
                            #000 75%
                        ) !important;
                }


                body.blood-state-3 {
                    background:
                        radial-gradient(
                            circle at center,
                            rgb(
                                calc(
                                    var(--inevitable-red) + 15
                                ),
                                0,
                                0
                            ),
                            #000 68%
                        ) !important;
                }


                body.blood-state-4 {
                    background:
                        radial-gradient(
                            circle at center,
                            rgb(
                                calc(
                                    var(--inevitable-red) + 25
                                ),
                                0,
                                0
                            ),
                            #160000 62%
                        ) !important;

                    filter:
                        contrast(1.15)
                        saturate(1.3);
                }


                body.blood-state-5 {
                    background:
                        radial-gradient(
                            circle at center,
                            #8b0000,
                            #170000 55%,
                            #000 100%
                        ) !important;
                }


                body.blood-state-6 {
                    background:
                        radial-gradient(
                            circle at center,
                            #b00000,
                            #240000 45%,
                            #000 100%
                        ) !important;

                    animation:
                        blood-state-pulse
                        1.2s infinite;
                }


                body.blood-state-7,
                body.blood-state-final {
                    background:
                        #8b0000 !important;

                    color:
                        #080000 !important;
                }


                /*
                 * GLITCH
                 */

                .blood-state-glitch {

                    animation:
                        blood-state-glitch
                        .25s linear;

                }


                @keyframes blood-state-glitch {

                    0% {
                        transform:
                            translate(0);
                    }

                    20% {
                        transform:
                            translate(-8px, 3px);
                    }

                    40% {
                        transform:
                            translate(8px, -3px);
                    }

                    60% {
                        transform:
                            translate(-5px, 2px);
                    }

                    80% {
                        transform:
                            translate(5px, -2px);
                    }

                    100% {
                        transform:
                            translate(0);
                    }

                }


                @keyframes blood-state-pulse {

                    0%,
                    100% {
                        filter:
                            contrast(1);
                    }

                    50% {
                        filter:
                            contrast(1.5);
                    }

                }


                /*
                 * CAMADA DE CONTAMINAÇÃO
                 */

                body.blood-state-3::before {

                    content: "";

                    position: fixed;

                    inset: 0;

                    pointer-events: none;

                    z-index: 9990;

                    background:
                        radial-gradient(
                            circle at center,
                            transparent 20%,
                            rgba(
                                120,
                                0,
                                0,
                                .35
                            )
                            100%
                        );

                    animation:
                        blood-state-contamination
                        2s infinite alternate;

                }


                @keyframes blood-state-contamination {

                    from {
                        opacity: .35;
                    }

                    to {
                        opacity: .75;
                    }

                }


                /*
                 * COLAPSO
                 */

                body.blood-state-6 .container {

                    animation:
                        blood-state-collapse
                        .6s infinite alternate;

                }


                @keyframes blood-state-collapse {

                    from {
                        transform:
                            translateX(-2px)
                            skewX(-1deg);
                    }

                    to {
                        transform:
                            translateX(2px)
                            skewX(1deg);
                    }

                }


                /*
                 * ESTADO FINAL
                 */

                body.blood-state-final .container {

                    filter:
                        drop-shadow(
                            0 0 25px
                            rgba(0,0,0,.7)
                        );

                }

            `;


            document.head.appendChild(style);

        }

    };


    /*
     * API explícita.
     *
     * O main.js pode inicializar o módulo
     * sem criar dependências globais adicionais.
     */

    window.InevitableBloodState =
        BloodState;


    /* =========================================================
       INICIALIZAÇÃO

       CORREÇÃO CRÍTICA:
       Esta chamada não existia. O módulo era definido e
       exposto em window.InevitableBloodState, mas nunca era
       inicializado. Por isso o estado global nunca mudava:
       nenhum listener era anexado ao botão e nenhuma variável
       CSS ou classe era aplicada.

       O <script src="js/main.js"> é carregado no fim do
       <body>, então o DOM já deveria estar pronto, mas o
       guard abaixo evita depender dessa ordem.
    ========================================================= */

    const startBloodState = () => {

        window.InevitableBloodState.init();

    };


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startBloodState
        );

    } else {

        startBloodState();

    }


})();
