import type { CSSProperties } from 'react'
import { CatFace } from '../svg/CatFace'
import { usePurr } from '../../behaviors/usePurr'
import { animations } from '../../config/animations'
import styles from './Hero.module.css'

type FloatItem = {
  id: string
  glyph: '♥' | '✦'
  style: CSSProperties
}

const FLOATERS: FloatItem[] = [
  { id: 'f1', glyph: '♥', style: { left: '6%', top: '18%', color: '#E8506E', opacity: 0.3, fontSize: 30, animation: 'om-float 6s ease-in-out infinite' } },
  { id: 'f2', glyph: '✦', style: { left: '14%', top: '62%', color: '#F7C86B', opacity: 0.55, fontSize: 22, animation: 'om-float 7.5s ease-in-out 0.8s infinite' } },
  { id: 'f3', glyph: '♥', style: { left: '88%', top: '24%', color: '#E8506E', opacity: 0.28, fontSize: 24, animation: 'om-float 8s ease-in-out 1.4s infinite' } },
  { id: 'f4', glyph: '✦', style: { left: '80%', top: '66%', color: '#C9A6E8', opacity: 0.5, fontSize: 26, animation: 'om-float 6.8s ease-in-out 0.4s infinite' } },
  { id: 'f5', glyph: '✦', style: { left: '30%', top: '10%', color: '#F7C86B', opacity: 0.5, fontSize: 16, animation: 'om-float 5.5s ease-in-out 1s infinite' } },
  { id: 'f6', glyph: '♥', style: { left: '68%', top: '8%', color: '#E8506E', opacity: 0.25, fontSize: 18, animation: 'om-float 7s ease-in-out 2s infinite' } },
]

const CLOUD_LEFT: CSSProperties = { position: 'absolute', left: '4%', top: '40%', width: 90, height: 32, background: '#FFFFFF', borderRadius: 999, opacity: 0.65, animation: 'om-float 9s ease-in-out infinite' }
const CLOUD_RIGHT: CSSProperties = { position: 'absolute', right: '5%', top: '46%', width: 70, height: 26, background: '#FFFFFF', borderRadius: 999, opacity: 0.55, animation: 'om-float 10s ease-in-out 1.2s infinite' }

export function Hero() {
  const purr = usePurr()

  return (
    <header id="hero" className={styles.hero}>
      {animations.fluttuantiHero && (
        <div aria-hidden="true" className={styles.decor}>
          {FLOATERS.map((item) => (
            <span key={item.id} style={{ position: 'absolute', ...item.style }}>
              {item.glyph}
            </span>
          ))}
          <div style={CLOUD_LEFT} />
          <div style={CLOUD_RIGHT} />
        </div>
      )}

      <div className={styles.inner}>
        <div className={styles.trio}>
          <CatFace
            className={styles.catLeft}
            title="Gatto adorante"
            size={104}
            fur="#CFC5DF"
            eyes="heart"
            feet
            bow={{ color: '#7ACB96', knot: '#4E9A6B', side: 'right' }}
          />
          <img
            className={styles.avatar}
            src="/chiara.webp"
            alt="Chiara, cat sitter, sorridente in giardino"
            width={200}
            height={200}
            decoding="async"
            fetchPriority="high"
          />
          <CatFace
            className={styles.catRight}
            title="Gatto adorante"
            size={96}
            fur="#F2D8B0"
            eyes="heart"
            feet
            bow={{ color: '#C9A6E8', knot: '#9B79BC', side: 'left' }}
          />
        </div>

        <h1 className={styles.title}>
          Chiara
          <br />
          <span className={styles.titleAccent}>Cat Sitter Eccezionale</span>
        </h1>
        <p className={styles.tagline}>
          Coccole professionali, croccantini puntuali, fusa garantite.
        </p>
        <a href="#contatti" className={styles.cta} onMouseEnter={purr}>
          Prenota le coccole 🐾
        </a>
      </div>
    </header>
  )
}
