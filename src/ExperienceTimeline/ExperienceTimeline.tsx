import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { experiences } from "./data/experience";
import { buildZigzagPath } from "./utils/zigZagPath";
import Card from "./components/Card";
import "./ExperienceTimeline.css";

gsap.registerPlugin(ScrollTrigger);

const FRAME_BUFFER = 25;
const FRAME_COUNT = 241;

const currentFrameSrc = (index: number) =>
    `/frames/frame_${(index + 1).toString().padStart(3, "0")}.avif`;

export default function ExperienceTimeline() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadingRef = useRef(false);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(
        new Array(FRAME_COUNT).fill(null)
    );
    const videoFramesRef = useRef({ frame: 0 });
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const pathLenRef = useRef(0);
    const nodeRefs = useRef(experiences.map(() => React.createRef<HTMLDivElement>()));
    const [visibleNodes, setVisibleNodes] = useState<boolean[]>(
        new Array(experiences.length).fill(false)
    );
    const [svgHeight, setSvgHeight] = useState(1200);

    const loadFramesAround = useCallback((centerFrame: number) => {
        const start = Math.max(0, centerFrame - FRAME_BUFFER);
        const end = Math.min(FRAME_COUNT - 1, centerFrame + FRAME_BUFFER);

        for (let i = start; i <= end; i++) {
            if (imagesRef.current[i]) continue;
            const img = new Image();
            img.src = currentFrameSrc(i);
            imagesRef.current[i] = img;
        }
    }, []);

    useEffect(() => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        const firstImg = new Image();
        firstImg.onload = () => {
            imagesRef.current[0] = firstImg;
            renderFrame(0);
            loadFramesAround(0);
            setImagesLoaded(true);
        };
        firstImg.onerror = () => setImagesLoaded(true);
        firstImg.src = currentFrameSrc(0);
    }, [loadFramesAround]);

    const renderFrame = useCallback((forcedFrame?: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        const frame = forcedFrame ?? videoFramesRef.current.frame;
        const img = imagesRef.current[frame];
        if (!img?.complete || !img.naturalWidth) return;

        ctx.clearRect(0, 0, w, h);

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let drawW: number, drawH: number, x: number, y: number;

        if (imgRatio > canvasRatio) {
            drawH = h;
            drawW = h * imgRatio;
            x = (w - drawW) / 2;
            y = 0;
        } else {
            drawW = w;
            drawH = w / imgRatio;
            x = 0;
            y = (h - drawH) / 2;
        }
        ctx.drawImage(img, x, y, drawW, drawH);
    }, []);

    const rebuildPath = useCallback(() => {
        const svg = svgRef.current;
        const path = pathRef.current;
        if (!svg || !path) return;

        const svgTop = svg.getBoundingClientRect().top + window.scrollY;
        const svgW = svg.getBoundingClientRect().width;

        const stops = nodeRefs.current
            .map((ref) => {
                const el = ref.current;
                if (!el) return null;
                const r = el.getBoundingClientRect();
                const absY = r.top + window.scrollY + r.height / 2;
                const relY = absY - svgTop;
                const isLeft = el.dataset.side === "left";
                const x = isLeft ? svgW * 0.37 : svgW * 0.63;
                return { x, y: relY };
            })
            .filter(Boolean) as { x: number; y: number }[];

        if (stops.length < 2) return;

        const maxY = Math.max(...stops.map((s) => s.y));
        setSvgHeight(maxY + 80);

        const d = buildZigzagPath(stops);
        path.setAttribute("d", d);
        const len = path.getTotalLength();
        pathLenRef.current = len;
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
    }, []);

    useEffect(() => {
        const t = setTimeout(rebuildPath, 150);
        return () => clearTimeout(t);
    }, [rebuildPath]);

    useGSAP(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderFrame();
        ScrollTrigger.refresh();
    };

    const handleResize = () => {
        setCanvasSize();
        rebuildPath();
    };

    setCanvasSize();
    rebuildPath();
    window.addEventListener("resize", handleResize);

    if (!imagesLoaded) return;

    const totalFrames = imagesRef.current.length - 1;
    const n = experiences.length;
    const scrollDistance = window.innerHeight * 3;

    /* 🔒 PIN TRIGGER */
    const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
    });

    /* 🎬 ANIMATION TRIGGER */
    const animationTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
        end: `+=${scrollDistance}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            const progress = self.progress;

            /* 🎞 Frames */
            const targetFrame = Math.min(
                Math.floor(progress * totalFrames),
                totalFrames
            );

            if (targetFrame !== videoFramesRef.current.frame) {
                videoFramesRef.current.frame = targetFrame;
                loadFramesAround(targetFrame);
                renderFrame();
            }

            /* 📜 Timeline scroll interno */
            if (timelineRef.current) {
                const contentH = timelineRef.current.scrollHeight;
                const viewH = window.innerHeight;
                const maxTranslate = Math.max(0, contentH - viewH);
                gsap.set(timelineRef.current, { y: -maxTranslate * progress });
            }

            /* 🔥 Path draw */
            const len = pathLenRef.current;
            if (pathRef.current && len > 0) {
                pathRef.current.style.strokeDashoffset =
                    `${len * (1 - progress)}`;
            }

            /* 🧩 Cards visibility */
            setVisibleNodes((prev) => {
                const newVis = experiences.map((_, i) => {
                    const threshold = i / n;
                    return progress >= threshold;
                });
                const changed = prev.some((v, i) => v !== newVis[i]);
                return changed ? newVis : prev;
            });
        },
    });

    return () => {
        window.removeEventListener("resize", handleResize);
        pinTrigger.kill();
        animationTrigger.kill();
    };

}, [imagesLoaded, renderFrame, rebuildPath, loadFramesAround]);

    return (
        <section ref={sectionRef} className="timeline-section">
            <canvas ref={canvasRef} className="timeline-canvas" />

            <div className="timeline-overlay" />
            <div className="timeline-vignette" />

            <div className="timeline-layer">
                <div ref={timelineRef} className="timeline-inner">
                    <div className="timeline-track">
                        <svg
                            ref={svgRef}
                            className="timeline-svg"
                            style={{ height: svgHeight }}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-accent-light)" />
                                    <stop offset="35%" stopColor="var(--color-lava)" />
                                    <stop offset="65%" stopColor="var(--color-gold)" />
                                    <stop offset="100%" stopColor="var(--color-lava)" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path
                                ref={pathRef}
                                fill="none"
                                stroke="url(#fireGrad)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                filter="url(#glow)"
                            />
                        </svg>

                        {experiences.map((exp, i) => (
                            <Card
                                key={exp.year}
                                exp={exp}
                                visible={visibleNodes[i]}
                                nodeRef={nodeRefs.current[i] as React.RefObject<HTMLDivElement>}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}