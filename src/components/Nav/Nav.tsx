import { CatFace } from '../svg/CatFace'
import { NyanCat } from '../svg/NyanCat'
import { useMascotteEasterEgg } from '../../behaviors/useMascotteEasterEgg'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#chi-sono', label: 'Chi sono' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#zone', label: 'Zone' },
  { href: '#recensioni', label: 'Recensioni' },
]

export function Nav() {
  const { onMascotteClick, nyanLayout, hideNyan } = useMascotteEasterEgg()

  return (
    <nav aria-label="Navigazione" className={styles.nav}>
      <button
        type="button"
        data-mascotte="true"
        title="Miao?"
        className={styles.mascotte}
        onClick={onMascotteClick}
      >
        <CatFace
          title="Mascotte"
          size={36}
          fur="#FFF0F4"
          eyes="open"
          whiskers
          bow={{ color: '#E8506E', knot: '#C22F52' }}
        />
      </button>

      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className={styles.link}>
          {link.label}
        </a>
      ))}
      <a href="#contatti" className={`${styles.link} ${styles.cta}`}>
        Contatti
      </a>

      {nyanLayout && <NyanCat {...nyanLayout} onDone={hideNyan} />}
    </nav>
  )
}
