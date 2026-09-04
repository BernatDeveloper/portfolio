import { useEffect, useRef } from 'react';

export function useScrollLock(active = true): void {
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (!active) return;

    savedScrollY.current = window.scrollY;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    Object.assign(document.body.style, {
      overflow: 'hidden',
      ...(scrollBarWidth > 0 && { paddingRight: `${scrollBarWidth}px` }),
      position: 'fixed',
      top: `-${savedScrollY.current}px`,
      width: '100%',
    });

    return () => {
      document.documentElement.style.overflow = '';
      Object.assign(document.body.style, {
        overflow: '',
        paddingRight: '',
        position: '',
        top: '',
        width: '',
      });
      window.scrollTo(0, savedScrollY.current);
      window.dispatchEvent(new Event('resize'));
    };
  }, [active]);
}