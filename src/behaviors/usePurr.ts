import type { MouseEvent } from 'react'

/**
 * Ritorna un handler `onMouseEnter` che fa salire cuoricini "fusa"
 * dal bordo superiore dell'elemento. Rispetta `prefers-reduced-motion`.
 * (React Compiler memoizza automaticamente la funzione ritornata.)
 */
export function usePurr() {
  return (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = event.currentTarget.getBoundingClientRect()
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('div')
      heart.textContent = '♥'
      const left = rect.left + Math.random() * rect.width
      const size = Math.round(12 + Math.random() * 9)
      const duration = (0.7 + Math.random() * 0.5).toFixed(2)
      heart.style.cssText = `position:fixed;left:${left}px;top:${rect.top - 4}px;color:#E8506E;font-size:${size}px;pointer-events:none;z-index:9999;animation:om-heart ${duration}s ease-out forwards;`
      document.body.appendChild(heart)
      window.setTimeout(() => heart.remove(), 1300)
    }
  }
}
