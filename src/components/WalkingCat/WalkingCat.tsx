import { animations } from '../../config/animations'
import styles from './WalkingCat.module.css'

const LEG_DELAYS = ['0s', '-0.2s', '-0.1s', '-0.3s'] as const
const legAnim = (delay: string) =>
  `om-leg 0.4s ease-in-out ${delay} infinite alternate`

/** Gattino che cammina lungo il bordo inferiore della pagina. */
export function WalkingCat() {
  if (!animations.gattoCammina) return null

  return (
    <div aria-hidden="true" className={styles.walker}>
      <div className={styles.bob}>
        <svg viewBox="0 0 150 80" width="128" height="68" display="block">
          <g className={styles.tail}>
            <path d="M32 46 C16 48 6 38 10 24" fill="none" stroke="#5C4A44" strokeWidth="10.5" strokeLinecap="round" />
            <path d="M32 46 C16 48 6 38 10 24" fill="none" stroke="#F9D9E2" strokeWidth="6.5" strokeLinecap="round" />
          </g>
          <rect x="44" y="48" width="8" height="22" rx="4" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" className={styles.leg} style={{ animation: legAnim(LEG_DELAYS[0]) }} />
          <rect x="60" y="48" width="8" height="22" rx="4" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" className={styles.leg} style={{ animation: legAnim(LEG_DELAYS[1]) }} />
          <rect x="88" y="48" width="8" height="22" rx="4" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" className={styles.leg} style={{ animation: legAnim(LEG_DELAYS[2]) }} />
          <rect x="104" y="48" width="8" height="22" rx="4" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" className={styles.leg} style={{ animation: legAnim(LEG_DELAYS[3]) }} />
          <ellipse cx="76" cy="42" rx="42" ry="19" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" />
          <path d="M104 24 C100 18.5 100.5 8.5 105 6 C108.5 4 114 8 118.5 15 C113 16.5 108 19.5 104 24 Z" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M138 24 C142 18.5 141.5 8.5 137 6 C133.5 4 128 8 123.5 15 C129 16.5 134 19.5 138 24 Z" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M106.5 19.5 C104.5 16 104.5 10.5 107 9 C108.8 8 111.5 10.5 114 14 C111 15 108.5 17 106.5 19.5 Z" fill="#FFB7C5" />
          <path d="M135.5 19.5 C137.5 16 137.5 10.5 135 9 C133.2 8 130.5 10.5 128 14 C131 15 133.5 17 135.5 19.5 Z" fill="#FFB7C5" />
          <circle cx="121" cy="31" r="19" fill="#F9D9E2" stroke="#5C4A44" strokeWidth="2.4" />
          <g transform="rotate(-16 104 10)">
            <path d="M104 10 C99.5 4 91.5 5 92.7 11 C93.5 15 99 15.4 104 13 Z" fill="#D93A5F" stroke="#5C4A44" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M104 10 C108.5 4 116.5 5 115.3 11 C114.5 15 109 15.4 104 13 Z" fill="#D93A5F" stroke="#5C4A44" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="104" cy="11" r="3.2" fill="#A82945" stroke="#5C4A44" strokeWidth="1.8" />
          </g>
          <circle cx="114" cy="29" r="4" fill="#3E2A33" />
          <circle cx="115.5" cy="27.5" r="1.4" fill="#FFFFFF" />
          <circle cx="128" cy="29" r="4" fill="#3E2A33" />
          <circle cx="129.5" cy="27.5" r="1.4" fill="#FFFFFF" />
          <ellipse cx="107" cy="36" rx="3.8" ry="2.5" fill="#FF9FB7" opacity="0.8" />
          <ellipse cx="135" cy="36" rx="3.8" ry="2.5" fill="#FF9FB7" opacity="0.8" />
          <path d="M119.4 34.5 h3.2 q0.7 0 0.35 0.6 l-1.4 1.8 q-0.35 0.45 -0.7 0 l-1.4 -1.8 q-0.35 -0.6 0.35 -0.6 Z" fill="#D9738C" />
          <path d="M121 37.4 v1.4 M121 38.8 q-1.8 2.2 -4 0.5 M121 38.8 q1.8 2.2 4 0.5" stroke="#5C4A44" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
