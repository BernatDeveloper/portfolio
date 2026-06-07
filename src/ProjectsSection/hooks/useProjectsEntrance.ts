import { type RefObject, useEffect } from 'react';
import gsap from 'gsap';

export function useProjectsEntrance(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.pc'));
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 50 });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: { each: 0.1, from: 'start' },
          ease: 'power3.out',
          delay: 0.1,
        });
        obs.disconnect();
      },
      { threshold: 0.1, rootMargin: '0px 0px -30% 0px' }
    );

    obs.observe(section);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
