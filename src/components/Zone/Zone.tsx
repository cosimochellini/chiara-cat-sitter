import type { CSSProperties } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { PawIcon } from '../svg/PawIcon'
import styles from './Zone.module.css'

const ZONES = [
  { name: 'Soffiano', variant: styles.zPink },
  { name: 'Isolotto', variant: styles.zPurple },
  { name: 'Legnaia', variant: styles.zGold },
  { name: 'Bagnese', variant: styles.zPink },
  { name: 'Casellina', variant: styles.zPurple },
  { name: 'Scandicci', variant: styles.zGold },
  { name: 'San Frediano', variant: styles.zPink },
  { name: 'Porta Romana', variant: styles.zPurple },
]

const PAW_ROW: { id: string; style: CSSProperties }[] = [
  { id: 'p1', style: { transform: 'rotate(14deg)', opacity: 0.85 } },
  { id: 'p2', style: { transform: 'rotate(-12deg) translateY(-7px)', opacity: 0.7 } },
  { id: 'p3', style: { transform: 'rotate(16deg)', opacity: 0.55 } },
  { id: 'p4', style: { transform: 'rotate(-14deg) translateY(-7px)', opacity: 0.4 } },
  { id: 'p5', style: { transform: 'rotate(12deg)', opacity: 0.25 } },
]

export function Zone() {
  return (
    <section id="zone" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            eyebrow="Coccole a domicilio"
            title="Dove opero"
            variant="biancoRosa"
            titleRosa
          />
          <p className={styles.subtitle}>
            Zampetto per queste zone di <span className={styles.mark}>Firenze</span>{' '}
            e dintorni:
          </p>
        </Reveal>

        <Reveal className={styles.pills}>
          {ZONES.map((zone) => (
            <span key={zone.name} className={`${styles.pill} ${zone.variant}`}>
              <PawIcon size={17} color="#5C4A44" />
              {zone.name}
            </span>
          ))}
        </Reveal>

        <Reveal as="p" className={styles.note}>
          La tua zona non c&apos;è? <a href="#contatti">Scrivimi</a>: per un micio
          simpatico qualche km in più si fa volentieri.
        </Reveal>

        <Reveal className={styles.pawRow}>
          {PAW_ROW.map((paw) => (
            <PawIcon key={paw.id} size={20} color="#5C4A44" style={paw.style} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
