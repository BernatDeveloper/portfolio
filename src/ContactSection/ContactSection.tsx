import React, { useRef, useState, useMemo } from 'react';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import { useContactEntrance }  from './hooks/useContactEntrance';
import { SOCIAL_LINKS }        from './data/socialLinks';
import './ContactSection.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  const [values,  setValues]  = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [sent,    setSent]    = useState(false);

  const embers        = useMemo(() => makeEmbers(8), []);
  const emberHandlers = useEmberCursorHover();

  useContactEntrance(sectionRef, leftRef, rightRef);

  const valid = {
    name:    values.name.trim().length > 0,
    email:   EMAIL_RE.test(values.email.trim()),
    message: values.message.trim().length > 0,
  } as const;

  const allValid = valid.name && valid.email && valid.message;

  function fieldClass(key: keyof typeof valid): string {
    if (valid[key]) return 'cs-field is-valid';
    if (key === 'email' && touched.email && values.email.length > 0) return 'cs-field is-invalid';
    return 'cs-field';
  }

  function onChange(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues(prev => ({ ...prev, [key]: e.target.value }));
  }

  function onBlur(key: keyof typeof touched) {
    return () => setTouched(prev => ({ ...prev, [key]: true }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!allValid) return;
    setSent(true);
  }

  return (
    <section className="cs" ref={sectionRef}>

      {/* corner decorations */}
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      {/* floating ember particles */}
      <div className="cs-embers" aria-hidden="true">
        {embers.map(e => (
          <div
            key={e.id}
            className="cs-ember"
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

      <div className="cs-inner">

        {/* ── Left: tagline + socials ── */}
        <div className="cs-info" ref={leftRef}>
          <h2 className="cs-tagline">
            Let's work<br />
            <span className="cs-tagline-gradient">together.</span>
          </h2>

          <div className="cs-divider" />

          <p className="cs-bio">
            Open to new projects, freelance work and collaborations.
            Drop me a message and I'll get back to you shortly.
          </p>

          <nav className="cs-socials" aria-label="Social links">
            {SOCIAL_LINKS.map(s => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-social"
                aria-label={s.label}
                {...emberHandlers}
              >
                <svg
                  className="cs-social-icon"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Right: form ── */}
        <div ref={rightRef}>
          {sent ? (
            <div className="cs-sent" role="status">
              <p className="cs-sent-icon" aria-hidden="true">✦</p>
              <p className="cs-sent-title">Message received</p>
              <p className="cs-sent-sub">I'll be in touch soon.</p>
            </div>
          ) : (
            <form className="cs-form" onSubmit={handleSubmit} noValidate>

              <div className={fieldClass('name')}>
                <label htmlFor="cs-name" className="cs-label">
                  Name
                  {valid.name && (
                    <span className="cs-field-status" aria-hidden="true">✦</span>
                  )}
                </label>
                <input
                  id="cs-name"
                  type="text"
                  className="cs-input"
                  placeholder="Your name"
                  value={values.name}
                  onChange={onChange('name')}
                  onBlur={onBlur('name')}
                  autoComplete="name"
                />
              </div>

              <div className={fieldClass('email')}>
                <label htmlFor="cs-email" className="cs-label">
                  Email
                  {valid.email
                    ? <span className="cs-field-status" aria-hidden="true">✦</span>
                    : touched.email && values.email.length > 0
                      ? <span className="cs-field-status cs-field-status--err" aria-hidden="true">—</span>
                      : null
                  }
                </label>
                <input
                  id="cs-email"
                  type="email"
                  className="cs-input"
                  placeholder="your@email.com"
                  value={values.email}
                  onChange={onChange('email')}
                  onBlur={onBlur('email')}
                  autoComplete="email"
                />
              </div>

              <div className={fieldClass('message')}>
                <label htmlFor="cs-message" className="cs-label">
                  Message
                  {valid.message && (
                    <span className="cs-field-status" aria-hidden="true">✦</span>
                  )}
                </label>
                <textarea
                  id="cs-message"
                  className="cs-textarea"
                  placeholder="Tell me about your project…"
                  value={values.message}
                  onChange={onChange('message')}
                  onBlur={onBlur('message')}
                />
              </div>

              <div className="cs-submit-wrap">
                <button
                  type="submit"
                  className={`cs-submit${allValid ? ' cs-submit--ready' : ''}`}
                  aria-disabled={!allValid}
                  {...(allValid ? emberHandlers : {})}
                >
                  <span>Send message</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
