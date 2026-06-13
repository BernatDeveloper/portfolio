import type { JSX } from 'react';
import type { Project } from '../types';
import { ArtEventApp } from '../svg/ArtEventApp';
import { ArtSkullKing } from '../svg/ArtSkullKing';
import { ArtEmber }    from '../svg/ArtEmber';
import { ArtAtlas }    from '../svg/ArtAtlas';
import { ArtVoid }     from '../svg/ArtVoid';

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
];

export const ART_MAP: Record<number, () => JSX.Element> = {
  0: ArtEventApp,
  1: ArtSkullKing,
  2: ArtEmber,
  3: ArtAtlas,
  4: ArtVoid,
};
