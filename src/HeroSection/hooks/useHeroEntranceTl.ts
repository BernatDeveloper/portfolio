// hooks/useHeroEntranceTl.ts
import type { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type AnyRef = RefObject<HTMLElement | null>;

interface UseHeroEntranceTlProps {
  scope: RefObject<HTMLElement | null>;
  shouldAnimate: boolean;

  eyebrowRef: AnyRef;
  line1Ref: AnyRef;
  line2Ref: AnyRef;
  dividerRef: AnyRef;
  ctaRef: AnyRef;
  statsRef: AnyRef;
  cornerTLRef: AnyRef;
  cornerTRRef: AnyRef;
}

export const useHeroEntranceTl = ({
  scope,
  shouldAnimate,
  eyebrowRef,
  line1Ref,
  line2Ref,
  dividerRef,
  ctaRef,
  statsRef,
  cornerTLRef,
  cornerTRRef,
}: UseHeroEntranceTlProps) => {

  useGSAP(() => {

    const elements = [
      eyebrowRef.current,
      line1Ref.current,
      line2Ref.current,
      dividerRef.current,
      ctaRef.current,
      statsRef.current,
      cornerTLRef.current,
      cornerTRRef.current,
    ].filter(Boolean) as HTMLElement[];

    // Estado inicial
    gsap.set(elements, { opacity: 0, y: 20 });

    if (dividerRef.current) {
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'center',
      });
    }

    if (!shouldAnimate) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl
      .to(
        [cornerTLRef.current, cornerTRRef.current].filter(Boolean),
        {
          opacity: 0.5,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
        }
      )
      .to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
      }, '-=0.35')
      .to(line1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
      }, '-=0.45')
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
      }, '-=0.6')
      .to(dividerRef.current, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.55,
        ease: 'power2.out',
      }, '-=0.5')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.4')
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.45');

    return () => {
      tl.kill();
    };

  }, {
    scope,
    dependencies: [shouldAnimate],
    revertOnUpdate: true,
  });
};