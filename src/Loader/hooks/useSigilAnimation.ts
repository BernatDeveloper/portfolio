import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function useSigilAnimation(
    sigilRef: RefObject<SVGSVGElement | null>,
    pathsRef: RefObject<(SVGPathElement | null)[]>,
): void {

    // ── Draw-in ─────────────────────────────────────────────
    useGSAP(() => {
        if (!sigilRef.current) return;

        const paths = pathsRef.current ?? [];

        paths.forEach((el) => {
            if (!el) return;

            const len = el.getTotalLength();

            el.style.strokeDasharray = `${len}`;
            el.style.strokeDashoffset = `${len}`;

            el.dataset.len = `${len}`;
        });

        const tl = gsap.timeline({ delay: 0.3 });

        paths.forEach((el, i) => {
            if (!el) return;

            tl.to(
                el,
                {
                    strokeDashoffset: 0,
                    duration: 0.55 + i * 0.07,
                    ease: 'power2.inOut',
                },
                i * 0.16
            );
        });

        return () => {
            tl.kill();
        };

    }, { scope: sigilRef });

    // ── Rotación continua ────────────────────────────────────
    useGSAP(() => {
        if (!sigilRef.current) return;

        const rot = gsap.to(sigilRef.current, {
            rotation: 360,
            duration: 30,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 50%',
        });

        return () => {
            rot.kill();
        };

    }, { scope: sigilRef });
}