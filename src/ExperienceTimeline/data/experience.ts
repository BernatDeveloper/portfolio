import type { Experience } from "../types";

/** year/role/desc below are the Spanish fallback text; ExperienceTimeline.tsx
 *  overrides them per language via i18n keys `experience.<id>.*`. */
export const experiences: Experience[] = [
    {
        id: "FP_DAW",
        year: "SEP 2022 – JUN 2024",
        company: "Institut Bernat el Ferrer",
        role: "FP DAW · Desarrollo de Aplicaciones Web",
        desc: "Formación de grado superior en desarrollo web full-stack: HTML, CSS, JavaScript y bases de datos como cimientos del oficio, con Vue y Laravel en proyectos aplicados.",
        side: "left",
    },
    {
        id: "ELADIET",
        year: "OCT 2023 – JUL 2024",
        company: "Eladiet",
        role: "Programador",
        desc: "Desarrollo de Power Pages con HTML, CSS, JavaScript y Liquid, y nuevas funcionalidades en el ERP con C/AL sobre Microsoft Dynamics NAV.",
        side: "right",
    },
    {
        id: "MASTER",
        year: "OCT 2024 – JUL 2025",
        company: "Nett Digital School",
        role: "Máster en Desarrollo Web Avanzado",
        desc: "Especialización full-stack con React y Node.js, profundizando en arquitectura de software y buenas prácticas modernas.",
        side: "left",
    },
    {
        id: "DATALAB",
        year: "OCT 2025 – ACTUALIDAD",
        company: "DataLab",
        role: "Desarrollador de Software",
        desc: "Desarrollo de nuevas funcionalidades en el ERP corporativo con Java, JavaScript y GWT, y refactorización de módulos existentes preservando su mantenibilidad.",
        side: "right",
    },
];