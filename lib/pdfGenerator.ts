import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(): Promise<void> {
  // Find the PDF preview element by its ID
  const element = document.getElementById('pdf-content');
  
  if (!element) {
    throw new Error('PDF content element not found');
  }

  // Use html2canvas to capture the element with all its styling and icons
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: element.scrollWidth,
    height: element.scrollHeight,
  });

  // Calculate PDF dimensions
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  
  // A4 landscape dimensions in pixels (at 96 DPI)
  const pdfWidth = 1123; // A4 landscape width in pixels
  const pdfHeight = 794; // A4 landscape height in pixels
  
  // Calculate scaling to fit content
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;

  // Create PDF in landscape orientation
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [pdfWidth, pdfHeight],
  });

  // Convert canvas to image data
  const imgData = canvas.toDataURL('image/png');

  // Add image to PDF
  pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

  // Save PDF
  pdf.save('birth-preferences.pdf');
}
