# Portfolio i18n (react-i18next) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up full multi-language support (English/Spanish/Catalan, Spanish default) across the portfolio using `react-i18next`, translate all UI copy plus the two real project entries (EVENTAPP, SKULL KING), persist the chosen language in `localStorage`, and make the footer `LangSwitcher` trigger the site's ember cursor hover effect.

**Architecture:** A single global `i18next` instance (`src/i18n/i18n.ts`) is initialized once as a side effect imported from `main.tsx`, with three flat JSON resource files (`src/i18n/locales/{en,es,ca}.json`). Components read translations with `react-i18next`'s `useTranslation()` hook (`t('section.key')`) — no custom context/provider is needed since `react-i18next` works against the global singleton. The old hand-rolled `src/i18n/LanguageContext.tsx` is deleted. Two real project entries get a translation override applied at render time in `ProjectsSection.tsx`; the three filler projects (ATLAS/EMBER/VOID) and all filler data elsewhere (experience timeline, skill node names) keep their original hardcoded text in every language.

**Tech Stack:** React 19, TypeScript, Vite, `i18next` + `react-i18next` (new deps), existing `useEmberCursorHover` hook.

## Global Constraints

- Package manager is pnpm — use `pnpm add`, never `npm`/`yarn`.
- Default language is Spanish (`es`); fallback language is also `es`.
- Language choice persists in `localStorage` under the key `portfolio-lang`.
- Only these get translated: UI chrome (loader, hero, section titles, skills hint, contact form/copy, footer, lang switcher) and the `sub`/`desc` fields of the EVENTAPP and SKULL KING projects.
- Everything else stays hardcoded/untouched: `ExperienceTimeline` data, ATLAS/EMBER/VOID project entries, skill node names, proper nouns ("Bernat"), symbolic stat values (∞, VII, 0°), tech tags (React, TypeScript, ...).
- No test runner exists in this repo — verification is `pnpm build` (type-check + bundle) and `pnpm lint` after each task, with a final manual QA pass in `pnpm dev`.
- Hovering the `LangSwitcher` must dispatch the same `ember:hover`/`ember:leave` events as other interactive elements, via `useEmberCursorHover()` applied to the whole `.ls` container (not per-button) to avoid flicker.
- The active-language dot indicator in `LangSwitcher.css` has already been removed — do not re-add it.

---

### Task 1: Install i18next, create translation resources and init module

**Files:**
- Modify: `package.json` (add deps via `pnpm add`)
- Modify: `tsconfig.app.json` (enable `resolveJsonModule`)
- Create: `src/i18n/locales/en.json`
- Create: `src/i18n/locales/es.json`
- Create: `src/i18n/locales/ca.json`
- Create: `src/i18n/i18n.ts`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: nothing (foundational task).
- Produces: `src/i18n/i18n.ts` exports `type Lang = 'en' | 'es' | 'ca'` and, as a side effect of being imported, initializes the global `i18next` singleton with the three resource files under the `translation` namespace. Every translation key used by later tasks (`loader.eyebrow`, `hero.*`, `sections.*`, `skills.hint`, `projects.EVENTAPP.*`, `projects.SKULL KING.*`, `contact.*`, `footer.*`, `langSwitcher.*`) is defined in all three JSON files from this task onward — later tasks only *consume* `t('...')`, they never add new keys.

- [ ] **Step 1: Install dependencies**

Run:
```bash
pnpm add i18next react-i18next
```

- [ ] **Step 2: Enable JSON module resolution in TypeScript**

Edit `tsconfig.app.json`, add `"resolveJsonModule": true` inside `compilerOptions` (next to `"skipLibCheck": true`):

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "resolveJsonModule": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create the English resource file**

Create `src/i18n/locales/en.json`:

```json
{
  "loader": { "eyebrow": "Initializing" },

  "hero": {
    "eyebrow": "Unleash the beast within",
    "role": "Developer",
    "ctaPrimary": "Enter the void",
    "ctaSecondary": "Discover more",
    "stats": { "power": "Power", "realms": "Realms", "fear": "Fear" }
  },

  "sections": {
    "projects": { "eyebrow": "Selected work", "title": "Projects" },
    "skills": { "eyebrow": "What I work with", "title": "Skills" },
    "contact": { "eyebrow": "Get in touch", "title": "Contact" }
  },

  "skills": { "hint": "— hover a node —" },

  "projects": {
    "EVENTAPP": {
      "sub": "Event Dashboard",
      "desc": "Event management dashboard with visual cards, color-coded categories and support for premium users."
    },
    "SKULL KING": {
      "sub": "Score Tracker",
      "desc": "Scorer for the Skull King card game. Calculates round scores, keeps a match history and determines the winner."
    }
  },

  "contact": {
    "taglineLine1": "Let's work",
    "taglineLine2": "together.",
    "bio": "Open to new projects, freelance work and collaborations. Drop me a message and I'll get back to you shortly.",
    "socialsAriaLabel": "Social links",
    "sentTitle": "Message received",
    "sentSub": "I'll be in touch soon.",
    "form": {
      "nameLabel": "Name",
      "namePlaceholder": "Your name",
      "emailLabel": "Email",
      "emailPlaceholder": "your@email.com",
      "messageLabel": "Message",
      "messagePlaceholder": "Tell me about your project…",
      "submit": "Send message"
    }
  },

  "footer": {
    "ariaLabel": "Site footer",
    "statementMain": "Fire shapes the finest things.",
    "statementSub": "Frontend developer passionate about crafting digital experiences that ignite.",
    "tagline": "Forged with obsession"
  },

  "langSwitcher": {
    "ariaLabel": "Language selector",
    "switchToPrefix": "Switch to"
  }
}
```

- [ ] **Step 4: Create the Spanish resource file (default language)**

Create `src/i18n/locales/es.json`:

```json
{
  "loader": { "eyebrow": "Inicializando" },

  "hero": {
    "eyebrow": "Desata a la bestia interior",
    "role": "Desarrollador",
    "ctaPrimary": "Entra en el vacío",
    "ctaSecondary": "Descubre más",
    "stats": { "power": "Poder", "realms": "Reinos", "fear": "Miedo" }
  },

  "sections": {
    "projects": { "eyebrow": "Trabajo seleccionado", "title": "Proyectos" },
    "skills": { "eyebrow": "Con lo que trabajo", "title": "Habilidades" },
    "contact": { "eyebrow": "Ponte en contacto", "title": "Contacto" }
  },

  "skills": { "hint": "— pasa el cursor por un nodo —" },

  "projects": {
    "EVENTAPP": {
      "sub": "Panel de eventos",
      "desc": "Dashboard de gestión de eventos con tarjetas visuales, categorías por color y soporte para usuarios premium."
    },
    "SKULL KING": {
      "sub": "Contador de puntos",
      "desc": "Scorer para el juego de cartas Skull King. Calcula puntuaciones por ronda, lleva el historial de partidas y determina al ganador."
    }
  },

  "contact": {
    "taglineLine1": "Trabajemos",
    "taglineLine2": "juntos.",
    "bio": "Abierto a nuevos proyectos, trabajo freelance y colaboraciones. Envíame un mensaje y te responderé enseguida.",
    "socialsAriaLabel": "Enlaces sociales",
    "sentTitle": "Mensaje recibido",
    "sentSub": "Te responderé pronto.",
    "form": {
      "nameLabel": "Nombre",
      "namePlaceholder": "Tu nombre",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@email.com",
      "messageLabel": "Mensaje",
      "messagePlaceholder": "Cuéntame sobre tu proyecto…",
      "submit": "Enviar mensaje"
    }
  },

  "footer": {
    "ariaLabel": "Pie de página",
    "statementMain": "El fuego forja las mejores cosas.",
    "statementSub": "Desarrollador frontend apasionado por crear experiencias digitales que encienden.",
    "tagline": "Forjado con obsesión"
  },

  "langSwitcher": {
    "ariaLabel": "Selector de idioma",
    "switchToPrefix": "Cambiar a"
  }
}
```

- [ ] **Step 5: Create the Catalan resource file**

Create `src/i18n/locales/ca.json`:

```json
{
  "loader": { "eyebrow": "Inicialitzant" },

  "hero": {
    "eyebrow": "Deslliga la bèstia interior",
    "role": "Desenvolupador",
    "ctaPrimary": "Entra al buit",
    "ctaSecondary": "Descobreix més",
    "stats": { "power": "Poder", "realms": "Regnes", "fear": "Por" }
  },

  "sections": {
    "projects": { "eyebrow": "Treball seleccionat", "title": "Projectes" },
    "skills": { "eyebrow": "Amb què treballo", "title": "Habilitats" },
    "contact": { "eyebrow": "Posa't en contacte", "title": "Contacte" }
  },

  "skills": { "hint": "— passa el cursor per un node —" },

  "projects": {
    "EVENTAPP": {
      "sub": "Panell d'esdeveniments",
      "desc": "Panell de gestió d'esdeveniments amb targetes visuals, categories per color i suport per a usuaris premium."
    },
    "SKULL KING": {
      "sub": "Comptador de punts",
      "desc": "Marcador per al joc de cartes Skull King. Calcula puntuacions per ronda, guarda l'historial de partides i determina el guanyador."
    }
  },

  "contact": {
    "taglineLine1": "Treballem",
    "taglineLine2": "junts.",
    "bio": "Obert a nous projectes, treball freelance i col·laboracions. Envia'm un missatge i et respondré de seguida.",
    "socialsAriaLabel": "Enllaços socials",
    "sentTitle": "Missatge rebut",
    "sentSub": "Et respondré aviat.",
    "form": {
      "nameLabel": "Nom",
      "namePlaceholder": "El teu nom",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@email.com",
      "messageLabel": "Missatge",
      "messagePlaceholder": "Explica'm sobre el teu projecte…",
      "submit": "Envia el missatge"
    }
  },

  "footer": {
    "ariaLabel": "Peu de pàgina",
    "statementMain": "El foc forja les millors coses.",
    "statementSub": "Desenvolupador frontend apassionat per crear experiències digitals que encenen.",
    "tagline": "Forjat amb obsessió"
  },

  "langSwitcher": {
    "ariaLabel": "Selector d'idioma",
    "switchToPrefix": "Canvia a"
  }
}
```

- [ ] **Step 6: Create the i18next init module**

Create `src/i18n/i18n.ts`:

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import ca from './locales/ca.json';

const STORAGE_KEY = 'portfolio-lang';
const SUPPORTED_LANGS = ['en', 'es', 'ca'] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

function isSupportedLang(value: string | null): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value ?? '');
}

const stored = localStorage.getItem(STORAGE_KEY);
const initialLang: Lang = isSupportedLang(stored) ? stored : 'es';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ca: { translation: ca },
  },
  lng: initialLang,
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

document.documentElement.lang = initialLang;

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});

export default i18n;
```

- [ ] **Step 7: Initialize i18next before the app renders**

Edit `src/main.tsx` to import the init module as a side effect, before `App`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 8: Verify it builds**

Run: `pnpm build`
Expected: no TypeScript or bundling errors (JSON imports resolve, `i18n.ts` compiles clean).

- [ ] **Step 9: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.app.json src/i18n/locales src/i18n/i18n.ts src/main.tsx
git commit -m "feat(i18n): add react-i18next with en/es/ca resources"
```

---

### Task 2: Remove the old custom LanguageContext, migrate LangSwitcher to react-i18next + add ember cursor hover

These two changes are one task, not two: after Task 1, `LangSwitcher.tsx` is the only remaining consumer of the old `LanguageContext`. Deleting that context and rewriting `LangSwitcher` have to land in the same commit, otherwise the build is broken in between.

**Files:**
- Delete: `src/i18n/LanguageContext.tsx`
- Modify: `src/AppLayout/AppLayout.tsx`
- Modify: `src/LangSwitcher/LangSwitcher.tsx`

**Interfaces:**
- Consumes: nothing new for `AppLayout` — `react-i18next`'s global singleton (initialized in Task 1) works without a React provider wrapper. `LangSwitcher` consumes `useTranslation()` from `react-i18next` (`t`, `i18n.language`, `i18n.changeLanguage`); `type Lang` from `../i18n/i18n` (Task 1); `useEmberCursorHover()` from `../hooks/useEmberCursorHover` (existing, returns `{ onMouseEnter, onMouseLeave }`); keys `langSwitcher.ariaLabel` and `langSwitcher.switchToPrefix` (Task 1's JSON resources).
- Produces: `AppLayout.tsx` exports a single `AppLayout` component (the former `AppLayoutInner` body, renamed), no longer wrapping children in a language provider. `LangSwitcher` renders correctly translated aria-labels and triggers the ember cursor effect on hover.

- [ ] **Step 1: Delete the old context file**

```bash
rm "src/i18n/LanguageContext.tsx"
```

- [ ] **Step 2: Simplify AppLayout.tsx**

Replace the full contents of `src/AppLayout/AppLayout.tsx` with:

```tsx
import { useCallback, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { HeroSection } from '../HeroSection/HeroSection';
import ExperienceTimeline from '../ExperienceTimeline/ExperienceTimeline';
import { useEmberCursor } from '../hooks/useEmberCursor';
import { useLenis } from '../hooks/useLenis';
import { SkillSectionComp } from '../SkillsSection';
// import { RitualContactComp } from '../RitualContact'; // kept for reference
import { ProjectsSectionComp } from '../ProjectsSection';
import { ContactSectionComp } from '../ContactSection';
import { Footer }             from '../Footer/Footer';

export function AppLayout() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);

  useEmberCursor();
  useLenis();

  const handleProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleExitStart = useCallback(() => {
    setHeroVisible(true);
  }, []);

  const handleExitComplete = useCallback(() => {
    setLoaderGone(true);
  }, []);

  return (
    <>
      {!loaderGone && (
        <Loader
          progress={loadProgress}
          isComplete={isLoaded}
          onExitStart={handleExitStart}
          onExitComplete={handleExitComplete}
        />
      )}

      <HeroSection shouldAnimate={heroVisible} />

      <ExperienceTimeline
        onProgress={handleProgress}
        onLoaded={handleLoaded}
      />

      <ProjectsSectionComp />
      <SkillSectionComp />
      {/* <RitualContactComp /> */}
      <ContactSectionComp />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Rewrite LangSwitcher.tsx**

Replace the full contents of `src/LangSwitcher/LangSwitcher.tsx` with:

```tsx
import { useTranslation } from 'react-i18next';
import { useEmberCursorHover } from '../hooks/useEmberCursorHover';
import type { Lang } from '../i18n/i18n';
import './LangSwitcher.css';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
];

export function LangSwitcher() {
  const { t, i18n } = useTranslation();
  const emberHandlers = useEmberCursorHover();

  return (
    <div
      className="ls"
      role="group"
      aria-label={t('langSwitcher.ariaLabel')}
      {...emberHandlers}
    >
      {LANGS.map(({ code, label }, i) => (
        <button
          key={code}
          className={`ls-btn${i18n.language === code ? ' ls-btn--active' : ''}`}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={i18n.language === code}
          aria-label={`${t('langSwitcher.switchToPrefix')} ${label}`}
        >
          {label}
          {i < LANGS.length - 1 && (
            <span className="ls-divider" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Verify it builds**

Run: `pnpm build`
Expected: no errors — `LangSwitcher.tsx` was the last remaining consumer of the deleted `LanguageContext`, so the build is green again.

- [ ] **Step 5: Manual check in dev server**

Run: `pnpm dev`, open the site, scroll to the footer, and confirm:
- Clicking EN/ES/CA switches the active button's color/style with no dot indicator.
- Hovering anywhere over the EN/ES/CA pill (not just directly on a letter) triggers the ember cursor burst effect, and moving between the three buttons doesn't make it flicker off.
- Reloading the page keeps the language you last picked.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/LanguageContext.tsx src/AppLayout/AppLayout.tsx src/LangSwitcher/LangSwitcher.tsx
git commit -m "refactor(i18n): drop custom LanguageContext, migrate LangSwitcher to react-i18next, add ember hover"
```

---

### Task 3: Translate the Loader

**Files:**
- Modify: `src/Loader/Loader.tsx`

**Interfaces:**
- Consumes: `useTranslation()` from `react-i18next`; key `loader.eyebrow`.
- Produces: n/a (leaf UI text).

- [ ] **Step 1: Add the translation to Loader.tsx**

In `src/Loader/Loader.tsx`, add the import:

```tsx
import { useTranslation } from 'react-i18next';
```

Inside the `Loader` component body, before the `return`, add:

```tsx
const { t } = useTranslation();
```

Replace:

```tsx
        <p ref={eyebrowRef} className="loader-eyebrow">
          Initializing
        </p>
```

with:

```tsx
        <p ref={eyebrowRef} className="loader-eyebrow">
          {t('loader.eyebrow')}
        </p>
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/Loader/Loader.tsx
git commit -m "feat(i18n): translate Loader"
```

---

### Task 4: Translate the Hero section

**Files:**
- Modify: `src/HeroSection/HeroSection.tsx`

**Interfaces:**
- Consumes: `useTranslation()`; keys `hero.eyebrow`, `hero.role`, `hero.ctaPrimary`, `hero.ctaSecondary`, `hero.stats.power`, `hero.stats.realms`, `hero.stats.fear`.
- Produces: n/a (leaf UI text). Note "Bernat" (line-1 of the title) and the symbolic stat values (∞, VII, 0°) are NOT translated.

- [ ] **Step 1: Add the translation hook**

In `src/HeroSection/HeroSection.tsx`, add the import:

```tsx
import { useTranslation } from 'react-i18next';
```

Inside `HeroSection`, before the `return`, add:

```tsx
  const { t } = useTranslation();
```

- [ ] **Step 2: Replace the hardcoded strings**

Replace:

```tsx
        <p ref={eyebrowRef} className="hero-eyebrow">Unleash the beast within</p>

        <h1 className="hero-title">
          <span ref={line1Ref} className="line-1">Bernat</span>
          <span ref={line2Ref} className="line-2">Developer</span>
        </h1>

        <div ref={dividerRef} className="hero-divider" />

        <div ref={ctaRef} className="hero-cta">
          <button className="btn-primary" {...emberHandlers}>
            <span>Enter the void</span>
          </button>
          <button className="btn-secondary" {...emberHandlers}>Discover more</button>
        </div>

        <div ref={statsRef} className="hero-stats">
          <div className="stat">
            <div className="stat-value">∞</div>
            <div className="stat-label">Power</div>
          </div>
          <div className="stat">
            <div className="stat-value">VII</div>
            <div className="stat-label">Realms</div>
          </div>
          <div className="stat">
            <div className="stat-value">0°</div>
            <div className="stat-label">Fear</div>
          </div>
        </div>
```

with:

```tsx
        <p ref={eyebrowRef} className="hero-eyebrow">{t('hero.eyebrow')}</p>

        <h1 className="hero-title">
          <span ref={line1Ref} className="line-1">Bernat</span>
          <span ref={line2Ref} className="line-2">{t('hero.role')}</span>
        </h1>

        <div ref={dividerRef} className="hero-divider" />

        <div ref={ctaRef} className="hero-cta">
          <button className="btn-primary" {...emberHandlers}>
            <span>{t('hero.ctaPrimary')}</span>
          </button>
          <button className="btn-secondary" {...emberHandlers}>{t('hero.ctaSecondary')}</button>
        </div>

        <div ref={statsRef} className="hero-stats">
          <div className="stat">
            <div className="stat-value">∞</div>
            <div className="stat-label">{t('hero.stats.power')}</div>
          </div>
          <div className="stat">
            <div className="stat-value">VII</div>
            <div className="stat-label">{t('hero.stats.realms')}</div>
          </div>
          <div className="stat">
            <div className="stat-value">0°</div>
            <div className="stat-label">{t('hero.stats.fear')}</div>
          </div>
        </div>
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/HeroSection/HeroSection.tsx
git commit -m "feat(i18n): translate HeroSection"
```

---

### Task 5: Translate the Projects section (titles + EVENTAPP/SKULL KING content)

**Files:**
- Modify: `src/ProjectsSection/index.tsx`
- Modify: `src/ProjectsSection/ProjectsSection.tsx`

**Interfaces:**
- Consumes: `useTranslation()`; keys `sections.projects.eyebrow`, `sections.projects.title`, `projects.EVENTAPP.sub`, `projects.EVENTAPP.desc`, `projects.SKULL KING.sub`, `projects.SKULL KING.desc`; `PROJECTS` array and `Project` type (existing, unchanged); `ProjectCard` component (existing, unchanged — still receives a `project: Project` prop).
- Produces: n/a. ATLAS/EMBER/VOID entries pass through `ProjectsSection.tsx` unchanged in every language because no `projects.ATLAS`/`projects.EMBER`/`projects.VOID` keys exist in any locale file — `t()`'s `defaultValue` falls back to the original `PROJECTS` data.

- [ ] **Step 1: Translate the section title**

Replace the full contents of `src/ProjectsSection/index.tsx` with:

```tsx
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../utils/SectionTitle/SectionTitle"
import { ProjectsSection } from "./ProjectsSection"

export const ProjectsSectionComp = () => {
  const { t } = useTranslation()

  return (
    <>
      <SectionTitle
        ghost={t('sections.projects.title')}
        eyebrow={t('sections.projects.eyebrow')}
        title={t('sections.projects.title')}
        align="center"
      />
      <ProjectsSection />
    </>
  )
}
```

- [ ] **Step 2: Apply per-project translation overrides**

Replace the full contents of `src/ProjectsSection/ProjectsSection.tsx` with:

```tsx
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectsSection.css';

import { PROJECTS }             from './data/projects';
import { ProjectCard }          from './components/ProjectCard';
import { useProjectsEntrance }  from './hooks/useProjectsEntrance';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useProjectsEntrance(sectionRef);

  const projects = PROJECTS.map((p) => ({
    ...p,
    sub:  t(`projects.${p.title}.sub`,  { defaultValue: p.sub }),
    desc: t(`projects.${p.title}.desc`, { defaultValue: p.desc }),
  }));

  return (
    <section className="proj-section" ref={sectionRef}>
      <div className="proj-grid">
        {projects.map((p) => (
          <ProjectCard key={p.idx} project={p} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 4: Manual check in dev server**

Run: `pnpm dev`, switch language to EN, ES, and CA in turn, scroll to Projects, and confirm:
- Section eyebrow/title translate.
- EVENTAPP and SKULL KING cards' subtitle and description change per language.
- EMBER, ATLAS, VOID cards' text stays identical across all three languages.

- [ ] **Step 5: Commit**

```bash
git add src/ProjectsSection/index.tsx src/ProjectsSection/ProjectsSection.tsx
git commit -m "feat(i18n): translate Projects section title and EVENTAPP/SKULL KING content"
```

---

### Task 6: Translate the Skills section

**Files:**
- Modify: `src/SkillsSection/index.tsx`
- Modify: `src/SkillsSection/components/SkillHint.tsx`

**Interfaces:**
- Consumes: `useTranslation()`; keys `sections.skills.eyebrow`, `sections.skills.title`, `skills.hint`.
- Produces: n/a. Skill node names (`NODES` in `data/nodes.ts`) are NOT touched — out of scope.

- [ ] **Step 1: Translate the section title**

Replace the full contents of `src/SkillsSection/index.tsx` with:

```tsx
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../utils/SectionTitle/SectionTitle"
import { SkillSection } from "./SkillSection"

export const SkillSectionComp = () => {
  const { t } = useTranslation()

  return (
    <>
        <SectionTitle
          ghost={t('sections.skills.title')}
          eyebrow={t('sections.skills.eyebrow')}
          title={t('sections.skills.title')}
          align="center"
        />
        <SkillSection />
    </>
  )
}
```

- [ ] **Step 2: Translate the hover hint**

Replace the full contents of `src/SkillsSection/components/SkillHint.tsx` with:

```tsx
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export const SkillHint = forwardRef<HTMLSpanElement>((_, ref) => {
  const { t } = useTranslation()

  return (
    <div className="sn-sw-head">
      <span className="sn-sw-hint" ref={ref}>{t('skills.hint')}</span>
    </div>
  )
})

SkillHint.displayName = 'SkillHint'
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/SkillsSection/index.tsx src/SkillsSection/components/SkillHint.tsx
git commit -m "feat(i18n): translate Skills section title and hint"
```

---

### Task 7: Translate the Contact section

**Files:**
- Modify: `src/ContactSection/index.tsx`
- Modify: `src/ContactSection/ContactSection.tsx`

**Interfaces:**
- Consumes: `useTranslation()`; keys `sections.contact.eyebrow`, `sections.contact.title`, `contact.taglineLine1`, `contact.taglineLine2`, `contact.bio`, `contact.socialsAriaLabel`, `contact.sentTitle`, `contact.sentSub`, `contact.form.nameLabel`, `contact.form.namePlaceholder`, `contact.form.emailLabel`, `contact.form.emailPlaceholder`, `contact.form.messageLabel`, `contact.form.messagePlaceholder`, `contact.form.submit`.
- Produces: n/a. `SOCIAL_LINKS` labels (LinkedIn/GitHub/WhatsApp/Gmail) are proper nouns — NOT touched.

- [ ] **Step 1: Translate the section title**

Replace the full contents of `src/ContactSection/index.tsx` with:

```tsx
import { useTranslation }   from 'react-i18next';
import { SectionTitle }   from '../utils/SectionTitle/SectionTitle';
import { ContactSection } from './ContactSection';

export const ContactSectionComp = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle
        ghost={t('sections.contact.title')}
        eyebrow={t('sections.contact.eyebrow')}
        title={t('sections.contact.title')}
        align="center"
      />
      <ContactSection />
    </>
  );
};
```

- [ ] **Step 2: Add the translation hook to ContactSection.tsx**

In `src/ContactSection/ContactSection.tsx`, add the import:

```tsx
import { useTranslation }      from 'react-i18next';
```

Inside `ContactSection`, right after the existing `emberHandlers` line, add:

```tsx
  const { t } = useTranslation();
```

- [ ] **Step 3: Translate the tagline, bio and socials aria-label**

Replace:

```tsx
          <h2 className="cs-tagline">
            Let's work<br />
            <span className="cs-tagline-gradient">together.</span>
          </h2>

          <div className="cs-divider" />

          <p className="cs-bio">
            Open to new projects, freelance work and collaborations.
            Drop me a message and I'll get back to you shortly.
          </p>

          <nav className="cs-socials" aria-label="Social links">
```

with:

```tsx
          <h2 className="cs-tagline">
            {t('contact.taglineLine1')}<br />
            <span className="cs-tagline-gradient">{t('contact.taglineLine2')}</span>
          </h2>

          <div className="cs-divider" />

          <p className="cs-bio">
            {t('contact.bio')}
          </p>

          <nav className="cs-socials" aria-label={t('contact.socialsAriaLabel')}>
```

- [ ] **Step 4: Translate the "sent" confirmation state**

Replace:

```tsx
            <div className="cs-sent" role="status">
              <p className="cs-sent-icon" aria-hidden="true">✦</p>
              <p className="cs-sent-title">Message received</p>
              <p className="cs-sent-sub">I'll be in touch soon.</p>
            </div>
```

with:

```tsx
            <div className="cs-sent" role="status">
              <p className="cs-sent-icon" aria-hidden="true">✦</p>
              <p className="cs-sent-title">{t('contact.sentTitle')}</p>
              <p className="cs-sent-sub">{t('contact.sentSub')}</p>
            </div>
```

- [ ] **Step 5: Translate the form labels, placeholders and submit button**

Replace:

```tsx
                <label htmlFor="cs-name" className="cs-label">
                  Name
```

with:

```tsx
                <label htmlFor="cs-name" className="cs-label">
                  {t('contact.form.nameLabel')}
```

Replace:

```tsx
                  placeholder="Your name"
```

with:

```tsx
                  placeholder={t('contact.form.namePlaceholder')}
```

Replace:

```tsx
                <label htmlFor="cs-email" className="cs-label">
                  Email
```

with:

```tsx
                <label htmlFor="cs-email" className="cs-label">
                  {t('contact.form.emailLabel')}
```

Replace:

```tsx
                  placeholder="your@email.com"
```

with:

```tsx
                  placeholder={t('contact.form.emailPlaceholder')}
```

Replace:

```tsx
                <label htmlFor="cs-message" className="cs-label">
                  Message
```

with:

```tsx
                <label htmlFor="cs-message" className="cs-label">
                  {t('contact.form.messageLabel')}
```

Replace:

```tsx
                  placeholder="Tell me about your project…"
```

with:

```tsx
                  placeholder={t('contact.form.messagePlaceholder')}
```

Replace:

```tsx
                  <span>Send message</span>
```

with:

```tsx
                  <span>{t('contact.form.submit')}</span>
```

- [ ] **Step 6: Verify it builds**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 7: Manual check in dev server**

Run: `pnpm dev`, scroll to Contact, switch language, and confirm all labels/placeholders/tagline/bio/submit button change, and that submitting a valid form shows the translated "sent" confirmation.

- [ ] **Step 8: Commit**

```bash
git add src/ContactSection/index.tsx src/ContactSection/ContactSection.tsx
git commit -m "feat(i18n): translate Contact section"
```

---

### Task 8: Translate the Footer and set the default document language

**Files:**
- Modify: `src/Footer/Footer.tsx`
- Modify: `index.html`

**Interfaces:**
- Consumes: `useTranslation()`; keys `footer.ariaLabel`, `footer.statementMain`, `footer.statementSub`, `footer.tagline`.
- Produces: n/a. The copyright line (`© {year} Bernat Font`) stays as-is in every language — it's a name plus a dynamic year, not translatable content.

- [ ] **Step 1: Add the translation hook to Footer.tsx**

In `src/Footer/Footer.tsx`, add the import:

```tsx
import { useTranslation } from 'react-i18next';
```

Inside `Footer`, right after the `embers` line, add:

```tsx
  const { t } = useTranslation();
```

- [ ] **Step 2: Translate the footer strings**

Replace:

```tsx
    <footer className="ft" ref={footerRef} aria-label="Site footer">
```

with:

```tsx
    <footer className="ft" ref={footerRef} aria-label={t('footer.ariaLabel')}>
```

Replace:

```tsx
        <p className="ft-line ft-line--main">Fire shapes the finest things.</p>
        <p className="ft-line ft-line--sub">
          Frontend developer passionate about crafting digital experiences that ignite.
        </p>
```

with:

```tsx
        <p className="ft-line ft-line--main">{t('footer.statementMain')}</p>
        <p className="ft-line ft-line--sub">
          {t('footer.statementSub')}
        </p>
```

Replace:

```tsx
        <span className="ft-copy ft-copy--muted">Forged with obsession</span>
```

with:

```tsx
        <span className="ft-copy ft-copy--muted">{t('footer.tagline')}</span>
```

- [ ] **Step 3: Set the default document language**

In `index.html`, replace:

```html
<html lang="en">
```

with:

```html
<html lang="es">
```

- [ ] **Step 4: Verify it builds**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/Footer/Footer.tsx index.html
git commit -m "feat(i18n): translate Footer, default html lang to es"
```

---

### Task 9: Final verification pass

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Full type-check and build**

Run: `pnpm build`
Expected: no errors.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no new errors (pre-existing warnings, if any, are out of scope).

- [ ] **Step 3: Full manual QA in the browser**

Run: `pnpm dev`, then for each of EN, ES and CA (switch via the footer `LangSwitcher`):
- Loader eyebrow, Hero (eyebrow/role/CTAs/stat labels), section titles (Projects/Skills/Contact), Skills hint, Contact (tagline/bio/labels/placeholders/submit/sent state), Footer (statement + tagline) all show translated text.
- EVENTAPP and SKULL KING project cards show translated `sub`/`desc`; ATLAS/EMBER/VOID cards are identical across languages.
- Experience timeline text and skill node names never change language.
- Reloading the page after switching languages keeps the chosen language (localStorage persistence).
- The active language button in the footer switcher shows only a color/style change — no dot underneath.
- Hovering the language switcher pill triggers the ember cursor burst effect, with no flicker moving between EN/ES/CA.

- [ ] **Step 4: Fix anything found, otherwise done**

If any string was missed or any language didn't switch correctly, fix it in the relevant task's files and re-run Steps 1–3 before considering the plan complete. If everything checks out, no commit is needed for this task (verification-only).
