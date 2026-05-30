import type{ RefObject, MutableRefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { BurstFn, FieldRefs } from '../types';

interface Params {
  sectionRef:  RefObject<HTMLElement | null>;
  eyeRef:      RefObject<HTMLDivElement | null>;
  eyeCountRef: RefObject<HTMLDivElement | null>;
  eyeLabelRef: RefObject<HTMLDivElement | null>;
  orbRefs:     RefObject<HTMLAnchorElement | null>[];
  fieldRefs:   FieldRefs[];
  filledRef:   MutableRefObject<number>;
  burstRef:    MutableRefObject<BurstFn | null>;
}

export function useRitualGSAP({
  sectionRef,
  eyeRef,
  eyeCountRef,
  eyeLabelRef,
  orbRefs,
  fieldRefs,
  filledRef,
  burstRef,
}: Params) {
  useGSAP(() => {
    const eye      = eyeRef.current!;
    const eyeCount = eyeCountRef.current!;
    const eyeLabel = eyeLabelRef.current!;
    const orbEls   = orbRefs.map(r => r.current!);
    const cleanup: Array<() => void> = [];

    // ── Invoke ritual ──────────────────────────────────
    function invokeRitual() {
      burstRef.current?.(55);

      gsap.to('.ring', {
        borderColor: 'rgba(255,209,102,.7)',
        duration: 0.2, stagger: 0.06, yoyo: true, repeat: 4,
      });
      gsap.to('.eye-glow', {
        opacity: 0, duration: 0.7, ease: 'power2.out',
        onComplete: () => gsap.set('.eye-glow', { opacity: 1 }),
      });
      gsap.to('.eye-glow2', {
        opacity: 0, duration: 1, ease: 'power2.out',
        onComplete: () => gsap.set('.eye-glow2', { opacity: 1 }),
      });

      eye.classList.remove('ready');
      eye.style.pointerEvents = 'none';

      setTimeout(() => {
        gsap.to(eyeCount, {
          opacity: 0, scale: 0.6, duration: 0.25,
          onComplete: () => {
            eyeCount.textContent = '✦';
            gsap.to(eyeCount, {
              opacity: 1, scale: 1.3,
              color: 'var(--color-gold)',
              duration: 0.4, ease: 'back.out(2)',
            });
          },
        });
        eyeLabel.textContent = 'sent!';
        gsap.to(eyeLabel, { color: 'var(--color-gold)', duration: 0.4 });
        gsap.to('.eye-unlock-ring', {
          borderColor: 'rgba(255,165,0,.4)',
          boxShadow:   '0 0 20px rgba(255,165,0,.15)',
          duration: 0.5,
        });
      }, 650);
    }

    // ── Orb hover tweens ───────────────────────────────
    orbEls.forEach(el => {
      const enter = () =>
        gsap.to(el.querySelector('.soc-bg'), {
          scale: 1.3, duration: 0.35, ease: 'power2.out',
        });
      const leave = () =>
        gsap.to(el.querySelector('.soc-bg'), {
          scale: 1, duration: 0.4, ease: 'elastic.out(1,.5)',
        });
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      cleanup.push(
        () => el.removeEventListener('mouseenter', enter),
        () => el.removeEventListener('mouseleave', leave),
      );
    });

    // ── Field input handlers ───────────────────────────
    fieldRefs.forEach(({ inp, totem, dot, line, config }) => {
      let wasFilled = false;

      const onInput = () => {
        const el      = inp.current!;
        const isFilled = config.validate(el.value);

        if (isFilled && !wasFilled) {
          wasFilled = true;
          filledRef.current++;
          totem.current!.classList.add('filled');
          dot.current!.classList.add('done');
          line.current!.classList.add('lit');
          gsap.to(eye, {
            scale: 1.12, duration: 0.2,
            yoyo: true, repeat: 1,
            ease: 'power2.inOut', overwrite: 'auto',
          });
        } else if (!isFilled && wasFilled) {
          wasFilled = false;
          filledRef.current--;
          totem.current!.classList.remove('filled');
          dot.current!.classList.remove('done');
          line.current!.classList.remove('lit');
        }

        const filled = filledRef.current;

        if (!eye.classList.contains('ready')) {
          eyeCount.textContent = `${filled}/3`;
        }

        if (filled === 3) {
          eye.classList.add('ready');
          gsap.to(eyeCount, {
            opacity: 0, scale: 0.6, duration: 0.2, overwrite: true,
            onComplete: () => {
              eyeCount.textContent = '⊕';
              gsap.to(eyeCount, {
                opacity: 1, scale: 1,
                color: 'var(--color-gold)',
                duration: 0.35, ease: 'back.out(2)', overwrite: true,
              });
            },
          });
          eyeLabel.textContent = 'TAP TO SEND';
          gsap.to('.eye-glow', { opacity: 1, duration: 0.4 });
          gsap.to('.ring', {
            borderColor: 'rgba(244,140,6,.45)',
            duration: 0.4, stagger: 0.06, yoyo: true, repeat: 1,
          });
        } else if (eye.classList.contains('ready')) {
          eye.classList.remove('ready');
          eyeCount.textContent = `${filled}/3`;
          eyeLabel.textContent = 'offerings';
          gsap.to(eyeCount, {
            color: 'var(--color-text)', scale: 1,
            opacity: 1, duration: 0.3, overwrite: true,
          });
          gsap.to('.eye-glow', { opacity: 0.5, duration: 0.4 });
        }
      };

      const onTotemClick = () => inp.current?.focus();

      inp.current!.addEventListener('input', onInput);
      totem.current!.addEventListener('click', onTotemClick);

      cleanup.push(
        () => inp.current?.removeEventListener('input', onInput),
        () => totem.current?.removeEventListener('click', onTotemClick),
      );
    });

    // ── Eye click ──────────────────────────────────────
    const onEyeClick = () => { if (filledRef.current === 3) invokeRitual(); };
    eye.addEventListener('click', onEyeClick);
    cleanup.push(() => eye.removeEventListener('click', onEyeClick));

    // ── Entrance animations ────────────────────────────
    gsap.from('.ritual-header', { y: -30, opacity: 0, duration: 1,   ease: 'power3.out', delay: 0.2 });
    gsap.from('.ring',          { scale: 0, opacity: 0, duration: 1.3, ease: 'power3.out', stagger: 0.12, delay: 0.3 });
    gsap.from('#t1',            { y: -44, opacity: 0, duration: 1,   ease: 'power3.out', delay: 0.7 });
    gsap.from('#t2',            { x: -44, opacity: 0, duration: 1,   ease: 'power3.out', delay: 0.85 });
    gsap.from('#t3',            { x:  44, opacity: 0, duration: 1,   ease: 'power3.out', delay: 0.85 });
    gsap.from('#ritual-status', { y: 12,  opacity: 0, duration: 0.7, ease: 'power2.out', delay: 1.2 });
    orbEls.forEach((el, i) =>
      gsap.from(el, { opacity: 0, scale: 0.4, duration: 0.7, ease: 'back.out(2)', delay: 1.1 + i * 0.15 }),
    );

    return () => cleanup.forEach(fn => fn());

  }, { scope: sectionRef });
}
