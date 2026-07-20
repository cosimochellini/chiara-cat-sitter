# chiara-cat-sitter

## Codice

- Minimizza l'uso di `useEffect`: preferisci derivare valori nel render, event
  handler ed effetti solo per la vera sincronizzazione con sistemi esterni.
- Esegui sempre `pnpm lint` prima di committare.

## Test

Stack: **Vitest + React Testing Library + jsdom**.

- Test co-locati: `Componente.test.tsx` / `hook.test.ts`. Guardie
  architetturali/sicurezza in `tests/project-regressions.test.ts`
  (`// @vitest-environment node`, grep sui sorgenti).
- Testa il comportamento visibile; query per ruolo/label/testo, non testid.
- Mocka solo `fetch`, env (`vi.stubEnv`) e le API browser assenti (già stubbate
  in `tests/setup.ts`); mai i componenti interni.
- Coverage: `pnpm test:coverage`, soglie 80% (lines/branches/functions/
  statements). `include` è `src/**`; esclusioni motivate in `coverage.exclude`.

Comandi: `pnpm test` · `pnpm test:coverage` · `pnpm lint` · `pnpm typecheck` ·
`pnpm build`.
