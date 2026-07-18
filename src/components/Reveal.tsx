import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Tag da renderizzare (default `div`). */
  as?: ElementType
  className?: string
  style?: CSSProperties
}

/**
 * Rivela il contenuto con fade + slide quando entra nel viewport
 * (come il `data-reveal` del prototipo). Se `prefers-reduced-motion`
 * o senza IntersectionObserver, il contenuto resta subito visibile.
 */
export function Reveal({ children, as, className, style }: RevealProps) {
  const Tag = as ?? 'div'
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(26px)'

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const target = entry.target as HTMLElement
          target.style.transition =
            'opacity .5s ease, transform .7s cubic-bezier(.34,1.56,.64,1)'
          target.style.opacity = '1'
          target.style.transform = 'translateY(0)'
          io.unobserve(target)
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)

    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
