import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

const MIN_DURATION_MS = 3000;

interface LoaderProps {
  progress: number;
  isComplete: boolean;
  onExitStart?: () => void;
  onExitComplete?: () => void;
}

const SIGIL_PATHS = [
  // 1. Círculo exterior
  { d: 'M 100,14 a 86,86 0 1,1 -0.01,0 Z', len: 540 },
  // 2. Hexágono interior (r=58)
  { d: 'M 100,42 L 150.2,71 L 150.2,129 L 100,158 L 49.8,129 L 49.8,71 Z', len: 348 },
  // 3. Triángulo superior (llama)
  { d: 'M 100,30 L 142,110 L 58,110 Z', len: 262 },
  // 4. Triángulo inferior invertido (reflejo)
  { d: 'M 100,170 L 142,90 L 58,90 Z', len: 262 },
  // 5. Rombo central
  { d: 'M 100,72 L 120,100 L 100,128 L 80,100 Z', len: 112 },
  // 6. Ticks cardinales (N-E-S-O)
  { d: 'M 100,14 L 100,30 M 186,100 L 170,100 M 100,186 L 100,170 M 14,100 L 30,100', len: 64 },
];

let scrollBarWidth = 0;
let previousScrollY = 0;

const disableScroll = () => {
  // Guardamos la posición actual del scroll
  previousScrollY = window.scrollY;

  // Calculamos el ancho de la scrollbar para evitar salto de layout
  scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Bloqueo de scroll
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Compensamos el espacio de la scrollbar para que no salte el contenido
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  // En móviles/iOS ayuda mucho fijar la posición
  document.body.style.position = "fixed";
  document.body.style.top = `-${previousScrollY}px`;
  document.body.style.width = "100%";
};

const enableScroll = () => {
  // Restauramos todo
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  // Volvemos a la posición exacta donde estaba el usuario
  window.scrollTo(0, previousScrollY);
  window.dispatchEvent(new Event("resize"));
};

export const Loader: React.FC<LoaderProps> = ({
  progress,
  isComplete,
  onExitStart,
  onExitComplete,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const sigilRef = useRef<SVGSVGElement>(null);
  const sigilPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<(HTMLDivElement | null)[]>([]);

  const mountTimeRef = useRef(Date.now());
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    disableScroll();

    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
    sigilPathRefs.current.forEach((el) => {
      if (!el) return;
      const length = el.getTotalLength();

      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
    });

    const tl = gsap.timeline({ delay: 0.3 });
    sigilPathRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, {
        strokeDashoffset: 0,
        duration: 0.55 + i * 0.07,
        ease: 'power2.inOut',
      }, i * 0.16);
    });

    return () => { tl.kill(); };
  }, []);

  // ─── Rotación lenta del sigil completo ────────────────────────────────────
  useEffect(() => {
    if (!sigilRef.current) return;
    const rot = gsap.to(sigilRef.current, {
      rotation: 360,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
    return () => { rot.kill(); };
  }, []);

  // ─── Exit animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isComplete) return;

    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

    const timeoutId = setTimeout(() => {
      onExitStart?.();

      const tl = gsap.timeline({
        onComplete: () => {
          enableScroll();
          onExitComplete?.();
        }
      });

      // 1. Progress sale hacia abajo
      tl.to(progressWrapRef.current, {
        opacity: 0, y: 14,
        duration: 0.3, ease: 'power2.in',
      })
        // 2. Eyebrow sube
        .to(eyebrowRef.current, {
          opacity: 0, y: -12,
          duration: 0.28, ease: 'power2.in',
        }, '-=0.18')
        // 3. Divider colapsa
        .to(dividerRef.current, {
          scaleX: 0, opacity: 0,
          duration: 0.28, ease: 'power2.in',
        }, '-=0.18')
        // 4. Sigil se des-dibuja del interior al exterior
        .to(
          [...sigilPathRefs.current].reverse().filter(Boolean),
          {
            strokeDashoffset: (_i: number, el: SVGPathElement) =>
              parseFloat(el.style.strokeDasharray),
            stagger: 0.065,
            duration: 0.4,
            ease: 'power2.in',
          },
          '-=0.8'
        )
        // 5. Corners
        .to(cornersRef.current.filter(Boolean), {
          opacity: 0, stagger: 0.05,
          duration: 0.22, ease: 'power2.in',
        }, '-=0.28')
        // 7. Fade limpio del wrapper
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.7, ease: 'power2.inOut',
        }, '-=0.18')
        .to({}, { duration: 0.8 });

    }, remaining);

    return () => {
      clearTimeout(timeoutId);
      tlRef.current?.kill();
    };
  }, [isComplete]);


  return (
    <div ref={loaderRef} className="loader">

      {/* Corners */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
        <div
          key={pos}
          className={`loader-corner loader-corner--${pos}`}
          ref={el => { cornersRef.current[i] = el; }}
        />
      ))}

      {/* ── Contenido central ── */}
      <div className="loader-content">

        <p ref={eyebrowRef} className="loader-eyebrow">Initializing</p>

        {/* Sigil geométrico auto-dibujado */}
        <svg
          ref={sigilRef}
          className="loader-sigil"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sigilGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-lava)" />
              <stop offset="35%" stopColor="var(--color-accent)" />
              <stop offset="70%" stopColor="var(--color-gold)" />
              <stop offset="100%" stopColor="var(--color-accent-light)" />
            </linearGradient>
            <filter id="sigilGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {SIGIL_PATHS.map((sp, i) => (
            <path
              key={i}
              ref={el => { sigilPathRefs.current[i] = el; }}
              d={sp.d}
              fill="none"
              stroke="url(#sigilGrad)"
              strokeWidth={i === 0 ? 0.8 : i === 4 ? 2 : 1}
              strokeLinecap="butt"
              strokeLinejoin="round"
              filter="url(#sigilGlow)"
            />
          ))}
        </svg>

        <div ref={dividerRef} className="loader-divider" />

        {/* Progress */}
        <div ref={progressWrapRef} className="loader-progress-wrap">
          <div className="loader-bar">
            <div
              className="loader-bar__fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="loader-percent">
            <span className="loader-percent__num">
              {String(Math.round(progress)).padStart(3, '0')}
            </span>
            <span className="loader-percent__sym">%</span>
          </p>
        </div>

      </div>

      {/* Reflection */}
      <div className="loader-reflection" />
    </div>
  );
};