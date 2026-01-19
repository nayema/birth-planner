import { generatePDF } from '@/lib/pdfGenerator'
import { BirthPlanState } from '@/types'
import { getInitialPreferences } from '@/lib/preferences'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Mock the DOM element
const mockElement = {
  scrollWidth: 800,
  scrollHeight: 600,
  getBoundingClientRect: () => ({
    width: 800,
    height: 600,
    top: 0,
    left: 0,
  }),
} as HTMLElement

describe('pdfGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock getElementById
    document.getElementById = jest.fn(() => mockElement)
  })

  const mockState: BirthPlanState = {
    stage1: [
      { id: 'test-1', label: 'Test Preference', icon: 'Heart', checked: true },
    ],
    stage2: getInitialPreferences('stage2'),
    stage3: getInitialPreferences('stage3'),
    stage4: getInitialPreferences('stage4'),
  }

  it('generates PDF successfully', async () => {
    await expect(generatePDF()).resolves.not.toThrow()
  })

  it('finds pdf-content element', async () => {
    await generatePDF()
    expect(document.getElementById).toHaveBeenCalledWith('pdf-content')
  })

  it('throws error when element not found', async () => {
    ;(document.getElementById as jest.Mock).mockReturnValue(null)
    await expect(generatePDF()).rejects.toThrow('PDF content element not found')
  })

  it('calls html2canvas with correct options', async () => {
    await generatePDF()
    expect(html2canvas).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
    )
  })

  it('creates jsPDF instance with landscape orientation', async () => {
    await generatePDF()
    expect(jsPDF).toHaveBeenCalledWith(
      expect.objectContaining({
        orientation: 'landscape',
        unit: 'px',
        format: expect.any(Array),
      })
    )
  })

  it('calls pdf.save with correct filename', async () => {
    const mockPdfInstance = {
      addImage: jest.fn(),
      save: jest.fn(),
    }
    ;(jsPDF as jest.Mock).mockReturnValue(mockPdfInstance)

    await generatePDF()
    expect(mockPdfInstance.save).toHaveBeenCalledWith('birth-preferences.pdf')
  })

  it('handles canvas conversion correctly', async () => {
    const mockCanvas = {
      toDataURL: jest.fn(() => 'data:image/png;base64,test'),
      width: 800,
      height: 600,
    }
    ;(html2canvas as jest.Mock).mockResolvedValue(mockCanvas)

    const mockPdfInstance = {
      addImage: jest.fn(),
      save: jest.fn(),
    }
    ;(jsPDF as jest.Mock).mockReturnValue(mockPdfInstance)

    await generatePDF()
    expect(mockPdfInstance.addImage).toHaveBeenCalled()
  })
})
