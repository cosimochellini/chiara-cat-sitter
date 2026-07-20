import { renderHook } from '@testing-library/react'
import type { MouseEvent } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useEarWiggle } from './useEarWiggle'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

function eventWithEars(count: number) {
  const host = document.createElement('div')
  for (let i = 0; i < count; i++) {
    const ear = document.createElement('span')
    ear.setAttribute('data-ear', '')
    host.appendChild(ear)
  }
  return {
    event: { currentTarget: host } as unknown as MouseEvent<HTMLElement>,
    host,
  }
}

describe('useEarWiggle', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('animates every [data-ear] element in normal motion', () => {
    mockReducedMotion(false)
    const { event } = eventWithEars(2)
    const animate = vi.spyOn(Element.prototype, 'animate')

    renderHook(() => useEarWiggle()).result.current(event)

    // Una chiamata per orecchio (l'index pari/dispari sceglie la rotazione).
    expect(animate).toHaveBeenCalledTimes(2)
  })

  it('does nothing when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { event } = eventWithEars(1)
    const animate = vi.spyOn(Element.prototype, 'animate')

    renderHook(() => useEarWiggle()).result.current(event)

    expect(animate).not.toHaveBeenCalled()
  })
})
