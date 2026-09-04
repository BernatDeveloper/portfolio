import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectsSection.css';

import { PROJECTS, PROJECT_I18N_KEYS } from './data/projects';
import { SECONDARY_PROJECTS } from './data/secondaryProjects';
import { ProjectCard }          from './components/ProjectCard';
import { ProjectsModal }        from './components/ProjectsModal';
import { ProjectsModalTrigger } from './components/ProjectsModalTrigger';
import { useProjectsEntrance }  from './hooks/useProjectsEntrance';

// CIPHER (idx 7) used to render as a flame-shaped icon tile (ArtCampfire).
// That slot now hosts the "more projects" trigger instead — see mejoras-portfolio.md.
const CIPHER_IDX = 7;

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useProjectsEntrance(sectionRef);

  const projects = PROJECTS
    .filter((p) => p.idx !== CIPHER_IDX)
    .map((p) => {
      const i18nKey = PROJECT_I18N_KEYS[p.idx];
      if (!i18nKey) return p;
      return {
        ...p,
        sub:  t(`projects.${i18nKey}.sub`,  { defaultValue: p.sub }),
        desc: t(`projects.${i18nKey}.desc`, { defaultValue: p.desc }),
      };
    });

  return (
    <section className="proj-section" ref={sectionRef}>
      <div className="proj-grid">
        {projects.map((p) => (
          <ProjectCard key={p.idx} project={p} />
        ))}
        <ProjectsModalTrigger onClick={() => setIsModalOpen(true)} />
      </div>

      <ProjectsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={SECONDARY_PROJECTS}
      />
    </section>
  );
}
