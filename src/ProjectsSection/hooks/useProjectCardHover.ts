import { type RefObject } from 'react';
import gsap from 'gsap';

export function useProjectCardHover(cardRef: RefObject<HTMLElement | null>) {
  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    const circles = [...card.querySelectorAll<SVGCircleElement>('circle.sc')].filter(
      (c) => parseFloat(c.getAttribute('r') ?? '0') < 20
    );

    circles.forEach((c) => {
      const cx = parseFloat(c.getAttribute('cx') ?? '0');
      const cy = parseFloat(c.getAttribute('cy') ?? '0');
      gsap.to(c, {
        attr: { cx: cx + (Math.random() - 0.5) * 28, cy: cy + (Math.random() - 0.5) * 28 },
        duration: 0.38,
        ease: 'power2.out',
        onComplete: () =>
          gsap.to(c, { attr: { cx, cy }, duration: 0.55, ease: 'elastic.out(1,.4)' }),
      });
    });
  };

  return { handleMouseEnter };
}
