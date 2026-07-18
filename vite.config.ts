import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    // Start's plugin must come before React's.
    // Prerender: genera HTML statico (SSG) in dist/client, servibile da Netlify
    // come sito statico senza server/functions.
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact(),
    // React Compiler: memoizzazione automatica (richiesta dalle regole react-doctor).
    babel({ presets: [reactCompilerPreset()] }),
  ],
})
