import { useEffect } from 'react'
import { animations } from '../config/animations'

const PAW_SVG =
  '<svg viewBox="0 0 24 24" width="28" height="28"><ellipse cx="12" cy="16" rx="6" ry="4.6" fill="#E8506E"></ellipse><circle cx="4.6" cy="10" r="2.5" fill="#E8506E"></circle><circle cx="9.6" cy="7" r="2.5" fill="#E8506E"></circle><circle cx="14.4" cy="7" r="2.5" fill="#E8506E"></circle><circle cx="19.4" cy="10" r="2.5" fill="#E8506E"></circle></svg>'

const IGNORE_SELECTOR = 'a,button,input,textarea,select,label,[data-mascotte]'

/** Fa comparire una zampetta a ogni click nella pagina (fuori dai controlli). */
export function PawClickLayer() {
  useEffect(() => {
    if (!animations.zampetteAlClick) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set<number>()

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null
      if (target?.closest?.(IGNORE_SELECTOR)) return

      const paw = document.createElement('div')
      const rotation = Math.round(Math.random() * 70 - 35)
      paw.style.cssText = `position:fixed;left:${event.clientX - 14}px;top:${event.clientY - 14}px;pointer-events:none;z-index:9999;animation:om-paw-fade .8s ease-out forwards;`
      paw.innerHTML = `<div style="transform:rotate(${rotation}deg)">${PAW_SVG}</div>`
      document.body.appendChild(paw)

      const timer = window.setTimeout(() => {
        paw.remove()
        timers.delete(timer)
      }, 900)
      timers.add(timer)
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [])

  return null
}
