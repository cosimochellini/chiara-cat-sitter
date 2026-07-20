import { renderHook } from '@testing-library/react'
import type { MouseEvent } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { usePurr } from './usePurr'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

function fakeEvent() {
  const el = document.createElement('div')
  el.getBoundingClientRect = () =>
    ({ left: 10, top: 20, width: 100, height: 40 }) as DOMRect
  return { currentTarget: el } as unknown as MouseEvent<HTMLElement>
}

describe('usePurr', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  const hearts = () =>
    Array.from(document.body.querySelectorAll('div')).filter(
      (el) => el.textContent === '♥',
    )

  it('spawns three floating hearts in normal motion', () => {
    mockReducedMotion(false)
    const { result } = renderHook(() => usePurr())

    result.current(fakeEvent())

    expect(hearts()).toHaveLength(3)
  })

  it('does nothing when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { result } = renderHook(() => usePurr())

    result.current(fakeEvent())

    expect(hearts()).toHaveLength(0)
  })

  it('removes the hearts after the timeout', () => {
    mockReducedMotion(false)
    const { result } = renderHook(() => usePurr())

    result.current(fakeEvent())
    expect(hearts()).toHaveLength(3)

    vi.advanceTimersByTime(1300)
    expect(hearts()).toHaveLength(0)
  })
})
