import "./IntroPreloader.css";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroSection } from "../HeroSection/HeroSection";

gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);

let scrollBarWidth: number;

const disableScroll = () => {
    // Calculamos el ancho de la barra de scroll
    scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    // Evitamos el salto agregando padding
    if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
};

const enableScroll = () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
};

/**
 * Componente RevealAnimation
 * Maneja toda la secuencia de animación del preloader con GSAP
 */
export const IntroPreloader = () => {
    // Función auxiliar: divide el texto en palabras y/o caracteres usando SplitText
    // Permite marcar el primer carácter con clase especial si se solicita
    const splitTextElements = (
        selector: string,
        type: string = "words,chars",
        addAnchorChar: boolean = false
    ): void => {
        const elements = document.querySelectorAll<HTMLElement>(selector);

        elements.forEach((element) => {
            const splitText = new SplitText(element, {
                type,
                wordsClass: "split-word",
                charsClass: "split-char",
            });
            // Si estamos dividiendo en caracteres, envolvemos cada uno en un <span>
            if (type.includes("chars")) {
                splitText.chars.forEach((char, index) => {
                    const originalText = char.textContent;
                    char.innerHTML = `<span>${originalText}</span>`;
                    // Marcamos el primer carácter con clase especial si se pidió
                    if (addAnchorChar && index === 0) {
                        char.classList.add("title-anchor-char");
                    }
                });
            }
        });
    };

    // Detecta si estamos en móvil (para valores responsivos)
    const getIsMobile = () => window.innerWidth <= 1000;

    // Establece los estados iniciales de los elementos antes de que comience la animación
    const setInitialStates = (isMobile: boolean) => {
        // Posicionamos los spans de los primeros caracteres y caracteres del outro visibles
        gsap.set(
            [
                ".preloader-bottom-layer .preloader-name-title .title-anchor-char span",
                ".preloader-bottom-layer .preloader-role-title .split-char span",
            ],
            { y: "0%" }
        );

        // Posicionamiento especial del primer carácter del intro title
        gsap.set(".preloader-bottom-layer .preloader-name-title .title-anchor-char", {
            x: isMobile ? "7.5rem" : "18rem",
            y: isMobile ? "-1rem" : "-2.75rem",
            scale: 0.75,
        });

        // Posicionamiento de los caracteres del outro title (tiene que estar igual que el estado final para que la animación de desplazamiento funcione correctamente)
        gsap.set(".preloader-bottom-layer .preloader-role-title .split-char", {
            x: isMobile ? "-3rem" : "-8rem",
            fontSize: isMobile ? "6rem" : "16rem",
        });
    };

    // Anima las tags (palabras) hacia arriba (entrada) o hacia abajo (salida)
    const animateFloatingTags = (tl: gsap.core.Timeline, direction: "in" | "out", startTime: number) => {
        const tags = gsap.utils.toArray<HTMLElement>(".preloader-tag");

        tags.forEach((tag, index) => {
            tl.to(
                tag.querySelectorAll("p .split-word"),
                {
                    y: direction === "in" ? "0%" : "150%", // "in" reveals from hidden, "out" hides.
                    duration: 0.75,
                },
                startTime + index * 0.1 // stagger entre tags
            );
        });
    };

    // Animaciones específicas del título principal (Bernat Font)
    const animateNameTitle = (tl: gsap.core.Timeline, isMobile: boolean) => {
        // Aparecen todos los caracteres del intro
        tl.to(".preloader-top-layer .preloader-name-title .split-char span", {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
        }, 0.5);

        // Desaparecen todos los caracteres excepto el primero
        tl.to(
            ".preloader-top-layer .preloader-name-title .split-char:not(.title-anchor-char) span",
            {
                y: "100%",
                duration: 0.75,
                stagger: 0.05,
            },
            1.5
        );

        // Move first-char to intermediate position.
        tl.to(
            ".preloader-top-layer .preloader-name-title .title-anchor-char",
            {
                x: isMobile ? "3.8rem" : "10rem",
                duration: 1,
            },
            2.8
        );

        // Posición y estilo final del primer carácter
        tl.to(
            ".preloader-top-layer .preloader-name-title .title-anchor-char",
            {
                x: isMobile ? "3.2rem" : "7rem",
                y: isMobile ? "-1rem" : "-3rem",
                scale: 0.75,
                duration: 0.75
            },
            3.8
        );
    };

    // Animaciones del título secundario (Dev)
    const animateRoleTitle = (tl: gsap.core.Timeline, isMobile: boolean) => {
        // Aparecen los caracteres del "Dev"
        tl.to(
            ".preloader-top-layer .preloader-role-title .split-char span",
            {
                y: "0%",
                duration: 0.75,
                stagger: 0.075,
            },
            2
        );

        // Move outro chars to intermediate position.
        tl.to(
            ".preloader-top-layer .preloader-role-title .split-char",
            {
                x: isMobile ? "-3.3rem" : "-8.4rem",
                duration: 1,
            },
            2.8
        );

        // Posición y estilo final del outro (tiene que coincidir con el estado inicial para que la animación de desplazamiento funcione correctamente)
        tl.to(
            ".preloader-top-layer .preloader-role-title .split-char",
            {
                x: isMobile ? "-3rem" : "-8rem",
                fontSize: isMobile ? "6rem" : "16rem",
                duration: 0.75
            },
            3.8
        );
    };

    // Animaciones de revelación mediante clip-path y desplazamiento de capas
    const animatePreloaderExit = (tl: gsap.core.Timeline) => {
        // Collapse preloader and split-overlay via clipPath.
        tl.to(
            ".preloader-top-layer",
            {
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                duration: 1,
                ease: "power3.inOut"
            },
            4.3
        )
            .to(
                ".preloader-bottom-layer",
                {
                    clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "power3.inOut"
                },
                4.3
            );

        // Primera apertura del contenedor principal
        tl.to(
            ".main-content",
            {
                clipPath: "polygon(0 48%, 100% 48%, 100% 52%, 0 52%)",
                duration: 0.8,
                ease: "power3.out"
            },
            4.7
        );

        // Full expand container clipPath.
        tl.to(
            ".main-content",
            {
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "power4.out"
            },
            5.3
        );

        // Desplazamiento final: preloader sube, overlay baja
        tl.to(
            [".preloader-top-layer", ".preloader-bottom-layer"],
            {
                y: (i) => (i === 0 ? "-50%" : "50%"),
                duration: 1,
                ease: "power4.out"
            },
            5.3
        )
            .set(
                [".preloader-top-layer", ".preloader-bottom-layer", ".preloader-tags-layer"],
                {
                    pointerEvents: "none",
                    zIndex: -1
                }
            );
    };

    useGSAP(() => {
        // 🔒 Bloqueamos scroll al empezar
        disableScroll();

        // Creamos la curva de easing personalizada
        CustomEase.create("hop", ".8, 0, .3, 1");

        // Dividimos todos los textos necesarios
        splitTextElements(".preloader-name-title h1", "words, chars", true);
        splitTextElements(".preloader-role-title h1");
        splitTextElements(".preloader-tag p", "words");
        splitTextElements(".card h1", "words, chars", true);

        const isMobile = getIsMobile();

        // Seteamos estados iniciales
        setInitialStates(isMobile);

        // Timeline principal con easing por defecto
        const tl = gsap.timeline({
            defaults: { ease: "hop" },
        });

        // 1. Aparecen las tags
        animateFloatingTags(tl, "in", 0.5);

        // 2. Animación del título principal
        animateNameTitle(tl, isMobile);

        // 3. Animación del título secundario
        animateRoleTitle(tl, isMobile);

        // 4. Revelación general de capas + clip-paths
        animatePreloaderExit(tl);

        // 5. Desaparecen las tags
        animateFloatingTags(tl, "out", 4.7);

        // 🔓 Habilitamos scroll al finalizar todas las animaciones
        tl.call(() => {
            enableScroll();
        });

    }, []); // Empty dependency array ensures this runs once on mount.

    return (
        <>
            {/* Capa superior del preloader */}
            <div className="preloader-top-layer">
                <div className="preloader-name-title">
                    <h1>Bernat Font</h1>
                </div>
                <div className="preloader-role-title">
                    <h1>Dev</h1>
                </div>
            </div>

            {/* Capa inferior del preloader (reflejo) */}
            <div className="preloader-bottom-layer">
                <div className="preloader-name-title">
                    <h1>Bernat Font</h1>
                </div>
                <div className="preloader-role-title">
                    <h1>Dev</h1>
                </div>
            </div>

            {/* Tags overlay con las etiquetas animadas */}
            <div className="preloader-tags-layer">
                <div className="preloader-tag preloader-tag--developer"><p>Developer</p></div>
                <div className="preloader-tag preloader-tag--stack"><p>Full-Stack</p></div>
                <div className="preloader-tag preloader-tag--tech"><p>React</p></div>
            </div>

            {/* Contenedor principal que se revela después del preloader */}
            <div className="main-content">
                <HeroSection />
            </div>
        </>
    );
};