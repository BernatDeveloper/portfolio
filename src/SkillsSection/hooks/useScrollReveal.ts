import type { RefObject } from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollReveal(
  targetRef: RefObject<HTMLElement | null>,
  onEnter:   () => void,
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const el = targetRef.current
    if (!el) return

    const tween = gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: el,
          start:   'bottom -40%',
          once:    true,
          invalidateOnRefresh: true,
          onEnter,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
