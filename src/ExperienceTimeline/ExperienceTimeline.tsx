import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { experiences } from "./data/experience";
import { buildZigzagPath } from "./utils/zigZagPath";
import Card from "./components/Card";
import "./ExperienceTimeline.css";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadingRef = useRef(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
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

    useEffect(() => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        const frameCount = 241;
        const currentFrame = (index: number) =>
            `/frames/frame_${(index + 1).toString().padStart(3, "0")}.png`;

        let imagesToLoad = frameCount;
        const images: HTMLImageElement[] = [];
        imagesRef.current = images;

        const onLoadOrError = () => {
            imagesToLoad--;
            if (imagesToLoad <= 0) {
                setImagesLoaded(true);
                renderFrame();
            }
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.onload = onLoadOrError;
            img.onerror = onLoadOrError;
            img.src = currentFrame(i);
            images.push(img);
        }

        const firstImg = new Image();
        firstImg.onload = () => renderFrame(0);
        firstImg.src = currentFrame(0);
    }, []);

    const renderFrame = useCallback((forcedFrame?: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        const frame = forcedFrame ?? videoFramesRef.current.frame;
        const img = imagesRef.current[frame];
        if (img?.complete && img.naturalWidth) {
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = w / h;
            let drawW, drawH, x, y;
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
        }
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
        window.addEventListener("resize", rebuildPath);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", rebuildPath);
        };
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

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        if (!imagesLoaded) return;

        const totalFrames = imagesRef.current.length - 1;
        const n = experiences.length;
        const scrollDistance = window.innerHeight * 3;

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;

                const targetFrame = Math.min(
                    Math.floor(progress * totalFrames),
                    totalFrames
                );
                videoFramesRef.current.frame = targetFrame;
                renderFrame();

                if (timelineRef.current) {
                    const contentH = timelineRef.current.scrollHeight;
                    const viewH = window.innerHeight;
                    const maxTranslate = Math.max(0, contentH - viewH);
                    gsap.set(timelineRef.current, { y: -maxTranslate * progress });
                }

                const len = pathLenRef.current;
                if (pathRef.current && len > 0) {
                    pathRef.current.style.strokeDashoffset = `${len * (1 - progress)}`;
                }

                const newVis = experiences.map((_, i) => {
                    const threshold = i / n;
                    return progress >= threshold;
                });
                setVisibleNodes(newVis);
            },
        });

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [imagesLoaded, renderFrame]);

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
                rel="stylesheet"
            />
            <section
                ref={sectionRef}
                className="timeline-section"
            >
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
                                        <stop offset="0%" stopColor="#ff6520" />
                                        <stop offset="35%" stopColor="#e03800" />
                                        <stop offset="65%" stopColor="#f5a020" />
                                        <stop offset="100%" stopColor="#e03800" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
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
        </>
    );
}