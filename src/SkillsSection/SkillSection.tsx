import { useRef }               from 'react'
import './SkillSection.css'

import { useSkillEmbers }       from './hooks/useSkillEmbers'
import { useScrollReveal }      from './hooks/useScrollReveal'
import { useSkillWeb }          from './hooks/useSkillWeb'
import { SkillHint }            from './components/SkillHint'
import { SkillTooltip }         from './components/SkillTooltip'

export function SkillSection() {
  // ── Refs ───────────────────────────────────────────
  const swRef   = useRef<HTMLDivElement>(null)
  const emCvRef = useRef<HTMLCanvasElement>(null)
  const svgRef  = useRef<SVGSVGElement>(null)
  const hintRef = useRef<HTMLSpanElement>(null)
  const ttRef   = useRef<HTMLDivElement>(null)
  const ttNRef  = useRef<HTMLDivElement>(null)
  const ttCRef  = useRef<HTMLDivElement>(null)

  // ── Hooks ──────────────────────────────────────────
  useSkillEmbers(emCvRef, swRef)

  const { init } = useSkillWeb({ svgRef, swRef, hintRef, ttRef, ttNRef, ttCRef })

  useScrollReveal(swRef, init)


  // ── Render ─────────────────────────────────────────
  return (
    <section className="sn-skills-section">
      <div className="sn-sw" ref={swRef}>
        <canvas className="sn-em-cv" ref={emCvRef} />

        <SkillHint ref={hintRef} />

        <svg
          ref={svgRef}
          className="sn-sw-svg"
          viewBox="0 0 680 435"
          preserveAspectRatio="xMidYMid meet"
        />

        <SkillTooltip ref={ttRef} nameRef={ttNRef} catRef={ttCRef} />
      </div>
    </section>
  )
}
