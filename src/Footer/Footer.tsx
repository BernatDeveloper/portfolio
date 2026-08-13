import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFooterScroll } from './hooks/useFooterScroll';
import { LangSwitcher }    from '../LangSwitcher/LangSwitcher';
import { scrollToLenis }   from '../hooks/useLenis';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
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
  const { t } = useTranslation();
  const emberHandlers = useEmberCursorHover();

  useFooterScroll(footerRef, textRef);

  return (
    <footer className="ft" ref={footerRef} aria-label={t('footer.ariaLabel')}>

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
        <p className="ft-line ft-line--main">{t('footer.statementMain')}</p>
        <p className="ft-line ft-line--sub">
          {t('footer.statementSub')}
        </p>
      </div>

      {/* bottom bar */}
      <div className="ft-bar">
        <span className="ft-copy">© {new Date().getFullYear()} Bernat Font</span>
        <LangSwitcher />
        <button
          type="button"
          className="ft-top"
          onClick={() => scrollToLenis(0)}
          {...emberHandlers}
        >
          <span>{t('footer.backToTop')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

    </footer>
  );
}
