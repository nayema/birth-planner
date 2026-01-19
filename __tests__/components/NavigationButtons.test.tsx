import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavigationButtons } from '@/components/NavigationButtons'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, onClick, className }: any) => {
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    )
  }
})

describe('NavigationButtons', () => {
  it('renders back and next buttons', () => {
    render(<NavigationButtons currentStage={2} totalStages={4} />)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('disables back button on first stage', () => {
    render(<NavigationButtons currentStage={1} totalStages={4} />)
    const backButton = screen.getByText('Back').closest('a')
    expect(backButton).toHaveClass('text-gray-400')
    expect(backButton).toHaveClass('cursor-not-allowed')
  })

  it('enables back button on subsequent stages', () => {
    render(<NavigationButtons currentStage={2} totalStages={4} />)
    const backButton = screen.getByText('Back').closest('a')
    expect(backButton).not.toHaveClass('cursor-not-allowed')
  })

  it('shows "Review" text on last stage', () => {
    render(<NavigationButtons currentStage={4} totalStages={4} />)
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('shows "Next" text on non-last stages', () => {
    render(<NavigationButtons currentStage={2} totalStages={4} />)
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.queryByText('Review')).not.toBeInTheDocument()
  })

  it('navigates to correct back path', () => {
    render(<NavigationButtons currentStage={3} totalStages={4} />)
    const backButton = screen.getByText('Back').closest('a')
    expect(backButton).toHaveAttribute('href', '/stage2')
  })

  it('navigates to correct next path', () => {
    render(<NavigationButtons currentStage={2} totalStages={4} />)
    const nextButton = screen.getByText('Next').closest('a')
    expect(nextButton).toHaveAttribute('href', '/stage3')
  })

  it('navigates to review page on last stage', () => {
    render(<NavigationButtons currentStage={4} totalStages={4} />)
    const reviewButton = screen.getByText('Review').closest('a')
    expect(reviewButton).toHaveAttribute('href', '/review')
  })
})
