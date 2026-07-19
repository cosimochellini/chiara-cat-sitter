import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import test from 'node:test'
import { URL } from 'node:url'

const PNPM_PIN =
  'pnpm@11.14.0'

const SITE_HOST = 'chiara-cat-sitter.netlify.app'

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8')

const projectFileExists = (path) =>
  access(new URL(`../${path}`, import.meta.url)).then(
    () => true,
    () => false,
  )

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
  // solo le forme SVG dipinte del micio sono interattive (visiblePainted),
  // mai un box rettangolare pieno, e restano escluse da PawClickLayer.
  assert.match(walkingCatStyles, /\.walker\s*\{[^}]*pointer-events:\s*none/s)
  assert.doesNotMatch(walkingCatStyles, /pointer-events:\s*auto/)
  assert.match(walkingCatStyles, /pointer-events:\s*visiblePainted/)
  assert.match(walkingCat, /data-mascotte/)
})

test('exposes the Open Graph / social-preview metadata for rich link previews', async () => {
  const root = await readProjectFile('src/routes/__root.tsx')

  // Base assoluta senza slash finale (necessaria per URL OG assoluti).
  assert.match(root, /SITE_URL = 'https:\/\/chiara-cat-sitter\.netlify\.app'/)
  assert.doesNotMatch(root, /SITE_URL = 'https:\/\/[^']*\/'/)

  // Open Graph + Twitter card (anteprima WhatsApp/Facebook/Twitter).
  for (const needle of [
    "property: 'og:title'",
    "property: 'og:image'",
    "property: 'og:url'",
    "property: 'og:image:width'",
    "name: 'twitter:card'",
    'summary_large_image',
  ]) {
    assert.ok(root.includes(needle), `__root.tsx manca di ${needle}`)
  }

  // L'immagine OG deve essere un URL assoluto verso il PNG.
  assert.match(root, /OG_IMAGE = `\$\{SITE_URL\}\/og-image\.png`/)

  // canonical, manifest e apple-touch-icon.
  assert.match(root, /rel: 'canonical'/)
  assert.match(root, /rel: 'apple-touch-icon'/)
  assert.match(root, /rel: 'manifest'/)
})

test('emits LocalBusiness JSON-LD structured data', async () => {
  const root = await readProjectFile('src/routes/__root.tsx')

  assert.match(root, /type: 'application\/ld\+json'/)
  assert.match(root, /'@type': 'LocalBusiness'/)
  assert.match(root, /JSON\.stringify\(JSON_LD\)/)
})

test('ships the static SEO assets from public/', async () => {
  for (const asset of [
    'public/og-image.png',
    'public/apple-touch-icon.png',
    'public/icon-192.png',
    'public/icon-512.png',
    'public/robots.txt',
    'public/sitemap.xml',
    'public/site.webmanifest',
  ]) {
    assert.ok(await projectFileExists(asset), `manca ${asset}`)
  }
})

test('points robots.txt and sitemap.xml at the production host', async () => {
  const [robots, sitemap, manifest] = await Promise.all([
    readProjectFile('public/robots.txt'),
    readProjectFile('public/sitemap.xml'),
    readProjectFile('public/site.webmanifest'),
  ])

  assert.match(robots, /^User-agent: \*/m)
  assert.ok(robots.includes(`https://${SITE_HOST}/sitemap.xml`))
  assert.ok(sitemap.includes(`https://${SITE_HOST}/`))

  // Il manifest deve essere JSON valido con le icone dichiarate.
  const parsed = JSON.parse(manifest)
  assert.equal(parsed.theme_color, '#FFD9E3')
  assert.ok(parsed.icons.some((i) => i.sizes === '512x512'))
})
