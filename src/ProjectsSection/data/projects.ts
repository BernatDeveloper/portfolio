import type { JSX } from 'react';
import type { Project } from '../types';
import { ArtEventApp } from '../svg/ArtEventApp';
import { ArtSkullKing } from '../svg/ArtSkullKing';
import { ArtGymTracker } from '../svg/ArtGymTracker';
import { ArtComingSoon } from '../svg/ArtComingSoon';
import { ArtBrand }    from '../svg/ArtBrand';
import { ArtTiger }    from '../svg/ArtTiger';
import { ArtReactTs }  from '../svg/ArtReactTs';
import { ArtCampfire } from '../svg/ArtCampfire';

export const PROJECTS: Project[] = [
  {
    idx: 0,
    num: '01',
    type: 'App · 2025',
    title: 'EVENTAPP',
    sub: 'Event Dashboard',
    desc: 'Plataforma para crear y gestionar eventos: invita participantes, personaliza ubicaciones con mapas interactivos y activa opciones premium.',
    tags: ['React', 'TS', 'Laravel', 'MySQL'],
    size: 'featured',
    url: 'https://github.com/BernatDeveloper/eventos-app',
  },
  {
    idx: 1,
    num: '02',
    type: 'Game · 2024',
    title: 'SKULL KING',
    sub: 'Score Tracker',
    desc: 'Scorer para el juego de cartas Skull King. Calcula puntuaciones por ronda, lleva el historial de partidas y determina al ganador.',
    tags: ['React', 'TS', 'PWA'],
    size: 'medium',
    url: 'https://skull-king-nu.vercel.app',
  },
  {
    idx: 2,
    num: '03',
    type: 'App · 2026',
    title: 'GYMTRACKER',
    sub: 'Workout Tracker',
    desc: 'Registra tus rutinas de entrenamiento, consulta el historial y controla tus récords personales. Funciona offline como PWA instalable.',
    tags: ['React', 'TS', 'PWA'],
    size: 'medium',
    url: 'https://gym-tracker-pi-liart.vercel.app',
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
    type: 'Coming soon',
    title: 'COMING SOON',
    sub: 'Forging something new',
    desc: 'A new project is taking shape. Check back soon to see what it becomes.',
    tags: [],
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
  2: 'GYMTRACKER',
};

export const ART_MAP: Record<number, () => JSX.Element> = {
  0: ArtEventApp,
  1: ArtSkullKing,
  2: ArtGymTracker,
  3: ArtBrand,
  4: ArtTiger,
  5: ArtComingSoon,
  6: ArtReactTs,
  7: ArtCampfire,
};
