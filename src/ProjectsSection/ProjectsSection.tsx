import { useRef } from 'react';
import './ProjectsSection.css';

import { PROJECTS }             from './data/projects';
import { ProjectCard }          from './components/ProjectCard';
import { useProjectsEntrance }  from './hooks/useProjectsEntrance';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useProjectsEntrance(sectionRef);

  return (
    <section className="proj-section" ref={sectionRef}>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.idx} project={p} />
        ))}
      </div>
    </section>
  );
}
