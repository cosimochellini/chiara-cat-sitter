import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useMascotteEasterEgg } from './useMascotteEasterEgg'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

describe('useMascotteEasterEgg', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('launches the nyan layout on the fifth click', () => {
    mockReducedMotion(false)
    const { result } = renderHook(() => useMascotteEasterEgg())

    for (let i = 0; i < 4; i++) act(() => result.current.onMascotteClick())
    expect(result.current.nyanLayout).toBeNull()

    act(() => result.current.onMascotteClick())
    expect(result.current.nyanLayout).not.toBeNull()
    expect(result.current.nyanLayout?.stars).toHaveLength(8)
  })

  it('hideNyan clears the layout', () => {
    mockReducedMotion(false)
    const { result } = renderHook(() => useMascotteEasterEgg())

    for (let i = 0; i < 5; i++) act(() => result.current.onMascotteClick())
    expect(result.current.nyanLayout).not.toBeNull()

    act(() => result.current.hideNyan())
    expect(result.current.nyanLayout).toBeNull()
  })

  it('does nothing when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { result } = renderHook(() => useMascotteEasterEgg())

    for (let i = 0; i < 6; i++) act(() => result.current.onMascotteClick())
    expect(result.current.nyanLayout).toBeNull()
  })
})
