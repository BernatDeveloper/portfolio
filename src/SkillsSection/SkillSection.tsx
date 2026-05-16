import { useEffect, useRef } from 'react'
import './SkillSection.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */
type Category = 'frontend' | 'backend' | 'database' | 'tools'

interface NodeData {
  id: string
  n: string
  x: number
  y: number
  r: number
  cat: Category
}

interface LayoutNode {
  id: string
  x: number
  y: number
  r: number
}

interface Layout {
  vbW: number
  vbH: number
  nodes: LayoutNode[]
}

interface LineData {
  el: SVGLineElement
  a: string
  b: string
  x1: number
  y1: number
  x2: number
  y2: number
  len: number
}

interface NodeEls {
  g: SVGGElement
  bg: SVGCircleElement
  ir: SVGCircleElement
  gl1: SVGCircleElement
  gl2: SVGCircleElement
  hr: SVGCircleElement
  dot: SVGCircleElement
  lbl: SVGTextElement
}

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const CAT: Record<Category, { hex: string }> = {
  frontend: { hex: '#ff8830' },
  backend:  { hex: '#ff5010' },
  database: { hex: '#dd8500' },
  tools:    { hex: '#cc5500' },
}

const NODES: NodeData[] = [
  { id: 'js',    n: 'JavaScript',  x: 105, y: 168, r: 26, cat: 'frontend' },
  { id: 'ts',    n: 'TypeScript',  x: 258, y: 70,  r: 24, cat: 'frontend' },
  { id: 'react', n: 'React',       x: 400, y: 70,  r: 26, cat: 'frontend' },
  { id: 'vue',   n: 'Vue.js',      x: 308, y: 192, r: 22, cat: 'frontend' },
  { id: 'html',  n: 'HTML5',       x: 142, y: 285, r: 20, cat: 'frontend' },
  { id: 'css',   n: 'CSS3',        x: 62,  y: 362, r: 20, cat: 'frontend' },
  { id: 'tail',  n: 'Tailwind',    x: 240, y: 328, r: 20, cat: 'frontend' },
  { id: 'node',  n: 'Node.js',     x: 462, y: 188, r: 23, cat: 'backend'  },
  { id: 'expr',  n: 'Express',     x: 390, y: 318, r: 19, cat: 'backend'  },
  { id: 'php',   n: 'PHP',         x: 545, y: 80,  r: 18, cat: 'backend'  },
  { id: 'lara',  n: 'Laravel',     x: 548, y: 278, r: 21, cat: 'backend'  },
  { id: 'pg',    n: 'PostgreSQL',  x: 618, y: 170, r: 18, cat: 'database' },
  { id: 'mysql', n: 'MySQL',       x: 620, y: 338, r: 18, cat: 'database' },
  { id: 'git',   n: 'Git',         x: 198, y: 168, r: 20, cat: 'tools'    },
  { id: 'rest',  n: 'REST API',    x: 476, y: 382, r: 16, cat: 'tools'    },
]

const CONNS: [string, string][] = [
  ['js','ts'],    ['js','react'],   ['js','node'],   ['js','git'],   ['js','html'],
  ['ts','react'], ['ts','vue'],     ['ts','node'],
  ['react','html'],['react','tail'],['react','rest'],
  ['vue','tail'], ['vue','html'],   ['vue','lara'],
  ['html','css'], ['html','tail'],  ['css','tail'],
  ['node','expr'],['node','rest'],  ['node','pg'],   ['node','mysql'],
  ['expr','rest'],['expr','mysql'],
  ['lara','php'], ['lara','mysql'], ['lara','rest'],
  ['php','pg'],   ['pg','mysql'],   ['git','node'],
]

const LAYOUTS: Record<'desktop' | 'mobile', Layout> = {
  desktop: {
    vbW: 680, vbH: 435,
    nodes: [
      { id: 'js',    x: 105, y: 168, r: 26 },
      { id: 'ts',    x: 258, y: 70,  r: 24 },
      { id: 'react', x: 400, y: 70,  r: 26 },
      { id: 'vue',   x: 308, y: 192, r: 22 },
      { id: 'html',  x: 142, y: 285, r: 20 },
      { id: 'css',   x: 62,  y: 362, r: 20 },
      { id: 'tail',  x: 240, y: 328, r: 20 },
      { id: 'node',  x: 462, y: 188, r: 23 },
      { id: 'expr',  x: 390, y: 318, r: 19 },
      { id: 'php',   x: 545, y: 80,  r: 18 },
      { id: 'lara',  x: 548, y: 278, r: 21 },
      { id: 'pg',    x: 618, y: 170, r: 18 },
      { id: 'mysql', x: 620, y: 338, r: 18 },
      { id: 'git',   x: 198, y: 168, r: 20 },
      { id: 'rest',  x: 476, y: 382, r: 16 },
    ],
  },
  mobile: {
    vbW: 380, vbH: 530,
    nodes: [
      { id: 'js',    x: 75,  y: 100, r: 19 },
      { id: 'ts',    x: 190, y: 65,  r: 17 },
      { id: 'react', x: 310, y: 92,  r: 19 },
      { id: 'git',   x: 75,  y: 195, r: 16 },
      { id: 'vue',   x: 185, y: 183, r: 16 },
      { id: 'node',  x: 310, y: 185, r: 17 },
      { id: 'html',  x: 75,  y: 295, r: 15 },
      { id: 'tail',  x: 185, y: 282, r: 15 },
      { id: 'expr',  x: 298, y: 285, r: 14 },
      { id: 'css',   x: 72,  y: 385, r: 15 },
      { id: 'php',   x: 190, y: 372, r: 13 },
      { id: 'lara',  x: 302, y: 378, r: 15 },
      { id: 'pg',    x: 118, y: 468, r: 13 },
      { id: 'mysql', x: 255, y: 470, r: 13 },
      { id: 'rest',  x: 342, y: 462, r: 12 },
    ],
  },
}

const EMBER_COLS = ['#ff8820', '#ff5500', '#ffaa30', '#dd4400', '#ff7700']
const TRAVEL_DUR = 0.65

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
export default function SkillSection() {
  /* Skills section refs */
  const skillsSecRef = useRef<HTMLElement>(null)
  const swRef        = useRef<HTMLDivElement>(null)
  const emCvRef      = useRef<HTMLCanvasElement>(null)
  const svgRef       = useRef<SVGSVGElement>(null)
  const hintRef      = useRef<HTMLSpanElement>(null)
  const ttRef        = useRef<HTMLDivElement>(null)
  const ttNRef       = useRef<HTMLDivElement>(null)
  const ttCRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const observers: ResizeObserver[] = []
    const tickerFns: gsap.Callback[]  = []

    /* ─── Ember particles ─── */
    function makeEmberSystem(
      cv: HTMLCanvasElement,
      container: HTMLElement,
      count: number,
      fade: boolean,
    ) {
      const ctx = cv.getContext('2d')!

      function resize() {
        cv.width  = container.offsetWidth
        cv.height = container.offsetHeight
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(container)
      observers.push(ro)

      interface Particle {
        x: number; y: number; r: number
        spd: number; op: number; col: string
        wb: number; ws: number
      }

      function mkP(randomY: boolean): Particle {
        return {
          x:   Math.random() * cv.width,
          y:   randomY ? Math.random() * cv.height : cv.height + 5,
          r:   0.7 + Math.random() * 1.6,
          spd: 0.18 + Math.random() * 0.5,
          op:  0.08 + Math.random() * 0.22,
          col: EMBER_COLS[Math.floor(Math.random() * EMBER_COLS.length)],
          wb:  Math.random() * Math.PI * 2,
          ws:  0.012 + Math.random() * 0.022,
        }
      }

      const particles: Particle[] = Array.from({ length: count }, () => mkP(true))

      const tick = () => {
        ctx.clearRect(0, 0, cv.width, cv.height)
        particles.forEach((p, i) => {
          p.y  -= p.spd
          p.wb += p.ws
          p.x  += Math.sin(p.wb) * 0.45
          if (p.y < -4) particles[i] = mkP(false)
          ctx.globalAlpha = p.op * (fade ? Math.max(0, p.y / cv.height) : 1)
          ctx.fillStyle   = p.col
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1
      }
      gsap.ticker.add(tick)
      tickerFns.push(tick)
    }

    /* ─── Scroll reveal ─── */
    function initScrollReveal() {
      gsap.fromTo(swRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: {
            trigger: swRef.current,
            start: 'top 85%',
            onEnter: initSkillWeb,
          },
        },
      )
    }

    /* ─── Skill web ─── */
    let webInited = false

    function initSkillWeb() {
      if (webInited) return
      webInited = true

      const svgEl  = svgRef.current!
      const swEl   = swRef.current!
      const hintEl = hintRef.current!
      const ttEl   = ttRef.current!
      const ttNEl  = ttNRef.current!
      const ttCEl  = ttCRef.current!
      const NS     = 'http://www.w3.org/2000/svg'

      if (emCvRef.current) makeEmberSystem(emCvRef.current, swEl, 45, true)

      /* Live node data — mutated on layout switch */
      const nm: Record<string, NodeData> = {}
      NODES.forEach(n => { nm[n.id] = { ...n } })

      const lines: LineData[]                = []
      const nodeEls: Record<string, NodeEls> = {}

      /*
       * vbW / vbH track the current viewBox dimensions.
       * Both are needed to compute the "meet" scale factor correctly:
       *   sc = Math.min(renderedW / vbW, renderedH / vbH)
       * Without vbH the tooltip was placed as if the SVG element
       * started at (0,0), ignoring the letterbox bands.
       */
      let vbW = 680
      let vbH = 435

      gsap.set(ttEl, { xPercent: -50 })

      /* helpers */
      const getLines      = (id: string) => lines.filter(l => l.a === id || l.b === id)
      const getNeighborId = (l: LineData, id: string) => l.a === id ? l.b : l.a
      const getNeighbors  = (id: string) => {
        const s = new Set<string>()
        lines.forEach(l => {
          if (l.a === id) s.add(l.b)
          if (l.b === id) s.add(l.a)
        })
        return s
      }

      /* Draw connections */
      CONNS.forEach(([a, b]) => {
        const na = nm[a], nb = nm[b]
        const ln = document.createElementNS(NS, 'line') as SVGLineElement
        ln.setAttribute('x1', String(na.x)); ln.setAttribute('y1', String(na.y))
        ln.setAttribute('x2', String(nb.x)); ln.setAttribute('y2', String(nb.y))
        ln.setAttribute('stroke', '#ff5200')
        ln.setAttribute('stroke-opacity', '0.13')
        ln.setAttribute('stroke-width', '0.5')

        const len = Math.hypot(nb.x - na.x, nb.y - na.y)
        const ld: LineData = { el: ln, a, b, x1: na.x, y1: na.y, x2: nb.x, y2: nb.y, len }

        ln.style.strokeDasharray  = `${len}`
        ln.style.strokeDashoffset = `${len}`
        svgEl.appendChild(ln)
        lines.push(ld)

        gsap.to(ln, { strokeDashoffset: 0, duration: 0.9, delay: 0.4 + Math.random() * 0.9, ease: 'power2.inOut' })
      })

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
        const cr                      = swEl.getBoundingClientRect()
        const { sr, sc, offsetX, offsetY } = svgScale()

        ttEl.style.left = `${(sr.left - cr.left) + offsetX + n.x * sc}px`
        ttEl.style.top  = `${(sr.top  - cr.top)  + offsetY + (n.y - n.r - 14) * sc - 38}px`
        ttNEl.textContent = n.n
        ttCEl.textContent = n.cat
        gsap.killTweensOf(ttEl)
        gsap.fromTo(ttEl,
          { opacity: 0, y: 8,  scale: 0.88 },
          { opacity: 1, y: 0,  scale: 1, duration: 0.22, ease: 'back.out(1.8)' },
        )
      }

      function hideTT() {
        gsap.killTweensOf(ttEl)
        gsap.to(ttEl, { opacity: 0, y: 5, scale: 0.92, duration: 0.14, ease: 'power2.in' })
      }

      /* Draw nodes */
      NODES.forEach((n, i) => {
        const cat = CAT[n.cat]
        const g   = document.createElementNS(NS, 'g') as SVGGElement
        g.style.cursor = 'default'
        gsap.set(g, { x: nm[n.id].x, y: nm[n.id].y })

        function mkCircle(r: number, fill: string, fillOpacity: string, stroke?: string, strokeOpacity?: string, strokeWidth?: string): SVGCircleElement {
          const c = document.createElementNS(NS, 'circle') as SVGCircleElement
          c.setAttribute('r', String(r))
          c.setAttribute('fill', fill)
          c.setAttribute('fill-opacity', fillOpacity)
          if (stroke)        c.setAttribute('stroke', stroke)
          if (strokeOpacity) c.setAttribute('stroke-opacity', strokeOpacity)
          if (strokeWidth)   c.setAttribute('stroke-width', strokeWidth)
          return c
        }

        const gl2 = mkCircle(n.r + 22, cat.hex, '0')
        const gl1 = mkCircle(n.r + 10, cat.hex, '0')
        const bg  = mkCircle(n.r, '#0e0705', '1', cat.hex, '0.3', '1')
        const ir  = mkCircle(Math.max(n.r - 5, 2), 'none', '1', cat.hex, '0.1', '0.5')
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
        lbl.setAttribute('fill', '#7a3810')
        lbl.setAttribute('font-size', n.r >= 18 ? '10' : '9')
        lbl.setAttribute('letter-spacing', '0.5')
        lbl.setAttribute('font-family', '"Courier New", monospace')
        lbl.textContent = n.n.toUpperCase()

        ;[gl2, gl1, bg, ir, hr, dot, lbl].forEach(el => g.appendChild(el))
        svgEl.appendChild(g)
        nodeEls[n.id] = { g, bg, ir, gl1, gl2, hr, dot, lbl }

        /* Entrance */
        gsap.from([bg, ir, dot], { scale: 0, transformOrigin: '0px 0px', duration: 0.5, delay: 0.2 + i * 0.065, ease: 'back.out(2)' })
        gsap.from(lbl, { opacity: 0, duration: 0.4, delay: 0.35 + i * 0.065 })

        /* Hover */
        let ringTl: gsap.core.Tween | null = null

        g.addEventListener('mouseenter', () => {
          const nd = nm[n.id]

          gsap.killTweensOf(hintEl)
          gsap.to(hintEl, {
            opacity: 0, duration: 0.1, onComplete: () => {
              hintEl.textContent = `${nd.n}  ·  ${nd.cat}`
              gsap.to(hintEl, { opacity: 1, duration: 0.2 })
            },
          })

          gsap.to(bg,  { attr: { r: nd.r + 3, 'stroke-opacity': 0.85, 'stroke-width': 1.6 }, duration: 0.2 })
          gsap.to(gl1, { attr: { r: nd.r + 15, 'fill-opacity': 0.22 }, duration: 0.25 })
          gsap.to(gl2, { attr: { r: nd.r + 30, 'fill-opacity': 0.08 }, duration: 0.3  })
          gsap.to(dot, { attr: { r: 5, fill: '#ffdd55' }, duration: 0.2 })
          gsap.to(lbl, { attr: { fill: '#ffcc55' }, duration: 0.2 })
          gsap.to(hr,  { opacity: 1, duration: 0.2 })
          ringTl = gsap.to(hr, { rotation: 360, transformOrigin: '50% 50%', duration: 2.8, ease: 'none', repeat: -1 })

          const nbrs = getNeighbors(n.id)
          NODES.forEach(other => {
            if (other.id === n.id) return
            const o = nodeEls[other.id]
            if (!nbrs.has(other.id)) {
              gsap.to(o.bg,  { attr: { 'stroke-opacity': 0.08 }, duration: 0.3 })
              gsap.to(o.lbl, { attr: { fill: '#3a1a06' }, duration: 0.3 })
            }
          })

          /* Line travel */
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
                strokeDashoffset: 0, duration: TRAVEL_DUR, ease: 'power2.inOut',
                onComplete: () => {
                  const o  = nodeEls[neighborId]
                  if (!o) return
                  const on = nm[neighborId]
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
          const nd  = nm[n.id]
          const cat = CAT[nd.cat]

          gsap.killTweensOf(hintEl)
          gsap.to(hintEl, {
            opacity: 0, duration: 0.1, onComplete: () => {
              hintEl.textContent = '— hover a node —'
              gsap.to(hintEl, { opacity: 1, duration: 0.2 })
            },
          })

          gsap.to(bg,  { attr: { r: nd.r, 'stroke-opacity': 0.3, 'stroke-width': 1 }, duration: 0.35 })
          gsap.to(gl1, { attr: { r: nd.r + 10, 'fill-opacity': 0 }, duration: 0.4  })
          gsap.to(gl2, { attr: { r: nd.r + 22, 'fill-opacity': 0 }, duration: 0.45 })
          gsap.to(dot, { attr: { r: 3, fill: cat.hex }, duration: 0.3 })
          gsap.to(lbl, { attr: { fill: '#7a3810' }, duration: 0.3 })
          if (ringTl) { ringTl.kill(); ringTl = null }
          gsap.to(hr, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(hr, { rotation: 0 }) })

          getLines(n.id).forEach(ld => {
            gsap.killTweensOf(ld.el)
            ld.el.setAttribute('x1', String(ld.x1)); ld.el.setAttribute('y1', String(ld.y1))
            ld.el.setAttribute('x2', String(ld.x2)); ld.el.setAttribute('y2', String(ld.y2))
            ld.el.style.strokeDasharray  = `${ld.len}`
            ld.el.style.strokeDashoffset = '0'
            gsap.to(ld.el, { strokeOpacity: 0.13, strokeWidth: 0.5, duration: 0.35 })
          })

          NODES.forEach(other => {
            if (other.id === n.id) return
            const o = nodeEls[other.id]
            gsap.to(o.gl1, { attr: { 'fill-opacity': 0     }, duration: 0.4  })
            gsap.to(o.bg,  { attr: { 'stroke-opacity': 0.3 }, duration: 0.35 })
            gsap.to(o.dot, { attr: { r: 3 }, duration: 0.35 })
            gsap.to(o.lbl, { attr: { fill: '#7a3810' }, duration: 0.35 })
          })

          hideTT()
        })
      })

      /* ─── Responsive layout switcher ─── */
      let activeLayout: 'desktop' | 'mobile' | null = null

      function applyLayout(name: 'desktop' | 'mobile', animate: boolean) {
        if (activeLayout === name) return
        activeLayout = name

        const layout = LAYOUTS[name]
        // Update both dimensions so svgScale() always has the correct vbH
        vbW = layout.vbW
        vbH = layout.vbH
        svgEl.setAttribute('viewBox', `0 0 ${layout.vbW} ${layout.vbH}`)

        const dur  = animate ? 0.7 : 0
        const ease = 'power2.inOut'

        layout.nodes.forEach(ln => {
          nm[ln.id].x = ln.x
          nm[ln.id].y = ln.y
          nm[ln.id].r = ln.r

          const el = nodeEls[ln.id]
          if (!el) return

          gsap.to(el.g,   { x: ln.x, y: ln.y, duration: dur, ease })
          gsap.to(el.bg,  { attr: { r: ln.r }, duration: dur, ease })
          gsap.to(el.ir,  { attr: { r: Math.max(ln.r - 5, 2) }, duration: dur, ease })
          gsap.to(el.hr,  { attr: { r: ln.r + 9 }, duration: dur, ease })
          gsap.to(el.gl1, { attr: { r: ln.r + 10 }, duration: dur, ease })
          gsap.to(el.gl2, { attr: { r: ln.r + 22 }, duration: dur, ease })
          gsap.to(el.lbl, { attr: { dy: ln.r + 14, 'font-size': ln.r >= 18 ? '10' : '9' }, duration: dur, ease })
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
              if (+ld.el.style.strokeDashoffset > 0) ld.el.style.strokeDashoffset = `${ld.len}`
            },
          })
        })
      }

      function pickLayout(): 'desktop' | 'mobile' {
        return swEl.offsetWidth < 540 ? 'mobile' : 'desktop'
      }

      applyLayout(pickLayout(), false)

      let resizeTimer: ReturnType<typeof setTimeout>
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => applyLayout(pickLayout(), true), 120)
      })
      ro.observe(swEl)
      observers.push(ro)
    }

    initScrollReveal()

    /* Cleanup on unmount */
    return () => {
      tickerFns.forEach(fn => gsap.ticker.remove(fn))
      observers.forEach(ro => ro.disconnect())
      ScrollTrigger.getAll().forEach(st => st.kill())
      gsap.killTweensOf('*')
    }
  }, [])

  /* ═══════════════════════════════════════
     JSX
  ═══════════════════════════════════════ */
  return (
    <div className={'sn-portfolio'}>
      <section className={'sn-skills-section'} ref={skillsSecRef}>

        <div className={'sn-sw'} ref={swRef}>
          <canvas className={'sn-em-cv'} ref={emCvRef} />

          <div className={'sn-sw-head'}>
            <span className={'sn-sw-hint'} ref={hintRef}>— hover a node —</span>
          </div>

          <svg
            ref={svgRef}
            className={'sn-sw-svg'}
            viewBox="0 0 680 435"
            preserveAspectRatio="xMidYMid meet"
          />

          <div className={'sn-sw-tt'} ref={ttRef}>
            <div className={'sn-tt-in'}>
              <div className={'sn-tt-name'} ref={ttNRef} />
              <div className={'sn-tt-cat'}  ref={ttCRef} />
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}