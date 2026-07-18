import { useRef, useState } from 'react'
import { makeNyanLayout } from '../components/svg/nyanLayout'
import type { NyanLayout } from '../components/svg/nyanLayout'

/**
 * Conta i click sulla mascotte in nav: al quinto lancia il nyan cat.
 * Rispetta `prefers-reduced-motion` (in quel caso non fa nulla).
 */
export function useMascotteEasterEgg() {
  const clicks = useRef(0)
  const [nyanLayout, setNyanLayout] = useState<NyanLayout | null>(null)

  const onMascotteClick = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    clicks.current += 1
    if (clicks.current >= 5) {
      clicks.current = 0
      // Randomness in un event handler: consentita (non durante il render).
      setNyanLayout(makeNyanLayout())
    }
  }

  const hideNyan = () => setNyanLayout(null)

  return { onMascotteClick, nyanLayout, hideNyan }
}
