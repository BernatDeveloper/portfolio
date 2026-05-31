import type { Category, NodeData } from '../types'

export const TRAVEL_DUR = 0.65

export const EMBER_COLS = ['var(--color-accent-light)', 'var(--color-accent)', 'var(--color-accent-alt)', 'var(--color-lava)', 'var(--color-gold)']

export const CAT: Record<Category, { hex: string }> = {
  frontend: { hex: 'var(--color-accent-light)' },
  backend:  { hex: 'var(--color-lava)' },
  database: { hex: 'var(--color-gold)' },
  tools:    { hex: 'var(--color-accent)' },
}

export const NODES: NodeData[] = [
  { id: 'js',    n: 'JavaScript', x: 105, y: 168, r: 26, cat: 'frontend' },
  { id: 'ts',    n: 'TypeScript', x: 258, y: 70,  r: 24, cat: 'frontend' },
  { id: 'react', n: 'React',      x: 400, y: 70,  r: 26, cat: 'frontend' },
  { id: 'vue',   n: 'Vue.js',     x: 308, y: 192, r: 22, cat: 'frontend' },
  { id: 'html',  n: 'HTML5',      x: 142, y: 285, r: 20, cat: 'frontend' },
  { id: 'css',   n: 'CSS3',       x: 62,  y: 362, r: 20, cat: 'frontend' },
  { id: 'tail',  n: 'Tailwind',   x: 240, y: 328, r: 20, cat: 'frontend' },
  { id: 'node',  n: 'Node.js',    x: 462, y: 188, r: 23, cat: 'backend'  },
  { id: 'expr',  n: 'Express',    x: 390, y: 318, r: 19, cat: 'backend'  },
  { id: 'php',   n: 'PHP',        x: 545, y: 80,  r: 18, cat: 'backend'  },
  { id: 'lara',  n: 'Laravel',    x: 548, y: 278, r: 21, cat: 'backend'  },
  { id: 'pg',    n: 'PostgreSQL', x: 618, y: 170, r: 18, cat: 'database' },
  { id: 'mysql', n: 'MySQL',      x: 620, y: 338, r: 18, cat: 'database' },
  { id: 'git',   n: 'Git',        x: 198, y: 168, r: 20, cat: 'tools'    },
  { id: 'rest',  n: 'REST API',   x: 476, y: 382, r: 16, cat: 'tools'    },
]

export const CONNS: [string, string][] = [
  ['js','ts'],     ['js','react'],    ['js','node'],    ['js','git'],    ['js','html'],
  ['ts','react'],  ['ts','vue'],      ['ts','node'],
  ['react','html'],['react','tail'],  ['react','rest'],
  ['vue','tail'],  ['vue','html'],    ['vue','lara'],
  ['html','css'],  ['html','tail'],   ['css','tail'],
  ['node','expr'], ['node','rest'],   ['node','pg'],    ['node','mysql'],
  ['expr','rest'], ['expr','mysql'],
  ['lara','php'],  ['lara','mysql'],  ['lara','rest'],
  ['php','pg'],    ['pg','mysql'],    ['git','node'],
]
