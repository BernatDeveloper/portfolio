import type { SecondaryProject } from '../types';

/**
 * Placeholder content — invented for now so the "more projects" modal has
 * something to show. Swap these for the real secondary projects later.
 */
export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: 'nimbus',
    title: 'NIMBUS',
    desc: 'Lightweight weather dashboard with hourly forecasts and severe-weather alerts.',
    tags: ['React', 'TypeScript', 'REST API'],
    repoUrl: '#',
    demoUrl: '#',
  },
  {
    id: 'relay',
    title: 'RELAY',
    desc: 'Minimal Kanban board for small teams, with drag-and-drop and real-time sync.',
    tags: ['React', 'TypeScript', 'WebSocket'],
    repoUrl: '#',
  },
  {
    id: 'echo',
    title: 'ECHO',
    desc: 'CLI tool that turns a folder of markdown notes into a searchable static site.',
    tags: ['Node.js', 'CLI'],
    demoUrl: '#',
  },
];
