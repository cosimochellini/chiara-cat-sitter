import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

type EyebrowVariant = 'rosa' | 'viola' | 'biancoRosa' | 'biancoVerde'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  variant?: EyebrowVariant
  /** Titolo in rosa con ombra (usato dalla sezione "Dove opero"). */
  titleRosa?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  variant = 'rosa',
  titleRosa = false,
}: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      <div className={`${styles.eyebrow} ${styles[variant]}`}>{eyebrow}</div>
      <h2 className={`${styles.title} ${titleRosa ? styles.titleRosa : ''}`}>
        {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
