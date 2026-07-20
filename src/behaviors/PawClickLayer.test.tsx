import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PawClickLayer } from './PawClickLayer'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

const pawSelector = 'div[style*="om-paw-fade"]'

function pointerDownOn(el: Element) {
  el.dispatchEvent(
    new MouseEvent('pointerdown', { bubbles: true, clientX: 50, clientY: 60 }),
  )
}

describe('PawClickLayer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('spawns a paw on a click over a bare surface', () => {
    mockReducedMotion(false)
    render(<PawClickLayer />)

    const surface = document.createElement('div')
    document.body.appendChild(surface)
    pointerDownOn(surface)

    expect(document.querySelector(pawSelector)).not.toBeNull()
  })

  it('removes the paw after the fade timeout', () => {
    mockReducedMotion(false)
    render(<PawClickLayer />)

    const surface = document.createElement('div')
    document.body.appendChild(surface)
    pointerDownOn(surface)
    expect(document.querySelector(pawSelector)).not.toBeNull()

    vi.advanceTimersByTime(900)
    expect(document.querySelector(pawSelector)).toBeNull()
  })

  it('ignores clicks on interactive controls', () => {
    mockReducedMotion(false)
    render(<PawClickLayer />)

    const button = document.createElement('button')
    document.body.appendChild(button)
    pointerDownOn(button)

    expect(document.querySelector(pawSelector)).toBeNull()
  })

  it('does nothing when reduced motion is preferred', () => {
    mockReducedMotion(true)
    render(<PawClickLayer />)

    const surface = document.createElement('div')
    document.body.appendChild(surface)
    pointerDownOn(surface)

    expect(document.querySelector(pawSelector)).toBeNull()
  })

  it('does nothing when the feature flag is disabled', async () => {
    mockReducedMotion(false)
    vi.resetModules()
    vi.doMock('../config/animations', () => ({
      animations: { zampetteAlClick: false },
    }))
    const { PawClickLayer: Disabled } = await import('./PawClickLayer')

    render(<Disabled />)
    const surface = document.createElement('div')
    document.body.appendChild(surface)
    pointerDownOn(surface)

    expect(document.querySelector(pawSelector)).toBeNull()

    // Ripristina il registro dei moduli così il mock non filtra a eventuali
    // test aggiunti dopo questo (l'isolamento non deve dipendere dall'ordine).
    vi.doUnmock('../config/animations')
    vi.resetModules()
  })
})
