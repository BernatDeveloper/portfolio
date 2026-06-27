import { type RefObject, useEffect } from 'react';
import gsap from 'gsap';

export function useContactEntrance(
  sectionRef: RefObject<HTMLElement | null>,
  leftRef:    RefObject<HTMLDivElement | null>,
  rightRef:   RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const left    = leftRef.current;
    const right   = rightRef.current;
    if (!section || !left || !right) return;

    gsap.set(left,  { opacity: 0, x: -40 });
    gsap.set(right, { opacity: 0, x:  40 });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(left,  { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
        gsap.to(right, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.25 });
        obs.disconnect();
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    obs.observe(section);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
