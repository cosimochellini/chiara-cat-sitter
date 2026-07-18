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
  kind: BadgeKind
  iconColor: string
  scheme: Scheme
}

const BADGES: Badge[] = [
  { id: 'grattini', text: 'Certificata in Grattini Avanzati', kind: 'paw', iconColor: '#D93A5F', scheme: 'rosa' },
  { id: 'miao', text: 'Fluent in Miao', kind: 'star', iconColor: '#9B79BC', scheme: 'viola' },
  { id: 'scatolette', text: 'Apertura scatolette < 3 secondi', kind: 'fish', iconColor: '#4E9A6B', scheme: 'verde' },
  { id: 'fusa', text: 'Dottoressa in Fusa-terapia', kind: 'heart', iconColor: '#E8506E', scheme: 'oro' },
  { id: 'pancia', text: 'Livello grattini: pancia sbloccata', kind: 'heart', iconColor: '#E8506E', scheme: 'rosa' },
  { id: 'timidi', text: 'Sussurratrice di mici timidi', kind: 'paw', iconColor: '#9B79BC', scheme: 'viola' },
  { id: 'pallina', text: 'Lanci di pallina olimpionici', kind: 'ball', iconColor: '#4E9A6B', scheme: 'verde' },
  { id: 'piumino', text: 'Esperta di agguati col piumino', kind: 'star', iconColor: '#E8B85E', scheme: 'oro' },
  { id: 'ronf', text: 'Laureata in Ronf-ologia', kind: 'paw', iconColor: '#D93A5F', scheme: 'rosa' },
]

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

function BadgePill({ badge, hidden }: { badge: Badge; hidden?: boolean }) {
  return (
    <span
      className={`${styles.badge} ${styles[badge.scheme]}`}
      aria-hidden={hidden ? 'true' : undefined}
    >
      <BadgeIcon kind={badge.kind} color={badge.iconColor} />
      {badge.text}
    </span>
  )
}

export function ChiSono() {
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

          <div className={styles.marquee}>
            <div className={styles.track}>
              {BADGES.map((badge) => (
                <BadgePill key={badge.id} badge={badge} />
              ))}
              {BADGES.map((badge) => (
                <BadgePill key={`${badge.id}-dup`} badge={badge} hidden />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
