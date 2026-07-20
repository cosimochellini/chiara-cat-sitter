import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Reveal } from './Reveal'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

type IOEntry = { isIntersecting: boolean; target: Element }

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

describe('Reveal', () => {
  beforeEach(() => {
    mockReducedMotion(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a div by default, hides content, then reveals on intersection', () => {
    const instances = installIO()

    render(<Reveal>Contenuto</Reveal>)
    const el = screen.getByText('Contenuto')

    expect(el.tagName).toBe('DIV')
    expect(el.style.opacity).toBe('0')

    // Entry non intersecante ignorata, poi ingresso nel viewport.
    instances[0].trigger([{ isIntersecting: false, target: el }])
    expect(el.style.opacity).toBe('0')

    instances[0].trigger([{ isIntersecting: true, target: el }])
    expect(el.style.opacity).toBe('1')
    expect(el.style.transform).toBe('translateY(0)')
    expect(instances[0].unobserve).toHaveBeenCalledOnce()
  })

  it('renders the polymorphic tag and stays visible with reduced motion', () => {
    mockReducedMotion(true)

    render(
      <Reveal as="p" className="tagline">
        Contenuto
      </Reveal>,
    )

    const el = screen.getByText('Contenuto')
    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('tagline')
    expect(el.style.opacity).toBe('')
  })
})
