import { useTranslation }   from 'react-i18next';
import { SectionTitle }   from '../utils/SectionTitle/SectionTitle';
import { ContactSection } from './ContactSection';

export const ContactSectionComp = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle
        ghost={t('sections.contact.title')}
        eyebrow={t('sections.contact.eyebrow')}
        title={t('sections.contact.title')}
        align="center"
      />
      <ContactSection />
    </>
  );
};
