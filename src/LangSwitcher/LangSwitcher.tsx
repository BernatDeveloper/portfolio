import { useLang, type Lang } from '../i18n/LanguageContext';
import './LangSwitcher.css';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
];

export function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="ls" role="group" aria-label="Language selector">
      {LANGS.map(({ code, label }, i) => (
        <button
          key={code}
          className={`ls-btn${lang === code ? ' ls-btn--active' : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={`Switch to ${label}`}
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
