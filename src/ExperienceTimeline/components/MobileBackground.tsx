import { useRef, type RefObject } from 'react';
import { useMobileEmbers } from '../hooks/useMobileEmbers';

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
}

export function MobileBackground({ sectionRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMobileEmbers(canvasRef, sectionRef);

  return (
    <>
      <div className="tl-mob-bg" />
      <canvas ref={canvasRef} className="tl-mob-embers" />
    </>
  );
}
