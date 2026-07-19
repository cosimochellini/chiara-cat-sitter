import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { CatFace } from '../svg/CatFace'
import { PawIcon } from '../svg/PawIcon'
import styles from './ChiSono.module.css'

type BadgeKind = 'paw' | 'star' | 'fish' | 'ball' | 'heart'
type Scheme = 'rosa' | 'viola' | 'verde' | 'oro'

type Badge = {
  id: string
  text: string
  reaction: string
  kind: BadgeKind
  iconColor: string
  scheme: Scheme
}

const BADGES: Badge[] = [
  { id: 'grattini', text: 'Certificata in Grattini Avanzati', reaction: 'Specializzazione: punto esatto dietro le orecchie.', kind: 'paw', iconColor: '#D93A5F', scheme: 'rosa' },
  { id: 'miao', text: 'Fluent in Miao', reaction: 'Accento impeccabile, approvato dai madrelingua.', kind: 'star', iconColor: '#9B79BC', scheme: 'viola' },
  { id: 'scatolette', text: 'Apertura scatolette < 3 secondi', reaction: 'Record personale: prima del secondo miao.', kind: 'fish', iconColor: '#4E9A6B', scheme: 'verde' },
  { id: 'fusa', text: 'Dottoressa in Fusa-terapia', reaction: 'Prescrizione: coccole, due volte al dì.', kind: 'heart', iconColor: '#E8506E', scheme: 'oro' },
  { id: 'pancia', text: 'Livello grattini: pancia sbloccata', reaction: 'Accesso concesso solo dai mici più fiduciosi.', kind: 'heart', iconColor: '#E8506E', scheme: 'rosa' },
  { id: 'timidi', text: 'Sussurratrice di mici timidi', reaction: 'Pazienza, distanza e conquista felina.', kind: 'paw', iconColor: '#9B79BC', scheme: 'viola' },
  { id: 'pallina', text: 'Lanci di pallina olimpionici', reaction: 'Traiettoria perfetta. Riporto non garantito.', kind: 'ball', iconColor: '#4E9A6B', scheme: 'verde' },
  { id: 'piumino', text: 'Esperta di agguati col piumino', reaction: 'Nessun divano è un nascondiglio sicuro.', kind: 'star', iconColor: '#E8B85E', scheme: 'oro' },
  { id: 'ronf', text: 'Laureata in Ronf-ologia', reaction: 'Tesi discussa durante una siesta.', kind: 'paw', iconColor: '#D93A5F', scheme: 'rosa' },
]

const PARTICLES = [
  { x: -42, y: -34, rotation: -28, delay: 0 },
  { x: -20, y: -54, rotation: -12, delay: 45 },
  { x: 4, y: -62, rotation: 8, delay: 20 },
  { x: 29, y: -48, rotation: 22, delay: 65 },
  { x: 46, y: -27, rotation: 35, delay: 35 },
] as const

type ActiveReaction = {
  badge: Badge
  targetKey: string
  nonce: number
  x: number
  bubbleX: number
  y: number
}

function BadgeIcon({ kind, color }: { kind: BadgeKind; color: string }) {
  switch (kind) {
    case 'paw':
      return <PawIcon size={15} color={color} />
    case 'heart':
      return <span className={styles.heartGlyph}>♥</span>
    case 'star':
      return (
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path d="M12 3 l2.5 6.1 6.1 2.5 -6.1 2.5 -2.5 6.1 -2.5 -6.1 -6.1 -2.5 6.1 -2.5 Z" fill={color} />
        </svg>
      )
    case 'fish':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <ellipse cx="10" cy="12" rx="7" ry="4.5" fill={color} />
          <path d="M17 12 l5 -3.5 v7 Z" fill={color} />
          <circle cx="7" cy="11" r="1" fill="#FFFFFF" />
        </svg>
      )
    case 'ball':
      return (
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill={color} />
          <path d="M12 4 a8 8 0 0 1 0 16 a12 12 0 0 0 0 -16 Z" fill={color} opacity="0.5" />
        </svg>
      )
  }
}

type BadgePillProps = {
  badge: Badge
  copy: 'primary' | 'duplicate'
  onActivate: (badge: Badge, target: HTMLElement, targetKey: string) => void
  onPressChange: (pressed: boolean) => void
}

function BadgePill({ badge, copy, onActivate, onPressChange }: BadgePillProps) {
  const targetKey = `${copy}-${badge.id}`
  const className = `${styles.badge} ${styles[badge.scheme]}`

  const startPress = (event: ReactPointerEvent<HTMLElement>) => {
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    onPressChange(true)
  }
  const endPress = (event: ReactPointerEvent<HTMLElement>) => {
    event.stopPropagation()
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    onPressChange(false)
  }
  const content = (
    <>
      <BadgeIcon kind={badge.kind} color={badge.iconColor} />
      {badge.text}
    </>
  )

  if (copy === 'duplicate') {
    return (
      <span
        className={className}
        aria-hidden="true"
        data-badge-copy="duplicate"
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerCancel={endPress}
        onClick={(event) => onActivate(badge, event.currentTarget, targetKey)}
      >
        {content}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onFocus={(event) => {
        event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'center' })
      }}
      onClick={(event) => {
        onActivate(badge, event.currentTarget, targetKey)
        if (event.detail > 0) event.currentTarget.blur()
      }}
    >
      {content}
    </button>
  )
}

export function ChiSono() {
  const [active, setActive] = useState<ActiveReaction | null>(null)
  const [pressed, setPressed] = useState(false)
  const nonceRef = useRef(0)

  useEffect(() => {
    if (!active) return

    const timer = window.setTimeout(() => setActive(null), 3000)
    return () => window.clearTimeout(timer)
  }, [active])

  const activateBadge = (badge: Badge, target: HTMLElement, targetKey: string) => {
    const card = target.closest<HTMLElement>(`.${styles.card}`)
    if (!card) return

    target.getAnimations().forEach((animation) => animation.cancel())
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.animate(
        [
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-7px) scale(1.07)', offset: 0.42 },
          { transform: 'translateY(2px) scale(0.98)', offset: 0.72 },
          { transform: 'translateY(0) scale(1)' },
        ],
        { duration: 520, easing: 'cubic-bezier(.34,1.56,.64,1)' },
      )
    }

    const cardRect = card.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const x = targetRect.left - cardRect.left + targetRect.width / 2
    const minBubbleX = Math.min(140, cardRect.width / 2)
    const bubbleX = Math.min(
      Math.max(x, minBubbleX),
      Math.max(minBubbleX, cardRect.width - minBubbleX),
    )

    nonceRef.current += 1
    setActive({
      badge,
      targetKey,
      nonce: nonceRef.current,
      x,
      bubbleX,
      y: targetRect.top - cardRect.top,
    })
  }

  return (
    <section id="chi-sono" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading eyebrow="Ciao! (o meglio: miao)" title="Chi sono" variant="rosa" />
        </Reveal>

        <Reveal className={styles.card}>
          <div className={styles.catOverhang}>
            <CatFace
              title="Gattino curioso"
              size={90}
              fur="#F2A65A"
              eyes="open"
              stripes
              stripeColor="#D97F2E"
              whiskers
              feet
            />
          </div>

          <p className={styles.text}>
            Ciao, sono Chiara! Sono una cat sitter di{' '}
            <span className={styles.mark}>Firenze</span> e mi prendo cura dei mici
            da <span className={styles.mark}>5 anni</span>. Quando i loro umani
            partono, arrivo io: pappa puntuale, lettiera impeccabile, sessioni di
            gioco serissime e coccole a volontà — sempre nei tempi e nei modi
            decisi dal gatto, ovviamente.
          </p>
          <p className={`${styles.text} ${styles.textSpaced}`}>
            Affidabile con gli umani, irresistibile per i felini. Referenze
            disponibili su richiesta (le loro, non le mie). Assicurata e con
            attestato di primo soccorso felino: il tuo micio è in ottime zampe.
          </p>

          <div
            className={`${styles.marquee} ${active || pressed ? styles.paused : ''}`}
          >
            <div className={styles.track}>
              <div className={styles.badgeGroup}>
                {BADGES.map((badge) => (
                  <BadgePill
                    key={badge.id}
                    badge={badge}
                    copy="primary"
                    onActivate={activateBadge}
                    onPressChange={setPressed}
                  />
                ))}
              </div>
              <div className={styles.badgeGroup} aria-hidden="true">
                {BADGES.map((badge) => (
                  <BadgePill
                    key={`${badge.id}-dup`}
                    badge={badge}
                    copy="duplicate"
                    onActivate={activateBadge}
                    onPressChange={setPressed}
                  />
                ))}
              </div>
            </div>
          </div>

          {active && (
            <div key={active.nonce} className={styles.reactionLayer}>
              <div
                className={styles.particleOrigin}
                style={{ left: active.x, top: active.y } as CSSProperties}
                aria-hidden="true"
              >
                {PARTICLES.map((particle, index) => (
                  <span
                    key={`${active.nonce}-${index}`}
                    className={styles.particle}
                    style={{
                      '--particle-x': `${particle.x}px`,
                      '--particle-y': `${particle.y}px`,
                      '--particle-rotation': `${particle.rotation}deg`,
                      '--particle-delay': `${particle.delay}ms`,
                    } as CSSProperties}
                  >
                    <BadgeIcon kind={active.badge.kind} color={active.badge.iconColor} />
                  </span>
                ))}
              </div>
              <div
                className={styles.bubble}
                style={{ left: active.bubbleX, top: active.y - 12 } as CSSProperties}
                role="status"
                aria-live="polite"
                data-reaction-for={active.targetKey}
              >
                {active.badge.reaction}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
