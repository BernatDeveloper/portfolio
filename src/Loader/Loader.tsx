import React, { useRef } from 'react';
import { useScrollLock } from './hooks/useScrollLock';
import { useSigilAnimation } from './hooks/useSigilAnimation';
import { useLoaderExit } from './hooks/useLoaderExit';
import { Sigil } from './Sigil/Sigil';
import type { LoaderProps } from './types';
import './Loader.css';

export const Loader: React.FC<LoaderProps> = ({
  progress,
  isComplete,
  onExitStart,
  onExitComplete,
}) => {

  const loaderRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const sigilRef = useRef<SVGSVGElement>(null);
  const sigilPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<(HTMLDivElement | null)[]>([]);

  useScrollLock();
  useSigilAnimation(sigilRef, sigilPathRefs);

  useLoaderExit({
    isComplete,
    loaderRef,
    eyebrowRef,
    sigilPathRefs,
    dividerRef,
    progressWrapRef,
    cornersRef,
    onExitStart,
    onExitComplete,
  });

  return (
    <div ref={loaderRef} className="loader">

      {(['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
        <div
          key={pos}
          className={`loader-corner loader-corner--${pos}`}
          ref={el => { cornersRef.current[i] = el; }}
        />
      ))}

      <div className="loader-content">

        <p ref={eyebrowRef} className="loader-eyebrow">
          Initializing
        </p>

        <Sigil
          sigilRef={sigilRef}
          pathRefs={sigilPathRefs}
        />

        <div ref={dividerRef} className="loader-divider" />

        <div ref={progressWrapRef} className="loader-progress-wrap">
          <div className="loader-bar">
            <div
              className="loader-bar__fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="loader-percent">
            <span className="loader-percent__num">
              {String(Math.round(progress)).padStart(3, '0')}
            </span>
            <span className="loader-percent__sym">%</span>
          </p>
        </div>

      </div>

      <div className="loader-reflection" />
    </div>
  );
};