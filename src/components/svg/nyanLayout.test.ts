import { describe, expect, it } from 'vitest'
import { makeNyanLayout } from './nyanLayout'

describe('makeNyanLayout', () => {
  it('produces a top position within the expected vh range', () => {
    for (let i = 0; i < 20; i++) {
      const { top } = makeNyanLayout()
      expect(top).toBeGreaterThanOrEqual(15)
      expect(top).toBeLessThan(55)
    }
  })

  it('produces eight sequentially positioned stars with bounded sizes', () => {
    const { stars } = makeNyanLayout()

    expect(stars).toHaveLength(8)
    stars.forEach((star, i) => {
      expect(star.id).toBe(`star-${i}`)
      expect(star.left).toBe(i * 24)
      expect(star.top).toBeGreaterThanOrEqual(-12)
      expect(star.top).toBeLessThanOrEqual(44)
      expect(star.size).toBeGreaterThanOrEqual(10)
      expect(star.size).toBeLessThanOrEqual(20)
    })
  })
})
