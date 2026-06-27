# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start Vite dev server with HMR
pnpm build        # tsc -b && vite build (type-check then bundle)
pnpm lint         # ESLint across all .ts/.tsx files
pnpm preview      # serve the last production build locally
```

Package manager is **pnpm** (v11). There are no tests.

## Architecture

Single-page React 19 portfolio with heavy GSAP animation and no routing. The entry point is `src/main.tsx` → `App.tsx` → `AppLayout.tsx`, which renders all sections in sequence and manages loader/hero state.

### Section order (AppLayout)

| Section | Folder | Notes |
|---|---|---|
| Loader | `src/Loader/` | Fullscreen intro, scroll-locked. Drives `loadProgress` / `isLoaded` state up to AppLayout via callbacks |
| HeroSection | `src/HeroSection/` | Waits for `shouldAnimate` prop (set when loader exit begins) before running GSAP entrance |
| ExperienceTimeline | `src/ExperienceTimeline/` | Canvas scrub of 241 AVIF frames from `/public/frames/`. Desktop: pinned section + ScrollTrigger. Mobile (<1024px): skips frames entirely, uses IntersectionObserver for card reveals |
| ProjectsSection | `src/ProjectsSection/` | Grid of cards, each with an inline SVG art component |
| SkillsSection | `src/SkillsSection/` | Interactive SVG skill graph; lazily initialized on scroll reveal |
| RitualContact | `src/RitualContact/` | Thematic contact form (totem inputs, orbital social links, central eye CTA) |

Each section folder exports a wrapper `index.tsx` that prepends a shared `<SectionTitle>` header, and the inner component handles all its own logic.

### GSAP conventions

- Always use `useGSAP` (from `@gsap/react`) rather than `useEffect` for GSAP code — this handles cleanup and avoids selector leakage.
- `ScrollTrigger` is imported and registered per-file (`gsap.registerPlugin(ScrollTrigger)`).
- Animations that must wait for data to load (e.g. images in ExperienceTimeline) are guarded inside `useGSAP` with the `dependencies` option.

### Custom cursor system

`useEmberCursor` (called once in AppLayout) creates a canvas-based fire-particle cursor on desktop. It hides the native cursor globally. Sections signal hover state by dispatching custom window events:

```ts
// trigger ember burst on hover
window.dispatchEvent(new Event('ember:hover'));
window.dispatchEvent(new Event('ember:leave'));
```

Any component wanting this effect calls `useEmberCursorHover()` from `src/hooks/useEmberCursorHover.ts`, which returns `{ onMouseEnter, onMouseLeave }` handlers.

### Smooth scroll

`useLenis` (called once in AppLayout) initialises Lenis with `lerp: 0.06`. No additional config needed; Lenis runs its RAF loop independently.

### CSS design tokens

All design values live as CSS custom properties in `src/index.css` (`:root` block). Use these variables everywhere — do not hardcode colors or spacing:

- Colors: `--color-bg`, `--color-lava`, `--color-accent`, `--color-gold`, `--color-accent-light`, etc.
- Fonts: `--font-display` (Bebas Neue), `--font-serif` (Cormorant Garamond), `--font-display-alt` (Cinzel Decorative), `--font-body` (Rajdhani)
- Fluid type scale: `--text-xs` … `--text-xl` (all `clamp()`-based)
- Fluid spacing: `--space-xs` … `--space-xxl`

### Updating content

All portfolio data is in plain TS constant files — edit these to change what the site shows:

- **Work history**: `src/ExperienceTimeline/data/experience.ts` — `Experience[]` (year, company, role, desc, side)
- **Projects**: `src/ProjectsSection/data/projects.ts` — `PROJECTS` array + `ART_MAP` (maps `idx` to an inline SVG component)
- **Project SVG art**: `src/ProjectsSection/svg/Art*.tsx` — one React component per project
- **Skills graph**: `src/SkillsSection/data/nodes.ts` — `NODES` (id, label, position, radius, category), `CONNS` (edge pairs), `CAT` (category → color)
- **Skills layouts**: `src/SkillsSection/data/layouts.ts` — responsive coordinate sets for desktop/tablet/mobile/xs
- **Contact fields**: `src/RitualContact/data/fields.ts` — name/email/message config with validators
- **Social links**: `src/RitualContact/data/socialOrbs.ts`

### ExperienceTimeline frames

241 AVIF frames are served from `/public/frames/frame_001.avif` … `frame_241.avif`. They are loaded in batches of 20 at runtime and drive the scroll-scrub canvas animation. On mobile the canvas is never created and frames are never fetched.
