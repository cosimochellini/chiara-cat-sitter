// @vitest-environment node
import { access, readFile } from 'node:fs/promises'
import { URL } from 'node:url'
import { describe, expect, it } from 'vitest'

const PNPM_PIN = 'pnpm@11.14.0'
const SITE_HOST = 'chiara-cat-sitter.netlify.app'

const readProjectFile = (path: string) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8')

const projectFileExists = (path: string) =>
  access(new URL(`../${path}`, import.meta.url)).then(
    () => true,
    () => false,
  )

describe('project regressions (static source guards)', () => {
  it('pins supported Node and pnpm versions', async () => {
    const [packageJsonSource, nvmrc] = await Promise.all([
      readProjectFile('package.json'),
      readProjectFile('.nvmrc'),
    ])
    const packageJson = JSON.parse(packageJsonSource)

    expect(packageJson.packageManager).toBe(PNPM_PIN)
    expect(packageJson.engines.node).toBe('>=24.11.0 <25')
    expect(nvmrc.trim()).toBe('24.18.0')
  })

  it('keeps the pnpm supply-chain protections enabled', async () => {
    const workspace = await readProjectFile('pnpm-workspace.yaml')

    expect(workspace).toMatch(/^minimumReleaseAge:\s*10080\s*$/m)
    expect(workspace).toMatch(/^minimumReleaseAgeStrict:\s*true\s*$/m)
    expect(workspace).toMatch(/^minimumReleaseAgeIgnoreMissingTime:\s*false\s*$/m)
    expect(workspace).toMatch(/^trustPolicy:\s*no-downgrade\s*$/m)
    expect(workspace).toMatch(/^\s+- 'semver@6\.3\.1'\s*$/m)
    expect(workspace).toMatch(/^trustLockfile:\s*false\s*$/m)
  })

  it('keeps contact controls large enough to avoid iOS focus zoom', async () => {
    const contactStyles = await readProjectFile(
      'src/components/Contatti/Contatti.module.css',
    )

    expect(contactStyles).toMatch(/\.input,\s*\.textarea\s*\{[^}]*font-size:\s*16px;/s)
  })

  it('submits the contact form to Web3Forms and drops personal data', async () => {
    const contact = await readProjectFile('src/components/Contatti/Contatti.tsx')

    // Il form invia davvero a Web3Forms con la access key da env var.
    expect(contact).toMatch(/https:\/\/api\.web3forms\.com\/submit/)
    expect(contact).toMatch(/import\.meta\.env\.VITE_WEB3FORMS_ACCESS_KEY/)

    // Nuovi campi richiesti dall'utente.
    expect(contact).toMatch(/name="email"/)
    expect(contact).toMatch(/name="telefono"/)

    // Nessun recapito personale/placeholder residuo nella sezione.
    expect(contact).not.toMatch(/wa\.me/)
    expect(contact).not.toMatch(/055 123 4567/)
    expect(contact).not.toMatch(/ciao@chiaracatsitter\.it/)
  })

  it('keeps personal contact data out of the root JSON-LD', async () => {
    const root = await readProjectFile('src/routes/__root.tsx')

    expect(root).not.toMatch(/telephone:/)
    expect(root).not.toMatch(/email:\s*BUSINESS/)
    expect(root).not.toMatch(/055 123 4567/)
    expect(root).not.toMatch(/ciao@chiaracatsitter\.it/)
  })

  it('disables smooth scrolling for reduced-motion users', async () => {
    const globalStyles = await readProjectFile('src/styles/global.css')
    const reducedMotionStyles = globalStyles.slice(
      globalStyles.indexOf('@media (prefers-reduced-motion: reduce)'),
    )

    expect(reducedMotionStyles).not.toBe(globalStyles)
    expect(reducedMotionStyles).toMatch(/html\s*\{[^}]*scroll-behavior:\s*auto;/s)
  })

  it('renders the mascot easter egg outside the scrollable navigation', async () => {
    const nav = await readProjectFile('src/components/Nav/Nav.tsx')

    expect(nav).toMatch(
      /<\/nav>\s*\{nyanLayout && <NyanCat \{\.\.\.nyanLayout} onDone=\{hideNyan} \/>}\s*<\/>/s,
    )
  })

  it('does not override the global reduced-motion policy in component styles', async () => {
    const chiSonoStyles = await readProjectFile(
      'src/components/ChiSono/ChiSono.module.css',
    )

    expect(chiSonoStyles).not.toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*!important/,
    )
  })

  it('guards imperative badge motion and keeps the walking cat container click-through', async () => {
    const [chiSono, walkingCatStyles, walkingCat] = await Promise.all([
      readProjectFile('src/components/ChiSono/ChiSono.tsx'),
      readProjectFile('src/components/WalkingCat/WalkingCat.module.css'),
      readProjectFile('src/components/WalkingCat/WalkingCat.tsx'),
    ])

    expect(chiSono).toMatch(
      /if \(!window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches\) \{\s*target\.animate/s,
    )
    expect(walkingCatStyles).toMatch(/\.walker\s*\{[^}]*pointer-events:\s*none/s)
    expect(walkingCatStyles).not.toMatch(/pointer-events:\s*auto/)
    expect(walkingCatStyles).toMatch(/pointer-events:\s*visiblePainted/)
    expect(walkingCat).toMatch(/data-mascotte/)
  })

  it('exposes the Open Graph / social-preview metadata for rich link previews', async () => {
    const root = await readProjectFile('src/routes/__root.tsx')

    // Base assoluta senza slash finale (necessaria per URL OG assoluti).
    expect(root).toMatch(/SITE_URL = 'https:\/\/chiara-cat-sitter\.netlify\.app'/)
    expect(root).not.toMatch(/SITE_URL = 'https:\/\/[^']*\/'/)

    // Open Graph + Twitter card (anteprima WhatsApp/Facebook/Twitter).
    for (const needle of [
      "property: 'og:title'",
      "property: 'og:image'",
      "property: 'og:url'",
      "property: 'og:image:width'",
      "name: 'twitter:card'",
      'summary_large_image',
    ]) {
      expect(root, `__root.tsx manca di ${needle}`).toContain(needle)
    }

    // L'immagine OG deve essere un URL assoluto verso il PNG.
    expect(root).toMatch(/OG_IMAGE = `\$\{SITE_URL\}\/og-image\.png`/)

    // canonical, manifest e apple-touch-icon.
    expect(root).toMatch(/rel: 'canonical'/)
    expect(root).toMatch(/rel: 'apple-touch-icon'/)
    expect(root).toMatch(/rel: 'manifest'/)
  })

  it('emits LocalBusiness JSON-LD structured data', async () => {
    const root = await readProjectFile('src/routes/__root.tsx')

    expect(root).toMatch(/type: 'application\/ld\+json'/)
    expect(root).toMatch(/'@type': 'LocalBusiness'/)
    expect(root).toMatch(/JSON\.stringify\(JSON_LD\)/)
  })

  it('ships the static SEO assets from public/', async () => {
    for (const asset of [
      'public/og-image.png',
      'public/apple-touch-icon.png',
      'public/icon-192.png',
      'public/icon-512.png',
      'public/robots.txt',
      'public/sitemap.xml',
      'public/site.webmanifest',
    ]) {
      expect(await projectFileExists(asset), `manca ${asset}`).toBe(true)
    }
  })

  it('points robots.txt and sitemap.xml at the production host', async () => {
    const [robots, sitemap, manifest] = await Promise.all([
      readProjectFile('public/robots.txt'),
      readProjectFile('public/sitemap.xml'),
      readProjectFile('public/site.webmanifest'),
    ])

    expect(robots).toMatch(/^User-agent: \*/m)
    expect(robots).toContain(`https://${SITE_HOST}/sitemap.xml`)
    expect(sitemap).toContain(`https://${SITE_HOST}/`)

    // Il manifest deve essere JSON valido con le icone dichiarate.
    const parsed = JSON.parse(manifest)
    expect(parsed.theme_color).toBe('#FFD9E3')
    expect(parsed.icons.some((i: { sizes: string }) => i.sizes === '512x512')).toBe(true)
  })
})
