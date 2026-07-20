import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PawRating } from './PawRating'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

type IOEntry = { isIntersecting: boolean; target: Element }

// IntersectionObserver controllabile: cattura la callback così il test può
// simularne l'ingresso nel viewport e coprire il corpo dell'observer.
function installIO() {
  const instances: Array<{
    cb: (entries: IOEntry[]) => void
    unobserve: ReturnType<typeof vi.fn>
    trigger: (entries: IOEntry[]) => void
  }> = []
  class IO {
    cb: (entries: IOEntry[]) => void
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
    constructor(cb: (entries: IOEntry[]) => void) {
      this.cb = cb
      instances.push(this)
    }
    trigger(entries: IOEntry[]) {
      this.cb(entries)
    }
  }
  vi.stubGlobal('IntersectionObserver', IO)
  return instances
}

describe('PawRating', () => {
  beforeEach(() => {
    mockReducedMotion(false)
  })

  afterEach(() => {
    // Ripristina i timer reali anche se un test fallisce a metà, così i fake
    // timer non filtrano al test successivo.
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('marks exactly `value` paws as filled and labels the group', () => {
    installIO()
    const { container } = render(<PawRating value={4} label="4 su 5" />)

    expect(container.querySelectorAll('[data-paw]')).toHaveLength(4)
    expect(container.querySelector('[aria-label="4 su 5"]')).toBeInTheDocument()
  })

  it('pops the paws in when the element enters the viewport', () => {
    vi.useFakeTimers()
    const instances = installIO()

    const { container } = render(<PawRating value={5} label="5 su 5" />)
    const el = container.querySelector('[aria-label="5 su 5"]')!

    // Un'entry non intersecante viene ignorata (ramo `continue`).
    instances[0].trigger([{ isIntersecting: false, target: el }])
    instances[0].trigger([{ isIntersecting: true, target: el }])
    vi.advanceTimersByTime(120 + 4 * 130)

    const paws = container.querySelectorAll<HTMLElement>('[data-paw]')
    paws.forEach((paw) => expect(paw.style.animation).toContain('om-pop'))
    expect(instances[0].unobserve).toHaveBeenCalledOnce()
  })

  it('reveals paws immediately when reduced motion is preferred', () => {
    mockReducedMotion(true)

    const { container } = render(<PawRating value={3} label="3 su 5" />)

    const filled = container.querySelectorAll<HTMLElement>('[data-paw]')
    expect(filled).toHaveLength(3)
    filled.forEach((paw) => expect(paw.style.transform).toBe('scale(1)'))
  })
})
