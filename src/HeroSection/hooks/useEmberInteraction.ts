import { useEffect, useRef } from 'react';
import type { Ember, Options } from '../../types';

export function useEmberInteraction(
  embers: Ember[],
  {
    pullStrength = 150,
    smoothing = 0.05,
    sizeInfluence = 0.5,
  }: Options = {}
) {
  const embersContainerRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLElement>(null);
  const biasRef = useRef(0);
  const targetBiasRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = embersContainerRef.current;
    const area = areaRef.current;
    if (!container || !area) return;

    const emberEls = [...container.querySelectorAll<HTMLDivElement>('.ember')];

    // Snapshot base values once — embers array is stable across renders
    const bases = emberEls.map((el, i) => ({
      x1: embers[i]?.x1 ?? 0,
      x2: embers[i]?.x2 ?? 0,
      size: parseFloat(el.style.width) || 4,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const rx = (e.clientX - rect.left) / rect.width;
      targetBiasRef.current = (rx - 0.5) * 2; // -1..+1
    };

    const onMouseLeave = () => {
      targetBiasRef.current = 0;
    };

    area.addEventListener('mousemove', onMouseMove);
    area.addEventListener('mouseleave', onMouseLeave);

    const tick = () => {
      biasRef.current += (targetBiasRef.current - biasRef.current) * smoothing;

      if (Math.abs(biasRef.current) > 0.001) {
        const pull = biasRef.current * pullStrength;

        emberEls.forEach((el, i) => {
          const { x1, x2, size } = bases[i];
          const factor = 1 - sizeInfluence + sizeInfluence * (size / 8);
          el.style.setProperty('--x1', `${x1 + pull * factor}px`);
          el.style.setProperty('--x2', `${x2 + pull * factor * 1.4}px`);
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      area.removeEventListener('mousemove', onMouseMove);
      area.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [embers, pullStrength, smoothing, sizeInfluence]);

  return { embersContainerRef, areaRef };
}