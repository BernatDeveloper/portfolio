import type { RefObject, MutableRefObject } from 'react';
import type { FieldConfig, OrbConfig } from '../types';
import { ConnectorSVG } from './ConnectorSVG';
import { CenterEye } from './CenterEye';
import { SocialOrb } from './SocialOrb';
import { Totem } from './Totem';

const TOTEM_CLASSES = ['t-top', 't-bl', 't-br'];
const TOTEM_IDS     = ['t1', 't2', 't3'];

interface OrbHandlers  { onMouseEnter: () => void; onMouseLeave: () => void; }
interface FieldHandler { onChange: () => void; onTotemClick: () => void; }

interface Props {
  stageRef:      RefObject<HTMLDivElement | null>;
  eyeRef:        RefObject<HTMLDivElement | null>;
  eyeCountRef:   RefObject<HTMLDivElement | null>;
  eyeLabelRef:   RefObject<HTMLDivElement | null>;
  orbRefs:       RefObject<HTMLAnchorElement | null>[];
  totemRefs:     RefObject<HTMLDivElement | null>[];
  inputRefs:     MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>[];
  lineRefs:      RefObject<SVGLineElement>[];
  fields:        FieldConfig[];
  orbs:          OrbConfig[];
  filledRef:     MutableRefObject<number>;
  orbHandlers:   OrbHandlers[];
  fieldHandlers: FieldHandler[];
  onEyeClick:    () => void;
}

export function RitualStage({
  stageRef,
  eyeRef, eyeCountRef, eyeLabelRef,
  orbRefs, totemRefs, inputRefs, lineRefs,
  fields, orbs,
  filledRef,
  orbHandlers, fieldHandlers, onEyeClick,
}: Props) {
  return (
    <div className="ritual-stage" id="r-stage" ref={stageRef}>

      <ConnectorSVG lineRefs={lineRefs} />

      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      <div className="ring r4" />

      {orbs.map((orb, i) => (
        <SocialOrb
          key={orb.id}
          ref={orbRefs[i]}
          config={orb}
          onMouseEnter={orbHandlers[i].onMouseEnter}
          onMouseLeave={orbHandlers[i].onMouseLeave}
        />
      ))}

      <CenterEye
        eyeRef={eyeRef}
        eyeCountRef={eyeCountRef}
        eyeLabelRef={eyeLabelRef}
        filledRef={filledRef}
        onEyeClick={onEyeClick}
      />

      {fields.map((field, i) => (
        <Totem
          key={field.id}
          ref={totemRefs[i]}
          config={field}
          inputRef={inputRefs[i]}
          totemId={TOTEM_IDS[i]}
          className={TOTEM_CLASSES[i]}
          onChange={fieldHandlers[i].onChange}
          onTotemClick={fieldHandlers[i].onTotemClick}
        />
      ))}

    </div>
  );
}
