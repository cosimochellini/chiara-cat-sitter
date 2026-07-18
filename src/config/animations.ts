/**
 * Interruttori per le animazioni decorative del sito.
 * Nel prototipo Claude Design erano props dell'editor; qui sono costanti.
 * Tutte rispettano comunque `prefers-reduced-motion`.
 */
export const animations = {
  /** Gatto che cammina fisso in basso. */
  gattoCammina: true,
  /** Cuori e stelline fluttuanti nell'hero. */
  fluttuantiHero: true,
  /** Zampette che appaiono al click ovunque nella pagina. */
  zampetteAlClick: true,
} as const
