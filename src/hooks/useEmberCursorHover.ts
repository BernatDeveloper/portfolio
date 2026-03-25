import { useRef } from 'react';

/**
 * useEmberHover
 * Adjunta al ref que quieras — al hacer hover dispara ember:hover/ember:leave
 * y el cursor global reacciona.
 *
 * Uso:
 *   const ref = useEmberHover();
 *   return <div ref={ref}>...</div>
 */
export function useEmberCursorHover<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const setRef = (el: T | null) => {
    if (!el) return;
    (ref as React.MutableRefObject<T>).current = el;
    el.addEventListener('mouseenter', () => window.dispatchEvent(new Event('ember:hover')));
    el.addEventListener('mouseleave', () => window.dispatchEvent(new Event('ember:leave')));
  };

  return setRef;
}