import type { RefObject } from 'react';
import type { FieldConfig } from '../types';

interface Props {
  fields:  FieldConfig[];
  dotRefs: RefObject<HTMLDivElement>[];
}

export function RitualStatus({ fields, dotRefs }: Props) {
  return (
    <div className="ritual-status" id="ritual-status">
      {fields.map((field, i) => (
        <div key={field.id} className="stat-item">
          <div className="stat-dot" ref={dotRefs[i]} />
          <span>{field.label.replace('Your ', '')}</span>
        </div>
      ))}
    </div>
  );
}
