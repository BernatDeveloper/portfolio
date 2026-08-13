import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import { scrollToLenis } from '../hooks/useLenis';
import { useHeroData } from './hooks/useHeroData';
import { CV_FILES } from './data/cvFiles';
import { SOCIAL_LINKS } from '../data/socialLinks';
import type { Lang } from '../i18n/i18n';
import './HeroSection.css';
import { useHeroEntranceTl } from './hooks/useHeroEntranceTl';

const HERO_SOCIAL_IDS = ['whatsapp', 'linkedin', 'github'];
const HERO_SOCIALS = HERO_SOCIAL_IDS.map(
  (id) => SOCIAL_LINKS.find((s) => s.id === id)!,
);

interface HeroSectionProps {
  /** Cuando pasa a true, dispara la animación de entrada del hero.
   *  Mientras sea false, todo el contenido está invisible (listo debajo del loader). */
  shouldAnimate: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ shouldAnimate }) => {
  const { t, i18n } = useTranslation();
  const { embers } = useHeroData();
  const heroRef = useRef<HTMLElement>(null);

  const emberHandlers = useEmberCursorHover();
  const cvHref = CV_FILES[i18n.language as Lang] ?? CV_FILES.es;

  function handleContactClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToLenis('#contact');
  }

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerTRRef = useRef<HTMLDivElement>(null);

  useHeroEntranceTl({
    scope: heroRef,
    shouldAnimate,
    eyebrowRef,
    line1Ref,
    line2Ref,
    dividerRef,
    ctaRef,
    statsRef,
    cornerTLRef,
    cornerTRRef,
  });

  return (
    <section className="hero" ref={heroRef}>
      {/* Corners */}
      <div className="corner corner-tl" ref={cornerTLRef} />
      <div className="corner corner-tr" ref={cornerTRRef} />

      {/* Ember particles */}
      <div className="embers">
        {embers.map((e) => (
          <div
            key={e.id}
            className="ember"
            style={{
              left: e.left,
              width: `${e.size}px`,
              height: `${e.size}px`,
              '--dur': `${e.dur}s`,
              '--delay': `${e.delay}s`,
              '--x1': `${e.x1}px`,
              '--x2': `${e.x2}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Water reflection */}
      <div className="water-reflection-bottom" />

      {/* Main content */}
      <div className="hero-content">
        <p ref={eyebrowRef} className="hero-eyebrow">{t('hero.eyebrow')}</p>

        <h1 className="hero-title">
          <span ref={line1Ref} className="line-1">Bernat</span>
          <span ref={line2Ref} className="line-2">Developer</span>
        </h1>

        <div ref={dividerRef} className="hero-divider" />

        <div ref={ctaRef} className="hero-cta">
          <a href="#contact" className="btn-primary" onClick={handleContactClick} {...emberHandlers}>
            <span>{t('hero.ctaPrimary')}</span>
          </a>
          <a href={cvHref} download className="btn-secondary" {...emberHandlers}>
            {t('hero.ctaSecondary')}
          </a>
        </div>

        <div ref={statsRef} className="hero-socials">
          <svg width="0" height="0" aria-hidden="true">
            <defs>
              <linearGradient id="hero-social-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-lava)" />
                <stop offset="100%" stopColor="var(--color-gold)" />
              </linearGradient>
            </defs>
          </svg>
          {HERO_SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label={s.label}
              {...emberHandlers}
            >
              <svg
                className="hero-social-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d={s.path} fill="url(#hero-social-gradient)" />
              </svg>
              <span className="hero-social-label">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};