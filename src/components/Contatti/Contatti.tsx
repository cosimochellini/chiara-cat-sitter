import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { CatFace } from '../svg/CatFace'
import { usePurr } from '../../behaviors/usePurr'
import styles from './Contatti.module.css'

// NOTA: recapiti di esempio (Firenze). Sostituire con i dati reali di Chiara.
const CONTATTI = {
  zona: 'Firenze — Isolotto, Legnaia, Soffiano, Scandicci e dintorni',
  telefono: '+39 055 123 4567',
  telefonoHref: 'tel:+390551234567',
  email: 'ciao@chiaracatsitter.it',
  whatsapp: 'https://wa.me/390551234567',
}

function InfoCard({ onPurr }: { onPurr: ReturnType<typeof usePurr> }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.row}>
        <span className={`${styles.iconCircle} ${styles.rosaBg}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M12 2 c-4 0 -7 3 -7 7 c0 5 7 13 7 13 s7 -8 7 -13 c0 -4 -3 -7 -7 -7 Z" fill="#D93A5F" />
            <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
          </svg>
        </span>
        <div>
          <strong className={styles.label}>Zona di servizio</strong>
          <br />
          <span className={styles.value}>{CONTATTI.zona}</span>
        </div>
      </div>

      <div className={styles.row}>
        <span className={`${styles.iconCircle} ${styles.violaBg}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 3 h5 l1.5 5 -2.5 2 c1 2.5 3 4.5 5.5 5.5 l2 -2.5 5 1.5 v5 c0 1 -1 2 -2 1.8 C11 20.5 3.5 13 3.2 5 C3 4 4 3 5 3 Z" fill="#9B79BC" transform="scale(0.92) translate(1 1)" />
          </svg>
        </span>
        <div>
          <strong className={styles.label}>Telefono</strong>
          <br />
          <a href={CONTATTI.telefonoHref} className={styles.value}>
            {CONTATTI.telefono}
          </a>
        </div>
      </div>

      <div className={styles.row}>
        <span className={`${styles.iconCircle} ${styles.oroBg}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3" fill="#E8B85E" />
            <path d="M4 7 l8 6 8 -6" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <strong className={styles.label}>Email</strong>
          <br />
          <a href={`mailto:${CONTATTI.email}`} className={styles.value}>
            {CONTATTI.email}
          </a>
        </div>
      </div>

      <a
        href={CONTATTI.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.waBtn}
        onMouseEnter={onPurr}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
          <path d="M12 2 a10 10 0 0 0 -8.6 15 L2 22 l5.2 -1.4 A10 10 0 1 0 12 2 Z" fill="#FFFFFF" />
          <path d="M8.5 7.5 c-0.4 -0.1 -0.9 0 -1.1 0.5 c-0.5 1 -0.4 2.4 0.5 3.9 c0.9 1.5 2.4 3 4.3 3.8 c1.4 0.6 2.6 0.5 3.4 0 c0.4 -0.3 0.5 -0.8 0.3 -1.2 l-0.4 -0.9 c-0.15 -0.3 -0.5 -0.45 -0.8 -0.35 l-1.2 0.4 c-0.9 -0.4 -2.2 -1.6 -2.7 -2.5 l0.6 -1.1 c0.15 -0.3 0.05 -0.65 -0.2 -0.85 L9.5 8 c-0.3 -0.25 -0.7 -0.4 -1 -0.5 Z" fill="#57B57C" />
        </svg>
        Scrivimi su WhatsApp
      </a>
    </div>
  )
}

function ContactForm() {
  const purr = usePurr()
  const [inviato, setInviato] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setInviato(true)
  }

  if (inviato) {
    return (
      <div className={styles.form}>
        <div className={styles.success}>
          <CatFace
            title="Gatto felice"
            size={92}
            fur="#FFF0F4"
            eyes="closed"
            feet
            bow={{ color: '#E8506E', knot: '#C22F52' }}
          />
          <strong className={styles.successTitle}>Miao ricevuto!</strong>
          <p className={styles.successText}>
            Ti rispondo prestissimo — il tempo di finire questi grattini. (Il form
            è dimostrativo: collega email o WhatsApp per riceverli davvero.)
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Il tuo nome
        <input className={styles.input} type="text" name="nome" required placeholder="es. Martina" />
      </label>
      <label className={styles.field}>
        Il nome del gatto (il vero cliente)
        <input className={styles.input} type="text" name="gatto" required placeholder="es. Polpetta" />
      </label>
      <label className={styles.field}>
        Messaggio
        <textarea
          className={styles.textarea}
          name="messaggio"
          required
          rows={4}
          placeholder="Date, esigenze speciali, livello di coccole richiesto…"
        />
      </label>
      <button type="submit" className={styles.submitBtn} onMouseEnter={purr}>
        Manda un miao 🐾
      </button>
    </form>
  )
}

export function Contatti() {
  const purr = usePurr()

  return (
    <section id="contatti" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.headWrap}>
          <SectionHeading
            eyebrow="Parliamone davanti a una scatoletta"
            title="Contatti"
            variant="biancoVerde"
          />
        </Reveal>

        <div className={styles.grid}>
          <Reveal>
            <InfoCard onPurr={purr} />
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal as="p" className={styles.tagline}>
          Il tuo gatto merita il meglio. (Lo sa già, ovviamente.)
        </Reveal>
      </div>
    </section>
  )
}
