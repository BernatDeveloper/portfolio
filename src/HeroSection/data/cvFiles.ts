import type { Lang } from '../../i18n/i18n';

/** CV file per language. Falls back to Spanish until an English CV is added. */
export const CV_FILES: Record<Lang, string> = {
  es: '/CV_Bernat_Font_cas.pdf',
  ca: '/CV_Bernat_Font_cat.pdf',
  en: '/CV_Bernat_Font_cas.pdf',
};
