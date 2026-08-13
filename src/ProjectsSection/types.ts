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
