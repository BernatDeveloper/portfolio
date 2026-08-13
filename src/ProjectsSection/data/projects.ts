import type { JSX } from 'react';
import type { Project } from '../types';
import { ArtEventApp } from '../svg/ArtEventApp';
import { ArtSkullKing } from '../svg/ArtSkullKing';
import { ArtEmber }    from '../svg/ArtEmber';
import { ArtPulse }    from '../svg/ArtPulse';
import { ArtForge }    from '../svg/ArtForge';
import { ArtCipher }   from '../svg/ArtCipher';
import { ArtBrand }    from '../svg/ArtBrand';
import { ArtTiger }    from '../svg/ArtTiger';

export const PROJECTS: Project[] = [
  {
    idx: 0,
    num: '01',
    type: 'App · 2025',
    title: 'EVENTAPP',
    sub: 'Event Dashboard',
    desc: 'Dashboard de gestión de eventos con tarjetas visuales, categorías por color y soporte para usuarios premium.',
    tags: ['React', 'TypeScript', 'Node.js'],
    size: 'featured',
  },
  {
    idx: 1,
    num: '02',
    type: 'Game · 2024',
    title: 'SKULL KING',
    sub: 'Score Tracker',
    desc: 'Scorer para el juego de cartas Skull King. Calcula puntuaciones por ronda, lleva el historial de partidas y determina al ganador.',
    tags: ['React', 'TypeScript', 'PWA'],
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
  {
    idx: 5,
    num: '06',
    type: 'Dashboard · 2024',
    title: 'PULSE',
    sub: 'Realtime Analytics',
    desc: 'Live metrics dashboard tracking user engagement across 40+ product surfaces with sub-second updates.',
    tags: ['Vue', 'WebSocket', 'ClickHouse'],
    size: 'medium',
  },
  {
    idx: 6,
    num: '07',
    type: 'Tool · 2022',
    title: 'FORGE',
    sub: 'CI/CD Pipeline',
    desc: 'Automated build and deployment pipeline with parallel job execution and one-click rollback.',
    tags: ['Go', 'Docker', 'GitHub Actions'],
    size: 'small',
  },
  {
    idx: 7,
    num: '08',
    type: 'Service · 2021',
    title: 'CIPHER',
    sub: 'Auth Gateway',
    desc: 'Zero-trust authentication service handling 2M+ daily logins with adaptive multi-factor auth.',
    tags: ['Rust', 'PostgreSQL', 'OAuth2'],
    size: 'small',
  },
];

export const PROJECT_I18N_KEYS: Partial<Record<number, string>> = {
  0: 'EVENTAPP',
  1: 'SKULL KING',
};

export const ART_MAP: Record<number, () => JSX.Element> = {
  0: ArtEventApp,
  1: ArtSkullKing,
  2: ArtEmber,
  3: ArtBrand,
  4: ArtTiger,
  5: ArtPulse,
  6: ArtForge,
  7: ArtCipher,
};
