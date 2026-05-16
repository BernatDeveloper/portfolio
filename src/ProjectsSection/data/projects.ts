import { SkullKingSVG } from "../svg/SkullKingSVG";

interface Project {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    year: string;
    link?: string;
    svg: React.ComponentType;
}

export const PROJECTS: Project[] = [
    {
        id: "proj-01",
        number: "I",
        title: "VOID ENGINE",
        subtitle: "Full-Stack Platform",
        description: "Real-time multiplayer engine built with WebSockets, Redis, and custom physics. Handles 10k+ concurrent sessions with sub-10ms latency.",
        tags: ["TypeScript", "WebGL", "Redis", "Node.js"],
        year: "2024",
        link: "#",
        svg: SkullKingSVG,
    },
    {
        id: "proj-02",
        number: "II",
        title: "EMBER UI",
        subtitle: "Design System",
        description: "Open-source component library for high-performance React apps. 60+ components, full a11y, dark-first theming, zero runtime CSS.",
        tags: ["React", "Vite", "Storybook", "CSS"],
        year: "2024", link: "#",
        svg: SkullKingSVG,
    },
    {
        id: "proj-03",
        number: "III",
        title: "INFERNO API",
        subtitle: "Distributed Backend",
        description: "Microservices orchestration with auto-scaling, circuit-breaker patterns, and OpenTelemetry tracing across 20+ services in production.",
        tags: ["Go", "gRPC", "Kubernetes", "Prometheus"],
        year: "2023",
        link: "#",
        svg: SkullKingSVG,
    },
    {
        id: "proj-04",
        number: "IV",
        title: "PHANTOM AI",
        subtitle: "ML Pipeline",
        description: "End-to-end MLOps platform for training, evaluation and deployment with a custom vector DB for sub-millisecond semantic search.",
        tags: ["Python", "PyTorch", "FastAPI", "Postgres"],
        year: "2023",
        link: "#",
        svg: SkullKingSVG,
    },
];