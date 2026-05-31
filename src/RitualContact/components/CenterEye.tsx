import type { MutableRefObject, RefObject } from 'react';

interface Props {
  eyeRef:      RefObject<HTMLDivElement | null>;
  eyeCountRef: RefObject<HTMLDivElement | null>;
  eyeLabelRef: RefObject<HTMLDivElement | null>;
  filledRef:   MutableRefObject<number>;
  onEyeClick:  () => void;
}

export function CenterEye({ eyeRef, eyeCountRef, eyeLabelRef, filledRef, onEyeClick }: Props) {
  return (
    <>
      <div className="eye-glow2" />
      <div className="eye-glow"  />

      <div
        className="eye" id="eye" ref={eyeRef}
        onClick={onEyeClick}
        onMouseEnter={() => { if (filledRef.current === 3) window.dispatchEvent(new Event('ember:hover')); }}
        onMouseLeave={() => window.dispatchEvent(new Event('ember:leave'))}
      >
        <div className="eye-unlock-ring" />
        <div className="eye-count" id="eye-count" ref={eyeCountRef}>0/3</div>
        <div className="eye-label" id="eye-label" ref={eyeLabelRef}>offerings</div>
      </div>
    </>
  );
}
