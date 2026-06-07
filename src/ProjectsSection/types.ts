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
}
