import type { RefObject } from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { EMBER_COLS } from '../data/nodes'

/**
 * Renders floating ember particles on a canvas that fills its container.
 * Uses gsap.ticker for frame-rate independent animation.
 */
export function useSkillEmbers(
  canvasRef:    RefObject<HTMLCanvasElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  count = 45,
) {
  useEffect(() => {
    const cv  = canvasRef.current
    const box = containerRef.current
    if (!cv || !box) return

    const ctx = cv.getContext('2d')!

    const resize = () => {
      cv.width  = box.offsetWidth
      cv.height = box.offsetHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(box)

    interface Particle {
      x: number; y: number; r: number
      spd: number; op: number; col: string
      wb: number; ws: number
    }

    const mkP = (randomY: boolean): Particle => ({
      x:   Math.random() * cv.width,
      y:   randomY ? Math.random() * cv.height : cv.height + 5,
      r:   0.7 + Math.random() * 1.6,
      spd: 0.18 + Math.random() * 0.5,
      op:  0.08 + Math.random() * 0.22,
      col: EMBER_COLS[Math.floor(Math.random() * EMBER_COLS.length)],
      wb:  Math.random() * Math.PI * 2,
      ws:  0.012 + Math.random() * 0.022,
    })

    const particles: Particle[] = Array.from({ length: count }, () => mkP(true))

    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      particles.forEach((p, i) => {
        p.y  -= p.spd
        p.wb += p.ws
        p.x  += Math.sin(p.wb) * 0.45
        if (p.y < -4) particles[i] = mkP(false)
        // Fade out as particles rise (y → 0)
        ctx.globalAlpha = p.op * Math.max(0, p.y / cv.height)
        ctx.fillStyle   = p.col
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
}
