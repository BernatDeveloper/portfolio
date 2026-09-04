import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../types';
import { ART_MAP } from '../data/projects';
import { useProjectCardHover } from '../hooks/useProjectCardHover';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';
import { ProjectInfoModal } from './ProjectInfoModal';

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleMouseEnter } = useProjectCardHover(cardRef);
  const { onMouseEnter: emberEnter, onMouseLeave: emberLeave } = useEmberCursorHover();
  const { t } = useTranslation();
  const ArtComponent = ART_MAP[project.idx];
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // The 1-slot small cards are icon/logo tiles, not project cards —
  // art only, no title/info button.
  const isLogo = project.size === 'small';

  const visual = (
    <>
      <div className="pc-art">
        <ArtComponent />
      </div>
      {!isLogo && (
        <>
          <div className="pc-overlay" />
          <div className="pc-tl" />
          <div className="pc-br" />
          <div className="pc-meta">
            <span className="pc-num">{project.num}</span>
            <span className="pc-type">{project.type}</span>
          </div>
          <div className="pc-panel">
            <h3 className="pc-title">{project.title}</h3>
            <p className="pc-sub">{project.sub}</p>
          </div>
        </>
      )}
    </>
  );

  return (
    <div
      ref={cardRef}
      className={`pc ${project.size}${isLogo ? ' pc--logo' : ''}`}
      data-idx={project.idx}
      onMouseEnter={() => { handleMouseEnter(); emberEnter(); }}
      onMouseLeave={emberLeave}
    >
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="pc-link-area">
          {visual}
        </a>
      ) : (
        <div className="pc-link-area">{visual}</div>
      )}

      {!isLogo && (
        <>
          <button
            type="button"
            className="pc-info-btn"
            onClick={() => setIsInfoOpen(true)}
            aria-label={`${t('projectInfo.trigger')}: ${project.title}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="11" x2="12" y2="16" />
              <circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
            </svg>
          </button>

          <ProjectInfoModal
            project={project}
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
          />
        </>
      )}
    </div>
  );
}
