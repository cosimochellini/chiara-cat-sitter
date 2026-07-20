import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { CatFace } from '../svg/CatFace'
import { usePurr } from '../../behaviors/usePurr'
import styles from './Contatti.module.css'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

function ContactForm() {
  const purr = usePurr()
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    const formData = new FormData(event.currentTarget)
    formData.append('access_key', ACCESS_KEY)

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const data = await response.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
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
            Ti rispondo prestissimo — il tempo di finire questi grattini.
          </p>
        </div>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Il tuo nome
        <input className={styles.input} type="text" name="nome" required placeholder="es. Martina" />
      </label>
      <label className={styles.field}>
        La tua email
        <input
          className={styles.input}
          type="email"
          name="email"
          required
          placeholder="es. martina@esempio.it"
        />
      </label>
      <label className={styles.field}>
        Il tuo telefono
        <input
          className={styles.input}
          type="tel"
          name="telefono"
          required
          placeholder="es. 333 123 4567"
        />
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

      {/* Campi tecnici Web3Forms: honeypot anti-spam + metadati email */}
      <input
        type="checkbox"
        name="botcheck"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="subject" value="Nuovo messaggio dal sito Chiara Cat Sitter" />
      <input type="hidden" name="from_name" value="Sito Chiara Cat Sitter" />

      <button
        type="submit"
        className={styles.submitBtn}
        onMouseEnter={purr}
        disabled={sending}
      >
        {sending ? 'Invio… 🐾' : 'Manda un miao 🐾'}
      </button>

      {status === 'error' && (
        <p role="alert" className={styles.errorText}>
          Ops, il miao non è partito. Controlla i campi e riprova tra un istante.
        </p>
      )}
    </form>
  )
}

export function Contatti() {
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
