import { useTranslation } from 'react-i18next';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import type { Lang } from '../i18n/i18n';
import './LangSwitcher.css';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
];

export function LangSwitcher() {
  const { t, i18n } = useTranslation();
  const emberHandlers = useEmberCursorHover();

  return (
    <div
      className="ls"
      role="group"
      aria-label={t('langSwitcher.ariaLabel')}
      {...emberHandlers}
    >
      {LANGS.map(({ code, label }, i) => (
        <button
          key={code}
          className={`ls-btn${i18n.language === code ? ' ls-btn--active' : ''}`}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={i18n.language === code}
          aria-label={`${t('langSwitcher.switchToPrefix')} ${label}`}
        >
          {label}
          {i < LANGS.length - 1 && (
            <span className="ls-divider" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}
