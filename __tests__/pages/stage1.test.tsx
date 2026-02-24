import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Stage1Page from '@/app/stage1/page'
import { PreferencesProvider } from '@/lib/store'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(<PreferencesProvider>{component}</PreferencesProvider>)
}

describe('Stage1Page', () => {
  it('renders stage title', () => {
    renderWithProvider(<Stage1Page />)
    expect(screen.getByText('Stage 1: Labour')).toBeInTheDocument()
  })

  it('renders all stage1 preferences', () => {
    renderWithProvider(<Stage1Page />)
    // Check for at least one preference from stage1
    expect(screen.getByText(/No drugs offered/i)).toBeInTheDocument()
  })

  it('allows toggling preferences', () => {
    renderWithProvider(<Stage1Page />)
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    expect(firstCheckbox).not.toBeChecked()
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
  })

  it('renders navigation buttons', () => {
    renderWithProvider(<Stage1Page />)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('enables Next button when at least one preference is selected', async () => {
    renderWithProvider(<Stage1Page />)
    const nextButton = screen.getByText('Next')
    // Initially disabled - Next is inside a span
    expect(nextButton.closest('span')).toHaveClass('cursor-not-allowed')

    const firstCheckbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(firstCheckbox)

    // After selecting, Next should become a link (wait for state update)
    await waitFor(() => {
      const link = screen.getByText('Next').closest('a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/stage2')
    })
  })
})
