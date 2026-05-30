import type { RefObject, MutableRefObject } from 'react';
import { useEffect } from 'react';
import type { BurstFn } from '../types';

export function useEmberCanvas(
  canvasRef:  RefObject<HTMLCanvasElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  burstRef:   MutableRefObject<BurstFn | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let raf   = 0;
    let alive = true;

    const resize = () => {
      const sect    = sectionRef.current!;
      canvas.width  = sect.offsetWidth  || window.innerWidth;
      canvas.height = sect.offsetHeight || window.innerHeight;
    };

    class Ember {
      x = 0; y = 0; vx = 0; vy = 0; life = 0; max = 0; r = 0; hue = 0;

      constructor() { this.reset(); }

      reset() {
        const w = canvas.width  || window.innerWidth;
        const h = canvas.height || window.innerHeight;
        this.x    = w * 0.5 + (Math.random() - 0.5) * 300;
        this.y    = h * 0.62 + Math.random() * 100;
        this.vx   = (Math.random() - 0.5) * 1.2;
        this.vy   = -(0.8 + Math.random() * 2.4);
        this.life = 0;
        this.max  = 90 + Math.random() * 140;
        this.r    = 0.6 + Math.random() * 2.2;
        this.hue  = Math.random() > 0.5 ? 20 : 38;
      }

      tick() {
        this.x += this.vx + Math.sin(this.life * 0.07) * 0.5;
        this.y += this.vy;
        this.vy -= 0.015;
        this.life++;
        if (this.life > this.max) this.reset();
      }

      draw() {
        const a = (1 - this.life / this.max) * 0.65;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle   = `hsl(${this.hue},100%,${52 + a * 25}%)`;
        ctx.shadowBlur  = 7;
        ctx.shadowColor = `hsl(${this.hue},100%,55%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * a + 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const embers: Ember[] = [];

    burstRef.current = (count: number) => {
      for (let i = 0; i < count; i++) {
        const e = new Ember();
        e.vy   = -(2.5 + Math.random() * 6);
        e.vx   = (Math.random() - 0.5) * 4;
        e.r    = 2 + Math.random() * 4;
        e.life = 0;
        embers.push(e);
      }
    };

    requestAnimationFrame(() => {
      resize();
      for (let i = 0; i < 55; i++) {
        const e = new Ember();
        e.life = Math.random() * e.max;
        embers.push(e);
      }
      (function loop() {
        if (!alive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        embers.forEach(e => { e.tick(); e.draw(); });
        raf = requestAnimationFrame(loop);
      })();
    });

    window.addEventListener('resize', resize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      burstRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
