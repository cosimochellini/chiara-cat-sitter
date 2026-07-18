import type { CSSProperties } from 'react'

export type CatEyes = 'open' | 'closed' | 'heart' | 'slit' | 'glasses'
export type CatAccessory =
  | 'none'
  | 'crown'
  | 'bandana'
  | 'sportband'
  | 'heartbib'
  | 'sparkles'

type CatBow = { color: string; knot: string; side?: 'left' | 'right' }

type CatFaceProps = {
  /** Testo accessibile (aria-label). */
  title: string
  size?: number
  /** Colore del pelo: orecchie, muso e zampette. */
  fur: string
  /** Colore del muso, se diverso dal pelo (gatti colorpoint tipo siamese). */
  faceFill?: string
  earInner?: string
  stroke?: string
  eyes?: CatEyes
  /** Baffi sulle guance. */
  whiskers?: boolean
  whiskerColor?: string
  /** Righe tabby sulla fronte. */
  stripes?: boolean
  stripeColor?: string
  /** Zampette in basso. */
  feet?: boolean
  /** Chiazza sul muso (siamese). */
  muzzle?: string
  bow?: CatBow | null
  accessory?: CatAccessory
  accessoryColor?: string
  /** Aggiunge `data-ear` per l'animazione delle orecchie all'hover. */
  earWiggle?: boolean
  className?: string
  style?: CSSProperties
}

const EAR_WIGGLE_STYLE: CSSProperties = {
  transformBox: 'fill-box',
  transformOrigin: '60% 90%',
}

export function CatFace({
  title,
  size = 96,
  fur,
  faceFill,
  earInner = '#FFB7C5',
  stroke = '#5C4A44',
  eyes = 'open',
  whiskers = false,
  whiskerColor,
  stripes = false,
  stripeColor = '#D97F2E',
  feet = false,
  muzzle,
  bow = null,
  accessory = 'none',
  accessoryColor = '#7ACB96',
  earWiggle = false,
  className,
  style,
}: CatFaceProps) {
  const face = faceFill ?? fur

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      role="img"
      aria-label={title}
    >
      {/* Orecchie */}
      <path
        data-ear={earWiggle ? 'l' : undefined}
        style={earWiggle ? EAR_WIGGLE_STYLE : undefined}
        d="M21 41 C14 32 14.5 17 21 12.5 C26 9.5 34 15 41 25 C33 27 26 33 21 41 Z"
        fill={fur}
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        data-ear={earWiggle ? 'r' : undefined}
        style={earWiggle ? { ...EAR_WIGGLE_STYLE, transformOrigin: '40% 90%' } : undefined}
        d="M79 41 C86 32 85.5 17 79 12.5 C74 9.5 66 15 59 25 C67 27 74 33 79 41 Z"
        fill={fur}
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Interno orecchie */}
      <path d="M25 34.5 C21.5 29 21.5 20.5 25 18 C27.5 16.2 32.5 19.5 36.5 24.5 C31.5 26.3 28 30 25 34.5 Z" fill={earInner} />
      <path d="M75 34.5 C78.5 29 78.5 20.5 75 18 C72.5 16.2 67.5 19.5 63.5 24.5 C68.5 26.3 72 30 75 34.5 Z" fill={earInner} />

      {/* Accessori sopra la testa */}
      {accessory === 'crown' && (
        <path
          d="M37 15 l3.5 -9 5.5 6.5 4 -8 4 8 5.5 -6.5 3.5 9 q-13 5 -26 0 Z"
          fill={accessoryColor}
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
      {accessory === 'sparkles' && (
        <g>
          <circle cx="77" cy="20" r="3.4" fill="#FFFDFB" />
          <circle cx="84.5" cy="22" r="3.4" fill="#FFFDFB" />
          <circle cx="82.5" cy="14.5" r="3.4" fill="#FFFDFB" />
          <circle cx="81" cy="19" r="2.6" fill="#F7C86B" />
        </g>
      )}

      {/* Muso */}
      <ellipse cx="50" cy="56" rx="33.5" ry="28.5" fill={face} stroke={stroke} strokeWidth="2.4" />
      {muzzle && <ellipse cx="50" cy="63" rx="14" ry="9" fill={muzzle} opacity="0.55" />}

      {/* Fascia sportiva sulla fronte */}
      {accessory === 'sportband' && (
        <>
          <path
            d="M18.5 40 q31.5 -12 63 0 l0 8.5 q-31.5 -12 -63 0 Z"
            fill={accessoryColor}
            stroke={stroke}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M20.5 44.2 q29.5 -11 59 0" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
        </>
      )}

      {/* Righe tabby */}
      {stripes && (
        <path d="M41 32.5 q4 -6 8 0 M50.5 31 q4 -6 8 0" stroke={stripeColor} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      )}

      {/* Sopracciglia arrabbiate (occhi a fessura) */}
      {eyes === 'slit' && (
        <path d="M28 44 l13 4.5 M72 44 l-13 4.5" stroke="#2A252D" strokeWidth="2.8" strokeLinecap="round" />
      )}

      {/* Occhi */}
      {eyes === 'open' && (
        <>
          <circle cx="36" cy="54" r="6.8" fill="#3E2A33" />
          <circle cx="38.3" cy="51.6" r="2.4" fill="#FFFFFF" />
          <circle cx="33.8" cy="56.5" r="1.1" fill="#FFFFFF" opacity="0.9" />
          <circle cx="64" cy="54" r="6.8" fill="#3E2A33" />
          <circle cx="66.3" cy="51.6" r="2.4" fill="#FFFFFF" />
          <circle cx="61.8" cy="56.5" r="1.1" fill="#FFFFFF" opacity="0.9" />
        </>
      )}
      {eyes === 'closed' && (
        <path d="M29.5 52 q6.5 6.5 13 0 M57.5 52 q6.5 6.5 13 0" stroke={stroke} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      )}
      {eyes === 'heart' && (
        <>
          <path d="M36 49.5 c-2.4 -3.2 -7.2 -1 -6.1 2.7 c0.8 2.7 3.7 4.5 6.1 6.4 c2.4 -1.9 5.3 -3.7 6.1 -6.4 c1.1 -3.7 -3.7 -5.9 -6.1 -2.7 Z" fill="#E8506E" />
          <path d="M64 49.5 c-2.4 -3.2 -7.2 -1 -6.1 2.7 c0.8 2.7 3.7 4.5 6.1 6.4 c2.4 -1.9 5.3 -3.7 6.1 -6.4 c1.1 -3.7 -3.7 -5.9 -6.1 -2.7 Z" fill="#E8506E" />
        </>
      )}
      {eyes === 'slit' && (
        <>
          <circle cx="36" cy="55" r="6.4" fill="#EFE28A" />
          <ellipse cx="36" cy="55" rx="2.2" ry="5" fill="#2A252D" />
          <circle cx="38" cy="52.5" r="1.7" fill="#FFFFFF" />
          <circle cx="64" cy="55" r="6.4" fill="#EFE28A" />
          <ellipse cx="64" cy="55" rx="2.2" ry="5" fill="#2A252D" />
          <circle cx="66" cy="52.5" r="1.7" fill="#FFFFFF" />
        </>
      )}
      {eyes === 'glasses' && (
        <>
          <circle cx="36" cy="54" r="5.6" fill="#3E2A33" />
          <circle cx="38" cy="52" r="2" fill="#FFFFFF" />
          <circle cx="64" cy="54" r="5.6" fill="#3E2A33" />
          <circle cx="66" cy="52" r="2" fill="#FFFFFF" />
          <circle cx="36" cy="54" r="9.6" fill="rgba(255,255,255,0.25)" stroke="#4A3B3B" strokeWidth="2.4" />
          <circle cx="64" cy="54" r="9.6" fill="rgba(255,255,255,0.25)" stroke="#4A3B3B" strokeWidth="2.4" />
          <path d="M45.6 54 h8.8" stroke="#4A3B3B" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}

      {/* Guance */}
      <ellipse cx="23.5" cy="64" rx="6.5" ry="4.2" fill="#FF9FB7" opacity="0.7" />
      <ellipse cx="76.5" cy="64" rx="6.5" ry="4.2" fill="#FF9FB7" opacity="0.7" />

      {/* Naso + bocca */}
      {eyes === 'heart' ? (
        <path d="M50 64 q-3.2 4.4 -7 1.2 M50 64 q3.2 4.4 7 1.2" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <path d="M47.4 61.5 h5.2 q1.1 0 0.5 0.9 l-2.3 2.9 q-0.6 0.7 -1.2 0 l-2.3 -2.9 q-0.6 -0.9 0.5 -0.9 Z" fill="#D9738C" />
          <path d="M50 65.8 v1.6 M50 67.4 q-2.7 3 -5.9 0.7 M50 67.4 q2.7 3 5.9 0.7" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Baffi guance */}
      {whiskers && (
        <path d="M13 56 q5.5 0.8 9.5 1.3 M14 64 q5.5 -0.3 9.5 -1 M87 56 q-5.5 0.8 -9.5 1.3 M86 64 q-5.5 -0.3 -9.5 -1" stroke={whiskerColor ?? stroke} strokeWidth="1.8" fill="none" opacity="0.45" strokeLinecap="round" />
      )}

      {/* Bandana + campanellino */}
      {accessory === 'bandana' && (
        <>
          <path d="M28 79 q22 11 44 0 l-1 7 q-21 10 -42 0 Z" fill={accessoryColor} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="90" r="5" fill="#F7C86B" stroke={stroke} strokeWidth="2" />
          <path d="M50 88 v2.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {/* Bavaglino a cuore */}
      {accessory === 'heartbib' && (
        <path d="M36 82 h28 q2.5 0 1.5 2.2 l-13 12 q-2.5 2.3 -5 0 l-13 -12 q-1 -2.2 1.5 -2.2 Z" fill={accessoryColor} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      )}

      {/* Fiocco */}
      {bow && <Bow {...bow} stroke={stroke} />}

      {/* Zampette */}
      {feet && (
        <>
          <ellipse cx="35" cy="87" rx="8" ry="6" fill={fur} stroke={stroke} strokeWidth="2.2" />
          <ellipse cx="65" cy="87" rx="8" ry="6" fill={fur} stroke={stroke} strokeWidth="2.2" />
          <path d="M32.4 82.5 v3.4 M37.6 82.5 v3.4 M62.4 82.5 v3.4 M67.6 82.5 v3.4" stroke={stroke} strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

function Bow({
  color,
  knot,
  side = 'right',
  stroke,
}: CatBow & { stroke: string }) {
  if (side === 'left') {
    return (
      <g transform="rotate(14 28 16)">
        <path d="M28 16 C22.5 8.5 12.5 9.5 14 17 C15 22 22 22.5 28 19.5 Z" fill={color} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <path d="M28 16 C33.5 8.5 43.5 9.5 42 17 C41 22 34 22.5 28 19.5 Z" fill={color} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="28" cy="17" r="4" fill={knot} stroke={stroke} strokeWidth="2" />
      </g>
    )
  }
  return (
    <g transform="rotate(-14 72 16)">
      <path d="M72 16 C66.5 8.5 56.5 9.5 58 17 C59 22 66 22.5 72 19.5 Z" fill={color} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d="M72 16 C77.5 8.5 87.5 9.5 86 17 C85 22 78 22.5 72 19.5 Z" fill={color} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="72" cy="17" r="4" fill={knot} stroke={stroke} strokeWidth="2" />
    </g>
  )
}
