import { useEffect, type RefObject } from 'react';

export function useMobileEmbers(
  canvasRef:  RefObject<HTMLCanvasElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf   = 0;
    let alive = true;

    const resize = () => {
      canvas.width  = section.offsetWidth  || window.innerWidth;
      canvas.height = section.offsetHeight || window.innerHeight;
    };

    class Ember {
      x = 0; y = 0; vx = 0; vy = 0; life = 0; max = 0; r = 0; hue = 0; wobble = 0;

      constructor() { this.reset(); }

      reset() {
        const w   = canvas!.width  || window.innerWidth;
        const h   = canvas!.height || window.innerHeight;
        this.x      = Math.random() * w;
        this.y      = h * 0.45 + Math.random() * h * 0.55;
        this.vx     = (Math.random() - 0.5) * 0.5;
        this.vy     = -(0.5 + Math.random() * 1.6);
        this.life   = 0;
        this.max    = 130 + Math.random() * 200;
        this.r      = 0.8 + Math.random() * 2.8;
        this.hue    = Math.random() > 0.55 ? 20 : (Math.random() > 0.5 ? 35 : 48);
        this.wobble = Math.random() * Math.PI * 2;
      }

      tick() {
        this.wobble += 0.022 + Math.random() * 0.01;
        this.x += this.vx + Math.sin(this.wobble) * 0.4;
        this.y += this.vy;
        this.vy -= 0.007;
        this.life++;
        if (this.life > this.max || this.y < -20) this.reset();
      }

      draw() {
        const a = (1 - this.life / this.max) * 0.7;
        ctx!.save();
        ctx!.globalAlpha = a;
        ctx!.fillStyle   = `hsl(${this.hue}, 100%, ${50 + a * 22}%)`;
        ctx!.shadowBlur  = 9;
        ctx!.shadowColor = `hsl(${this.hue}, 100%, 55%)`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r * (0.4 + a * 0.6) + 0.2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    const embers: Ember[] = [];

    requestAnimationFrame(() => {
      resize();
      for (let i = 0; i < 70; i++) {
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

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
