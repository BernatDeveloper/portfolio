# Mejoras portfolio — bernatfont.dev

Contexto: portfolio personal (React + TypeScript, tema oscuro). Quiero aplicar dos mejoras. Antes de escribir código, **explora el repo** para localizar los archivos implicados y confirma las suposiciones que marco más abajo. Haz los cambios de forma incremental, manteniendo el lenguaje visual actual del sitio, y arranca el dev server para verificar cada cambio.

## Cómo quiero que trabajes

- Primero inspecciona la estructura: dónde está la configuración de estilos (Tailwind config, variables CSS, tokens de color, o styled-components) y dónde está la sección de proyectos (componente + fuente de datos de los proyectos).
- No hagas refactors grandes ni cambies dependencias sin avisar. Cambios acotados.
- Respeta accesibilidad: contraste de texto mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande).
- Al terminar cada tarea, resúmeme qué archivos tocaste y por qué.

---

## Tarea 1 — Colores más vivos donde se ven apagados

Problema: en algunas partes del portfolio los colores quedan demasiado apagados y algunos elementos apenas se distinguen sobre el fondo oscuro.

Qué hacer:

1. Audita la interfaz e identifica los elementos con baja visibilidad / bajo contraste sobre el fondo. Sospechosos habituales: texto secundario o "muted", bordes, iconos, badges/tags de tecnologías, enlaces en estado normal, y separadores.
2. Sube la vivacidad de los colores de acento y de esos elementos poco visibles: más saturación y/o más luminosidad, sin romper la coherencia de la paleta actual.
3. Mantén el resultado accesible (comprueba el contraste tras el cambio) y coherente entre secciones: no quiero un color distinto en cada bloque, sino la misma paleta pero más viva.
4. Si el color está centralizado (variables CSS o tema de Tailwind), aplícalo ahí para que el cambio sea consistente en todo el sitio en lugar de parchear componente a componente.

Antes de tocar, muéstrame la lista de zonas/elementos que has detectado como apagados y tu propuesta de ajuste, para que confirme antes de aplicarla en masa.

---

## Tarea 2 — Proyectos: quitar el icono de fuego y mover los proyectos secundarios a un modal

Estado actual (suposición a confirmar): en la sección de proyectos hay un icono de fuego (🔥 o un componente tipo `Flame` de lucide-react) que marca los proyectos destacados.

Qué quiero:

1. **Quita el icono de fuego** de la sección de proyectos.
2. En su lugar añade un elemento clicable — por ejemplo un botón "Ver más proyectos" — que al pulsarlo **abra un modal**.
3. El modal muestra el resto de proyectos, los más básicos/secundarios, **en formato lista** (no en cuadrícula de tarjetas). Cada elemento de la lista con: nombre del proyecto, descripción breve, tecnologías y enlaces (repo / demo si existen).
4. Los proyectos destacados siguen mostrándose directamente en la sección como hasta ahora (solo que sin el icono de fuego). Los "básicos" son los que pasan al modal.

Requisitos del modal (accesibilidad y UX):

- Se cierra con la tecla `Esc`, al hacer clic fuera, y con un botón de cerrar visible.
- Focus trap mientras está abierto y devolución del foco al elemento que lo abrió al cerrarse.
- Atributos ARIA correctos (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
- Bloquear el scroll del fondo mientras el modal esté abierto.
- Estilo coherente con el resto del sitio (tema oscuro, misma tipografía y radios/espaciados).

Puntos a confirmar inspeccionando el código antes de implementar:

- Cómo están modelados los proyectos: ¿hay un array/JSON con un flag de "destacado"? Si no existe distinción entre destacados y básicos, propón cómo separarlos (por ejemplo un campo `featured: boolean`) y enséñame el criterio antes de aplicarlo.
- Si ya hay algún componente de modal/dialog reutilizable en el proyecto, úsalo en vez de crear uno nuevo.

---

## Criterios de aceptación

- [ ] Ya no aparece el icono de fuego en ninguna parte de la sección de proyectos.
- [ ] Existe un disparador claro que abre un modal con los proyectos secundarios en formato lista.
- [ ] El modal es accesible (Esc, clic fuera, foco gestionado, ARIA, scroll bloqueado).
- [ ] Los proyectos destacados se siguen viendo en la sección principal.
- [ ] Los colores apagados detectados se ven más vivos y siguen cumpliendo contraste AA.
- [ ] El estilo general del sitio se mantiene coherente; nada desentona.

## Notas

- Si alguna de mis suposiciones sobre la estructura no coincide con el código real, páralo y coméntamelo antes de improvisar una solución grande.
