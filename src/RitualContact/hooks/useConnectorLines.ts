import type { RefObject } from 'react';
import { useEffect } from 'react';

const SVG_W = 560;
const SVG_H = 620;

export function useConnectorLines(
  stageRef:  RefObject<HTMLDivElement | null>,
  eyeRef:    RefObject<HTMLDivElement | null>,
  totemRefs: RefObject<HTMLDivElement | null>[],
  lineRefs:  RefObject<SVGLineElement | null>[],
) {
  useEffect(() => {
    function update() {
      const stage = stageRef.current;
      const eye   = eyeRef.current;
      if (!stage || !eye) return;

      const sr = stage.getBoundingClientRect();
      const er = eye.getBoundingClientRect();

      const toSVG = (cssX: number, cssY: number) => ({
        x: (cssX / sr.width)  * SVG_W,
        y: (cssY / sr.height) * SVG_H,
      });

      const ec = toSVG(
        er.left - sr.left + er.width  / 2,
        er.top  - sr.top  + er.height / 2,
      );

      totemRefs.forEach((totemRef, i) => {
        const totem = totemRef.current;
        const line  = lineRefs[i]?.current;
        if (!totem || !line) return;

        const tr = totem.getBoundingClientRect();
        const tc = toSVG(
          tr.left - sr.left + tr.width  / 2,
          tr.top  - sr.top  + tr.height / 2,
        );

        line.setAttribute('x1', tc.x.toFixed(1));
        line.setAttribute('y1', tc.y.toFixed(1));
        line.setAttribute('x2', ec.x.toFixed(1));
        line.setAttribute('y2', ec.y.toFixed(1));
      });
    }

    // Wait for layout + entrance animations to settle
    const timer = setTimeout(update, 120);
    window.addEventListener('resize', update);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', update);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
