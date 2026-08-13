import { useRef } from 'react';
import type { Project } from '../types';
import { ART_MAP } from '../data/projects';
import { useProjectCardHover } from '../hooks/useProjectCardHover';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const { handleMouseEnter } = useProjectCardHover(cardRef);
  const { onMouseEnter: emberEnter, onMouseLeave: emberLeave } = useEmberCursorHover();
  const ArtComponent = ART_MAP[project.idx];

  // The four 1-slot small cards are icon/logo tiles, not project cards —
  // art only, no title/description/hover panel.
  const isLogo = project.size === 'small';

  return (
    <article
      ref={cardRef}
      className={`pc ${project.size}${isLogo ? ' pc--logo' : ''}`}
      data-idx={project.idx}
      onMouseEnter={() => { handleMouseEnter(); emberEnter(); }}
      onMouseLeave={emberLeave}
    >
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
            <div className="pc-title-block">
              <h3 className="pc-title">{project.title}</h3>
              <p className="pc-sub">{project.sub}</p>
            </div>
            <div className="pc-summary">
              <div className="pc-summary-divider" />
              <p className="pc-desc">{project.desc}</p>
              <div className="pc-tags-row">
                <div className="pc-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="pc-tag">{tag}</span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-link"
                    aria-label={`Visit ${project.title}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
