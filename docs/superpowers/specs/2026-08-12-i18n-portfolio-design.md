# i18n para el portfolio — diseño

## Contexto

El sitio ya tiene un `LangSwitcher` en el footer y un `LanguageContext` (`src/i18n/LanguageContext.tsx`) con `Lang = 'en' | 'es' | 'ca'`, pero el estado `lang` no se consume en ningún componente: cambiar de idioma actualmente no traduce nada. El punto de brillo bajo el idioma activo ya se ha quitado del CSS.

## Objetivo

1. ~~Arreglar el estilo del `LangSwitcher`~~ **(hecho — `src/LangSwitcher/LangSwitcher.css`)**.
2. Implementar el multiidioma (en/es/ca) para todos los textos de interfaz del portfolio usando **i18next** (`i18next` + `react-i18next`), con **español por defecto**.
3. Traducir el contenido de los 2 proyectos reales (EVENTAPP, SKULL KING). El resto de datos de relleno (experiencia laboral, proyectos ATLAS/EMBER/VOID, nombres de skills) se deja tal cual, sin traducir.
4. Persistir el idioma elegido en `localStorage` entre visitas.
5. Al pasar el cursor por encima del `LangSwitcher`, debe activarse el mismo efecto de cursor ember que usan otros elementos interactivos (botones del hero, links sociales, submit del formulario).

## Arquitectura — i18next

Se sustituye el `LanguageContext` casero por `react-i18next`, la librería estándar de i18n para React. Los componentes usan el hook `useTranslation()` de `react-i18next` y acceden a los textos por clave: `t('hero.ctaPrimary')`. Los recursos de cada idioma son ficheros JSON planos.

```
src/i18n/
  i18n.ts                 # init de i18next: resources, fallbackLng 'es', detección/persistencia de idioma
  locales/
    en.json
    es.json                # idioma de referencia
    ca.json
```

Se elimina `src/i18n/LanguageContext.tsx` (y su import en `AppLayout.tsx`): `react-i18next` ya provee el contexto internamente vía `I18nextProvider`, inicializado una vez en `main.tsx` o al importar `src/i18n/i18n.ts` desde `main.tsx` (efecto secundario de inicialización, patrón estándar de i18next).

### Nuevas dependencias

```
pnpm add i18next react-i18next
```

### Forma de las claves (`es.json` como referencia, incluir en `en.json`/`ca.json` con las mismas claves)

```json
{
  "loader": { "eyebrow": "Inicializando" },

  "hero": {
    "eyebrow": "Desata a la bestia interior",
    "role": "Developer",
    "ctaPrimary": "Entra en el vacío",
    "ctaSecondary": "Descubre más",
    "stats": { "power": "Poder", "realms": "Reinos", "fear": "Miedo" }
  },

  "sections": {
    "projects": { "eyebrow": "Trabajo seleccionado", "title": "Proyectos" },
    "skills":   { "eyebrow": "Con lo que trabajo", "title": "Habilidades" },
    "contact":  { "eyebrow": "Ponte en contacto", "title": "Contacto" }
  },

  "skills": { "hint": "— pasa el cursor por un nodo —" },

  "projects": {
    "EVENTAPP":     { "sub": "Panel de eventos", "desc": "..." },
    "SKULL KING":   { "sub": "Contador de puntos", "desc": "..." }
  },

  "contact": {
    "taglineLine1": "Trabajemos",
    "taglineLine2": "juntos.",
    "bio": "...",
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
    "statementSub": "...",
    "tagline": "Forjado con obsesión"
  },

  "langSwitcher": {
    "ariaLabel": "Selector de idioma",
    "switchToPrefix": "Cambiar a"
  }
}
```

Claves con espacio (`"SKULL KING"`) funcionan igual que cualquier otra clave de objeto anidado — `t('projects.SKULL KING.desc')` resuelve por el path completo, sin problema con i18next.

`Bernat` (nombre propio, línea 1 del hero), los nombres de skills, tags de proyectos (React/TypeScript/etc.), y los valores simbólicos de stats (∞, VII, 0°) no se traducen — no llevan clave.

## Persistencia y wiring

- `src/i18n/i18n.ts` inicializa con `lng: localStorage.getItem('portfolio-lang') ?? 'es'` y `fallbackLng: 'es'`.
- Se suscribe a `i18n.on('languageChanged', (lng) => { localStorage.setItem('portfolio-lang', lng); document.documentElement.lang = lng; })`.
- `index.html`: `<html lang="es">` como valor por defecto estático (antes de que React monte).
- No se usa `i18next-browser-languagedetector` (dependencia extra innecesaria): la lectura/escritura de `localStorage` se hace a mano en `i18n.ts`, que es la única pieza que la toca.

## LangSwitcher: hover del cursor ember

`LangSwitcher.tsx` pasa a usar `useEmberCursorHover()` (mismo hook que el resto del sitio) y aplica los handlers `{...emberHandlers}` al contenedor `.ls` (el grupo completo), no a cada botón por separado — así el efecto no parpadea al mover el cursor entre EN/ES/CA, se mantiene activo mientras el cursor esté sobre cualquier parte del selector.

## Componentes a modificar

| Archivo | Cambio |
|---|---|
| `package.json` | + `i18next`, `react-i18next` |
| `src/i18n/i18n.ts` (nuevo) | Init de i18next, persistencia en `localStorage`, sync `document.documentElement.lang` |
| `src/i18n/locales/en.json`, `es.json`, `ca.json` (nuevos) | Recursos de traducción |
| `src/i18n/LanguageContext.tsx` | **Eliminado** |
| `src/AppLayout/AppLayout.tsx` | Quita `LanguageProvider`; importa `src/i18n/i18n.ts` (o se importa desde `main.tsx`) para forzar la inicialización |
| `src/LangSwitcher/LangSwitcher.tsx` | Usa `useTranslation()` (`i18n.language`, `i18n.changeLanguage`) en vez de `useLang`; añade `useEmberCursorHover()` en el contenedor `.ls` |
| `src/Loader/Loader.tsx` | Texto "Initializing" → `t('loader.eyebrow')` |
| `src/HeroSection/HeroSection.tsx` | Eyebrow, "Developer", CTAs, labels de stats → `t('hero.*')` |
| `src/ProjectsSection/index.tsx` | `SectionTitle` ghost/eyebrow/title → `t('sections.projects.*')` |
| `src/ProjectsSection/ProjectsSection.tsx` | Antes de mapear `PROJECTS`, aplica override de `t('projects.' + p.title + '.sub'/'.desc')` (si existe la clave) sobre `sub`/`desc` antes de pasarlo a `ProjectCard` |
| `src/SkillsSection/index.tsx` | `SectionTitle` ghost/eyebrow/title → `t('sections.skills.*')` |
| `src/SkillsSection/components/SkillHint.tsx` | "— hover a node —" → `t('skills.hint')` (se decide en implementación si se resuelve dentro del propio componente o se pasa como prop desde su padre, ya que es un `forwardRef`) |
| `src/ContactSection/index.tsx` | `SectionTitle` ghost/eyebrow/title → `t('sections.contact.*')` |
| `src/ContactSection/ContactSection.tsx` | Tagline, bio, aria-label de socials, estado "enviado", labels/placeholders/submit del formulario → `t('contact.*')` |
| `src/Footer/Footer.tsx` | aria-label, statement principal/sub, "Forged with obsession" → `t('footer.*')` |
| `index.html` | `lang="es"` por defecto |

## Fuera de alcance

- `ExperienceTimeline` (datos de experiencia laboral): se queda en inglés, sin traducir (relleno).
- Proyectos ATLAS, EMBER, VOID: sin traducir (relleno).
- Nombres de skills (`NODES` en `nodes.ts`): son nombres de tecnologías, no se traducen.
- `RitualContact/`: no se usa (comentado en `AppLayout.tsx`), se ignora.
- `i18next-browser-languagedetector` u otros plugins de detección automática de idioma del navegador: no se usan, persistencia manual vía `localStorage` es suficiente para el alcance pedido.
- No se añade meta `<meta name="description">` — no estaba en el pedido original.

## Verificación

No hay tests automatizados en este repo (`CLAUDE.md`). Verificación:

1. `pnpm build` (type-check + bundle) sin errores.
2. `pnpm lint` sin errores nuevos.
3. Manual en `pnpm dev`: cambiar entre EN/ES/CA desde el footer y confirmar que todos los textos listados arriba cambian, que el idioma persiste tras recargar la página, que el punto bajo el idioma activo no aparece, y que el cursor ember reacciona (burst de partículas) al pasar por encima del `LangSwitcher`.
