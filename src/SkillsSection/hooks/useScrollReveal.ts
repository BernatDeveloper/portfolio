import type { RefObject } from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'

export function useScrollReveal(
  targetRef: RefObject<HTMLElement | null>,
  onEnter:   () => void,
) {
  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 40 })

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
        })
        onEnter()
        obs.disconnect()
      },
      { threshold: 0.1, rootMargin: '0px 0px -20% 0px' },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])
}
