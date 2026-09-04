import type { SecondaryProject } from '../types';

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: 'react-components',
    title: 'React components',
    desc: 'Explora una colección de componentes personalizables para React. Cada componente incluye ejemplos interactivos, código JSX y estilos CSS, diseñados para facilitar el desarrollo de tus aplicaciones web.',
    tags: ['React', 'CSS'],
    demoUrl: 'https://components-react-storage.vercel.app/',
  },
  {
    id: 'mis-notas',
    title: 'Mis Notas',
    desc: 'Esta es una aplicación web donde los usuarios pueden registrarse, crear notas, gestionarlas y organizarlas según su estado. Además, cuenta con un perfil donde los usuarios pueden manejar diferentes ajustes personalizados.',
    tags: ['React', 'Laravel'],
    repoUrl: 'https://github.com/BernatDev6/Todo_React_Laravel',
  },
];
