import { animations } from '../../config/animations'
import styles from './WalkingCat.module.css'

const LEG_DELAYS = ['0s', '-0.2s', '-0.1s', '-0.3s'] as const
const legAnim = (delay: string) =>
  `om-leg 0.4s ease-in-out ${delay} infinite alternate`

/** Zampetta morbida: gamba arrotondata + polpastrello ovale rosa. */
function Leg({ x, delay }: { x: number; delay: string }) {
  return (
    <g className={styles.leg} style={{ animation: legAnim(delay) }}>
      <rect x={x} y="48" width="8" height="20" rx="4" fill="#FFFFFF" stroke="#5C4A44" strokeWidth="2.4" />
      <ellipse cx={x + 4} cy="68.5" rx="5.4" ry="3.6" fill="#FFC6D4" stroke="#5C4A44" strokeWidth="2.4" />
    </g>
  )
}

/** Gattino kawaii che cammina avanti e indietro lungo il bordo inferiore. */
export function WalkingCat() {
  if (!animations.gattoCammina) return null

  return (
    <div aria-hidden="true" className={styles.walker}>
      <div className={styles.bob}>
        <svg viewBox="0 -6 150 92" width="132" height="81" display="block">
          <defs>
            <radialGradient id="wc-body" cx="42%" cy="24%" r="82%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="62%" stopColor="#FBFAFC" />
              <stop offset="100%" stopColor="#EFECF3" />
            </radialGradient>
            <radialGradient id="wc-head" cx="40%" cy="26%" r="80%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="64%" stopColor="#FBFAFC" />
              <stop offset="100%" stopColor="#ECE9F1" />
            </radialGradient>
            <clipPath id="wc-bodyclip">
              <ellipse cx="76" cy="42" rx="42" ry="19" />
            </clipPath>
            <clipPath id="wc-headclip">
              <circle cx="121" cy="31" r="19" />
            </clipPath>
          </defs>

          {/* ombra a terra */}
          <ellipse className={styles.shadow} cx="80" cy="72" rx="52" ry="6" fill="#5C4A44" opacity="0.12" />

          {/* coda (bianca con punta arancione calico) */}
          <g className={styles.tail}>
            <path d="M32 46 C16 48 6 38 10 24" fill="none" stroke="#5C4A44" strokeWidth="10.5" strokeLinecap="round" />
            <path d="M32 46 C16 48 6 38 10 24" fill="none" stroke="#FFFFFF" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M16 30 C12 34 9 31 10 24" fill="none" stroke="#F6A93B" strokeWidth="6.5" strokeLinecap="round" />
          </g>

          {/* zampe (dietro il corpo) */}
          <Leg x={44} delay={LEG_DELAYS[0]} />
          <Leg x={60} delay={LEG_DELAYS[1]} />
          <Leg x={88} delay={LEG_DELAYS[2]} />
          <Leg x={104} delay={LEG_DELAYS[3]} />

          {/* corpo */}
          <ellipse cx="76" cy="42" rx="42" ry="19" fill="url(#wc-body)" stroke="#5C4A44" strokeWidth="2.4" />
          {/* macchie arancioni calico (sforano l'ellisse: il clip le taglia sul bordo) */}
          <g clipPath="url(#wc-bodyclip)">
            <path d="M30 46 C26 28 42 16 64 19 C80 21 90 27 90 37 C84 48 52 52 30 46 Z" fill="#F6A93B" />
            <path d="M28 40 C22 52 30 66 46 66 C58 66 62 54 56 45 C48 42 36 40 28 40 Z" fill="#F6A93B" />
          </g>
          <ellipse cx="64" cy="33" rx="20" ry="6" fill="#FFFFFF" opacity="0.5" />

          {/* orecchie (sinistra arancione, destra bianca con interno arancione) */}
          <path d="M104 24 C100 18.5 100.5 8.5 105 6 C108.5 4 114 8 118.5 15 C113 16.5 108 19.5 104 24 Z" fill="#F6A93B" stroke="#5C4A44" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M138 24 C142 18.5 141.5 8.5 137 6 C133.5 4 128 8 123.5 15 C129 16.5 134 19.5 138 24 Z" fill="url(#wc-head)" stroke="#5C4A44" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M106.5 19.5 C104.5 16 104.5 10.5 107 9 C108.8 8 111.5 10.5 114 14 C111 15 108.5 17 106.5 19.5 Z" fill="#E8942A" />
          <path d="M135.5 19.5 C137.5 16 137.5 10.5 135 9 C133.2 8 130.5 10.5 128 14 C131 15 133.5 17 135.5 19.5 Z" fill="#F6A93B" />

          {/* testa */}
          <circle cx="121" cy="31" r="19" fill="url(#wc-head)" stroke="#5C4A44" strokeWidth="2.4" />
          {/* macchia arancione su fronte/orecchio (sfora la testa: clip sul bordo) */}
          <g clipPath="url(#wc-headclip)">
            <path d="M100 32 C97 16 108 8 123 11 C131 12 134 22 129 31 C118 37 108 38 100 32 Z" fill="#F6A93B" />
          </g>
          <ellipse cx="126" cy="22" rx="8" ry="4.5" fill="#FFFFFF" opacity="0.55" />

          {/* fiocco rosa (come il riferimento) */}
          <g transform="rotate(-16 104 10)">
            <path d="M104 10 C99.5 4 91.5 5 92.7 11 C93.5 15 99 15.4 104 13 Z" fill="#FF8FB6" stroke="#5C4A44" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M104 10 C108.5 4 116.5 5 115.3 11 C114.5 15 109 15.4 104 13 Z" fill="#FF8FB6" stroke="#5C4A44" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="104" cy="11" r="3.2" fill="#E0619A" stroke="#5C4A44" strokeWidth="1.8" />
          </g>

          {/* baffi */}
          <path d="M96 30 q-6 -0.6 -9.5 -0.2 M96 35 q-6 0.6 -9.5 1.4" fill="none" stroke="#5C4A44" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />

          {/* occhi normali grandi e lucidi (con blink) */}
          <g className={styles.eyes}>
            <circle cx="114" cy="29" r="5.4" fill="#2E2A44" />
            <circle cx="116.2" cy="26.8" r="1.9" fill="#FFFFFF" />
            <circle cx="112.2" cy="30.8" r="1" fill="#FFFFFF" opacity="0.85" />
            <circle cx="128" cy="29" r="5.4" fill="#2E2A44" />
            <circle cx="130.2" cy="26.8" r="1.9" fill="#FFFFFF" />
            <circle cx="126.2" cy="30.8" r="1" fill="#FFFFFF" opacity="0.85" />
          </g>

          {/* occhi a cuore (hover) */}
          <g className={styles.heartEyes}>
            <path d="M114 32.4 l-3.6 -3.7 q-2.1 -2.2 0.1 -4 q1.9 -1.5 3.5 0.7 q1.6 -2.2 3.5 -0.7 q2.2 1.8 0.1 4 Z" fill="#D93A5F" />
            <path d="M128 32.4 l-3.6 -3.7 q-2.1 -2.2 0.1 -4 q1.9 -1.5 3.5 0.7 q1.6 -2.2 3.5 -0.7 q2.2 1.8 0.1 4 Z" fill="#D93A5F" />
          </g>

          {/* guance */}
          <ellipse cx="107" cy="37" rx="4.4" ry="2.9" fill="#FF9FB7" opacity="0.75" />
          <ellipse cx="135" cy="37" rx="4.4" ry="2.9" fill="#FF9FB7" opacity="0.75" />

          {/* naso + bocca */}
          <path d="M119.4 34.5 h3.2 q0.7 0 0.35 0.6 l-1.4 1.8 q-0.35 0.45 -0.7 0 l-1.4 -1.8 q-0.35 -0.6 0.35 -0.6 Z" fill="#D9738C" />
          <path d="M121 37.4 v1.4 M121 38.8 q-1.8 2.2 -4 0.5 M121 38.8 q1.8 2.2 4 0.5" stroke="#5C4A44" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
