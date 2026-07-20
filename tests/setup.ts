import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// RTL: smonta l'albero renderizzato dopo ogni test.
afterEach(() => {
  cleanup()
})

// I test `// @vitest-environment node` non hanno il DOM: salta i polyfill.
if (typeof window !== 'undefined') {
// jsdom non implementa queste API browser: le forniamo qui una volta sola.
// Default reduced-motion = false; i singoli test lo sovrascrivono quando serve.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

class MockObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = []
}

if (!('IntersectionObserver' in window)) {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockObserver,
  })
}
if (!('ResizeObserver' in window)) {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockObserver,
  })
}

// Web Animations API: jsdom non la implementa.
if (!Element.prototype.animate) {
  Element.prototype.animate = vi.fn(
    () => ({ cancel: vi.fn(), finished: Promise.resolve() }) as unknown as Animation,
  )
}
if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = vi.fn(() => [])
}

// Altre API DOM assenti in jsdom usate dai componenti.
Element.prototype.scrollIntoView = vi.fn()
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = vi.fn()
  Element.prototype.releasePointerCapture = vi.fn()
  Element.prototype.hasPointerCapture = vi.fn(() => false)
}
}
