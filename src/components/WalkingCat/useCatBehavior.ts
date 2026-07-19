import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

export type CatState =
  | 'walk'
  | 'trot'
  | 'chase'
  | 'sit'
  | 'groom'
  | 'stretch'
  | 'sleep'
  | 'scratch'
  | 'pounce'
  | 'celebrate'

export type Heart = {
  id: number
  dx: number
  dy: number
  rot: number
  delay: number
  scale: number
}

export type ButterflyState = { side: 1 | -1; away: boolean }

/** Velocità orizzontale (px/s) per gli stati in movimento. */
const SPEED: Partial<Record<CatState, number>> = {
  walk: 55,
  trot: 135,
  chase: 100,
}

const IDLE_BEHAVIORS = ['sit', 'groom', 'stretch', 'sleep', 'scratch', 'chase'] as const
type IdleBehavior = (typeof IDLE_BEHAVIORS)[number]

const IDLE_DURATION: Record<Exclude<IdleBehavior, 'chase'>, number> = {
  sit: 3200,
  groom: 4200,
  stretch: 2800,
  sleep: 6500,
  scratch: 3400,
}

const CHASE_MS = 3600
const POUNCE_MS = 1400
const CELEBRATE_MS = 1700
const TROT_SIT_MS = 2200
const IDLE_MIN_MS = 8000
const IDLE_JITTER_MS = 7000
const CURSOR_LINGER_MS = 1500
const TROT_COOLDOWN_MS = 6000
const EDGE_PADDING = 8

const BUBBLE_TEXTS = ['Miao!', 'Prrr…', '♥'] as const

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const subscribeReducedMotion = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )

/**
 * Cervello del micio: state machine + motore di movimento su rAF.
 * La posizione X viene scritta direttamente sul DOM (ref), senza re-render;
 * lo stato React cambia solo quando cambia il comportamento visibile.
 */
export function useCatBehavior() {
  const walkerRef = useRef<HTMLDivElement | null>(null)
  const catRef = useRef<HTMLButtonElement | null>(null)
  const [state, setState] = useState<CatState>('walk')
  const [bubble, setBubble] = useState<string | null>(null)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [butterfly, setButterfly] = useState<ButterflyState | null>(null)
  const reduced = useReducedMotion()
  const celebrateRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const walker = walkerRef.current
    const cat = catRef.current
    if (!walker || !cat || reduced) return

    const finePointer = window.matchMedia('(pointer: fine)').matches

    let x = 24
    let dir: 1 | -1 = 1
    let current: CatState = 'walk'
    let lastIdle: IdleBehavior | null = null
    let width = walker.offsetWidth || 126
    let rafId = 0
    let last = performance.now()
    let trotTarget = 0
    let trotCooldownUntil = 0
    let nearSince: number | null = null
    let heartSeq = 0
    const timers = new Set<number>()

    const later = (fn: () => void, ms: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        fn()
      }, ms)
      timers.add(timer)
    }
    const clearTimers = () => {
      for (const timer of timers) window.clearTimeout(timer)
      timers.clear()
    }

    const maxX = () => Math.max(EDGE_PADDING, window.innerWidth - width - EDGE_PADDING)

    const enter = (next: CatState) => {
      current = next
      setState(next)
      setBubble(next === 'sleep' ? 'Zzz…' : null)
    }

    const scheduleIdle = () => {
      later(startIdle, IDLE_MIN_MS + Math.random() * IDLE_JITTER_MS)
    }

    const backToWalk = () => {
      setButterfly(null)
      enter('walk')
      scheduleIdle()
    }

    function startIdle() {
      if (current !== 'walk') {
        scheduleIdle()
        return
      }
      const pool = IDLE_BEHAVIORS.filter((behavior) => behavior !== lastIdle)
      const pick = pool[Math.floor(Math.random() * pool.length)]
      lastIdle = pick
      if (pick === 'chase') {
        setButterfly({ side: dir, away: false })
        enter('chase')
        later(() => {
          setButterfly({ side: dir, away: true })
          enter('pounce')
          later(backToWalk, POUNCE_MS)
        }, CHASE_MS)
      } else {
        enter(pick)
        later(backToWalk, IDLE_DURATION[pick])
      }
    }

    const spawnHearts = () => {
      const burst: Heart[] = Array.from({ length: 7 }, () => ({
        id: ++heartSeq,
        dx: Math.round(-46 + Math.random() * 92),
        dy: Math.round(-50 - Math.random() * 42),
        rot: Math.round(-26 + Math.random() * 52),
        delay: Math.round(Math.random() * 180),
        scale: Number((0.7 + Math.random() * 0.6).toFixed(2)),
      }))
      setHearts(burst)
      later(() => setHearts([]), 1500)
    }

    const celebrate = () => {
      if (current === 'celebrate') return
      clearTimers()
      setButterfly(null)
      enter('celebrate')
      setBubble(BUBBLE_TEXTS[Math.floor(Math.random() * BUBBLE_TEXTS.length)])
      spawnHearts()
      later(() => {
        setBubble(null)
        backToWalk()
      }, CELEBRATE_MS)
    }
    celebrateRef.current = celebrate

    const startTrot = (targetX: number) => {
      clearTimers()
      setButterfly(null)
      trotTarget = targetX
      dir = targetX >= x + width / 2 ? 1 : -1
      enter('trot')
    }

    const tick = (timestamp: number) => {
      const dt = Math.min((timestamp - last) / 1000, 0.05)
      last = timestamp
      const speed = SPEED[current]
      if (speed) {
        if (current === 'trot') {
          const center = x + width / 2
          const delta = trotTarget - center
          // Arrivato: vicino al cursore, oppure bloccato sul bordo (il centro
          // del gatto non può avvicinarsi oltre — evita il trotto infinito).
          const stuckAtEdge =
            (delta < 0 && x <= EDGE_PADDING + 1) || (delta > 0 && x >= maxX() - 1)
          if (Math.abs(delta) <= 60 || stuckAtEdge) {
            trotCooldownUntil = performance.now() + TROT_COOLDOWN_MS
            enter('sit')
            later(backToWalk, TROT_SIT_MS)
          } else {
            dir = delta > 0 ? 1 : -1
            x = Math.min(maxX(), Math.max(EDGE_PADDING, x + speed * dir * dt))
          }
        } else {
          x += speed * dir * dt
          if (x <= EDGE_PADDING) {
            x = EDGE_PADDING
            dir = 1
            if (current === 'chase') setButterfly((b) => (b ? { ...b, side: dir } : b))
          } else if (x >= maxX()) {
            x = maxX()
            dir = -1
            if (current === 'chase') setButterfly((b) => (b ? { ...b, side: dir } : b))
          }
        }
      }
      walker.style.transform = `translate3d(${x}px, 0, 0)`
      cat.style.transform = `scaleX(${dir})`
      rafId = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      const center = x + width / 2
      const catY = window.innerHeight - 50
      const dx = event.clientX - center
      const dy = event.clientY - catY
      const distance = Math.hypot(dx, dy)
      if (distance < 260) {
        cat.style.setProperty('--look-x', String(Math.max(-1, Math.min(1, dx / 150))))
        cat.style.setProperty('--look-y', String(Math.max(-1, Math.min(0.4, dy / 150))))
      } else {
        cat.style.setProperty('--look-x', '0')
        cat.style.setProperty('--look-y', '0')
      }

      if (current === 'trot') {
        trotTarget = event.clientX
        return
      }
      const nearForTrot = Math.abs(dx) < 220 && event.clientY > window.innerHeight * 0.45
      if (!nearForTrot) {
        nearSince = null
        return
      }
      const now = performance.now()
      if (nearSince === null) {
        nearSince = now
        return
      }
      if (
        now - nearSince > CURSOR_LINGER_MS &&
        now > trotCooldownUntil &&
        (current === 'walk' || current === 'sit') &&
        Math.abs(dx) > 80
      ) {
        nearSince = null
        startTrot(event.clientX)
      }
    }

    const onResize = () => {
      width = walker.offsetWidth || width
      // Ri-clampa subito: negli stati fermi il tick non corregge la posizione.
      if (x > maxX()) {
        x = maxX()
        walker.style.transform = `translate3d(${x}px, 0, 0)`
      }
    }

    scheduleIdle()
    rafId = requestAnimationFrame(tick)
    if (finePointer) document.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimers()
      if (finePointer) document.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  const onCatClick = () => celebrateRef.current?.()

  return {
    walkerRef,
    catRef,
    state: reduced ? ('sit' as const) : state,
    bubble: reduced ? null : bubble,
    hearts,
    butterfly,
    reduced,
    onCatClick,
  }
}
