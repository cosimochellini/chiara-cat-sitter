import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Contatti } from './Contatti'

const ACCESS_KEY = 'test-access-key'

// Compila i campi obbligatori così il submit non viene bloccato dalla validazione.
async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Il tuo nome'), 'Martina')
  await user.type(screen.getByLabelText('La tua email'), 'martina@esempio.it')
  await user.type(screen.getByLabelText('Il tuo telefono'), '333 123 4567')
  await user.type(screen.getByLabelText('Il nome del gatto (il vero cliente)'), 'Daisy')
  await user.type(screen.getByLabelText('Messaggio'), 'Ciao!')
}

describe('Contatti', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', ACCESS_KEY)
    // Reduced motion: il wrapper Reveal resta subito visibile (senza opacity:0
    // in attesa dell'IntersectionObserver), così toBeVisible è affidabile.
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({ matches: true, media: query }) as unknown as MediaQueryList,
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the required fields and the submit button', () => {
    render(<Contatti />)

    expect(screen.getByLabelText('Il tuo nome')).toBeRequired()
    expect(screen.getByLabelText('La tua email')).toBeRequired()
    expect(screen.getByLabelText('Il tuo telefono')).toBeRequired()
    expect(screen.getByLabelText('Il nome del gatto (il vero cliente)')).toBeRequired()
    expect(screen.getByLabelText('Messaggio')).toBeRequired()
    expect(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' })).toBeEnabled()
  })

  it('shows the "add another cat" button in the idle state', () => {
    render(<Contatti />)

    expect(
      screen.getByRole('button', { name: 'Ho anche un altro micetto' }),
    ).toBeVisible()
  })

  it('reveals an extra cat field when the add button is clicked', async () => {
    const user = userEvent.setup()
    render(<Contatti />)

    await user.click(
      screen.getByRole('button', { name: 'Ho anche un altro micetto' }),
    )

    expect(screen.getByLabelText('Il nome del secondo gatto')).toBeRequired()
  })

  it('caps the cats at five total and hides the add button', async () => {
    const user = userEvent.setup()
    render(<Contatti />)

    const addBtn = () =>
      screen.queryByRole('button', { name: 'Ho anche un altro micetto' })

    for (let i = 0; i < 4; i++) {
      await user.click(addBtn()!)
    }

    expect(screen.getByLabelText('Il nome del secondo gatto')).toBeVisible()
    expect(screen.getByLabelText('Il nome del quinto gatto')).toBeVisible()
    expect(addBtn()).not.toBeInTheDocument()
  })

  it('removes an extra cat field and brings the add button back', async () => {
    const user = userEvent.setup()
    render(<Contatti />)

    for (let i = 0; i < 4; i++) {
      await user.click(
        screen.getByRole('button', { name: 'Ho anche un altro micetto' }),
      )
    }

    await user.click(screen.getByRole('button', { name: 'Rimuovi il secondo gatto' }))

    expect(screen.queryByLabelText('Il nome del quinto gatto')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ho anche un altro micetto' }),
    ).toBeVisible()
  })

  it('submits the extra cat names in the payload', async () => {
    const fetchMock = vi.fn(async () => ({ json: async () => ({ success: true }) }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<Contatti />)
    await fillForm(user)
    await user.click(
      screen.getByRole('button', { name: 'Ho anche un altro micetto' }),
    )
    await user.type(screen.getByLabelText('Il nome del secondo gatto'), 'Briciola')
    await user.click(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' }))

    await screen.findByRole('status')
    const [, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      { body: FormData },
    ]
    expect(init.body.get('gatto')).toBe('Daisy')
    expect(init.body.get('gatto2')).toBe('Briciola')
  })

  it('logs an error and shows the error state when the access key is missing', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '')
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<Contatti />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' }))

    expect(await screen.findByRole('alert')).toBeVisible()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(consoleError).toHaveBeenCalledOnce()
  })

  it('shows the sending state while the request is in flight', async () => {
    let resolveFetch: (value: unknown) => void = () => {}
    const fetchMock = vi.fn(
      () => new Promise((resolve) => { resolveFetch = resolve }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<Contatti />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' }))

    const sendingBtn = await screen.findByRole('button', { name: 'Invio… 🐾' })
    expect(sendingBtn).toBeDisabled()

    resolveFetch({ json: async () => ({ success: true }) })
    expect(await screen.findByText('Miao ricevuto!')).toBeVisible()
  })

  it('shows the success panel on a successful submission and can reset to the form', async () => {
    const fetchMock = vi.fn(async () => ({ json: async () => ({ success: true }) }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<Contatti />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' }))

    const status = await screen.findByRole('status')
    expect(status).toHaveTextContent('Miao ricevuto!')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({ method: 'POST' }),
    )
    // Il body FormData contiene la access key.
    const [, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      { body: FormData },
    ]
    expect(init.body.get('access_key')).toBe(ACCESS_KEY)

    // Il reset riporta al form.
    await user.click(screen.getByRole('button', { name: 'Invia un altro messaggio' }))
    expect(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' })).toBeVisible()
  })

  it('shows the error state when Web3Forms reports failure', async () => {
    const fetchMock = vi.fn(async () => ({ json: async () => ({ success: false }) }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<Contatti />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('il miao non è partito')
  })

  it('shows the error state when the request throws', async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error('network down')
    })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<Contatti />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Inviami il messaggio 🐾' }))

    await waitFor(() => expect(screen.getByRole('alert')).toBeVisible())
  })
})
