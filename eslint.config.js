import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactDoctor from 'eslint-plugin-react-doctor'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      '.netlify',
      '.output',
      '.nitro',
      '.tanstack',
      'dist',
      'node_modules',
      'src/routeTree.gen.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    plugins: {
      'react-hooks': reactHooks,
      // Register the react-doctor plugin once, then pull in both rule sets
      // (the standalone plugin cannot run project-level security scans;
      // for those use the pinned local CLI via `pnpm run doctor`).
      'react-doctor': reactDoctor,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactDoctor.configs.recommended.rules,
      ...reactDoctor.configs['tanstack-start'].rules,
    },
  },
)
