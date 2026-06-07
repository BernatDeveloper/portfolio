import { type RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsEntrance(sectionRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.from('.pc', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: { each: 0.1, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom -60%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );
}
