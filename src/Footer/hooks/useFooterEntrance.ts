import { type RefObject, useEffect } from 'react';
import gsap from 'gsap';

export function useFooterEntrance(
  footerRef: RefObject<HTMLElement | null>,
  brandRef:  RefObject<HTMLDivElement | null>,
  navRef:    RefObject<HTMLElement | null>,
  bottomRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const footer = footerRef.current;
    const brand  = brandRef.current;
    const nav    = navRef.current;
    const bottom = bottomRef.current;
    if (!footer || !brand || !nav || !bottom) return;

    gsap.set(brand,  { opacity: 0, x: -30 });
    gsap.set(nav,    { opacity: 0, x:  30 });
    gsap.set(bottom, { opacity: 0, y:  12 });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        footer.classList.add('ft--visible');
        gsap.to(brand,  { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 });
        gsap.to(nav,    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.3  });
        gsap.to(bottom, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.55 });
        obs.disconnect();
      },
      { threshold: 0.15 },
    );

    obs.observe(footer);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
