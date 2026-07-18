# Chiara · Cat Sitter Eccezionale 🐾

Landing page per **Chiara**, cat sitter a Firenze. Coccole professionali,
croccantini puntuali, fusa garantite.

Ricreata da un prototipo di [Claude Design](https://claude.ai/design) come vera
web app.

## Stack

- [pnpm](https://pnpm.io) — package manager
- [TanStack Start](https://tanstack.com/start) (React 19, SSR) + TanStack Router
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- **CSS Modules** per lo stile dei componenti
- [ESLint](https://eslint.org/) + [`eslint-plugin-react-doctor`](https://www.react.doctor/)
- [React Doctor](https://www.react.doctor/) come analisi statica (`pnpm doctor`)

## Requisiti

- **Node 24.18.0** (vedi `.nvmrc`: `nvm install && nvm use`)
- **pnpm 11.14.0 standalone**, fissato in `package.json`

## Comandi

```bash
pnpm install     # installa le dipendenze
pnpm dev         # dev server su http://localhost:3000
pnpm build       # build di produzione
pnpm start       # avvia la build (dopo pnpm build)
pnpm test        # test di regressione della configurazione
pnpm typecheck   # controllo TypeScript senza generare file
pnpm lint        # ESLint (incluso react-doctor)
pnpm run doctor  # analisi statica React Doctor
```

## Struttura

```
src/
  routes/          # __root.tsx (documento + font + head) e index.tsx (home)
  styles/          # global.css: palette, sfondo, keyframes, reduced-motion
  config/          # animations.ts: interruttori animazioni decorative
  components/      # una cartella per sezione (Nav, Hero, ChiSono, …)
    svg/           # CatFace parametrico, PawIcon, NyanCat, ChiaraChibi
  hooks/           # useReducedMotion, …
  behaviors/       # zampette al click, purr, ear-wiggle, easter egg
```

## Contenuti

I recapiti in `src/components/Contatti/Contatti.tsx` (telefono, email, WhatsApp)
sono **valori di esempio** relativi a Firenze: vanno sostituiti con quelli reali
di Chiara. Anche la sezione "Chi sono" contiene dettagli d'esempio (anni di
esperienza, zone).

## Accessibilità e animazioni

Tutte le animazioni rispettano `prefers-reduced-motion`. Le interazioni
decorative (zampette al click, cuori "fusa", gatto che cammina, cuori nell'hero)
si possono disattivare da `src/config/animations.ts`.

Piccolo segreto: clicca 5 volte sulla mascotte nella navigazione. 🐱
