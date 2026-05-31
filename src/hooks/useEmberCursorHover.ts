export function useEmberCursorHover() {
  return {
    onMouseEnter: () => window.dispatchEvent(new Event('ember:hover')),
    onMouseLeave: () => window.dispatchEvent(new Event('ember:leave')),
  };
}
