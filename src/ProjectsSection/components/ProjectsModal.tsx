import { useTranslation } from 'react-i18next';
import type { SecondaryProject } from '../types';
import { Modal } from '../../components/Modal/Modal';
import './ProjectsModal.css';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: SecondaryProject[];
}

export function ProjectsModal({ isOpen, onClose, projects }: ProjectsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="projects-modal-title">
      <h2 id="projects-modal-title" className="modal-title">
        {t('projectsModal.title')}
      </h2>

      <ul className="pm-list">
        {projects.map((p) => (
          <li key={p.id} className="pm-item">
            <div className="pm-item-head">
              <h3 className="pm-item-title">{p.title}</h3>
              <div className="pm-item-links">
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-item-link"
                    aria-label={`${t('projectsModal.repoLabel')} ${p.title}`}
                  >
                    {t('projectsModal.repoLabel')}
                    <svg className="pm-item-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-item-link"
                    aria-label={`${t('projectsModal.demoLabel')} ${p.title}`}
                  >
                    {t('projectsModal.demoLabel')}
                    <svg className="pm-item-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <p className="pm-item-desc">{p.desc}</p>
            <div className="pm-item-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="pm-tag">{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
