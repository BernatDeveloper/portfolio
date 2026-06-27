import { useRef, useMemo, useState, useEffect } from 'react';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import { useFooterScroll }     from './hooks/useFooterScroll';
import './Footer.css';

function makeEmbers(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id:    i,
    left:  `${4 + Math.random() * 92}%`,
    size:  Math.random() * 4 + 2,
    dur:   Math.random() * 6 + 8,
    delay: Math.random() * 14,
    x1:    (Math.random() - 0.5) * 60,
    x2:    (Math.random() - 0.5) * 60,
  }));
}

const LANGS = ['CAS', 'CAT', 'ENG'] as const;
type Lang = typeof LANGS[number];

const NAV = [
  { label: 'Projects', selector: '.proj-section'    },
  { label: 'Skills',   selector: '.sn-skills-section' },
  { label: 'Contact',  selector: '.cs'               },
];

function scrollTo(selector: string | null) {
  if (!selector) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Footer() {
  const footerRef     = useRef<HTMLElement>(null);
  const emberHandlers = useEmberCursorHover();
  const embers        = useMemo(() => makeEmbers(10), []);
  const [lang, setLang]       = useState<Lang>('ENG');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useFooterScroll(footerRef);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <footer className="ft" ref={footerRef}>

      {/* top glow line */}
      <div className="ft-glow-line" aria-hidden="true" />

      {/* ember particles falling from glow line */}
      <div className="ft-embers" aria-hidden="true">
        {embers.map(e => (
          <span
            key={e.id}
            className="ft-ember"
            style={{
              left:     e.left,
              width:    e.size,
              height:   e.size,
              '--dur':   `${e.dur}s`,
              '--delay': `${e.delay}s`,
              '--x1':    `${e.x1}px`,
              '--x2':    `${e.x2}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="ft-hero">

        <p className="ft-eyebrow">— available for work —</p>

        <div className="ft-headline" aria-label="Let's build great things">
          <span className="ft-line1">Let's</span>
          <span className="ft-line2">build great</span>
          <span className="ft-line3">things.</span>
        </div>

      </div>

      <div className="ft-divider" />

      <div className="ft-bottom">
        <p className="ft-copy">© {new Date().getFullYear()} BernatDeveloper</p>

        <nav className="ft-nav" aria-label="Quick links">
          {NAV.map(item => (
            <button
              key={item.label}
              className="ft-nav-btn"
              onClick={() => scrollTo(item.selector)}
              {...emberHandlers}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* language selector */}
        <div className="ft-lang" ref={langRef}>
          <button
            className="ft-lang-btn"
            onClick={() => setLangOpen(o => !o)}
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            {...emberHandlers}
          >
            <svg className="ft-lang-globe" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/>
              <ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1"/>
              <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1"/>
            </svg>
            {lang}
            <span className={`ft-lang-chevron${langOpen ? ' ft-lang-chevron--open' : ''}`} aria-hidden="true">▾</span>
          </button>

          {langOpen && (
            <ul className="ft-lang-list" role="listbox" aria-label="Language">
              {LANGS.map(l => (
                <li key={l} role="none">
                  <button
                    className={`ft-lang-opt${lang === l ? ' ft-lang-opt--active' : ''}`}
                    role="option"
                    aria-selected={lang === l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="ft-top"
          onClick={() => scrollTo(null)}
          aria-label="Back to top"
          {...emberHandlers}
        >
          Back to top
          <span className="ft-top-arrow" aria-hidden="true">↑</span>
        </button>
      </div>

    </footer>
  );
}
