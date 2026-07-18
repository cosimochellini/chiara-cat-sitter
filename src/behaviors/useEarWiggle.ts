import type { MouseEvent } from 'react'

/**
 * Handler `onMouseEnter`: fa muovere le orecchie (`[data-ear]`) dei gatti
 * dentro l'elemento. Usa la Web Animations API, rispetta reduced-motion.
 */
export function useEarWiggle() {
  return (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ears = event.currentTarget.querySelectorAll('[data-ear]')
    ears.forEach((ear, index) => {
      ear.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: `rotate(${index % 2 ? -14 : 14}deg)` },
          { transform: 'rotate(0deg)' },
          { transform: `rotate(${index % 2 ? 9 : -9}deg)` },
          { transform: 'rotate(0deg)' },
        ],
        { duration: 650, easing: 'ease-in-out' },
      )
    })
  }
}
