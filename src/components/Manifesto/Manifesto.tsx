import { Reveal } from '../Reveal'
import styles from './Manifesto.module.css'

export function Manifesto() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="blockquote" className={styles.quote}>
          &ldquo;Ogni gatto ha le sue regole. Io le imparo tutte.&rdquo;{' '}
          <span className={styles.paw}>🐾</span>
        </Reveal>
      </div>
    </section>
  )
}
