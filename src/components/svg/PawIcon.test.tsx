import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PawIcon } from './PawIcon'

describe('PawIcon', () => {
  it('is an accessible image when a title is provided', () => {
    render(<PawIcon title="Zampetta" />)

    const icon = screen.getByRole('img', { name: 'Zampetta' })
    expect(icon).toBeInTheDocument()
    expect(icon).not.toHaveAttribute('aria-hidden')
  })

  it('is decorative (aria-hidden) when no title is provided', () => {
    const { container } = render(<PawIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAttribute('role')
  })
})
