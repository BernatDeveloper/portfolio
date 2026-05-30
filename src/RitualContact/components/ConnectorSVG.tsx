import type { RefObject } from 'react';

interface Props {
  lineRefs: RefObject<SVGLineElement | null>[];
}

const LINES = [
  { id: 'lg1', x1: 280, y1: 68,  x2: 280, y2: 298 },
  { id: 'lg2', x1: 95,  y1: 558, x2: 258, y2: 316 },
  { id: 'lg3', x1: 465, y1: 558, x2: 302, y2: 316 },
];

export function ConnectorSVG({ lineRefs }: Props) {
  return (
    <svg className="conn-svg" viewBox="0 0 560 620">
      <defs>
        {LINES.map(({ id, x1, y1, x2, y2 }) => (
          <linearGradient
            key={id}
            id={id}
            x1={x1} y1={y1} x2={x2} y2={y2}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="rgba(255,101,32,0.12)" />
            <stop offset="100%" stopColor="rgba(255,101,32,0.65)" />
          </linearGradient>
        ))}
      </defs>

      {LINES.map(({ id, x1, y1, x2, y2 }, i) => (
        <line
          key={id}
          ref={lineRefs[i]}
          className="conn-line"
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`url(#${id})`}
        />
      ))}
    </svg>
  );
}
