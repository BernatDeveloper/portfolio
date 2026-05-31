import { useEffect, useRef } from 'react';

export interface OptionsEmberCursor {
  /** Tamaño del núcleo en px (default 10) */
  size?: number;
  /** Color RGB del glow en idle, ej. '255, 101, 32' */
  glowColor?: string;
  /** Color del núcleo en idle */
  coreColor?: string;
}

/** Devuelve true si el dispositivo es táctil (móvil / tablet) */
function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function useEmberCursor({
  size      = 10,
  glowColor = '255, 101, 32',
  coreColor = '#ffd060',
}: OptionsEmberCursor = {}) {
  const posRef    = useRef({ x: -500, y: -500 });
  const smoothRef = useRef({ x: -500, y: -500 });
  const rafRef    = useRef<number>(0);
  const hoveredRef = useRef(false);

  useEffect(() => {
    // No inicializar en dispositivos táctiles
    if (isTouchDevice()) return;

    // ── Canvas para partículas ──────────────────────────────────────
    const canvas = document.createElement('canvas');
    canvas.id = 'ember-trail-canvas';
    Object.assign(canvas.style, {
      position:      'fixed',
      top:           '0',
      left:          '0',
      pointerEvents: 'none',
      zIndex:        '99998',
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ── Núcleo ─────────────────────────────────────────────────────
    const core = document.createElement('div');
    core.id = 'ember-cursor-core';
    Object.assign(core.style, {
      position:      'fixed',
      top:           '0',
      left:          '0',
      width:         `${size}px`,
      height:        `${size}px`,
      borderRadius:  '50%',
      pointerEvents: 'none',
      zIndex:        '99999',
      opacity:       '0',
      willChange:    'transform',
    });
    document.body.appendChild(core);

    // ── Ocultar cursor nativo ──────────────────────────────────────
    const styleTag = document.createElement('style');
    styleTag.id = 'ember-cursor-style';
    styleTag.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleTag);

    // ── Partículas ────────────────────────────────────────────────
    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number;
      size: number;
      hue: number;
      light: number;
      gravity: number;
    }
    interface Spark {
      x: number; y: number;
      vx: number; vy: number;
      life: number;
    }

    const particles: Particle[] = [];
    const sparks: Spark[] = [];

    function spawnParticles(x: number, y: number, isHover: boolean) {
      const count = isHover ? 4 : 2;
      for (let i = 0; i < count; i++) {
        // Idle: caen hacia abajo. Hover: explotan 360°
        const angle = isHover
          ? Math.random() * Math.PI * 2
          : Math.PI * 1.3 + (Math.random() - 0.5) * 1.0;
        const speed = isHover
          ? Math.random() * 2.5 + 0.5
          : Math.random() * 1.5 + 0.3;
        particles.push({
          x, y,
          vx:      Math.cos(angle) * speed,
          vy:      Math.sin(angle) * speed - (isHover ? 0 : 0.4),
          life:    1,
          size:    isHover ? Math.random() * 4 + 1.5 : Math.random() * 3 + 1,
          hue:     Math.random() * 40 + 10,
          light:   isHover ? 70 : 55,
          gravity: isHover ? 0.06 : 0.04,
        });
      }
    }

    function spawnSparks(x: number, y: number) {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        sparks.push({
          x, y,
          vx:   Math.cos(angle) * (Math.random() * 3 + 1),
          vy:   Math.sin(angle) * (Math.random() * 3 + 1),
          life: 1,
        });
      }
    }

    // ── Eventos ───────────────────────────────────────────────────
    let lastX = -500, lastY = -500;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      core.style.opacity = '1';
    };
    const onLeave = () => { core.style.opacity = '0'; };

    const onEmberHover = () => { hoveredRef.current = true; };
    const onEmberLeave = () => { hoveredRef.current = false; };

    document.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('ember:hover', onEmberHover);
    window.addEventListener('ember:leave', onEmberLeave);

    // ── Loop ──────────────────────────────────────────────────────
    let frame = 0;

    const tick = () => {
      frame++;
      const p  = posRef.current;
      const s  = smoothRef.current;
      const hovered = hoveredRef.current;

      s.x += (p.x - s.x) * 0.4;
      s.y += (p.y - s.y) * 0.4;

      const sx = s.x, sy = s.y;

      // Spawn partículas según movimiento
      const dx = Math.abs(p.x - lastX) + Math.abs(p.y - lastY);
      if (dx > 1.5) {
        spawnParticles(sx, sy, hovered);
        if (hovered && dx > 3) spawnSparks(sx, sy);
      }
      lastX = p.x; lastY = p.y;

      // Núcleo
      const pulse     = (Math.sin(frame * 0.08) + 1) / 2;
      const coreSize  = hovered ? size * 1.4 + pulse * 3 : size;
      const glowSize  = hovered ? 14 + pulse * 10 : 6;
      const coreFill  = hovered ? '#fff0a0' : coreColor;
      const glowAlpha = hovered ? 0.6 + pulse * 0.3 : 0.5;
      const glowRGB   = hovered ? '255,200,60' : glowColor;

      core.style.width      = `${coreSize}px`;
      core.style.height     = `${coreSize}px`;
      core.style.background = `radial-gradient(circle, ${coreFill} 0%, rgba(255,101,32,0.9) 50%, transparent 100%)`;
      core.style.boxShadow  = `0 0 ${glowSize}px ${glowSize * 0.4}px rgba(${glowRGB},${glowAlpha})`;
      core.style.transform  = `translate(${sx}px,${sy}px) translate(-50%,-50%)`;

      // Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Chispas (líneas)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx; sp.y += sp.vy;
        sp.vx *= 0.92;  sp.vy *= 0.92;
        sp.life -= 0.06;
        if (sp.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = sp.life * 0.9;
        ctx.strokeStyle = `hsl(40,100%,${60 + sp.life * 30}%)`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(sp.x, sp.y);
        ctx.lineTo(sp.x - sp.vx * 4, sp.y - sp.vy * 4);
        ctx.stroke();
        ctx.restore();
      }

      // Partículas (brasas)
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x  += pt.vx; pt.y  += pt.vy;
        pt.vx *= 0.98;
        pt.vy += pt.gravity;
        pt.life -= 0.025;
        if (pt.life <= 0) { particles.splice(i, 1); continue; }

        const r    = pt.size * pt.life;
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 2);
        grad.addColorStop(0, `hsl(${pt.hue},100%,${pt.light + pt.life * 20}%)`);
        grad.addColorStop(1, `hsla(${pt.hue},100%,${pt.light}%,0)`);

        ctx.save();
        ctx.globalAlpha = pt.life * 0.85;
        ctx.fillStyle   = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('ember:hover', onEmberHover);
      window.removeEventListener('ember:leave', onEmberLeave);
      window.removeEventListener('resize', resizeCanvas);
      canvas.remove();
      core.remove();
      document.getElementById('ember-cursor-style')?.remove();
    };
  }, [size, glowColor, coreColor]);
}