import { useRef, useMemo } from 'react';
import { useFooterScroll } from './hooks/useFooterScroll';
import { LangSwitcher }    from '../LangSwitcher/LangSwitcher';
import './Footer.css';

function makeEmbers(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id:    i,
    left:  `${6 + Math.random() * 88}%`,
    size:  Math.random() * 4 + 2,
    dur:   Math.random() * 6 + 8,
    delay: Math.random() * 12,
    x1:    (Math.random() - 0.5) * 60,
    x2:    (Math.random() - 0.5) * 60,
  }));
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const embers    = useMemo(() => makeEmbers(16), []);

  useFooterScroll(footerRef, textRef);

  return (
    <footer className="ft" ref={footerRef} aria-label="Site footer">

      {/* gradient border line + falling embers */}
      <div className="ft-border" aria-hidden="true">
        <div className="ft-embers">
          {embers.map(e => (
            <div
              key={e.id}
              className="ft-ember"
              style={{
                left:      e.left,
                width:     `${e.size}px`,
                height:    `${e.size}px`,
                '--dur':   `${e.dur}s`,
                '--delay': `${e.delay}s`,
                '--x1':    `${e.x1}px`,
                '--x2':    `${e.x2}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* scroll-revealed statement */}
      <div className="ft-statement" ref={textRef}>
        <p className="ft-line ft-line--main">Fire shapes the finest things.</p>
        <p className="ft-line ft-line--sub">
          Frontend developer passionate about crafting digital experiences that ignite.
        </p>
      </div>

      {/* bottom bar */}
      <div className="ft-bar">
        <span className="ft-copy">© {new Date().getFullYear()} Bernat Font</span>
        <LangSwitcher />
        <span className="ft-copy ft-copy--muted">Forged with obsession</span>
      </div>

    </footer>
  );
}
