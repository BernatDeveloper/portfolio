import { type RefObject, useEffect } from 'react';
import gsap from 'gsap';

export function useFooterScroll(footerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const eyebrow = el.querySelector<HTMLElement>('.ft-eyebrow');
    const line1   = el.querySelector<HTMLElement>('.ft-line1');
    const line2   = el.querySelector<HTMLElement>('.ft-line2');
    const line3   = el.querySelector<HTMLElement>('.ft-line3');
    const desc    = el.querySelector<HTMLElement>('.ft-desc');
    const email   = el.querySelector<HTMLElement>('.ft-email');
    const divider = el.querySelector<HTMLElement>('.ft-divider');
    const bottom  = el.querySelector<HTMLElement>('.ft-bottom');

    // Paused timeline — progress is driven by scroll position each frame
    const tl = gsap.timeline({ paused: true });
    tl
      .fromTo(eyebrow, { opacity: 0, y: 20   }, { opacity: 1, y: 0,  duration: 0.25, ease: 'none' }, 0)
      .fromTo(line1,   { opacity: 0, x: -220 }, { opacity: 1, x: 0,  duration: 0.75, ease: 'none' }, 0.05)
      .fromTo(line2,   { opacity: 0, x:  220 }, { opacity: 1, x: 0,  duration: 0.75, ease: 'none' }, 0.2)
      .fromTo(line3,   { opacity: 0, x: -220 }, { opacity: 1, x: 0,  duration: 0.75, ease: 'none' }, 0.35)
      .fromTo(desc,    { opacity: 0, y: 40   }, { opacity: 1, y: 0,  duration: 0.35, ease: 'none' }, 0.65)
      .fromTo(email,   { opacity: 0, y: 30   }, { opacity: 1, y: 0,  duration: 0.35, ease: 'none' }, 0.78)
      .fromTo(divider, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'none', transformOrigin: 'center' }, 0.88)
      .fromTo(bottom,  { opacity: 0, y: 20   }, { opacity: 1, y: 0,  duration: 0.25, ease: 'none' }, 0.95);

    // Map footer position → [0, 1]:
    //   0 = footer top at viewport bottom (just appearing)
    //   1 = footer top has travelled 70% of the viewport height upward
    function updateProgress() {
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const viewH    = window.innerHeight;
      const scrolled = viewH - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (viewH * 0.7)));
      tl.progress(progress);
    }

    let rafId: number;
    function loop() {
      updateProgress();
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      tl.kill();
    };
  }, [footerRef]);
}
