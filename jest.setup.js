// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Ensure we're using React in development mode for tests
// This prevents "act(...) is not supported in production builds" errors
if (typeof process !== 'undefined') {
  process.env.NODE_ENV = 'test'
}

// Suppress React act warnings in tests (they're expected in test environment)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('act(...) is not supported in production builds')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock html2canvas
jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      toDataURL: jest.fn(() => 'data:image/png;base64,mock-image-data'),
      width: 800,
      height: 600,
    })
  ),
}))

// Mock jsPDF
jest.mock('jspdf', () => {
  const mockPdf = {
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    setFont: jest.fn(),
    text: jest.fn(),
    setDrawColor: jest.fn(),
    setLineWidth: jest.fn(),
    line: jest.fn(),
    setFillColor: jest.fn(),
    roundedRect: jest.fn(),
    setLineWidth: jest.fn(),
    addImage: jest.fn(),
    save: jest.fn(),
    internal: {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297,
      },
    },
  }
  return jest.fn(() => mockPdf)
})
