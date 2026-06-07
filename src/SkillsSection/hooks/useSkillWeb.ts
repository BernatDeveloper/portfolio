import type { RefObject } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import type { LineData, NodeData, NodeEls } from '../types'
import { CAT, NODES, CONNS, TRAVEL_DUR } from '../data/nodes'
import { LAYOUTS } from '../data/layouts'
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover'

const NS = 'http://www.w3.org/2000/svg'

// ── SVG helpers ───────────────────────────────────────
function mkCircle(
  r: number,
  fill: string,
  fillOpacity: string,
  stroke?: string,
  strokeOpacity?: string,
  strokeWidth?: string,
): SVGCircleElement {
  const c = document.createElementNS(NS, 'circle') as SVGCircleElement
  c.setAttribute('r', String(r))
  c.setAttribute('fill', fill)
  c.setAttribute('fill-opacity', fillOpacity)
  if (stroke)        c.setAttribute('stroke', stroke)
  if (strokeOpacity) c.setAttribute('stroke-opacity', strokeOpacity)
  if (strokeWidth)   c.setAttribute('stroke-width', strokeWidth)
  return c
}

interface Refs {
  svgRef:  RefObject<SVGSVGElement | null>
  swRef:   RefObject<HTMLDivElement | null>
  hintRef: RefObject<HTMLSpanElement | null>
  ttRef:   RefObject<HTMLDivElement | null>
  ttNRef:  RefObject<HTMLDivElement | null>
  ttCRef:  RefObject<HTMLDivElement | null>
}

export function useSkillWeb(refs: Refs) {
  const initedRef = useRef(false)
  const { onMouseEnter: emberEnter, onMouseLeave: emberLeave } = useEmberCursorHover()

  function init() {
    if (initedRef.current) return
    initedRef.current = true

    const { svgRef, swRef, hintRef, ttRef, ttNRef, ttCRef } = refs
    const svgEl  = svgRef.current!
    const swEl   = swRef.current!
    const hintEl = hintRef.current!
    const ttEl   = ttRef.current!
    const ttNEl  = ttNRef.current!
    const ttCEl  = ttCRef.current!

    // Live node data — mutated on layout switch
    const nm: Record<string, NodeData> = {}
    NODES.forEach(n => { nm[n.id] = { ...n } })

    const lines:   LineData[]                = []
    const nodeEls: Record<string, NodeEls>   = {}

    // vbW/vbH track current viewBox — needed for correct tooltip placement
    let vbW = 680
    let vbH = 435

    gsap.set(ttEl, { xPercent: -50 })

    // ── Helpers ────────────────────────────────────────
    const getLines      = (id: string) => lines.filter(l => l.a === id || l.b === id)
    const getNeighborId = (l: LineData, id: string) => (l.a === id ? l.b : l.a)
    const getNeighbors  = (id: string) => {
      const s = new Set<string>()
      lines.forEach(l => {
        if (l.a === id) s.add(l.b)
        if (l.b === id) s.add(l.a)
      })
      return s
    }

    // ── Tooltip ────────────────────────────────────────
    function svgScale() {
      const sr = svgEl.getBoundingClientRect()
      const sc = Math.min(sr.width / vbW, sr.height / vbH)
      return {
        sr,
        sc,
        offsetX: (sr.width  - vbW * sc) / 2,
        offsetY: (sr.height - vbH * sc) / 2,
      }
    }

    function showTT(n: NodeData) {
      const cr = swEl.getBoundingClientRect()
      const { sr, sc, offsetX, offsetY } = svgScale()
      ttEl.style.left = `${(sr.left - cr.left) + offsetX + n.x * sc}px`
      ttEl.style.top  = `${(sr.top  - cr.top)  + offsetY + (n.y - n.r - 14) * sc - 38}px`
      ttNEl.textContent = n.n
      ttCEl.textContent = n.cat
      gsap.killTweensOf(ttEl)
      gsap.fromTo(ttEl,
        { opacity: 0, y: 8,  scale: 0.88 },
        { opacity: 1, y: 0,  scale: 1,    duration: 0.22, ease: 'back.out(1.8)' },
      )
    }

    function hideTT() {
      gsap.killTweensOf(ttEl)
      gsap.to(ttEl, { opacity: 0, y: 5, scale: 0.92, duration: 0.14, ease: 'power2.in' })
    }

    function setHint(text: string) {
      gsap.killTweensOf(hintEl)
      gsap.to(hintEl, {
        opacity: 0, duration: 0.1,
        onComplete: () => {
          hintEl.textContent = text
          gsap.to(hintEl, { opacity: 1, duration: 0.2 })
        },
      })
    }

    // ── Draw connections ───────────────────────────────
    CONNS.forEach(([a, b]) => {
      const na = nm[a], nb = nm[b]
      const ln = document.createElementNS(NS, 'line') as SVGLineElement
      ln.setAttribute('x1', String(na.x)); ln.setAttribute('y1', String(na.y))
      ln.setAttribute('x2', String(nb.x)); ln.setAttribute('y2', String(nb.y))
      ln.setAttribute('stroke', '#ff5200')
      ln.setAttribute('stroke-opacity', '0.2')
      ln.setAttribute('stroke-width', '0.8')

      const len = Math.hypot(nb.x - na.x, nb.y - na.y)
      ln.style.strokeDasharray  = `${len}`
      ln.style.strokeDashoffset = `${len}`
      svgEl.appendChild(ln)

      lines.push({ el: ln, a, b, x1: na.x, y1: na.y, x2: nb.x, y2: nb.y, len })

      gsap.to(ln, {
        strokeDashoffset: 0,
        duration: 0.9, delay: 0.4 + Math.random() * 0.9, ease: 'power2.inOut',
      })
    })

    // ── Draw nodes ─────────────────────────────────────
    NODES.forEach((n, i) => {
      const cat = CAT[n.cat]
      const g   = document.createElementNS(NS, 'g') as SVGGElement
      g.style.cursor = 'default'
      gsap.set(g, { x: nm[n.id].x, y: nm[n.id].y })

      const gl2 = mkCircle(n.r + 22, cat.hex, '0')
      const gl1 = mkCircle(n.r + 10, cat.hex, '0')
      const bg  = mkCircle(n.r, '#0e0705', '1', cat.hex, '0.55', '1')
      const ir  = mkCircle(Math.max(n.r - 5, 2), 'none', '1', cat.hex, '0.22', '0.5')
      const dot = mkCircle(3, cat.hex, '1')

      const hr = document.createElementNS(NS, 'circle') as SVGCircleElement
      hr.setAttribute('r', String(n.r + 9))
      hr.setAttribute('fill', 'none')
      hr.setAttribute('stroke', cat.hex)
      hr.setAttribute('stroke-opacity', '0.9')
      hr.setAttribute('stroke-width', '1.5')
      const dash = Math.max(4, n.r * 0.36)
      hr.setAttribute('stroke-dasharray', `${dash} ${dash * 1.5}`)
      hr.style.opacity = '0'

      const lbl = document.createElementNS(NS, 'text') as SVGTextElement
      lbl.setAttribute('text-anchor', 'middle')
      lbl.setAttribute('dy', String(n.r + 14))
      lbl.setAttribute('fill', '#a05a20')
      lbl.setAttribute('font-size', n.r >= 18 ? 'var(--text-sm)' : 'var(--text-xs)')
      lbl.setAttribute('letter-spacing', '0.5')
      lbl.setAttribute('font-family', '"Courier New", monospace')
      lbl.textContent = n.n.toUpperCase()

      ;[gl2, gl1, bg, ir, hr, dot, lbl].forEach(el => g.appendChild(el))
      svgEl.appendChild(g)
      nodeEls[n.id] = { g, bg, ir, gl1, gl2, hr, dot, lbl }

      // Entrance
      gsap.from([bg, ir, dot], {
        scale: 0, transformOrigin: '0px 0px',
        duration: 0.5, delay: 0.2 + i * 0.065, ease: 'back.out(2)',
      })
      gsap.from(lbl, { opacity: 0, duration: 0.4, delay: 0.35 + i * 0.065 })

      // ── Hover ────────────────────────────────────────
      let ringTl: gsap.core.Tween | null = null

      g.addEventListener('mouseenter', () => {
        emberEnter()
        const nd = nm[n.id]
        setHint(`${nd.n}  ·  ${nd.cat}`)

        gsap.to(bg,  { attr: { r: nd.r + 3, 'stroke-opacity': 0.85, 'stroke-width': 1.6 }, duration: 0.2 })
        gsap.to(gl1, { attr: { r: nd.r + 15, 'fill-opacity': 0.22 }, duration: 0.25 })
        gsap.to(gl2, { attr: { r: nd.r + 30, 'fill-opacity': 0.08 }, duration: 0.3  })
        gsap.to(dot, { attr: { r: 5, fill: '#ffdd55' }, duration: 0.2 })
        gsap.to(lbl, { attr: { fill: '#ffcc55' }, duration: 0.2 })
        gsap.to(hr,  { opacity: 1, duration: 0.2 })
        ringTl = gsap.to(hr, {
          rotation: 360, transformOrigin: '50% 50%',
          duration: 2.8, ease: 'none', repeat: -1,
        })

        // Dim non-neighbors
        const nbrs = getNeighbors(n.id)
        NODES.forEach(other => {
          if (other.id === n.id || nbrs.has(other.id)) return
          const o = nodeEls[other.id]
          gsap.to(o.bg,  { attr: { 'stroke-opacity': 0.08 }, duration: 0.3 })
          gsap.to(o.lbl, { attr: { fill: '#3a1a06' }, duration: 0.3 })
        })

        // Animate lines toward neighbors
        getLines(n.id).forEach(ld => {
          const neighborId = getNeighborId(ld, n.id)
          const isA        = ld.a === n.id
          gsap.killTweensOf(ld.el)

          if (isA) {
            ld.el.setAttribute('x1', String(ld.x1)); ld.el.setAttribute('y1', String(ld.y1))
            ld.el.setAttribute('x2', String(ld.x2)); ld.el.setAttribute('y2', String(ld.y2))
          } else {
            ld.el.setAttribute('x1', String(ld.x2)); ld.el.setAttribute('y1', String(ld.y2))
            ld.el.setAttribute('x2', String(ld.x1)); ld.el.setAttribute('y2', String(ld.y1))
          }
          ld.el.style.strokeDasharray = `${ld.len}`

          gsap.fromTo(ld.el,
            { strokeDashoffset: ld.len, strokeOpacity: 0.85, strokeWidth: 1.4 },
            {
              strokeDashoffset: 0,
              duration: TRAVEL_DUR, ease: 'power2.inOut',
              onComplete: () => {
                const o  = nodeEls[neighborId]
                const on = nm[neighborId]
                if (!o || !on) return
                gsap.to(o.gl1, { attr: { r: on.r + 12, 'fill-opacity': 0.13 }, duration: 0.55, ease: 'power2.out' })
                gsap.to(o.bg,  { attr: { 'stroke-opacity': 0.52 }, duration: 0.55, ease: 'power2.out' })
                gsap.to(o.lbl, { attr: { fill: '#cc8833' }, duration: 0.55, ease: 'power2.out' })
              },
            },
          )
        })

        showTT(nd)
      })

      g.addEventListener('mouseleave', () => {
        emberLeave()
        const nd  = nm[n.id]
        const cat = CAT[nd.cat]
        setHint('— hover a node —')

        gsap.to(bg,  { attr: { r: nd.r, 'stroke-opacity': 0.55, 'stroke-width': 1 }, duration: 0.35 })
        gsap.to(gl1, { attr: { r: nd.r + 10, 'fill-opacity': 0 }, duration: 0.4  })
        gsap.to(gl2, { attr: { r: nd.r + 22, 'fill-opacity': 0 }, duration: 0.45 })
        gsap.to(dot, { attr: { r: 3, fill: cat.hex }, duration: 0.3 })
        gsap.to(lbl, { attr: { fill: '#a05a20' }, duration: 0.3 })
        if (ringTl) { ringTl.kill(); ringTl = null }
        gsap.to(hr, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(hr, { rotation: 0 }) })

        getLines(n.id).forEach(ld => {
          gsap.killTweensOf(ld.el)
          ld.el.setAttribute('x1', String(ld.x1)); ld.el.setAttribute('y1', String(ld.y1))
          ld.el.setAttribute('x2', String(ld.x2)); ld.el.setAttribute('y2', String(ld.y2))
          ld.el.style.strokeDasharray  = `${ld.len}`
          ld.el.style.strokeDashoffset = '0'
          gsap.to(ld.el, { strokeOpacity: 0.2, strokeWidth: 0.8, duration: 0.35 })
        })

        NODES.forEach(other => {
          if (other.id === n.id) return
          const o = nodeEls[other.id]
          gsap.to(o.gl1, { attr: { 'fill-opacity': 0     }, duration: 0.4  })
          gsap.to(o.bg,  { attr: { 'stroke-opacity': 0.55 }, duration: 0.35 })
          gsap.to(o.dot, { attr: { r: 3 },                  duration: 0.35 })
          gsap.to(o.lbl, { attr: { fill: '#a05a20' },       duration: 0.35 })
        })

        hideTT()
      })
    })

    // ── Responsive layout switcher ─────────────────────
    let activeLayoutKey = ''

    function applyLayout(name: 'desktop' | 'tablet' | 'mobile' | 'xs', animate: boolean) {
      const cw  = swEl.offsetWidth
      const ch  = swEl.offsetHeight
      const key = `${name}:${cw}:${ch}`
      if (activeLayoutKey === key) return
      activeLayoutKey = key

      const layout = LAYOUTS[name]
      // Scale layout coordinates to fill the actual container exactly
      const sx = cw / layout.vbW
      const sy = ch / layout.vbH
      const sr = Math.min(sx, sy)

      vbW = cw
      vbH = ch
      svgEl.setAttribute('viewBox', `0 0 ${cw} ${ch}`)

      const dur  = animate ? 0.7 : 0
      const ease = 'power2.inOut'

      layout.nodes.forEach(ln => {
        const x = ln.x * sx
        const y = ln.y * sy
        const r = ln.r * sr

        nm[ln.id].x = x
        nm[ln.id].y = y
        nm[ln.id].r = r

        const el = nodeEls[ln.id]
        if (!el) return

        gsap.to(el.g,   { x, y, duration: dur, ease })
        gsap.to(el.bg,  { attr: { r }, duration: dur, ease })
        gsap.to(el.ir,  { attr: { r: Math.max(r - 5, 2) }, duration: dur, ease })
        gsap.to(el.hr,  { attr: { r: r + 9 }, duration: dur, ease })
        gsap.to(el.gl1, { attr: { r: r + 10 }, duration: dur, ease })
        gsap.to(el.gl2, { attr: { r: r + 22 }, duration: dur, ease })
        gsap.to(el.lbl, {
          attr: { dy: r + 14, 'font-size': r >= 18 ? 'var(--text-sm)' : 'var(--text-xs)' },
          duration: dur, ease,
        })
      })

      lines.forEach(ld => {
        const na = nm[ld.a], nb = nm[ld.b]
        gsap.to(ld.el, {
          attr: { x1: na.x, y1: na.y, x2: nb.x, y2: nb.y },
          duration: dur, ease,
          onUpdate() {
            ld.x1  = +ld.el.getAttribute('x1')!
            ld.y1  = +ld.el.getAttribute('y1')!
            ld.x2  = +ld.el.getAttribute('x2')!
            ld.y2  = +ld.el.getAttribute('y2')!
            ld.len = Math.hypot(ld.x2 - ld.x1, ld.y2 - ld.y1)
            ld.el.style.strokeDasharray = `${ld.len}`
            if (+ld.el.style.strokeDashoffset > 0)
              ld.el.style.strokeDashoffset = `${ld.len}`
          },
        })
      })
    }

    const pickLayout = (): 'desktop' | 'tablet' | 'mobile' | 'xs' => {
      const w = swEl.offsetWidth
      if (w < 360) return 'xs'
      if (w < 560) return 'mobile'
      if (w < 900) return 'tablet'
      return 'desktop'
    }

    applyLayout(pickLayout(), false)

    let resizeTimer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => applyLayout(pickLayout(), true), 120)
    })
    ro.observe(swEl)

    // Return a cleanup fn (called from main useEffect)
    return () => {
      ro.disconnect()
      gsap.killTweensOf('*')
    }
  }

  return { init }
}
