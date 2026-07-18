import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        © 2026 Chiara — Fatto con amore, fusa e croccantini.
      </p>
      <p className={styles.hint}>
        Psst… la mascotte nel menù in alto nasconde un segreto. Prova a cliccarla
        5 volte. 🐾
      </p>
    </footer>
  )
}
