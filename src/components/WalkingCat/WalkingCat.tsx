import type { CSSProperties, ReactElement } from 'react'
import { animations } from '../../config/animations'
import styles from './WalkingCat.module.css'
import { useCatBehavior } from './useCatBehavior'
import type { ButterflyState, CatState, Heart } from './useCatBehavior'

/* Palette micio: crema + rosa del sito, contorno marroncino (--testo). */
const FUR = '#FFFBF5'
const FUR_SHADE = '#F9EDE2'
const STROKE = '#5C4A44'
const PINK_PAD = '#FFC6D4'
const PINK_INNER = '#FFD9E3'
const ROSE = '#E8506E'
const BLUSH = '#FF9FB7'
const EYE = '#4A3B3B'
const NOSE = '#D9738C'

type Pose = 'walking' | 'sitting' | 'loaf' | 'stretch' | 'pounce'
type Expression = 'open' | 'happy' | 'heart' | 'sleepy'

const POSE_BY_STATE: Record<CatState, Pose> = {
  walk: 'walking',
  trot: 'walking',
  chase: 'walking',
  sit: 'sitting',
  groom: 'sitting',
  scratch: 'sitting',
  celebrate: 'sitting',
  stretch: 'stretch',
  sleep: 'loaf',
  pounce: 'pounce',
}

const EXPR_BY_STATE: Record<CatState, Expression> = {
  walk: 'open',
  trot: 'open',
  chase: 'open',
  sit: 'open',
  groom: 'happy',
  scratch: 'happy',
  celebrate: 'heart',
  stretch: 'happy',
  sleep: 'sleepy',
  pounce: 'open',
}

/** Posizione della testa condivisa per ogni posa (centro testa nel viewBox). */
const HEAD_POS: Record<Pose, { x: number; y: number; rot: number }> = {
  walking: { x: 108, y: 36, rot: 0 },
  sitting: { x: 88, y: 28, rot: 0 },
  loaf: { x: 92, y: 50, rot: 4 },
  stretch: { x: 120, y: 58, rot: 10 },
  pounce: { x: 106, y: 52, rot: -6 },
}

const LEG_DELAYS = ['0s', '-0.2s', '-0.1s', '-0.3s'] as const
const LEG_X = [38, 54, 84, 100] as const

/** Testa kawaii condivisa fra le pose: orecchie, fiocco, espressioni. */
function Head({ expression }: { expression: Expression }) {
  return (
    <g>
      {/* orecchie (dietro la testa) */}
      <path
        d="M-21 -6 C-25 -19 -20 -30 -12 -31 C-6 -32 -2 -26 -2 -18 C-9 -16 -16 -12 -21 -6 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M21 -6 C25 -19 20 -30 12 -31 C6 -32 2 -26 2 -18 C9 -16 16 -12 21 -6 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M-17.5 -11 C-19.5 -19 -16.5 -25.5 -12.5 -26.5 C-9.5 -27 -7 -23.5 -7 -18.5 C-11 -17 -14.5 -14.5 -17.5 -11 Z" fill={PINK_INNER} />
      <path d="M17.5 -11 C19.5 -19 16.5 -25.5 12.5 -26.5 C9.5 -27 7 -23.5 7 -18.5 C11 -17 14.5 -14.5 17.5 -11 Z" fill={PINK_INNER} />

      {/* testa */}
      <circle r="23" fill={FUR} stroke={STROKE} strokeWidth="2.6" />
      <ellipse cx="-5" cy="-11" rx="11" ry="5.5" fill="#FFFFFF" opacity="0.55" />

      {/* fiocco rosa sull'orecchio */}
      <g transform="translate(15 -25) rotate(14)">
        <path d="M0 0 C-4.5 -5 -11.5 -3.6 -10 1.6 C-9 5 -4.4 5 0 2.6 Z" fill={ROSE} stroke={STROKE} strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M0 0 C4.5 -5 11.5 -3.6 10 1.6 C9 5 4.4 5 0 2.6 Z" fill={ROSE} stroke={STROKE} strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="0" cy="1" r="2.6" fill="#C22F52" stroke={STROKE} strokeWidth="1.6" />
      </g>

      {/* guanciotte */}
      <ellipse cx="-13.5" cy="7.5" rx="4.6" ry="3" fill={BLUSH} opacity="0.8" />
      <ellipse cx="13.5" cy="7.5" rx="4.6" ry="3" fill={BLUSH} opacity="0.8" />

      {/* baffi */}
      <path
        d="M-19 2 q-6 -1 -9.5 -0.6 M-19 6.5 q-6 1 -9.5 1.8 M19 2 q6 -1 9.5 -0.6 M19 6.5 q6 1 9.5 1.8"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* occhi */}
      <Eyes expression={expression} />

      {/* naso + bocca */}
      <path d="M-2.4 4.6 h4.8 q1 0 0.5 0.9 l-2 2.6 q-0.5 0.7 -1 0 l-2 -2.6 q-0.5 -0.9 0.5 -0.9 Z" fill={NOSE} />
      <path d="M0 8.4 v1.6 M0 10 q-2.4 2.6 -5 0.6 M0 10 q2.4 2.6 5 0.6" stroke={STROKE} strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </g>
  )
}

const HEART_EYE_PATH =
  'M0 -1.6 C-2.1 -5.1 -7.2 -4 -7.2 0 C-7.2 2.9 -3.7 5.4 0 8 C3.7 5.4 7.2 2.9 7.2 0 C7.2 -4 2.1 -5.1 0 -1.6 Z'

function Eyes({ expression }: { expression: Expression }) {
  if (expression === 'happy') {
    return (
      <g>
        <path d="M-14 -1 Q-9 -8 -4 -1" fill="none" stroke={EYE} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M4 -1 Q9 -8 14 -1" fill="none" stroke={EYE} strokeWidth="2.8" strokeLinecap="round" />
      </g>
    )
  }
  if (expression === 'sleepy') {
    return (
      <g>
        <path d="M-14 -1 Q-9 3.6 -4 -1" fill="none" stroke={EYE} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M4 -1 Q9 3.6 14 -1" fill="none" stroke={EYE} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    )
  }
  if (expression === 'heart') {
    return (
      <g className={styles.heartEyes}>
        <path transform="translate(-9 -2)" d={HEART_EYE_PATH} fill={ROSE} stroke="#C22F52" strokeWidth="0.8" />
        <path transform="translate(9 -2)" d={HEART_EYE_PATH} fill={ROSE} stroke="#C22F52" strokeWidth="0.8" />
      </g>
    )
  }
  return (
    <g className={styles.look}>
      <g className={styles.pupils}>
        <circle cx="-9" cy="-1.5" r="5.8" fill={EYE} />
        <circle cx="-6.8" cy="-3.7" r="2" fill="#FFFFFF" />
        <circle cx="-10.8" cy="0.4" r="1" fill="#FFFFFF" opacity="0.85" />
        <circle cx="9" cy="-1.5" r="5.8" fill={EYE} />
        <circle cx="11.2" cy="-3.7" r="2" fill="#FFFFFF" />
        <circle cx="7.2" cy="0.4" r="1" fill="#FFFFFF" opacity="0.85" />
      </g>
    </g>
  )
}

function WalkingLeg({ x, delay }: { x: number; delay: string }) {
  return (
    <g className={styles.leg} style={{ animationDelay: delay }}>
      <rect x={x} y="62" width="10" height="26" rx="5" fill={FUR} stroke={STROKE} strokeWidth="2.6" />
      <ellipse cx={x + 5} cy="87" rx="5.6" ry="3.6" fill={PINK_PAD} stroke={STROKE} strokeWidth="2.4" />
    </g>
  )
}

function WalkingPose() {
  return (
    <g>
      <g className={styles.tailWag}>
        <path d="M28 56 C12 54 4 42 10 28" fill="none" stroke={STROKE} strokeWidth="11" strokeLinecap="round" />
        <path d="M28 56 C12 54 4 42 10 28" fill="none" stroke={FUR} strokeWidth="6.8" strokeLinecap="round" />
        <path d="M13 38 C10 34 9 31 10 28" fill="none" stroke={PINK_INNER} strokeWidth="6.8" strokeLinecap="round" />
      </g>
      {LEG_X.map((x, i) => (
        <WalkingLeg key={x} x={x} delay={LEG_DELAYS[i]} />
      ))}
      <path
        d="M26 64 C24 46 44 33 74 33 C100 33 117 43 120 59 C122 70 113 77 99 77 L44 77 C33 77 27 73 26 64 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M48 71 C48 63 60 59 74 59 C88 59 98 64 99 71 Z" fill={FUR_SHADE} opacity="0.8" />
    </g>
  )
}

function SittingPose({ state }: { state: CatState }) {
  return (
    <g>
      {/* coda arricciata davanti */}
      <g className={styles.tailCurl}>
        <path d="M50 86 C60 93 80 94 94 89" fill="none" stroke={STROKE} strokeWidth="10" strokeLinecap="round" />
        <path d="M50 86 C60 93 80 94 94 89" fill="none" stroke={FUR} strokeWidth="6" strokeLinecap="round" />
        <path d="M88 91 C91 90.6 93 90 94 89" fill="none" stroke={PINK_INNER} strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* corpo a pera */}
      <path
        d="M62 90 C50 90 43 78 46 61 C49 45 63 35 80 35 C97 35 108 45 110 61 C112 77 105 90 90 90 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <ellipse cx="72" cy="72" rx="14" ry="12" fill={FUR_SHADE} opacity="0.7" />
      {/* zampe davanti */}
      <rect x="84" y="60" width="10" height="30" rx="5" fill={FUR} stroke={STROKE} strokeWidth="2.6" />
      <rect x="97" y="60" width="10" height="30" rx="5" fill={FUR} stroke={STROKE} strokeWidth="2.6" />
      <ellipse cx="89" cy="89" rx="5.6" ry="3.4" fill={PINK_PAD} stroke={STROKE} strokeWidth="2.2" />
      <ellipse cx="102" cy="89" rx="5.6" ry="3.4" fill={PINK_PAD} stroke={STROKE} strokeWidth="2.2" />
      {/* zampetta che si lecca (groom) */}
      {state === 'groom' && (
        <g className={styles.groomPaw}>
          <rect x="92" y="38" width="9" height="22" rx="4.5" fill={FUR} stroke={STROKE} strokeWidth="2.4" transform="rotate(28 96 60)" />
          <ellipse cx="99" cy="40" rx="5" ry="3.4" fill={PINK_PAD} stroke={STROKE} strokeWidth="2.2" transform="rotate(28 96 60)" />
        </g>
      )}
      {/* zampa posteriore che si gratta l'orecchio (scratch) */}
      {state === 'scratch' && (
        <g className={styles.scratchLeg}>
          <rect x="58" y="30" width="9" height="30" rx="4.5" fill={FUR} stroke={STROKE} strokeWidth="2.4" transform="rotate(-38 62 60)" />
          <ellipse cx="62" cy="30" rx="5" ry="3.4" fill={PINK_PAD} stroke={STROKE} strokeWidth="2.2" transform="rotate(-38 62 60)" />
        </g>
      )}
    </g>
  )
}

function LoafPose() {
  return (
    <g>
      {/* pagnotta */}
      <path
        d="M32 90 C26 76 36 62 60 57 C86 52 110 58 118 70 C124 80 118 90 104 90 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* coda avvolta sul davanti */}
      <path d="M108 86 C118 83 121 74 114 67" fill="none" stroke={STROKE} strokeWidth="9" strokeLinecap="round" />
      <path d="M108 86 C118 83 121 74 114 67" fill="none" stroke={FUR} strokeWidth="5.4" strokeLinecap="round" />
      {/* zampine raccolte */}
      <path d="M74 90 q5 -6 10 0 M88 90 q5 -6 10 0" fill={FUR} stroke={STROKE} strokeWidth="2.2" strokeLinecap="round" />
    </g>
  )
}

function StretchPose() {
  return (
    <g>
      {/* coda in su */}
      <g className={styles.tailUp}>
        <path d="M46 46 C40 32 46 20 58 20" fill="none" stroke={STROKE} strokeWidth="10" strokeLinecap="round" />
        <path d="M46 46 C40 32 46 20 58 20" fill="none" stroke={FUR} strokeWidth="6" strokeLinecap="round" />
        <path d="M52 21 C54 20 56 20 58 20" fill="none" stroke={PINK_INNER} strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* sederino in alto + schiena in discesa */}
      <path
        d="M36 88 C30 74 36 56 52 50 C66 45 80 52 92 62 C102 70 110 76 118 78 L118 88 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* zampa posteriore */}
      <rect x="40" y="66" width="10" height="22" rx="5" fill={FUR} stroke={STROKE} strokeWidth="2.6" />
      {/* zampe davanti distese in avanti */}
      <rect x="96" y="80" width="34" height="9" rx="4.5" fill={FUR} stroke={STROKE} strokeWidth="2.4" />
      <ellipse cx="130" cy="84.5" rx="5.4" ry="3.4" fill={PINK_PAD} stroke={STROKE} strokeWidth="2.2" />
    </g>
  )
}

function PouncePose() {
  return (
    <g>
      {/* coda tesa dietro */}
      <path d="M34 74 C22 70 16 60 20 50" fill="none" stroke={STROKE} strokeWidth="10" strokeLinecap="round" />
      <path d="M34 74 C22 70 16 60 20 50" fill="none" stroke={FUR} strokeWidth="6" strokeLinecap="round" />
      {/* corpo accucciato pronto al balzo */}
      <path
        d="M34 88 C28 76 40 64 68 62 C94 60 112 66 116 76 C119 84 112 88 102 88 Z"
        fill={FUR}
        stroke={STROKE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* zampette raccolte */}
      <path d="M62 88 q5 -6 10 0 M88 88 q5 -6 10 0" fill={FUR} stroke={STROKE} strokeWidth="2.2" strokeLinecap="round" />
    </g>
  )
}

const POSE_RENDER: Record<Pose, (state: CatState) => ReactElement> = {
  walking: () => <WalkingPose />,
  sitting: (state) => <SittingPose state={state} />,
  loaf: () => <LoafPose />,
  stretch: () => <StretchPose />,
  pounce: () => <PouncePose />,
}

function Butterfly({ side, away }: ButterflyState) {
  return (
    <div
      className={`${styles.butterfly} ${away ? styles.butterflyAway : ''}`}
      style={{ left: side === 1 ? '118px' : '-38px' }}
    >
      <svg viewBox="0 0 40 34" width="34" height="29">
        <g className={styles.wingL}>
          <ellipse cx="12" cy="12" rx="9" ry="11" fill="#EFA3C8" stroke="#B8578F" strokeWidth="1.6" transform="rotate(-18 12 12)" />
          <ellipse cx="13" cy="24" rx="6" ry="7" fill="#C9A7E8" stroke="#9B79BC" strokeWidth="1.6" transform="rotate(14 13 24)" />
        </g>
        <g className={styles.wingR}>
          <ellipse cx="28" cy="12" rx="9" ry="11" fill="#EFA3C8" stroke="#B8578F" strokeWidth="1.6" transform="rotate(18 28 12)" />
          <ellipse cx="27" cy="24" rx="6" ry="7" fill="#C9A7E8" stroke="#9B79BC" strokeWidth="1.6" transform="rotate(-14 27 24)" />
        </g>
        <ellipse cx="20" cy="17" rx="3" ry="9" fill="#5C4A44" />
        <path d="M18 8 Q15 3 12 2 M22 8 Q25 3 28 2" fill="none" stroke="#5C4A44" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function HeartParticle({ heart }: { heart: Heart }) {
  const style = {
    '--hx': `${heart.dx}px`,
    '--hy': `${heart.dy}px`,
    '--hr': `${heart.rot}deg`,
    '--hs': String(heart.scale),
    '--hd': `${heart.delay}ms`,
  } as CSSProperties
  return (
    <span className={styles.heart} style={style}>
      ♥
    </span>
  )
}

function KawaiiCat() {
  const { walkerRef, catRef, state, bubble, hearts, butterfly, reduced, onCatClick } =
    useCatBehavior()

  const pose = POSE_BY_STATE[state]
  const expression = EXPR_BY_STATE[state]
  const head = HEAD_POS[pose]

  return (
    <div ref={walkerRef} aria-hidden="true" className={styles.walker}>
      <div className={styles.stage}>
        {bubble && (
          <div className={`${styles.bubble} ${state === 'sleep' ? styles.bubbleZzz : ''}`}>
            {bubble}
          </div>
        )}
        {hearts.map((heart) => (
          <HeartParticle key={heart.id} heart={heart} />
        ))}
        {butterfly && <Butterfly side={butterfly.side} away={butterfly.away} />}
        <button
          ref={catRef}
          type="button"
          tabIndex={-1}
          data-mascotte="true"
          data-state={state}
          className={`${styles.cat} ${reduced ? styles.static : ''}`}
          onClick={reduced ? undefined : onCatClick}
        >
          <div className={styles.bobber}>
            <svg className={styles.svg} viewBox="0 0 150 100">
              <ellipse className={styles.shadow} cx="76" cy="93" rx="50" ry="5" fill={STROKE} opacity="0.12" />
              {POSE_RENDER[pose](state)}
              <g transform={`translate(${head.x} ${head.y}) rotate(${head.rot})`}>
                <Head expression={expression} />
              </g>
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

/** Micio kawaii "sempre vivo" che abita il bordo inferiore del sito. */
export function WalkingCat() {
  if (!animations.gattoCammina) return null
  return <KawaiiCat />
}
