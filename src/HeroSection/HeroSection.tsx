import React from 'react';
import { useHeroData } from './hooks/useHeroData';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const { embers } = useHeroData();
  const btn1 = useEmberCursorHover<HTMLButtonElement>();
  const btn2 = useEmberCursorHover<HTMLButtonElement>();

  return (
    <section className="hero">
      {/* Corners */}
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

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
        <p className="hero-eyebrow">Unleash the beast within</p>

        <h1 className="hero-title">
          <span className="line-1">Bernat</span>
          <span className="line-2">Developer</span>
        </h1>

        <div className="hero-divider" />

        <div className="hero-cta">
          <button className="btn-primary" ref={btn1}>
            <span>Enter the void</span>
          </button>
          <button className="btn-secondary" ref={btn2}>Discover more</button>
        </div>

        <div className="hero-stats">
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