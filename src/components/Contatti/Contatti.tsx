import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { CatFace } from '../svg/CatFace'
import { usePurr } from '../../behaviors/usePurr'
import styles from './Contatti.module.css'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

// Unica fonte di verità per i gatti extra: ordinale (label/aria) + placeholder
// nella stessa riga, così non possono disallinearsi. Il cap ne deriva.
const GATTI_EXTRA = [
  { ordinale: 'secondo', placeholder: 'es. Briciola' },
  { ordinale: 'terzo', placeholder: 'es. Oscar' },
  { ordinale: 'quarto', placeholder: 'es. Misa' },
  { ordinale: 'quinto', placeholder: 'es. Kiki' },
] as const
const MAX_EXTRA_CATS = GATTI_EXTRA.length

function ContactForm() {
  const purr = usePurr()
  const [status, setStatus] = useState<FormStatus>('idle')

  // Gatti aggiuntivi: id monotòno via ref così le key React restano stabili
  // anche dopo una rimozione (niente indici come key su una lista mutabile).
  const nextCatId = useRef(0)
  const [extraCats, setExtraCats] = useState<number[]>([])

  const addCat = () => {
    if (extraCats.length >= MAX_EXTRA_CATS) return
    // Id generato nell'handler (non nell'updater) così setExtraCats resta puro:
    // sotto StrictMode l'updater può girare due volte, l'handler no.
    const id = nextCatId.current++
    setExtraCats((prev) => [...prev, id])
  }
  const removeCat = (id: number) =>
    setExtraCats((prev) => prev.filter((catId) => catId !== id))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Letta al submit (non a livello di modulo) così è testabile via vi.stubEnv.
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      // Access key mancante (env var non configurata): evita una POST inutile.
      // Diagnostica per l'operatore: distingue il misconfig di deploy da un errore utente.
      console.error(
        'VITE_WEB3FORMS_ACCESS_KEY non configurata: il form contatti non può inviare. Impostala in .env e nelle env di Netlify.',
      )
      setStatus('error')
      return
    }

    setStatus('sending')

    const formData = new FormData(event.currentTarget)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
        // Evita che una connessione appesa lasci il form bloccato su "Invio…".
        signal: AbortSignal.timeout(15000),
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
        <div className={styles.success} role="status" aria-live="polite">
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
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setStatus('idle')
              setExtraCats([])
            }}
          >
            Invia un altro messaggio
          </button>
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
        <input className={styles.input} type="text" name="gatto" required placeholder="es. Daisy" />
      </label>

      {extraCats.map((id, i) => (
        <div className={styles.extraCat} key={id}>
          <label className={styles.field}>
            Il nome del {GATTI_EXTRA[i].ordinale} gatto
            <input
              className={styles.input}
              type="text"
              name={`gatto${i + 2}`}
              required
              placeholder={GATTI_EXTRA[i].placeholder}
            />
          </label>
          <button
            type="button"
            className={styles.removeCatBtn}
            onClick={() => removeCat(id)}
            aria-label={`Rimuovi il ${GATTI_EXTRA[i].ordinale} gatto`}
          >
            ×
          </button>
        </div>
      ))}

      {extraCats.length < MAX_EXTRA_CATS && (
        <button type="button" className={styles.addCatBtn} onClick={addCat}>
          Ho anche un altro micetto
        </button>
      )}

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
        {sending ? 'Invio… 🐾' : 'Inviami il messaggio 🐾'}
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
