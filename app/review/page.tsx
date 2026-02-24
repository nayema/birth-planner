'use client';

import React, { useState } from 'react';
import { usePreferences } from '@/lib/store';
import { PDFPreview } from '@/components/PDFPreview';
import { generatePDF } from '@/lib/pdfGenerator';
import { Download, ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ReviewPage() {
  const { state } = usePreferences();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const hasSelections = 
    state.stage1.some(p => p.checked) ||
    state.stage2.some(p => p.checked) ||
    state.stage3.some(p => p.checked) ||
    state.stage4.some(p => p.checked);

  return (
    <div className="min-h-screen bg-lavender">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-primary">Review Your Birth Plan</h1>
            <Link
              href="/stage4"
              className="flex items-center gap-2 px-4 py-2 text-slate-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
          <p className="text-slate-muted">
            Review your selections and download your birth preferences as a PDF
          </p>
        </div>

        {!hasSelections ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-primary/10">
            <p className="text-slate-muted mb-6">You haven&apos;t selected any preferences yet.</p>
            <Link
              href="/stage1"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-accent text-white hover:bg-accent-hover transition-all duration-200"
            >
              <Edit size={18} />
              Start Planning
            </Link>
          </div>
        ) : (
          <>
            {/* PDF Preview */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 overflow-x-auto border border-primary/10">
              <PDFPreview state={state} />
            </div>

            {/* Download Button - Warm Coral accent */}
            <div className="flex justify-center">
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white
                  transition-all duration-200 shadow-lg hover:shadow-xl
                  ${isGenerating 
                    ? 'bg-slate-soft cursor-not-allowed' 
                    : 'bg-accent hover:bg-accent-hover'
                  }
                `}
              >
                <Download size={20} />
                {isGenerating ? 'Generating PDF...' : 'Download PDF'}
              </button>
            </div>

            {/* Edit Options */}
            <div className="mt-8 flex justify-center gap-4">
              {[1, 2, 3, 4].map((stage) => (
                <Link
                  key={stage}
                  href={`/stage${stage}`}
                  className="px-4 py-2 text-sm font-medium text-slate-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  Edit Stage {stage}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
