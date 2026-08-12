import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectsSection.css';

import { PROJECTS, PROJECT_I18N_KEYS } from './data/projects';
import { ProjectCard }          from './components/ProjectCard';
import { useProjectsEntrance }  from './hooks/useProjectsEntrance';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useProjectsEntrance(sectionRef);

  const projects = PROJECTS.map((p) => {
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
      </div>
    </section>
  );
}
