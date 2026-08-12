import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectsSection.css';

import { PROJECTS }             from './data/projects';
import { ProjectCard }          from './components/ProjectCard';
import { useProjectsEntrance }  from './hooks/useProjectsEntrance';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useProjectsEntrance(sectionRef);

  const projects = PROJECTS.map((p) => ({
    ...p,
    sub:  t(`projects.${p.title}.sub`,  { defaultValue: p.sub }),
    desc: t(`projects.${p.title}.desc`, { defaultValue: p.desc }),
  }));

  return (
    <section className="proj-section" ref={sectionRef}>
      <div className="proj-grid">
        {projects.map((p) => (
          <ProjectCard key={p.idx} project={p} />
        ))}
      </div>
    </section>
  );
}
