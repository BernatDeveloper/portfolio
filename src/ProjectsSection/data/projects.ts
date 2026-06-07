import type { JSX } from 'react';
import type { Project } from '../types';
import { ArtNexus }  from '../svg/ArtNexus';
import { ArtCipher } from '../svg/ArtCipher';
import { ArtEmber }  from '../svg/ArtEmber';
import { ArtAtlas }  from '../svg/ArtAtlas';
import { ArtVoid }   from '../svg/ArtVoid';

export const PROJECTS: Project[] = [
  {
    idx: 0,
    num: '01 — FEATURED',
    type: 'Web App · 2024',
    title: 'NEXUS',
    sub: 'Full-Stack Platform',
    desc: 'Real-time collaboration platform with Next.js and WebSockets. 10k+ users, sub-50ms latency globally.',
    tags: ['Next.js', 'WebSocket', 'PostgreSQL', 'Redis'],
    size: 'featured',
  },
  {
    idx: 1,
    num: '02',
    type: 'SaaS · 2024',
    title: 'CIPHER',
    sub: 'Security Dashboard',
    desc: 'Zero-knowledge encrypted analytics. End-to-end cryptography with real-time threat detection.',
    tags: ['React', 'Node.js', 'Crypto'],
    size: 'medium',
  },
  {
    idx: 2,
    num: '03',
    type: 'Library · 2023',
    title: 'EMBER',
    sub: 'Design System',
    desc: 'Component library powering 5 enterprise products. 200+ accessible, documented components.',
    tags: ['TypeScript', 'Storybook', 'CSS'],
    size: 'medium',
  },
  {
    idx: 3,
    num: '04',
    type: 'Tool · 2023',
    title: 'ATLAS',
    sub: 'Data Visualization',
    desc: '3D financial market analysis engine with real-time streaming and drill-down analysis.',
    tags: ['Three.js', 'D3.js', 'Python'],
    size: 'small',
  },
  {
    idx: 4,
    num: '05',
    type: 'Infra · 2022',
    title: 'VOID',
    sub: 'API Gateway',
    desc: 'High-performance gateway. 1M+ daily requests with intelligent caching and zero-downtime deployments.',
    tags: ['Go', 'Redis', 'Docker'],
    size: 'small',
  },
];

export const ART_MAP: Record<number, () => JSX.Element> = {
  0: ArtNexus,
  1: ArtCipher,
  2: ArtEmber,
  3: ArtAtlas,
  4: ArtVoid,
};
