import type { MutableRefObject } from 'react';
import { forwardRef } from 'react';
import type { FieldConfig } from '../types';

interface Props {
  config:    FieldConfig;
  inputRef:  MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  totemId:   string;      // id used by GSAP entrance (t1, t2, t3)
  className?: string;     // positional class: t-top | t-bl | t-br
}

export const Totem = forwardRef<HTMLDivElement, Props>(
  ({ config, inputRef, totemId, className = '' }, ref) => {
    const sharedProps = {
      className:    'totem-inp',
      placeholder:  config.placeholder,
      autoComplete: 'off' as const,
      spellCheck:   false,
    };

    return (
      <div className={`totem ${className}`.trim()} ref={ref} id={totemId}>
        <div className="totem-box">
          <div className="totem-topbar">
            <span className="totem-rune">{config.rune}</span>
            <span className="totem-label">{config.label}</span>
            <span className="totem-status">✦</span>
          </div>

          <div className="totem-input-area">
            {config.type === 'textarea' ? (
              <textarea
                {...sharedProps}
                ref={inputRef as MutableRefObject<HTMLTextAreaElement>}
              />
            ) : (
              <input
                {...sharedProps}
                type={config.type}
                ref={inputRef as MutableRefObject<HTMLInputElement>}
              />
            )}
            <div className="totem-inp-line" />
          </div>
        </div>
      </div>
    );
  },
);

Totem.displayName = 'Totem';
