import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

// Config dedicata ai test: NON carica il plugin tanstackStart (fa prerender/SSR
// e romperebbe gli unit test) né il React Compiler via Babel (memoizzazione:
// solo ottimizzazione, non serve per testare il comportamento).
// `vite build` continua a usare vite.config.ts, che resta invariato.
export default defineConfig({
  plugins: [viteReact()],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./tests/setup.ts'],
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    include: ['tests/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      // include = glob ampio: ogni nuovo file sorgente entra nel denominatore
      // (o va escluso esplicitamente qui sotto). Così il gate 80% protegge
      // anche il codice futuro, invece di misurare solo i file già testati.
      include: ['src/**/*.{ts,tsx}'],
      // Escluso di proposito, con motivazione per file/gruppo:
      exclude: [
        // Codice guidato da requestAnimationFrame / Web Animations API:
        // la logica è intrecciata a timing e DOM, test fragili e a basso valore.
        'src/components/WalkingCat/**',
        'src/components/ChiSono/**',
        // SVG puri e markup statico senza branching testabile.
        'src/components/svg/CatFace.tsx',
        'src/components/svg/ChiaraChibi.tsx',
        'src/components/svg/NyanCat.tsx',
        'src/components/Hero/**',
        'src/components/Servizi/**',
        'src/components/Manifesto/**',
        'src/components/Zone/**',
        'src/components/Recensioni/**',
        'src/components/Footer/**',
        // Composizione/config/route: nessuna decisione da coprire.
        'src/routes/**',
        'src/router.tsx',
        'src/config/**',
        // Generati o dichiarazioni di tipo.
        'src/routeTree.gen.ts',
        'src/**/*.d.ts',
      ],
      thresholds: { lines: 80, branches: 80, functions: 80, statements: 80 },
    },
  },
})
