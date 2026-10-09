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
  /** Primary external link (usually the live demo). Card becomes clickable when set. */
  url?: string;
  /** Optional secondary link to the source repo, shown in the info modal. */
  repoUrl?: string;
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
