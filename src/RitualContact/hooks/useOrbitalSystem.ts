import type { RefObject } from 'react';
import { useEffect } from 'react';

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
  useEffect(() => {
    const stage = stageRef.current!;
    let ORBIT_R = getOrbitR();
    let raf     = 0;
    let alive   = true;

    const orbs = orbRefs.map((ref, i) => ({
      el:           ref.current!,
      angle:        INITIAL_ANGLES[i],
      currentSpeed: SPEED,
      paused:       false,
    }));

    const listeners: Array<() => void> = [];

    orbs.forEach(orb => {
      const enter = () => { orb.paused = true;  };
      const leave = () => { orb.paused = false; };
      orb.el.addEventListener('mouseenter', enter);
      orb.el.addEventListener('mouseleave', leave);
      listeners.push(
        () => orb.el.removeEventListener('mouseenter', enter),
        () => orb.el.removeEventListener('mouseleave', leave),
      );
    });

    const onResize = () => { ORBIT_R = getOrbitR(); };
    window.addEventListener('resize', onResize);

    (function loop() {
      if (!alive) return;
      const W = stage.offsetWidth  / 2;
      const H = stage.offsetHeight / 2;
      orbs.forEach(orb => {
        const target = orb.paused ? 0 : SPEED;
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
      listeners.forEach(fn => fn());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
