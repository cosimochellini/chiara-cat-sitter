import { useEffect, useRef } from 'react'
import { PawIcon } from '../svg/PawIcon'
import styles from './PawRating.module.css'

const SLOTS = ['a', 'b', 'c', 'd', 'e'] as const

type PawRatingProps = {
  /** Zampette piene (1-5). */
  value: number
  label: string
}

/** Rating a zampette con pop-in animato quando entra nel viewport. */
export function PawRating({ value, label }: PawRatingProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const paws = Array.from(el.querySelectorAll<HTMLElement>('[data-paw]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      for (const paw of paws) paw.style.transform = 'scale(1)'
      return
    }

    const timers = new Set<number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          paws.forEach((paw, index) => {
            const timer = window.setTimeout(() => {
              paw.style.animation =
                'om-pop .4s cubic-bezier(.34,1.56,.64,1) forwards'
            }, 120 + index * 130)
            timers.add(timer)
          })
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={ref} className={styles.rating} aria-label={label}>
      {SLOTS.map((slot, index) =>
        index < value ? (
          <span key={slot} data-paw className={styles.pawFilled}>
            <PawIcon size={26} color="#D93A5F" />
          </span>
        ) : (
          <span key={slot} className={styles.pawEmpty}>
            <PawIcon size={26} color="#E4C6CE" />
          </span>
        ),
      )}
    </div>
  )
}
