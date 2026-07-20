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
      // Denominatore di coverage = solo i file con logica (decisione utente).
      // Esclusi: macchina rAF, WAAPI, SVG puri, markup statico, generati, config.
      include: [
        'src/components/Contatti/Contatti.tsx',
        'src/components/PawRating/PawRating.tsx',
        'src/components/SectionHeading/SectionHeading.tsx',
        'src/components/Nav/Nav.tsx',
        'src/components/Reveal.tsx',
        'src/components/svg/nyanLayout.ts',
        'src/components/svg/PawIcon.tsx',
        'src/behaviors/useMascotteEasterEgg.ts',
        'src/behaviors/usePurr.ts',
        'src/behaviors/useEarWiggle.ts',
        'src/behaviors/PawClickLayer.tsx',
      ],
      thresholds: { lines: 80, branches: 80, functions: 80, statements: 80 },
    },
  },
})
