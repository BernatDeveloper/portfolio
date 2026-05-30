import { forwardRef } from 'react';
import type { OrbConfig } from '../types';

interface Props {
  config: OrbConfig;
}

export const SocialOrb = forwardRef<HTMLAnchorElement, Props>(
  ({ config }, ref) => (
    <a
      ref={ref}
      className="soc-orb"
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="soc-bg">
        <div className="soc-ring" />
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {config.paths.map((d, i) => <path key={i} d={d} />)}
        </svg>
      </div>
      <span className="soc-tip">{config.label}</span>
    </a>
  ),
);

SocialOrb.displayName = 'SocialOrb';
