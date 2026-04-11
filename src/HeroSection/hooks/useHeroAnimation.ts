import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseHeroAnimationOptions {
  shouldAnimate: boolean;
}

export function useHeroAnimation({ shouldAnimate }: UseHeroAnimationOptions) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {

    const hero = heroRef.current;
    if (!hero || !shouldAnimate) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Título línea 1 — sube desde las brasas
      tl.fromTo('.line-1',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' },
        0.2
      )

      // 2. Título línea 2 — llega con escala más intenso (el nombre principal)
      .fromTo('.line-2',
        { opacity: 0, y: 80, scaleX: 1.08 },
        { opacity: 1, y: 0, scaleX: 1, duration: 1.2, ease: 'expo.out' },
        0.6
      )

      // 3. Eyebrow — compresión de letter-spacing (de abierto a normal)
      .fromTo('.hero-eyebrow',
        { opacity: 0, letterSpacing: '0.6em' },
        { opacity: 1, letterSpacing: 'var(--tracking-wide)', duration: 1.0, ease: 'power2.out' },
        0.8
      )

      // 4. Divisor — se expande desde el centro como una brasa que se enciende
      .fromTo('.hero-divider',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: 'expo.out', transformOrigin: 'center' },
        1.2
      )

      // 5. Botones — entran con resorte
      .fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' },
        1.5
      )

      // 6. Stats — stagger escalonado por cada stat
      .fromTo('.stat',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
        2.0
      );

      // Pulso de brillo continuo en el título (loop)
      gsap.to('.line-1', {
        textShadow: '0 0 60px var(--color-accent-alt), 0 0 120px var(--color-accent)',
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        delay: .8,
        ease: 'sine.inOut',
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return { heroRef };
};