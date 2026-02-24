import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PreferenceCard } from '@/components/PreferenceCard'
import { Preference } from '@/types'

describe('PreferenceCard', () => {
  const mockPreference: Preference = {
    id: 'test-preference',
    label: 'Test Preference',
    icon: 'Heart',
    checked: false,
  }

  const mockOnToggle = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders preference label correctly', () => {
    render(<PreferenceCard preference={mockPreference} onToggle={mockOnToggle} />)
    expect(screen.getByText('Test Preference')).toBeInTheDocument()
  })

  it('renders checkbox unchecked by default', () => {
    render(<PreferenceCard preference={mockPreference} onToggle={mockOnToggle} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders checkbox checked when preference is checked', () => {
    const checkedPreference = { ...mockPreference, checked: true }
    render(<PreferenceCard preference={checkedPreference} onToggle={mockOnToggle} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('calls onToggle when checkbox is clicked', () => {
    render(<PreferenceCard preference={mockPreference} onToggle={mockOnToggle} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockOnToggle).toHaveBeenCalledWith('test-preference', true)
  })

  it('applies correct styling when checked', () => {
    const checkedPreference = { ...mockPreference, checked: true }
    const { container } = render(
      <PreferenceCard preference={checkedPreference} onToggle={mockOnToggle} />
    )
    const label = container.querySelector('label')
    expect(label).toHaveClass('border-primary', 'bg-primary/5')
  })

  it('applies correct styling when unchecked', () => {
    const { container } = render(
      <PreferenceCard preference={mockPreference} onToggle={mockOnToggle} />
    )
    const label = container.querySelector('label')
    expect(label).toHaveClass('border-gray-200', 'bg-white')
  })

  it('renders icon correctly', () => {
    const { container } = render(
      <PreferenceCard preference={mockPreference} onToggle={mockOnToggle} />
    )
    const iconContainer = container.querySelector('svg')
    expect(iconContainer).toBeInTheDocument()
  })

  it('handles bottle icon from lab package', () => {
    const bottlePreference = { ...mockPreference, icon: 'Bottle' }
    const { container } = render(
      <PreferenceCard preference={bottlePreference} onToggle={mockOnToggle} />
    )
    const iconContainer = container.querySelector('svg')
    expect(iconContainer).toBeInTheDocument()
  })

  it('is accessible with proper label association', () => {
    render(<PreferenceCard preference={mockPreference} onToggle={mockOnToggle} />)
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Test Preference')
    expect(checkbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })
})
