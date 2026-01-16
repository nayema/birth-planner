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
      await generatePDF(state);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Review Your Birth Plan</h1>
            <Link
              href="/stage4"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
          <p className="text-gray-600">
            Review your selections and download your birth preferences as a PDF
          </p>
        </div>

        {!hasSelections ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-600 mb-6">You haven&apos;t selected any preferences yet.</p>
            <Link
              href="/stage1"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200"
            >
              <Edit size={18} />
              Start Planning
            </Link>
          </div>
        ) : (
          <>
            {/* PDF Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-x-auto">
              <PDFPreview state={state} />
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white
                  transition-all duration-200 shadow-lg hover:shadow-xl
                  ${isGenerating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-pink-500 hover:bg-pink-600'
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
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
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
