export type ProjectSize = 'featured' | 'medium' | 'small';

export interface Project {
  idx: number;
  num: string;
  type: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  size: ProjectSize;
  /** External link (repo, live demo…). Card becomes clickable when set. */
  url?: string;
}

/** Secondary/basic project, shown only inside the "more projects" modal list. */
export interface SecondaryProject {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
}
