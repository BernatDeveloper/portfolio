import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { experiences } from "./data/experience";
import { buildZigzagPath } from "./utils/zigZagPath";
import Card from "./components/Card";
import "./ExperienceTimeline.css";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 241;
const BATCH_SIZE  = 20;

const currentFrameSrc = (index: number) =>
    `/frames/frame_${(index + 1).toString().padStart(3, "0")}.avif`;

// ─── Props nuevas ───────────────────────────────────────────────────────────
interface ExperienceTimelineProps {
  /** Llamado cada vez que se carga una imagen más. Valor: 0–100 */
  onProgress?: (percent: number) => void;
  /** Llamado cuando los 241 frames están en memoria */
  onLoaded?: () => void;
}
// ────────────────────────────────────────────────────────────────────────────

export default function ExperienceTimeline({
  onProgress,
  onLoaded,
}: ExperienceTimelineProps) {
    const canvasRef      = useRef<HTMLCanvasElement>(null);
    const imagesRef      = useRef<(HTMLImageElement | null)[]>(
        new Array(FRAME_COUNT).fill(null)
    );
    const videoFramesRef = useRef({ frame: 0 });
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // ─ Contador interno para reportar progreso ─
    const loadedCountRef = useRef(0);

    const sectionRef   = useRef<HTMLElement>(null);
    const timelineRef  = useRef<HTMLDivElement>(null);
    const svgRef       = useRef<SVGSVGElement>(null);
    const pathRef      = useRef<SVGPathElement>(null);
    const pathLenRef   = useRef(0);
    const nodeRefs     = useRef(experiences.map(() => React.createRef<HTMLDivElement>()));
    const [visibleNodes, setVisibleNodes] = useState<boolean[]>(
        new Array(experiences.length).fill(false)
    );
    const [svgHeight, setSvgHeight] = useState(1200);

    const renderFrame = useCallback((forcedFrame?: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        const frame = forcedFrame ?? videoFramesRef.current.frame;
        const img   = imagesRef.current[frame];
        if (!img?.complete || !img.naturalWidth) return;

        ctx.clearRect(0, 0, w, h);

        const imgRatio    = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let drawW: number, drawH: number, x: number, y: number;

        if (imgRatio > canvasRatio) {
            drawH = h;
            drawW = h * imgRatio;
            x     = (w - drawW) / 2;
            y     = 0;
        } else {
            drawW = w;
            drawH = w / imgRatio;
            x     = 0;
            y     = (h - drawH) / 2;
        }
        ctx.drawImage(img, x, y, drawW, drawH);
    }, []);

    // ─── Carga de imágenes con reporte de progreso ─────────────────────────
    useEffect(() => {
        let cancelled = false;

        /** Incrementa el contador y notifica al padre */
        const reportProgress = () => {
            loadedCountRef.current++;
            const pct = Math.round((loadedCountRef.current / FRAME_COUNT) * 100);
            onProgress?.(Math.min(pct, 100));
        };

        const loadBatch = (startIdx: number): Promise<void> => {
            const end      = Math.min(startIdx + BATCH_SIZE, FRAME_COUNT);
            const promises: Promise<void>[] = [];

            for (let i = startIdx; i < end; i++) {
                const idx = i;
                promises.push(
                    new Promise((resolve) => {
                        const img      = new Image();
                        img.onload = img.onerror = () => {
                            if (cancelled) return resolve();
                            imagesRef.current[idx] = img;
                            reportProgress();
                            resolve();
                        };
                        img.src = currentFrameSrc(idx);
                    })
                );
            }

            return Promise.all(promises).then(() => {
                if (!cancelled && end < FRAME_COUNT) {
                    return loadBatch(end);
                }
            });
        };

        // Carga el primer frame de inmediato para que el canvas no esté vacío
        const firstImg    = new Image();
        firstImg.onload   = () => {
            imagesRef.current[0] = firstImg;
            reportProgress();
            renderFrame(0);
            loadBatch(1).then(() => {
                if (!cancelled) {
                    setImagesLoaded(true);
                    onLoaded?.();
                }
            });
        };
        firstImg.onerror = () => {
            // Si falla el primero, seguimos con el resto igualmente
            loadBatch(0).then(() => {
                if (!cancelled) {
                    setImagesLoaded(true);
                    onLoaded?.();
                }
            });
        };
        firstImg.src = currentFrameSrc(0);

        return () => { cancelled = true; };
    }, [renderFrame, onProgress, onLoaded]);
    // ───────────────────────────────────────────────────────────────────────

    const rebuildPath = useCallback(() => {
        const svg  = svgRef.current;
        const path = pathRef.current;
        if (!svg || !path) return;

        const svgTop = svg.getBoundingClientRect().top + window.scrollY;
        const svgW   = svg.getBoundingClientRect().width;

        const stops = nodeRefs.current
            .map((ref) => {
                const el = ref.current;
                if (!el) return null;
                const r    = el.getBoundingClientRect();
                const absY = r.top + window.scrollY + r.height / 2;
                const relY = absY - svgTop;
                const isLeft = el.dataset.side === "left";
                const x      = isLeft ? svgW * 0.37 : svgW * 0.63;
                return { x, y: relY };
            })
            .filter(Boolean) as { x: number; y: number }[];

        if (stops.length < 2) return;

        const maxY = Math.max(...stops.map((s) => s.y));
        setSvgHeight(maxY + 80);

        const d   = buildZigzagPath(stops);
        path.setAttribute("d", d);
        const len = path.getTotalLength();
        pathLenRef.current              = len;
        path.style.strokeDasharray      = `${len}`;
        path.style.strokeDashoffset     = `${len}`;
    }, []);

    useEffect(() => {
        const t = setTimeout(rebuildPath, 150);
        return () => clearTimeout(t);
    }, [rebuildPath]);

    useGSAP(() => {
        const canvas  = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setCanvasSize = () => {
            const dpr  = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width       = rect.width  * dpr;
            canvas.height      = rect.height * dpr;
            canvas.style.width  = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            renderFrame();
            ScrollTrigger.refresh();
        };

        const handleResize = () => { setCanvasSize(); rebuildPath(); };

        setCanvasSize();
        rebuildPath();
        window.addEventListener("resize", handleResize);

        if (!imagesLoaded) return;

        const totalFrames    = imagesRef.current.length - 1;
        const n              = experiences.length;
        const scrollDistance = window.innerHeight * 2;

        setVisibleNodes((prev) => {
            const initial = [...prev];
            initial[0]    = true;
            return initial;
        });

        const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        });

        const animationTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress    = self.progress;
                const targetFrame = Math.min(
                    Math.floor(progress * totalFrames),
                    totalFrames
                );

                if (targetFrame !== videoFramesRef.current.frame) {
                    videoFramesRef.current.frame = targetFrame;
                    renderFrame();
                }

                if (timelineRef.current) {
                    const contentH     = timelineRef.current.scrollHeight;
                    const viewH        = window.innerHeight;
                    const maxTranslate = Math.max(0, contentH - viewH);
                    gsap.set(timelineRef.current, { y: -maxTranslate * progress });
                }

                const len = pathLenRef.current;
                if (pathRef.current && len > 0) {
                    pathRef.current.style.strokeDashoffset = `${len * (1 - progress)}`;
                }

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
    }, [imagesLoaded, renderFrame, rebuildPath]);

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
                                    <stop offset="0%"   stopColor="var(--color-accent-light)" />
                                    <stop offset="35%"  stopColor="var(--color-lava)" />
                                    <stop offset="65%"  stopColor="var(--color-gold)" />
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