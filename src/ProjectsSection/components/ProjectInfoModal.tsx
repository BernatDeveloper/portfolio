import { useTranslation } from 'react-i18next';
import type { Project } from '../types';
import { ART_MAP } from '../data/projects';
import { Modal } from '../../components/Modal/Modal';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';
import './ProjectInfoModal.css';

interface ProjectInfoModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectInfoModal({ project, isOpen, onClose }: ProjectInfoModalProps) {
  const { t } = useTranslation();
  const titleId = `project-info-title-${project.idx}`;
  const ArtComponent = ART_MAP[project.idx];
  const { onMouseEnter: emberEnter, onMouseLeave: emberLeave } = useEmberCursorHover();

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId={titleId} panelClassName="pim-panel">
      <div className="pim-art" aria-hidden="true">
        <ArtComponent />
      </div>
      <div className="pim-corner-tl" aria-hidden="true" />
      <div className="pim-corner-br" aria-hidden="true" />

      <div className="pim-content">
        <div className="pim-eyebrow">
          <span className="pim-num">{project.num}</span>
          <span className="pim-type">{project.type}</span>
        </div>

        <h2 id={titleId} className="pim-title">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pim-title-link"
              aria-label={`${t('projectInfo.visitLink')}: ${project.title}`}
              onMouseEnter={emberEnter}
              onMouseLeave={emberLeave}
            >
              {project.title}
              <svg className="pim-title-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          ) : (
            project.title
          )}
        </h2>
        <p className="pim-sub">{project.sub}</p>

        <div className="pim-divider" />

        <p className="pim-desc">{project.desc}</p>

        <div className="pim-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="pim-tag">{tag}</span>
          ))}
        </div>
      </div>
    </Modal>
  );
}
