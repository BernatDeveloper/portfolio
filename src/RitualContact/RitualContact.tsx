import type { MutableRefObject, RefObject } from 'react';
import { useRef } from 'react'
;import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './RitualContact.css';

import type { BurstFn, FieldRefs }    from './types';
import { FIELDS }                     from './data/fields';
import { SOCIAL_ORBS }                from './data/socialOrbs';
import { useEmberCanvas }             from './hooks/useEmberCanvas';
import { useOrbitalSystem }           from './hooks/useOrbitalSystem';
import { useRitualGSAP }              from './hooks/useRitualGSAP';
import { RitualStage }                from './components/RitualStage';
import { RitualStatus }               from './components/RitualStatus';

gsap.registerPlugin(useGSAP);

export function RitualContact() {
  // ── Section scope ──────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  // ── Stage & eye ────────────────────────────────────
  const stageRef    = useRef<HTMLDivElement>(null);
  const eyeRef      = useRef<HTMLDivElement>(null);
  const eyeCountRef = useRef<HTMLDivElement>(null);
  const eyeLabelRef = useRef<HTMLDivElement>(null);

  // ── Social orbs ────────────────────────────────────
  const orb0Ref = useRef<HTMLAnchorElement>(null);
  const orb1Ref = useRef<HTMLAnchorElement>(null);
  const orb2Ref = useRef<HTMLAnchorElement>(null);
  const orbRefs = [orb0Ref, orb1Ref, orb2Ref] as RefObject<HTMLAnchorElement>[];

  // ── Totems ─────────────────────────────────────────
  const t0Ref = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const totemRefs = [t0Ref, t1Ref, t2Ref] as RefObject<HTMLDivElement>[];

  // ── Inputs (HTMLInputElement | HTMLTextAreaElement) ─
  const inp0Ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inp1Ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inp2Ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inputRefs = [inp0Ref, inp1Ref, inp2Ref] as MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>[];

  // ── Status dots ────────────────────────────────────
  const dot0Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dotRefs = [dot0Ref, dot1Ref, dot2Ref] as RefObject<HTMLDivElement>[];

  // ── SVG connector lines ────────────────────────────
  const line0Ref = useRef<SVGLineElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const lineRefs = [line0Ref, line1Ref, line2Ref] as RefObject<SVGLineElement>[];

  // ── Shared mutable state (no re-renders) ───────────
  const filledRef = useRef(0);
  const burstRef  = useRef<BurstFn | null>(null);

  // ── Field refs grouped for GSAP hook ───────────────
  const fieldRefs: FieldRefs[] = FIELDS.map((config, i) => ({
    config,
    inp:   inputRefs[i],
    totem: totemRefs[i],
    dot:   dotRefs[i],
    line:  lineRefs[i],
  }));

  // ── Hooks ──────────────────────────────────────────
  useEmberCanvas(canvasRef, sectionRef, burstRef);
  useOrbitalSystem(stageRef, orbRefs);
  useRitualGSAP({ sectionRef, eyeRef, eyeCountRef, eyeLabelRef, orbRefs, fieldRefs, filledRef, burstRef });

  // ── Render ─────────────────────────────────────────
  return (
    <section className="ritual-section" id="ritual" ref={sectionRef}>
      <canvas id="ritual-canvas" ref={canvasRef} />

      <RitualStage
        stageRef={stageRef}
        eyeRef={eyeRef}
        eyeCountRef={eyeCountRef}
        eyeLabelRef={eyeLabelRef}
        orbRefs={orbRefs}
        totemRefs={totemRefs}
        inputRefs={inputRefs}
        lineRefs={lineRefs}
        fields={FIELDS}
        orbs={SOCIAL_ORBS}
      />

      <RitualStatus fields={FIELDS} dotRefs={dotRefs} />
    </section>
  );
}
