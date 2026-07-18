export type NyanStar = {
  id: string
  left: number
  top: number
  size: number
  delay: string
}

export type NyanLayout = {
  /** Posizione verticale in vh. */
  top: number
  stars: NyanStar[]
}

/** Genera un layout casuale per il nyan cat (da chiamare in un event handler). */
export function makeNyanLayout(): NyanLayout {
  return {
    top: 15 + Math.random() * 40,
    stars: Array.from({ length: 8 }, (_, i) => ({
      id: `star-${i}`,
      left: i * 24,
      top: Math.round(Math.random() * 56 - 12),
      size: Math.round(10 + Math.random() * 10),
      delay: (Math.random() * 0.4).toFixed(2),
    })),
  }
}
