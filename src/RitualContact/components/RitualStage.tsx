import type { RefObject, MutableRefObject } from 'react';
import type { FieldConfig, OrbConfig } from '../types';
import { ConnectorSVG } from './ConnectorSVG';
import { CenterEye } from './CenterEye';
import { SocialOrb } from './SocialOrb';
import { Totem } from './Totem';

// Positional CSS class per totem index
const TOTEM_CLASSES = ['t-top', 't-bl', 't-br'];
const TOTEM_IDS     = ['t1', 't2', 't3'];

interface Props {
  stageRef:    RefObject<HTMLDivElement | null>;
  eyeRef:      RefObject<HTMLDivElement | null>;
  eyeCountRef: RefObject<HTMLDivElement | null>;
  eyeLabelRef: RefObject<HTMLDivElement | null>;
  orbRefs:     RefObject<HTMLAnchorElement | null>[];
  totemRefs:   RefObject<HTMLDivElement | null>[];
  inputRefs:   MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>[];
  lineRefs:    RefObject<SVGLineElement>[];
  fields:      FieldConfig[];
  orbs:        OrbConfig[];
}

export function RitualStage({
  stageRef,
  eyeRef, eyeCountRef, eyeLabelRef,
  orbRefs, totemRefs, inputRefs, lineRefs,
  fields, orbs,
}: Props) {
  return (
    <div className="ritual-stage" id="r-stage" ref={stageRef}>

      <ConnectorSVG lineRefs={lineRefs} />

      {/* Spinning rings */}
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      <div className="ring r4" />

      {/* Social orbs — positioned by useOrbitalSystem */}
      {orbs.map((orb, i) => (
        <SocialOrb key={orb.id} ref={orbRefs[i]} config={orb} />
      ))}

      {/* Glow layers + center eye */}
      <CenterEye
        eyeRef={eyeRef}
        eyeCountRef={eyeCountRef}
        eyeLabelRef={eyeLabelRef}
      />

      {/* Totems / form fields */}
      {fields.map((field, i) => (
        <Totem
          key={field.id}
          ref={totemRefs[i]}
          config={field}
          inputRef={inputRefs[i]}
          totemId={TOTEM_IDS[i]}
          className={TOTEM_CLASSES[i]}
        />
      ))}

    </div>
  );
}
