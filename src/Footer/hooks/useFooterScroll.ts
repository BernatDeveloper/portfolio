import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useFooterScroll(
  footerRef: RefObject<HTMLElement | null>,
  textRef:   RefObject<HTMLDivElement | null>,
) {
  useGSAP(() => {
    const footer = footerRef.current;
    const text   = textRef.current;
    if (!footer || !text) return;

    const lines = text.querySelectorAll('.ft-line');

    gsap.set(lines, { opacity: 0, y: 60 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start:   'top 88%',
        end:     'top 38%',
        scrub:   1.4,
      },
    });

    tl.to(lines[0], { opacity: 1, y: 0, ease: 'power3.out' }, 0)
      .to(lines[1], { opacity: 1, y: 0, ease: 'power3.out' }, 0.35);

  }, { dependencies: [], scope: footerRef });
}
