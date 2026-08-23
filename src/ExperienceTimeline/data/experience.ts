import type { Experience } from "../types";

/** year/role/desc below are the Spanish fallback text; ExperienceTimeline.tsx
 *  overrides them per language via i18n keys `experience.<id>.*`. */
export const experiences: Experience[] = [
    {
        id: "FP_DAW",
        year: "SEP 2022 – JUN 2024",
        company: "Institut Bernat el Ferrer",
        role: "FP DAW · Desarrollo de Aplicaciones Web",
        desc: "Formación superior en desarrollo de aplicaciones web, con especialización full-stack y experiencia práctica en HTML, CSS, JavaScript, bases de datos, Vue y Laravel.",
        side: "left",
    },
    {
        id: "ELADIET",
        year: "OCT 2023 – JUL 2024",
        company: "Eladiet",
        role: "Programador",
        desc: "Desarrollo y mantenimiento de Power Pages con HTML, CSS, JavaScript y Liquid, además de implementación de nuevas funcionalidades en el ERP mediante C/AL sobre Microsoft Dynamics NAV.",
        side: "right",
    },
    {
        id: "MASTER",
        year: "OCT 2024 – JUL 2025",
        company: "Nett Digital School",
        role: "Máster en Desarrollo Web Avanzado",
        desc: "Especialización avanzada en desarrollo web full-stack con React y Node.js, trabajando arquitectura de software, buenas prácticas y desarrollo de aplicaciones modernas.",
        side: "left",
    },
    {
        id: "DATALAB",
        year: "OCT 2025 – ACTUALIDAD",
        company: "DataLab",
        role: "Desarrollador de Software",
        desc: "Desarrollo de nuevas funcionalidades para el ERP corporativo con Java, JavaScript y GWT, trabajando también en la gestión, mantenimiento y optimización de bases de datos y consultas SQL. Además, realizo la mejora y refactorización de módulos existentes, priorizando la calidad, escalabilidad y mantenibilidad del código.",
        side: "right",
    },
];