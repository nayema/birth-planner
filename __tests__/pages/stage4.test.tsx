import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Stage4Page from '@/app/stage4/page'
import { PreferencesProvider } from '@/lib/store'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(<PreferencesProvider>{component}</PreferencesProvider>)
}

describe('Stage4Page', () => {
  it('renders stage title', () => {
    renderWithProvider(<Stage4Page />)
    expect(screen.getByText('Stage 4: Newborn')).toBeInTheDocument()
  })

  it('renders all stage4 preferences', () => {
    renderWithProvider(<Stage4Page />)
    expect(screen.getByText(/Breastcrawl to initiate breastfeeding/i)).toBeInTheDocument()
    expect(screen.getByText(/No Formula/i)).toBeInTheDocument()
  })

  it('allows toggling preferences', () => {
    renderWithProvider(<Stage4Page />)
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    expect(firstCheckbox).not.toBeChecked()
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
  })

  it('renders navigation buttons', () => {
    renderWithProvider(<Stage4Page />)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
  })
})
