import React from 'react';
import { SIGIL_PATHS } from './constants';

interface SigilProps {
  sigilRef: React.RefObject<SVGSVGElement | null>;
  pathRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
}

export const Sigil: React.FC<SigilProps> = ({
  sigilRef,
  pathRefs,
}) => {
  return (
    <svg
      ref={sigilRef}
      className="loader-sigil"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sigilGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-lava)" />
          <stop offset="35%" stopColor="var(--color-accent)" />
          <stop offset="70%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="var(--color-accent-light)" />
        </linearGradient>

        <filter id="sigilGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {SIGIL_PATHS.map((sp, i) => (
        <path
          key={i}
          ref={el => { pathRefs.current[i] = el; }}
          d={sp.d}
          fill="none"
          stroke="url(#sigilGrad)"
          strokeWidth={i === 0 ? 0.8 : i === 4 ? 2 : 1}
          strokeLinecap="butt"
          strokeLinejoin="round"
          filter="url(#sigilGlow)"
        />
      ))}
    </svg>
  );
};