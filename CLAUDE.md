# chiara-cat-sitter

Sito vetrina (TanStack Start + React 19, CSS modules, TypeScript strict, pnpm).
Deploy statico (SSG/prerender) su Netlify. Niente Prettier; ESLint flat config +
`react-doctor`.

## Comandi

- `pnpm dev` — dev server
- `pnpm build` — build + prerender statico
- `pnpm test` — Vitest (una volta)
- `pnpm test:watch` — Vitest in watch
- `pnpm test:coverage` — Vitest con coverage (fallisce sotto le soglie)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint
- `pnpm doctor` — scanner `react-doctor`

## Testing

Stack: **Vitest + React Testing Library + jsdom**. Nessun GraphQL/Redux/MSW.

### Struttura e naming
- Test co-locati accanto al sorgente: `Componente.test.tsx` / `hook.test.ts`.
- I controlli architetturali/di sicurezza (pin versioni, hardening pnpm, SEO,
  dati personali fuori dal JSON-LD) vivono in `tests/project-regressions.test.ts`
  con `// @vitest-environment node`: leggono i file come stringhe e fanno
  asserzioni sul contenuto. **Non rimuovere queste guardie.**
- Config: `vitest.config.ts` (NON usa il plugin `tanstackStart` né il React
  Compiler); setup globale: `tests/setup.ts`.

### Filosofia
- Testa il **comportamento visibile all'utente**, non i dettagli implementativi.
- Ogni test è isolato (mock puliti automaticamente via `clearMocks`/`mockReset`/
  `restoreMocks` + `unstubEnvs`/`unstubGlobals` in config).
- Struttura Arrange / Act / Assert.

### Query (priorità Testing Library)
1. `getByRole`, `getByLabelText`, `getByText` (preferite)
2. `getByAltText`, `getByTitle`
3. `getByTestId` (ultima spiaggia)

Asserzioni semantiche: `toBeVisible()`, `toBeDisabled()`, `toBeRequired()`,
`toHaveTextContent()` invece di controllare attributi grezzi.

### Cosa mockare (e cosa NO)
- Mocka SOLO: `fetch`, env var (`vi.stubEnv`), API browser assenti in jsdom.
- **Non** mockare i componenti UI interni.
- API browser già stubbate in `tests/setup.ts`: `matchMedia` (default
  `matches: false`), `IntersectionObserver`/`ResizeObserver`,
  `Element.animate`/`getAnimations`, `scrollIntoView`, pointer-capture.
- Reduced motion: sovrascrivi `matchMedia` nel test con
  `vi.spyOn(window,'matchMedia').mockImplementation(...)` (`matches: true`).
- Per coprire il corpo di un `IntersectionObserver`, usa un mock che cattura la
  callback e invocala con un `entry` finto (vedi `Reveal.test.tsx`).
- `Reveal` in normal-motion imposta `opacity:0` in attesa dell'IO: nei test che
  verificano contenuti dentro un `Reveal` usa reduced-motion così restano
  visibili.

### Coverage
- Soglie **80% lines + 80% branches** (anche functions/statements) in
  `vitest.config.ts`, applicate da `pnpm test:coverage`.
- Il **denominatore** è la lista `coverage.include`: solo i file con logica reale.
  Esclusi di proposito animazioni/rAF (`WalkingCat`, `useCatBehavior`), WAAPI
  (`ChiSono`), SVG puri, markup statico, file generati e config. Se un file
  incluso non arriva all'80% a basso costo, restringi `include` invece di
  scrivere test fragili sulle animazioni.

### Prima di aprire una PR
`pnpm lint && pnpm typecheck && pnpm test:coverage && pnpm build` devono passare.
