import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsSection.css";
import { useEmberCursorHover } from "../hooks/useEmberCursorHover";
import { PROJECTS } from "./data/projects";

gsap.registerPlugin(ScrollTrigger);

/* ─── Ember helpers ─────────────────────────── */

type EmberKind = "glow" | "spark" | "speck";

const createEmber = (i: number) => {
    const rand = Math.random();
    const kind: EmberKind = rand < 0.38 ? "glow" : rand < 0.65 ? "spark" : "speck";

    const base = kind === "glow"
        ? Math.random() * 4.5 + 1.5   // 1.5–6 px
        : kind === "spark"
            ? Math.random() * 1.2 + 0.6   // 0.6–1.8 px wide
            : Math.random() * 1.8 + 0.6;  // 0.6–2.4 px

    const h = kind === "spark"
        ? base * (2.5 + Math.random() * 4) // elongated
        : base;

    const initialOpacity =
        kind === "speck" ? Math.random() * 0.9
            : kind === "spark" ? Math.random() * 0.6
                : Math.random() * 0.45;

    return {
        kind,
        style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${base}px`,
            height: `${h}px`,
            opacity: initialOpacity,
            transform: `rotate(${Math.random() * 360}deg)`,
        },
    };
};

const EMBERS = Array.from({ length: 40 }, (_, i) => createEmber(i));

/* ─── Component ─────────────────────────────── */

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const embersRef = useRef<HTMLDivElement>(null);
    const cardRef = useEmberCursorHover<HTMLButtonElement>();

    useEffect(() => {
        const ctx = gsap.context(() => {

            /* floating embers — organic, type-aware */
            embersRef.current?.querySelectorAll<HTMLElement>(".ember").forEach((el) => {
                const kind = el.dataset.kind as EmberKind;

                if (kind === "spark") {
                    // Sparks: shoot upward and fade, restart with delay
                    gsap.fromTo(
                        el,
                        { y: 0, opacity: () => Math.random() * 0.7 + 0.1 },
                        {
                            y: -(Math.random() * 70 + 30),
                            x: `random(-22, 22)`,
                            opacity: 0,
                            duration: Math.random() * 1.6 + 0.8,
                            ease: "power2.out",
                            repeat: -1,
                            repeatDelay: Math.random() * 4,
                            delay: Math.random() * 5,
                        }
                    );
                } else if (kind === "glow") {
                    // Glows: slow, drifting, pulsing
                    gsap.to(el, {
                        y: `random(-38, 28)`,
                        x: `random(-22, 22)`,
                        opacity: `random(.06, .55)`,
                        scale: `random(.5, 1.9)`,
                        duration: `random(4, 9)`,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: `random(0, 7)`,
                    });
                } else {
                    // Specks: erratic flicker, barely move
                    gsap.to(el, {
                        opacity: `random(0, .95)`,
                        scale: `random(.4, 2.2)`,
                        x: `random(-8, 8)`,
                        y: `random(-12, 4)`,
                        duration: `random(.25, .9)`,
                        repeat: -1,
                        yoyo: true,
                        ease: "power3.inOut",
                        delay: `random(0, 4)`,
                    });
                }
            });

            /* title chars */
            gsap.fromTo(
                titleRef.current?.querySelectorAll(".char") ?? [],
                { y: 120, opacity: 0, rotateX: -90, filter: "blur(14px)" },
                {
                    y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)",
                    stagger: .045, duration: 1.15, ease: "power4.out",
                    scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
                }
            );

            /* line */
            gsap.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1, opacity: 1, duration: 1.4, ease: "power3.inOut",
                    scrollTrigger: { trigger: lineRef.current, start: "top 85%" }
                }
            );

            /* cards entry */
            cardsRef.current?.querySelectorAll<HTMLElement>(".project-card").forEach((card, i) => {
                gsap.fromTo(card,
                    { x: i % 2 === 0 ? -70 : 70, opacity: 0, filter: "blur(10px)" },
                    {
                        x: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out",
                        delay: i * 0.1, scrollTrigger: { trigger: card, start: "top 87%" }
                    }
                );

                /* scan line on entry */
                gsap.fromTo(card.querySelector(".scan"),
                    { left: "-100%", opacity: 1 },
                    {
                        left: "110%", opacity: 0, duration: .9, ease: "power2.out",
                        delay: i * 0.1 + 0.25, scrollTrigger: { trigger: card, start: "top 87%" }
                    }
                );

                const glow = card.querySelector(".card-glow");
                const tags = card.querySelectorAll(".tag");
                const viewBtn = card.querySelector(".view-btn");
                const bgNum = card.querySelector(".bg-num");

                card.addEventListener("mouseenter", () => {
                    gsap.to(glow, { opacity: 1, duration: .4 });
                    gsap.to(bgNum, { y: -8, color: "rgba(255,101,32,.12)", duration: .6, ease: "power2.out" });
                    gsap.to(tags, { color: "var(--color-accent)", borderColor: "rgba(255,101,32,.45)", stagger: .04, duration: .25 });
                    gsap.to(viewBtn, { x: 6, duration: .3, ease: "power2.out" });
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(glow, { opacity: 0, duration: .5 });
                    gsap.to(bgNum, { y: 0, color: "rgba(255,101,32,.055)", duration: .6, ease: "power2.out" });
                    gsap.to(tags, { color: "rgba(255,180,80,.42)", borderColor: "rgba(255,101,32,.14)", stagger: .04, duration: .3 });
                    gsap.to(viewBtn, { x: 0, duration: .3 });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="projects-section" ref={sectionRef}>

            {/* Embers */}
            <div className="embers-layer" ref={embersRef}>
                {EMBERS.map(({ kind, style }, i) => (
                    <span
                        key={i}
                        className={`ember ember--${kind}`}
                        data-kind={kind}
                        style={style}
                    />
                ))}
            </div>

            {/* Header */}
            <div className="section-header">
                <span className="section-eyebrow">SELECTED WORK</span>
                <div className="title-wrapper" ref={titleRef}>
                    <h2 className="section-title">
                        <span className="title-line title-line--top">THE</span>
                        <span className="title-line title-line--bottom">PROJECTS</span>
                    </h2>
                </div>
                <div className="section-line" ref={lineRef}>
                    <span className="line-diamond" />
                    <span className="line-track" />
                    <span className="line-diamond" />
                </div>
            </div>

            {/* Cards */}
            <div className="cards-grid" ref={cardsRef}>
                {PROJECTS.map((project) => {
                    const SvgComponent = project.svg;
                    return (
                        <article className="project-card" key={project.id} ref={cardRef}>
                            <div className="card-border-glow" />
                            <div className="card-inner-bg" />
                            <div className="card-glow" />
                            <div className="scan" />

                            <div className="bg-num" aria-hidden="true">{project.number}</div>

                            <div className="svg-area">
                                <SvgComponent />
                            </div>

                            <div className="card-content">
                                <div className="card-top">
                                    <div>
                                        <p className="project-subtitle">{project.subtitle}</p>
                                        <h3 className="project-title">{project.title}</h3>
                                    </div>
                                    <span className="project-year">{project.year}</span>
                                </div>

                                <p className="project-description">{project.description}</p>

                                <div className="card-footer">
                                    <div className="tags">
                                        {project.tags.map((tag) => (
                                            <span className="tag" key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                    {project.link && (
                                        <a href={project.link} className="view-btn" aria-label="View project">
                                            <span>VIEW PROJECT</span>
                                            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5"
                                                    strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="bottom-info">
                <span className="line" />
                <span>ALL PROJECTS</span>
                <span className="line" />
            </div>

            <div className="water-reflection-top" />
            <div className="water-reflection-bottom" />

        </section>
    );
}