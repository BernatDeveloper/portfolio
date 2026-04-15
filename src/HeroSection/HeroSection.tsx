import React, { useRef } from 'react';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import { useHeroData } from './hooks/useHeroData';
import './HeroSection.css';
import { useHeroEntranceTl } from './hooks/useHeroEntranceTl';

interface HeroSectionProps {
  /** Cuando pasa a true, dispara la animación de entrada del hero.
   *  Mientras sea false, todo el contenido está invisible (listo debajo del loader). */
  shouldAnimate: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ shouldAnimate }) => {
  const { embers } = useHeroData();
  const heroRef = useRef<HTMLElement>(null);

  const btn1 = useEmberCursorHover<HTMLButtonElement>();
  const btn2 = useEmberCursorHover<HTMLButtonElement>();

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
      <div className="water-reflection" />

      {/* Main content */}
      <div className="hero-content">
        <p ref={eyebrowRef} className="hero-eyebrow">Unleash the beast within</p>

        <h1 className="hero-title">
          <span ref={line1Ref} className="line-1">Bernat</span>
          <span ref={line2Ref} className="line-2">Developer</span>
        </h1>

        <div ref={dividerRef} className="hero-divider" />

        <div ref={ctaRef} className="hero-cta">
          <button className="btn-primary" ref={btn1}>
            <span>Enter the void</span>
          </button>
          <button className="btn-secondary" ref={btn2}>Discover more</button>
        </div>

        <div ref={statsRef} className="hero-stats">
          <div className="stat">
            <div className="stat-value">∞</div>
            <div className="stat-label">Power</div>
          </div>
          <div className="stat">
            <div className="stat-value">VII</div>
            <div className="stat-label">Realms</div>
          </div>
          <div className="stat">
            <div className="stat-value">0°</div>
            <div className="stat-label">Fear</div>
          </div>
        </div>
      </div>
    </section>
  );
};