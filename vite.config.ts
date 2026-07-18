import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    // Start's plugin must come before React's.
    tanstackStart(),
    netlify(),
    viteReact(),
    // React Compiler: memoizzazione automatica (richiesta dalle regole react-doctor).
    babel({ presets: [reactCompilerPreset()] }),
  ],
})
