import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import { useHeroData } from './hooks/useHeroData';
import './HeroSection.css';

interface HeroSectionProps {
  /** Cuando pasa a true, dispara la animación de entrada del hero.
   *  Mientras sea false, todo el contenido está invisible (listo debajo del loader). */
  shouldAnimate: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ shouldAnimate }) => {
  const { embers } = useHeroData();
  const heroRef    = useRef<HTMLElement>(null);
  const btn1       = useEmberCursorHover<HTMLButtonElement>();
  const btn2       = useEmberCursorHover<HTMLButtonElement>();

  // Refs de cada elemento animable
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerTRRef = useRef<HTMLDivElement>(null);

  /* ── Estado inicial: todo invisible mientras el loader está activo ── */
  useGSAP(() => {
    gsap.set(
      [
        eyebrowRef.current,
        line1Ref.current,
        line2Ref.current,
        dividerRef.current,
        ctaRef.current,
        statsRef.current,
        cornerTLRef.current,
        cornerTRRef.current,
      ],
      { opacity: 0, y: 20 }
    );

    // Divider empieza colapsado
    gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'center' });
  }, { scope: heroRef });

  /* ── Entrada: se lanza cuando shouldAnimate = true ── */
  useEffect(() => {
    if (!shouldAnimate) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      // Corners primero — marcan el espacio antes de que llegue el contenido
      .to([cornerTLRef.current, cornerTRRef.current], {
        opacity: 0.5, y: 0,
        duration: 0.6, stagger: 0.08,
      })
      // Eyebrow
      .to(eyebrowRef.current, {
        opacity: 1, y: 0,
        duration: 0.65,
      }, '-=0.35')
      // Título línea 1
      .to(line1Ref.current, {
        opacity: 1, y: 0,
        duration: 0.75,
      }, '-=0.45')
      // Título línea 2 (con ligero retraso para efecto cascada)
      .to(line2Ref.current, {
        opacity: 1, y: 0,
        duration: 0.75,
      }, '-=0.6')
      // Divider se expande desde el centro
      .to(dividerRef.current, {
        opacity: 1, y: 0, scaleX: 1,
        duration: 0.55, ease: 'power2.out',
      }, '-=0.5')
      // CTA buttons
      .to(ctaRef.current, {
        opacity: 1, y: 0,
        duration: 0.6,
      }, '-=0.4')
      // Stats
      .to(statsRef.current, {
        opacity: 1, y: 0,
        duration: 0.6,
      }, '-=0.45');

    return () => { tl.kill(); };
  }, [shouldAnimate]);

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
              '--dur':   `${e.dur}s`,
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