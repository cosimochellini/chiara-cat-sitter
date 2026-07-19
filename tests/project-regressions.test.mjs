import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { URL } from 'node:url'

const PNPM_PIN = 'pnpm@11.11.0'

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('pins supported Node and pnpm versions', async () => {
  const [packageJsonSource, nvmrc] = await Promise.all([
    readProjectFile('package.json'),
    readProjectFile('.nvmrc'),
  ])
  const packageJson = JSON.parse(packageJsonSource)

  assert.equal(packageJson.packageManager, PNPM_PIN)
  assert.equal(packageJson.engines.node, '>=24.11.0 <25')
  assert.equal(nvmrc.trim(), '24.18.0')
})

test('configures the official Netlify adapter and build output', async () => {
  const [packageJsonSource, viteConfig, netlifyConfig] = await Promise.all([
    readProjectFile('package.json'),
    readProjectFile('vite.config.ts'),
    readProjectFile('netlify.toml'),
  ])
  const packageJson = JSON.parse(packageJsonSource)

  assert.equal(
    packageJson.devDependencies['@netlify/vite-plugin-tanstack-start'],
    '^1.3.16',
  )
  assert.match(
    viteConfig,
    /import netlify from '@netlify\/vite-plugin-tanstack-start'/,
  )
  assert.match(viteConfig, /tanstackStart\(\),\s*netlify\(\),/s)
  assert.match(netlifyConfig, /^\s*command = "vite build"\s*$/m)
  assert.match(netlifyConfig, /^\s*publish = "dist\/client"\s*$/m)
})

test('keeps the pnpm supply-chain protections enabled', async () => {
  const workspace = await readProjectFile('pnpm-workspace.yaml')

  assert.match(workspace, /^minimumReleaseAge:\s*10080\s*$/m)
  assert.match(workspace, /^minimumReleaseAgeStrict:\s*true\s*$/m)
  assert.match(workspace, /^minimumReleaseAgeIgnoreMissingTime:\s*false\s*$/m)
  assert.match(workspace, /^trustPolicy:\s*no-downgrade\s*$/m)
  assert.match(workspace, /^trustPolicyIgnoreAfter:\s*43200\s*$/m)
  assert.match(workspace, /^trustLockfile:\s*false\s*$/m)
  assert.match(workspace, /^\s+'@parcel\/watcher':\s*true\s*$/m)
  assert.match(workspace, /^\s+esbuild:\s*true\s*$/m)
  assert.match(workspace, /^\s+sharp:\s*true\s*$/m)
})

test('keeps contact controls large enough to avoid iOS focus zoom', async () => {
  const contactStyles = await readProjectFile(
    'src/components/Contatti/Contatti.module.css',
  )

  assert.match(
    contactStyles,
    /\.input,\s*\.textarea\s*\{[^}]*font-size:\s*16px;/s,
  )
})

test('disables smooth scrolling for reduced-motion users', async () => {
  const globalStyles = await readProjectFile('src/styles/global.css')
  const reducedMotionStyles = globalStyles.slice(
    globalStyles.indexOf('@media (prefers-reduced-motion: reduce)'),
  )

  assert.notEqual(reducedMotionStyles, globalStyles)
  assert.match(
    reducedMotionStyles,
    /html\s*\{[^}]*scroll-behavior:\s*auto;/s,
  )
})

test('renders the mascot easter egg outside the scrollable navigation', async () => {
  const nav = await readProjectFile('src/components/Nav/Nav.tsx')

  assert.match(
    nav,
    /<\/nav>\s*\{nyanLayout && <NyanCat \{\.\.\.nyanLayout} onDone=\{hideNyan} \/>}\s*<\/>/s,
  )
})

test('does not override the global reduced-motion policy in component styles', async () => {
  const chiSonoStyles = await readProjectFile(
    'src/components/ChiSono/ChiSono.module.css',
  )

  assert.doesNotMatch(
    chiSonoStyles,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*!important/,
  )
})
