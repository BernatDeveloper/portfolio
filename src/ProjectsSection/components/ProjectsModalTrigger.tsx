import { useTranslation } from 'react-i18next';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';

export function ProjectsModalTrigger({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  const { onMouseEnter, onMouseLeave } = useEmberCursorHover();

  return (
    <button
      type="button"
      className="pc small pc-trigger"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg className="pc-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
      <span className="pc-trigger-label">{t('projectsModal.trigger')}</span>
    </button>
  );
}
