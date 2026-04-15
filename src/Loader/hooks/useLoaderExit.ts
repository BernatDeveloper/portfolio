import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { UseLoaderExitOptions } from '../types';

const MIN_DURATION_MS = 3000;

export function useLoaderExit({
  isComplete,
  loaderRef,
  eyebrowRef,
  sigilPathRefs,
  dividerRef,
  progressWrapRef,
  cornersRef,
  onExitStart,
  onExitComplete,
}: UseLoaderExitOptions): void {
  const mountTimeRef = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(() => {
    if (!isComplete) return;

    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

    timeoutRef.current = setTimeout(() => {
      onExitStart?.();

      gsap
        .timeline({ onComplete: onExitComplete })
        // 1. Progress bar baja
        .to(progressWrapRef.current, {
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
        // 4. Paths del sigil se des-dibujan (interior → exterior)
        .to(
          [...(sigilPathRefs.current ?? [])].reverse().filter(Boolean),
          {
            strokeDashoffset: (_i: number, el: SVGPathElement) =>
              parseFloat(el.style.strokeDasharray),
            stagger: 0.065,
            duration: 0.4,
            ease: 'power2.in',
          },
          '-=0.8',
        )
        // 5. Corners desaparecen
        .to(
          (cornersRef.current ?? []).filter(Boolean),
          { opacity: 0, stagger: 0.05, duration: 0.22, ease: 'power2.in' },
          '-=0.28',
        )
        // 6. Fade final del wrapper
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.7, ease: 'power2.inOut',
        }, '-=0.18')
        .to({}, { duration: 0.8 });
    }, remaining);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, { dependencies: [isComplete] });
}