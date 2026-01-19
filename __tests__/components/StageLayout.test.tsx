import React from 'react'
import { render, screen } from '@testing-library/react'
import { StageLayout } from '@/components/StageLayout'

describe('StageLayout', () => {
  it('renders title correctly', () => {
    render(
      <StageLayout title="Test Stage" stageNumber={1}>
        <div>Test Content</div>
      </StageLayout>
    )
    expect(screen.getByText('Test Stage')).toBeInTheDocument()
  })

  it('renders stage number correctly', () => {
    render(
      <StageLayout title="Test Stage" stageNumber={3}>
        <div>Test Content</div>
      </StageLayout>
    )
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <StageLayout
        title="Test Stage"
        description="Test Description"
        stageNumber={1}
      >
        <div>Test Content</div>
      </StageLayout>
    )
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(
      <StageLayout title="Test Stage" stageNumber={1}>
        <div>Test Content</div>
      </StageLayout>
    )
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <StageLayout title="Test Stage" stageNumber={1}>
        <div>Test Content</div>
      </StageLayout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = render(
      <StageLayout title="Test Stage" stageNumber={1}>
        <div>Test Content</div>
      </StageLayout>
    )
    const mainDiv = container.querySelector('.min-h-screen')
    expect(mainDiv).toBeInTheDocument()
  })
})
