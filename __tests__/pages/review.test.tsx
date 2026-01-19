import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ReviewPage from '@/app/review/page'
import { PreferencesProvider } from '@/lib/store'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

// Mock PDF generator
jest.mock('@/lib/pdfGenerator', () => ({
  generatePDF: jest.fn(() => Promise.resolve()),
}))

const renderWithProvider = (component: React.ReactElement) => {
  return render(<PreferencesProvider>{component}</PreferencesProvider>)
}

describe('ReviewPage', () => {
  it('renders review title', () => {
    renderWithProvider(<ReviewPage />)
    expect(screen.getByText('Review Your Birth Plan')).toBeInTheDocument()
  })

  it('shows message when no preferences selected', () => {
    renderWithProvider(<ReviewPage />)
    expect(
      screen.getByText(/You haven't selected any preferences yet/i)
    ).toBeInTheDocument()
  })

  it('shows start planning link when no selections', () => {
    renderWithProvider(<ReviewPage />)
    expect(screen.getByText('Start Planning')).toBeInTheDocument()
  })

  it('renders PDF preview when preferences are selected', async () => {
    const TestComponent = () => {
      const { usePreferences } = require('@/lib/store')
      const { updatePreference } = usePreferences()
      React.useEffect(() => {
        updatePreference('stage1', 'no-drugs', true)
      }, [updatePreference])
      return <ReviewPage />
    }

    renderWithProvider(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Birth Preferences')).toBeInTheDocument()
    })
  })

  it('renders download PDF button when selections exist', async () => {
    const TestComponent = () => {
      const { usePreferences } = require('@/lib/store')
      const { updatePreference } = usePreferences()
      React.useEffect(() => {
        updatePreference('stage1', 'no-drugs', true)
      }, [updatePreference])
      return <ReviewPage />
    }

    renderWithProvider(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Download PDF')).toBeInTheDocument()
    })
  })

  it('calls generatePDF when download button is clicked', async () => {
    const { generatePDF } = require('@/lib/pdfGenerator')
    const TestComponent = () => {
      const { usePreferences } = require('@/lib/store')
      const { updatePreference } = usePreferences()
      React.useEffect(() => {
        updatePreference('stage1', 'no-drugs', true)
      }, [updatePreference])
      return <ReviewPage />
    }

    renderWithProvider(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    await waitFor(() => {
      const downloadButton = screen.getByText('Download PDF')
      fireEvent.click(downloadButton)
    })

    await waitFor(() => {
      expect(generatePDF).toHaveBeenCalled()
    })
  })

  it('shows edit stage links', async () => {
    const TestComponent = () => {
      const { usePreferences } = require('@/lib/store')
      const { updatePreference } = usePreferences()
      React.useEffect(() => {
        updatePreference('stage1', 'no-drugs', true)
      }, [updatePreference])
      return <ReviewPage />
    }

    renderWithProvider(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Edit Stage 1')).toBeInTheDocument()
      expect(screen.getByText('Edit Stage 2')).toBeInTheDocument()
      expect(screen.getByText('Edit Stage 3')).toBeInTheDocument()
      expect(screen.getByText('Edit Stage 4')).toBeInTheDocument()
    })
  })
})
