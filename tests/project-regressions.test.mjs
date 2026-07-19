import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { URL } from 'node:url'

const PNPM_PIN =
  'pnpm@11.14.0'

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

test('keeps the pnpm supply-chain protections enabled', async () => {
  const workspace = await readProjectFile('pnpm-workspace.yaml')

  assert.match(workspace, /^minimumReleaseAge:\s*10080\s*$/m)
  assert.match(workspace, /^minimumReleaseAgeStrict:\s*true\s*$/m)
  assert.match(workspace, /^minimumReleaseAgeIgnoreMissingTime:\s*false\s*$/m)
  assert.match(workspace, /^trustPolicy:\s*no-downgrade\s*$/m)
  assert.match(workspace, /^\s+- 'semver@6\.3\.1'\s*$/m)
  assert.match(workspace, /^trustLockfile:\s*false\s*$/m)
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

test('guards imperative badge motion and keeps the walking cat container click-through', async () => {
  const [chiSono, walkingCatStyles, walkingCat] = await Promise.all([
    readProjectFile('src/components/ChiSono/ChiSono.tsx'),
    readProjectFile('src/components/WalkingCat/WalkingCat.module.css'),
    readProjectFile('src/components/WalkingCat/WalkingCat.tsx'),
  ])

  assert.match(
    chiSono,
    /if \(!window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches\) \{\s*target\.animate/s,
  )
  // Il contenitore full-width resta pointer-events: none (pagina cliccabile);
  // solo la hit-area del micio è interattiva, esclusa da PawClickLayer.
  assert.match(walkingCatStyles, /\.walker\s*\{[^}]*pointer-events:\s*none/s)
  assert.match(walkingCat, /data-mascotte/)
})
