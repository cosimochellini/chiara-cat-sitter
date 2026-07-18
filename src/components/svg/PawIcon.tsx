import type { CSSProperties } from 'react'

type PawIconProps = {
  size?: number
  color?: string
  /** Se presente rende l'icona accessibile con questo testo, altrimenti è decorativa. */
  title?: string
  className?: string
  style?: CSSProperties
}

/** Zampetta riusabile: nav, badge, rating recensioni, decori. */
export function PawIcon({
  size = 24,
  color = 'var(--rosa)',
  title,
  className,
  style,
}: PawIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <ellipse cx="12" cy="16" rx="6" ry="4.6" fill={color} />
      <circle cx="4.6" cy="10" r="2.5" fill={color} />
      <circle cx="9.6" cy="7" r="2.5" fill={color} />
      <circle cx="14.4" cy="7" r="2.5" fill={color} />
      <circle cx="19.4" cy="10" r="2.5" fill={color} />
    </svg>
  )
}
