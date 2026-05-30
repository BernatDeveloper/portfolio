import './SectionTitle.css';

interface Props {
  /** Texto ghost gigante de fondo (normalmente igual que title) */
  ghost?: string;
  /** Etiqueta pequeña encima — ej: "— about me" */
  eyebrow: string;
  /** Título principal en outline */
  title: string;
  /** Alineación horizontal del bloque */
  align?: 'left' | 'center' | 'right';
}

export function SectionTitle({ ghost, eyebrow, title, align = 'left' }: Props) {
  return (
    <div className="st" data-align={align}>
      <p className="st-ghost" aria-hidden="true">
        {ghost ?? title}
      </p>
      <div className="st-over">
        <p className="st-eyebrow">{eyebrow}</p>
        <h2 className="st-title">{title}</h2>
      </div>
    </div>
  );
}
