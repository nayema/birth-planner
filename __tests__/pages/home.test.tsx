import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock useSearchParams - override jest.setup's mock for configurable behavior
let mockBirthType: string | null = null
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: (key: string) => (key === 'birthType' ? mockBirthType : null),
  }),
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

describe('Home page', () => {
  beforeEach(() => {
    mockBirthType = null
  })

  it('renders Birth Planner title', () => {
    render(<Home />)
    expect(screen.getByText('Birth Planner')).toBeInTheDocument()
  })

  it('renders subtitle and description', () => {
    render(<Home />)
    expect(screen.getByText(/Create your personalized birth preferences plan/i)).toBeInTheDocument()
    expect(screen.getByText(/Your voice matters/i)).toBeInTheDocument()
  })

  it('renders birth type question', () => {
    render(<Home />)
    expect(screen.getByText('Where do you plan to give birth?')).toBeInTheDocument()
    expect(screen.getByText(/Choose one option to get started/i)).toBeInTheDocument()
  })

  it('renders all three birth type options', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: 'Home Birth' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'C-Section' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Hospital' })).toBeInTheDocument()
  })

  it('option links have correct hrefs for selection', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: 'Home Birth' })).toHaveAttribute(
      'href',
      '/?birthType=Home%20Birth'
    )
    expect(screen.getByRole('link', { name: 'C-Section' })).toHaveAttribute(
      'href',
      '/?birthType=C-Section'
    )
    expect(screen.getByRole('link', { name: 'Hospital' })).toHaveAttribute(
      'href',
      '/?birthType=Hospital'
    )
  })

  it('shows disabled Get Started when no option selected', () => {
    render(<Home />)
    const getStarted = screen.getByText('Get Started')
    expect(getStarted.closest('span')).toHaveAttribute('aria-disabled')
    expect(getStarted.closest('a')).toBeNull()
  })

  it('shows Get Started as link when option is selected via URL', () => {
    mockBirthType = 'C-Section'
    render(<Home />)
    const getStartedLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.includes('stage1'))
    expect(getStartedLinks).toHaveLength(1)
    expect(getStartedLinks[0]).toHaveAttribute('href', '/stage1?birthType=C-Section')
  })

  it('shows Get Started link for Home Birth when selected', () => {
    mockBirthType = 'Home Birth'
    render(<Home />)
    const getStartedLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.includes('stage1'))
    expect(getStartedLinks[0]).toHaveAttribute('href', '/stage1?birthType=Home%20Birth')
  })

  it('shows Get Started link for Hospital when selected', () => {
    mockBirthType = 'Hospital'
    render(<Home />)
    const getStartedLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.includes('stage1'))
    expect(getStartedLinks[0]).toHaveAttribute('href', '/stage1?birthType=Hospital')
  })
})
