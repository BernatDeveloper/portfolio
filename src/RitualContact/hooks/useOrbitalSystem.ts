import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

const SPEED = 0.006;
const INITIAL_ANGLES = [
  -Math.PI / 2,
  -Math.PI / 2 + (Math.PI * 2 / 3),
  -Math.PI / 2 + (Math.PI * 4 / 3),
];

const getOrbitR = () =>
  window.innerWidth <= 599  ? 115 :
  window.innerWidth >= 1400 ? 280 : 220;

export function useOrbitalSystem(
  stageRef: RefObject<HTMLDivElement | null>,
  orbRefs:  RefObject<HTMLAnchorElement>[],
) {
  const pausedRef = useRef(orbRefs.map(() => false));

  useEffect(() => {
    const stage = stageRef.current!;
    let ORBIT_R = getOrbitR();
    let raf     = 0;
    let alive   = true;

    const orbEls = orbRefs.map(r => r.current!);
    const paused = pausedRef.current;

    const orbs = orbEls.map((el, i) => ({
      el,
      angle:        INITIAL_ANGLES[i],
      currentSpeed: SPEED,
    }));

    const onResize = () => { ORBIT_R = getOrbitR(); };
    window.addEventListener('resize', onResize);

    (function loop() {
      if (!alive) return;
      const W = stage.offsetWidth  / 2;
      const H = stage.offsetHeight / 2;
      orbs.forEach((orb, i) => {
        const target = paused[i] ? 0 : SPEED;
        orb.currentSpeed += (target - orb.currentSpeed) * 0.08;
        orb.angle        += orb.currentSpeed;
        orb.el.style.left = (W + Math.cos(orb.angle) * ORBIT_R) + 'px';
        orb.el.style.top  = (H + Math.sin(orb.angle) * ORBIT_R) + 'px';
      });
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return orbRefs.map((_, i) => ({
    onMouseEnter: () => { pausedRef.current[i] = true;  },
    onMouseLeave: () => { pausedRef.current[i] = false; },
  }));
}
