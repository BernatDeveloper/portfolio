import { forwardRef, useRef } from 'react';
import gsap from 'gsap';
import type { OrbConfig } from '../types';

interface Props {
  config:       OrbConfig;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SocialOrb = forwardRef<HTMLAnchorElement, Props>(
  ({ config, onMouseEnter, onMouseLeave }, ref) => {
    const bgRef = useRef<HTMLDivElement>(null);

    const handleEnter = () => {
      gsap.to(bgRef.current, { scale: 1.3, duration: 0.35, ease: 'power2.out' });
      window.dispatchEvent(new Event('ember:hover'));
      onMouseEnter?.();
    };

    const handleLeave = () => {
      gsap.to(bgRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1,.5)' });
      window.dispatchEvent(new Event('ember:leave'));
      onMouseLeave?.();
    };

    return (
      <a
        ref={ref}
        className="soc-orb"
        href={config.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="soc-bg" ref={bgRef}>
          <div className="soc-ring" />
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {config.paths.map((d, i) => <path key={i} d={d} />)}
          </svg>
        </div>
        <span className="soc-tip">{config.label}</span>
      </a>
    );
  },
);

SocialOrb.displayName = 'SocialOrb';
