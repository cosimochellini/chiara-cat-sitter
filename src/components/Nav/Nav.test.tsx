import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Nav } from './Nav'
import styles from './Nav.module.css'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({ matches, media: query }) as unknown as MediaQueryList,
  )
}

describe('Nav', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('marks only the flagged link as hidden on mobile', () => {
    mockReducedMotion(false)
    render(<Nav />)

    expect(screen.getByRole('link', { name: 'Chi sono' })).toHaveClass(
      styles.hideMobile,
    )
    expect(screen.getByRole('link', { name: 'Servizi' })).not.toHaveClass(
      styles.hideMobile,
    )
  })

  it('does not show the nyan cat before the easter egg triggers', () => {
    mockReducedMotion(false)
    const { container } = render(<Nav />)

    expect(container.textContent).not.toContain('✦')
  })

  it('launches the nyan cat after five mascot clicks', async () => {
    mockReducedMotion(false)
    const user = userEvent.setup()
    const { container } = render(<Nav />)

    const mascotte = screen.getByRole('button', { name: /mascotte/i })
    for (let i = 0; i < 5; i++) await user.click(mascotte)

    expect(container.textContent).toContain('✦')
  })
})
