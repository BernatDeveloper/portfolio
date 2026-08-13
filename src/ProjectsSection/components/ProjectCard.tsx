import { useRef } from 'react';
import type { Project } from '../types';
import { ART_MAP } from '../data/projects';
import { useProjectCardHover } from '../hooks/useProjectCardHover';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { handleMouseEnter } = useProjectCardHover(cardRef);
  const { onMouseEnter: emberEnter, onMouseLeave: emberLeave } = useEmberCursorHover();
  const ArtComponent = ART_MAP[project.idx];

  // The four 1-slot small cards are icon/logo tiles, not project cards —
  // art only, no title/description/hover panel.
  const isLogo = project.size === 'small';

  // Always an <a> — without href it's a plain non-interactive container
  // (same effective behavior as the <article> this replaces), and with
  // href it's a real link. Avoids a dynamically-typed JSX tag, which
  // TypeScript can't type well against a single ref.
  return (
    <a
      ref={cardRef}
      className={`pc ${project.size}${isLogo ? ' pc--logo' : ''}`}
      data-idx={project.idx}
      href={project.url}
      target={project.url ? '_blank' : undefined}
      rel={project.url ? 'noopener noreferrer' : undefined}
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
              <div className="pc-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="pc-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </a>
  );
}
