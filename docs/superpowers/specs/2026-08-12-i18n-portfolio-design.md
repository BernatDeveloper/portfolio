# i18n para el portfolio — diseño

## Contexto

El sitio ya tiene un `LangSwitcher` en el footer y un `LanguageContext` (`src/i18n/LanguageContext.tsx`) con `Lang = 'en' | 'es' | 'ca'`, pero el estado `lang` no se consume en ningún componente: cambiar de idioma actualmente no traduce nada. Además el switcher muestra un punto de brillo bajo el idioma activo, que se debe quitar (dejando solo el color de texto activo).

## Objetivo

1. Arreglar el estilo del `LangSwitcher`: al seleccionar un idioma, no debe aparecer el punto (`::after`) — solo debe cambiar el color/estilo de la letra. **(Ya aplicado — ver `src/LangSwitcher/LangSwitcher.css`.)**
2. Implementar el multiidioma (en/es/ca) para todos los textos de interfaz del portfolio, con **español por defecto**.
3. Traducir el contenido de los 2 proyectos reales (EVENTAPP, SKULL KING). El resto de datos de relleno (experiencia laboral, proyectos ATLAS/EMBER/VOID, nombres de skills) se deja tal cual, sin traducir.
4. Persistir el idioma elegido en `localStorage` entre visitas.

## Arquitectura

Diccionario de traducciones tipado (no un sistema de claves `t('a.b.c')`). Cada idioma implementa una interfaz `Dictionary` completa; TypeScript obliga a que no falte ninguna clave en ningún idioma.

```
src/i18n/
  types.ts              # Lang, Dictionary
  locales/
    en.ts                # Dictionary (inglés)
    es.ts                # Dictionary (español) — idioma de referencia
    ca.ts                # Dictionary (catalán)
  LanguageContext.tsx    # (editado) provider + useLang()
```

`useLang()` devuelve `{ lang, setLang, t }`, donde `t: Dictionary` ya es el diccionario resuelto para el idioma activo. Los componentes consumen `t.hero.ctaPrimary`, etc. — sin manejar `lang` directamente salvo el propio `LangSwitcher`.

### `Dictionary` (forma, sin valores)

```ts
interface Dictionary {
  loader: { eyebrow: string };

  hero: {
    eyebrow: string;
    role: string;              // "Developer"
    ctaPrimary: string;        // "Enter the void"
    ctaSecondary: string;      // "Discover more"
    stats: { power: string; realms: string; fear: string };
  };

  sections: {
    projects: { eyebrow: string; title: string };
    skills:   { eyebrow: string; title: string };
    contact:  { eyebrow: string; title: string };
  };

  skills: { hint: string };    // "— hover a node —"

  // overrides de contenido SOLO para los proyectos reales.
  // Clave = project.title tal como está en projects.ts.
  // Si un proyecto no tiene entrada aquí, se usa su sub/desc original sin traducir.
  projects: {
    EVENTAPP:      { sub: string; desc: string };
    'SKULL KING':  { sub: string; desc: string };
  };

  contact: {
    taglineLine1: string;      // "Let's work"
    taglineLine2: string;      // "together."
    bio: string;
    socialsAriaLabel: string;
    sentTitle: string;
    sentSub: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
    };
  };

  footer: {
    ariaLabel: string;
    statementMain: string;     // "Fire shapes the finest things."
    statementSub: string;
    tagline: string;           // "Forged with obsession"
  };

  langSwitcher: {
    ariaLabel: string;         // "Language selector"
    switchToPrefix: string;    // "Switch to" / "Cambiar a" / "Canvia a"
  };
}
```

`Bernat` (nombre propio, línea 1 del hero), los nombres de skills, tags de proyectos (React/TypeScript/etc.), y los valores simbólicos de stats (∞, VII, 0°) no se traducen.

## Persistencia y wiring

- `LanguageContext.tsx`: el `useState<Lang>` inicial lee `localStorage.getItem('portfolio-lang')`; si no hay valor válido, usa `'es'`.
- `setLang` (envuelto) escribe en `localStorage` y actualiza `document.documentElement.lang`.
- Un `useEffect` inicial también sincroniza `document.documentElement.lang` al montar (por si el valor persistido no es `'es'`).
- `index.html`: cambiar `<html lang="en">` a `<html lang="es">` como valor por defecto estático (antes de que React monte).

## Componentes a modificar

| Archivo | Cambio |
|---|---|
| `src/i18n/types.ts` (nuevo) | Tipos `Lang`, `Dictionary` |
| `src/i18n/locales/en.ts`, `es.ts`, `ca.ts` (nuevos) | Contenido de cada `Dictionary` |
| `src/i18n/LanguageContext.tsx` | Default `'es'`, persistencia localStorage, expone `t`, sincroniza `document.documentElement.lang` |
| `src/LangSwitcher/LangSwitcher.tsx` | `aria-label` de grupo y de cada botón usan `t.langSwitcher.*` |
| `src/Loader/Loader.tsx` | Texto "Initializing" → `t.loader.eyebrow` |
| `src/HeroSection/HeroSection.tsx` | Eyebrow, "Developer", CTAs, labels de stats → `t.hero.*` |
| `src/ProjectsSection/index.tsx` | `SectionTitle` ghost/eyebrow/title → `t.sections.projects.*` |
| `src/ProjectsSection/ProjectsSection.tsx` | Antes de mapear `PROJECTS`, aplica override de `t.projects[p.title]` (si existe) sobre `sub`/`desc` antes de pasarlo a `ProjectCard` |
| `src/SkillsSection/index.tsx` | `SectionTitle` ghost/eyebrow/title → `t.sections.skills.*` |
| `src/SkillsSection/components/SkillHint.tsx` | "— hover a node —" → `t.skills.hint` (pasado como prop, ya que es un `forwardRef` sin acceso directo al contexto — se decide en el punto de uso) |
| `src/ContactSection/index.tsx` | `SectionTitle` ghost/eyebrow/title → `t.sections.contact.*` |
| `src/ContactSection/ContactSection.tsx` | Tagline, bio, aria-label de socials, estado "enviado", labels/placeholders/submit del formulario → `t.contact.*` |
| `src/Footer/Footer.tsx` | aria-label, statement principal/sub, "Forged with obsession" → `t.footer.*` |
| `index.html` | `lang="es"` por defecto |

`SkillHint` es un `forwardRef` sin JSX propio para el texto que reciba `useLang`; se revisará en la fase de implementación si conviene pasarle el texto como prop desde su padre (`SkillWeb`/`SkillSection`) en vez de llamar a `useLang()` dentro del propio componente — decisión de implementación, no cambia el diccionario.

## Fuera de alcance

- `ExperienceTimeline` (datos de experiencia laboral): se queda en inglés, sin traducir (relleno).
- Proyectos ATLAS, EMBER, VOID: sin traducir (relleno).
- Nombres de skills (`NODES` en `nodes.ts`): son nombres de tecnologías, no se traducen.
- `RitualContact/`: no se usa (comentado en `AppLayout.tsx`), se ignora.
- No se añade meta `<meta name="description">` — no estaba en el pedido original.

## Verificación

No hay tests automatizados en este repo (`CLAUDE.md`). Verificación:

1. `pnpm build` (type-check + bundle) sin errores — el tipado de `Dictionary` garantiza que las 3 locales están completas.
2. `pnpm lint` sin errores nuevos.
3. Manual en `pnpm dev`: cambiar entre EN/ES/CA desde el footer y confirmar que todos los textos listados arriba cambian, que el idioma persiste tras recargar la página, y que el punto bajo el idioma activo ya no aparece (estilo de texto sí cambia).
