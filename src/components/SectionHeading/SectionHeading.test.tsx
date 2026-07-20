import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionHeading } from './SectionHeading'
import styles from './SectionHeading.module.css'

describe('SectionHeading', () => {
  it('renders eyebrow and title with the default variant', () => {
    render(<SectionHeading eyebrow="Ciao" title="Titolo" />)

    expect(screen.getByText('Ciao')).toHaveClass(styles.rosa)
    expect(screen.getByRole('heading', { name: 'Titolo' })).toBeInTheDocument()
  })

  it('applies the requested variant and the titleRosa modifier', () => {
    render(
      <SectionHeading
        eyebrow="Ciao"
        title="Titolo"
        variant="biancoVerde"
        titleRosa
      />,
    )

    expect(screen.getByText('Ciao')).toHaveClass(styles.biancoVerde)
    expect(screen.getByRole('heading', { name: 'Titolo' })).toHaveClass(
      styles.titleRosa,
    )
  })

  it('renders the subtitle only when provided', () => {
    const { rerender } = render(
      <SectionHeading eyebrow="Ciao" title="Titolo" subtitle="Sottotitolo" />,
    )
    expect(screen.getByText('Sottotitolo')).toBeInTheDocument()

    rerender(<SectionHeading eyebrow="Ciao" title="Titolo" />)
    expect(screen.queryByText('Sottotitolo')).not.toBeInTheDocument()
  })
})
