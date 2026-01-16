'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentStage: number;
  totalStages: number;
  onNext?: () => void;
  onBack?: () => void;
}

export function NavigationButtons({ currentStage, totalStages, onNext, onBack }: NavigationButtonsProps) {
  const isFirstStage = currentStage === 1;
  const isLastStage = currentStage === totalStages;

  const backPath = isFirstStage ? '/' : `/stage${currentStage - 1}`;
  const nextPath = isLastStage ? '/review' : `/stage${currentStage + 1}`;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <Link
        href={backPath}
        onClick={onBack}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-medium
          transition-all duration-200
          ${isFirstStage 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        <ChevronLeft size={20} />
        Back
      </Link>

      <Link
        href={nextPath}
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {isLastStage ? 'Review' : 'Next'}
        <ChevronRight size={20} />
      </Link>
    </div>
  );
}
