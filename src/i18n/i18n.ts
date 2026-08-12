import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import ca from './locales/ca.json';

const STORAGE_KEY = 'portfolio-lang';
const SUPPORTED_LANGS = ['en', 'es', 'ca'] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

function isSupportedLang(value: string | null): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value ?? '');
}

const stored = localStorage.getItem(STORAGE_KEY);
const initialLang: Lang = isSupportedLang(stored) ? stored : 'es';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ca: { translation: ca },
  },
  lng: initialLang,
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

document.documentElement.lang = initialLang;

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});

export default i18n;
