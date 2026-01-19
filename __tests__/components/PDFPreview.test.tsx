import React from 'react'
import { render, screen } from '@testing-library/react'
import { PDFPreview } from '@/components/PDFPreview'
import { BirthPlanState } from '@/types'
import { getInitialPreferences } from '@/lib/preferences'

describe('PDFPreview', () => {
  const mockState: BirthPlanState = {
    stage1: [
      { id: 'test-1', label: 'Test Preference 1', icon: 'Heart', checked: true },
      { id: 'test-2', label: 'Test Preference 2', icon: 'Baby', checked: false },
    ],
    stage2: getInitialPreferences('stage2'),
    stage3: getInitialPreferences('stage3'),
    stage4: getInitialPreferences('stage4'),
  }

  it('renders birth preferences title', () => {
    render(<PDFPreview state={mockState} />)
    expect(screen.getByText('Birth Preferences')).toBeInTheDocument()
  })

  it('renders birth parent when provided', () => {
    const stateWithParent = { ...mockState, birthParent: 'Jane Doe' }
    render(<PDFPreview state={stateWithParent} />)
    expect(screen.getByText(/Birth Parent:/)).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders birth partner when provided', () => {
    const stateWithPartner = { ...mockState, birthPartner: 'John Doe' }
    render(<PDFPreview state={stateWithPartner} />)
    expect(screen.getByText(/Birth Partner:/)).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('does not render birth parent when not provided', () => {
    render(<PDFPreview state={mockState} />)
    expect(screen.queryByText(/Birth Parent:/)).not.toBeInTheDocument()
  })

  it('renders all stage titles', () => {
    render(<PDFPreview state={mockState} />)
    expect(screen.getByText('Stage 1: Labour')).toBeInTheDocument()
    expect(screen.getByText('Stage 2: Birthing')).toBeInTheDocument()
    expect(screen.getByText('Stage 3: Placenta')).toBeInTheDocument()
    expect(screen.getByText('Newborn')).toBeInTheDocument()
  })

  it('renders only checked preferences', () => {
    render(<PDFPreview state={mockState} />)
    expect(screen.getByText('Test Preference 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Preference 2')).not.toBeInTheDocument()
  })

  it('renders icons for preferences', () => {
    const { container } = render(<PDFPreview state={mockState} />)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('handles bottle icon from lab package', () => {
    const stateWithBottle = {
      ...mockState,
      stage4: [{ id: 'bottle', label: 'No Formula', icon: 'Bottle', checked: true }],
    }
    const { container } = render(<PDFPreview state={stateWithBottle} />)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('has correct id for PDF generation', () => {
    const { container } = render(<PDFPreview state={mockState} />)
    const pdfContent = container.querySelector('#pdf-content')
    expect(pdfContent).toBeInTheDocument()
  })
})
