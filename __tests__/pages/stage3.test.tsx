import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Stage3Page from '@/app/stage3/page'
import { PreferencesProvider } from '@/lib/store'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(<PreferencesProvider>{component}</PreferencesProvider>)
}

describe('Stage3Page', () => {
  it('renders stage title', () => {
    renderWithProvider(<Stage3Page />)
    expect(screen.getByText('Stage 3: Placenta')).toBeInTheDocument()
  })

  it('renders all stage3 preferences', () => {
    renderWithProvider(<Stage3Page />)
    expect(screen.getByText(/Physiological birth of placenta/i)).toBeInTheDocument()
  })

  it('allows toggling preferences', () => {
    renderWithProvider(<Stage3Page />)
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    expect(firstCheckbox).not.toBeChecked()
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
  })

  it('renders navigation buttons', () => {
    renderWithProvider(<Stage3Page />)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
})
