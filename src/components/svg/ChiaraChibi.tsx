import type { CSSProperties } from 'react'

type ChiaraChibiProps = {
  className?: string
  style?: CSSProperties
}

/** Illustrazione chibi di Chiara che tiene un gattino in braccio. */
export function ChiaraChibi({ className, style }: ChiaraChibiProps) {
  return (
    <svg
      viewBox="0 0 150 170"
      width="216"
      height="245"
      className={className}
      style={style}
      role="img"
      aria-label="Chiara, illustrazione chibi"
    >
      <ellipse cx="75" cy="60" rx="43" ry="41" fill="#7A5647" stroke="#5C4A44" strokeWidth="2.5" />
      <path d="M32 56 q-8 34 7 44 q5 -8 5 -17 Z" fill="#7A5647" stroke="#5C4A44" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M118 56 q8 34 -7 44 q-5 -8 -5 -17 Z" fill="#7A5647" stroke="#5C4A44" strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="75" cy="68" rx="32" ry="29" fill="#FFE9DA" stroke="#5C4A44" strokeWidth="2.5" />
      <path d="M43 62 Q43 29 75 29 Q107 29 107 62 Q99 49 91 53 Q87 40 75 40 Q63 40 59 53 Q51 49 43 62 Z" fill="#7A5647" />
      <g transform="rotate(-12 41 31)">
        <path d="M41 31 C35.5 23.5 25.5 24.5 27 32 C28 37 35 37.5 41 34.5 Z" fill="#E8506E" stroke="#5C4A44" strokeWidth="2" strokeLinejoin="round" />
        <path d="M41 31 C46.5 23.5 56.5 24.5 55 32 C54 37 47 37.5 41 34.5 Z" fill="#E8506E" stroke="#5C4A44" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="41" cy="32" r="4" fill="#C22F52" stroke="#5C4A44" strokeWidth="2" />
      </g>
      <circle cx="62" cy="70" r="6.6" fill="#4A3226" />
      <circle cx="64.4" cy="67.6" r="2.3" fill="#FFFFFF" />
      <circle cx="60" cy="72.5" r="1" fill="#FFFFFF" opacity="0.9" />
      <circle cx="88" cy="70" r="6.6" fill="#4A3226" />
      <circle cx="90.4" cy="67.6" r="2.3" fill="#FFFFFF" />
      <circle cx="86" cy="72.5" r="1" fill="#FFFFFF" opacity="0.9" />
      <path d="M54 62 q4 -3 8 -1.5 M96 62 q-4 -3 -8 -1.5" stroke="#5C4A44" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="51" cy="80" rx="6.5" ry="4" fill="#FF9FB7" opacity="0.75" />
      <ellipse cx="99" cy="80" rx="6.5" ry="4" fill="#FF9FB7" opacity="0.75" />
      <path d="M73 78 q2 1.5 4 0" stroke="#E0A98F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M67 84 q8 9 16 0 q-8 5 -16 0 Z" fill="#B25668" />
      <path d="M52 104 q23 -10 46 0 q9 26 3 34 q-26 8 -52 0 q-6 -8 3 -34 Z" fill="#FFB7C5" stroke="#5C4A44" strokeWidth="2.5" strokeLinejoin="round" />
      <g>
        <path d="M60 121 C57 117 57.5 110 61 108.5 C63.5 107.5 66.5 110 69 114 C65.5 115.5 62.5 118 60 121 Z" fill="#F2A65A" stroke="#5C4A44" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M90 121 C93 117 92.5 110 89 108.5 C86.5 107.5 83.5 110 81 114 C84.5 115.5 87.5 118 90 121 Z" fill="#F2A65A" stroke="#5C4A44" strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="75" cy="130" rx="17" ry="15" fill="#F2A65A" stroke="#5C4A44" strokeWidth="2.5" />
        <path d="M45 33 q3 -4.5 6 0 M53 31 q3 -4.5 6 0" transform="translate(23 82)" stroke="#D97F2E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M64 128 q4 4 8 0 M78 128 q4 4 8 0" stroke="#5C4A44" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M73.2 133.5 h3.6 q0.8 0 0.4 0.7 l-1.6 2 q-0.4 0.5 -0.8 0 l-1.6 -2 q-0.4 -0.7 0.4 -0.7 Z" fill="#D9738C" />
        <path d="M75 136.6 q-2.3 2.6 -4.8 0.6 M75 136.6 q2.3 2.6 4.8 0.6" stroke="#5C4A44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="64" cy="142" rx="5.5" ry="4" fill="#F2A65A" stroke="#5C4A44" strokeWidth="2" />
        <ellipse cx="86" cy="142" rx="5.5" ry="4" fill="#F2A65A" stroke="#5C4A44" strokeWidth="2" />
      </g>
    </svg>
  )
}
