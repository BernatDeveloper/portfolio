import type { RefObject } from 'react';

interface Props {
  lineRefs: RefObject<SVGLineElement | null>[];
}

export function ConnectorSVG({ lineRefs }: Props) {
  return (
    <svg className="conn-svg" viewBox="0 0 560 620" preserveAspectRatio="none">
      {lineRefs.map((ref, i) => (
        <line key={i} ref={ref} className="conn-line" />
      ))}
    </svg>
  );
}
