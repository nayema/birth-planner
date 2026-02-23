import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Stage2Page from '@/app/stage2/page'
import { PreferencesProvider } from '@/lib/store'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(<PreferencesProvider>{component}</PreferencesProvider>)
}

describe('Stage2Page', () => {
  it('renders stage title', () => {
    renderWithProvider(<Stage2Page />)
    expect(screen.getByText('Stage 2: Birthing')).toBeInTheDocument()
  })

  it('renders all stage2 preferences', () => {
    renderWithProvider(<Stage2Page />)
    expect(screen.getByText(/No episiotomy, vacuum or forceps/i)).toBeInTheDocument()
    expect(screen.getByText(/No directed pushing/i)).toBeInTheDocument()
  })

  it('allows toggling preferences', () => {
    renderWithProvider(<Stage2Page />)
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    expect(firstCheckbox).not.toBeChecked()
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
  })

  it('renders navigation buttons', () => {
    renderWithProvider(<Stage2Page />)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
})
