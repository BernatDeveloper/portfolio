import type { RefObject } from 'react';

interface Props {
  eyeRef:      RefObject<HTMLDivElement | null>;
  eyeCountRef: RefObject<HTMLDivElement | null>;
  eyeLabelRef: RefObject<HTMLDivElement | null>;
}

export function CenterEye({ eyeRef, eyeCountRef, eyeLabelRef }: Props) {
  return (
    <>
      <div className="eye-glow2" />
      <div className="eye-glow"  />

      <div className="eye" id="eye" ref={eyeRef}>
        <div className="eye-unlock-ring" />
        <div className="eye-count" id="eye-count" ref={eyeCountRef}>0/3</div>
        <div className="eye-label" id="eye-label" ref={eyeLabelRef}>offerings</div>
      </div>
    </>
  );
}
