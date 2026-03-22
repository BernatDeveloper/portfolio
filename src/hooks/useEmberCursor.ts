import { useEffect, useRef } from 'react';
import type { OptionsEmberCursor } from '../types';

export function useEmberCursor({
  size      = 16,
  glowColor = '255, 101, 32',
  coreColor = 'var(--color-gold)',
}: OptionsEmberCursor = {}) {
  const posRef    = useRef({ x: -200, y: -200 });
  const smoothRef = useRef({ x: -10, y: -10 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'ember-cursor';
    Object.assign(el.style, {
      position:      'fixed',
      top:           '0',
      left:          '0',
      width:         `${size}px`,
      height:        `${size}px`,
      borderRadius:  '50%',
      pointerEvents: 'none',
      zIndex:        '99999',
      willChange:    'transform',
      opacity:       '0',
      transition:    'opacity .1s, box-shadow .1s, background .1s, transform .06s',
    });
    document.body.appendChild(el);

    const styleTag = document.createElement('style');
    styleTag.id = 'ember-cursor-style';
    styleTag.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleTag);

    // Estado de hover — lo escribe useEmberHover vía el evento global
    let hovered = false;
    const onEmberHover  = () => { hovered = true; };
    const onEmberLeave  = () => { hovered = false; };
    window.addEventListener('ember:hover', onEmberHover);
    window.addEventListener('ember:leave', onEmberLeave);

    document.addEventListener('mousemove', (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      el.style.opacity = '1';
    });
    document.documentElement.addEventListener('mouseleave', () => {
      el.style.opacity = '0';
    });

    const BASE  = { scale: 1,   glow: 6,  glowA: 0.5, coreA: 0.85 };
    const HOVER = { scale: 2.2, glow: 22, glowA: 0.9, coreA: 1    };

    const tick = () => {
      const s  = smoothRef.current;
      const p  = posRef.current;
      s.x += (p.x - s.x) * 0.4;
      s.y += (p.y - s.y) * 0.4;

      const v = hovered ? HOVER : BASE;

      el.style.transform  = `translate(${s.x}px,${s.y}px) translate(-50%,-50%) scale(${v.scale})`;
      el.style.background = `radial-gradient(circle, ${coreColor} 0%, rgba(${glowColor},${v.coreA}) 40%, transparent 70%)`;
      el.style.boxShadow  = `0 0 ${v.glow}px ${v.glow * 0.4}px rgba(${glowColor},${v.glowA})`;

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('ember:hover', onEmberHover);
      window.removeEventListener('ember:leave', onEmberLeave);
      el.remove();
      document.getElementById('ember-cursor-style')?.remove();
    };
  }, [size, glowColor, coreColor]);
}