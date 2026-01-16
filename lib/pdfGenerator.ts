import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BirthPlanState } from '@/types';
import * as Icons from 'lucide-react';

export async function generatePDF(state: BirthPlanState): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  const contentHeight = pageHeight - 2 * margin;

  // Colors
  const colors = {
    pink: { bg: [255, 240, 245], border: [255, 182, 193] },
    blue: { bg: [240, 248, 255], border: [173, 216, 230] },
    purple: { bg: [248, 240, 255], border: [221, 192, 227] },
    yellow: { bg: [255, 252, 240], border: [255, 235, 153] },
  };

  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(51, 51, 51);
  pdf.text('Birth Preferences', margin, margin + 10);

  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  let yPos = margin + 20;
  
  if (state.birthParent) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Birth Parent:', margin, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(state.birthParent, margin + 35, yPos);
    yPos += 7;
  }
  
  if (state.birthPartner) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Birth Partner:', margin, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(state.birthPartner, margin + 35, yPos);
    yPos += 7;
  }

  // Draw line
  pdf.setDrawColor(255, 182, 193);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos + 3, pageWidth - margin, yPos + 3);
  yPos += 10;

  // Calculate column widths
  const columnWidth = (contentWidth - 9) / 4; // 4 columns with 3px gaps
  const startY = yPos;

  // Stage 1: Labour
  renderStageColumn(
    pdf,
    margin,
    startY,
    columnWidth,
    contentHeight - (startY - margin),
    'Stage 1: Labour',
    state.stage1,
    colors.pink
  );

  // Stage 2: Birthing
  renderStageColumn(
    pdf,
    margin + columnWidth + 3,
    startY,
    columnWidth,
    contentHeight - (startY - margin),
    'Stage 2: Birthing',
    state.stage2,
    colors.blue
  );

  // Stage 3: Placenta
  renderStageColumn(
    pdf,
    margin + 2 * (columnWidth + 3),
    startY,
    columnWidth,
    contentHeight - (startY - margin),
    'Stage 3: Placenta',
    state.stage3,
    colors.purple
  );

  // Stage 4: Newborn
  renderStageColumn(
    pdf,
    margin + 3 * (columnWidth + 3),
    startY,
    columnWidth,
    contentHeight - (startY - margin),
    'Newborn',
    state.stage4,
    colors.yellow
  );

  // Save PDF
  pdf.save('birth-preferences.pdf');
}

function renderStageColumn(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  preferences: Array<{ id: string; label: string; icon: string; checked: boolean }>,
  color: { bg: number[]; border: number[] }
) {
  // Background
  pdf.setFillColor(color.bg[0], color.bg[1], color.bg[2]);
  pdf.roundedRect(x, y, width, height, 3, 3, 'F');

  // Border
  pdf.setDrawColor(color.border[0], color.border[1], color.border[2]);
  pdf.setLineWidth(1);
  pdf.roundedRect(x, y, width, height, 3, 3);

  // Title
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text(title, x + 5, y + 8);

  // Preferences
  let currentY = y + 15;
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(70, 70, 70);

  const checkedPreferences = preferences.filter(p => p.checked);
  
  checkedPreferences.forEach((pref) => {
    if (currentY > y + height - 10) return; // Don't overflow

    // Icon placeholder (small circle)
    pdf.setFillColor(color.border[0], color.border[1], color.border[2]);
    pdf.circle(x + 7, currentY, 1.5, 'F');

    // Text
    const textX = x + 12;
    const maxWidth = width - 15;
    const lines = pdf.splitTextToSize(pref.label, maxWidth);
    
    lines.forEach((line: string, idx: number) => {
      if (currentY > y + height - 10) return;
      pdf.text(line, textX, currentY);
      currentY += idx === lines.length - 1 ? 5 : 4;
    });
  });
}
