import type { RefObject } from "react";

export interface UseLoaderExitOptions {
  isComplete: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  sigilPathRefs: RefObject<(SVGPathElement | null)[]>;
  dividerRef: RefObject<HTMLDivElement | null>;
  progressWrapRef: RefObject<HTMLDivElement | null>;
  cornersRef: RefObject<(HTMLDivElement | null)[]>;
  onExitStart?: () => void;
  onExitComplete?: () => void;
}

export interface LoaderProps {
  progress: number;
  isComplete: boolean;
  onExitStart?: () => void;
  onExitComplete?: () => void;
}