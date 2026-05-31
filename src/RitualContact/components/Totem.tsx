import type { MutableRefObject } from 'react';
import { forwardRef } from 'react';
import type { FieldConfig } from '../types';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';

interface Props {
  config:       FieldConfig;
  inputRef:     MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  totemId:      string;
  className?:   string;
  onChange:     () => void;
  onTotemClick: () => void;
}

export const Totem = forwardRef<HTMLDivElement, Props>(
  ({ config, inputRef, totemId, className = '', onChange, onTotemClick }, ref) => {
    const emberHandlers = useEmberCursorHover();

    const sharedProps = {
      className:    'totem-inp',
      placeholder:  config.placeholder,
      autoComplete: 'off' as const,
      spellCheck:   false,
      onChange,
    };

    return (
      <div className={`totem ${className}`.trim()} ref={ref} id={totemId} onClick={onTotemClick}>
        <div className="totem-box">
          <div className="totem-topbar">
            <span className="totem-rune">{config.rune}</span>
            <span className="totem-label">{config.label}</span>
            <span className="totem-status">✦</span>
          </div>

          <div className="totem-input-area" {...emberHandlers}>
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
