'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Baby, Home as HomeIcon, Building2, Stethoscope } from 'lucide-react';
import type { BirthType } from '@/types';

const BIRTH_TYPES: { value: BirthType; label: string; icon: typeof HomeIcon; bgColor: string; iconColor: string }[] = [
  { value: 'Home Birth', label: 'Home Birth', icon: HomeIcon, bgColor: 'bg-pink-100', iconColor: 'text-pink-600' },
  { value: 'C-Section', label: 'C-Section', icon: Stethoscope, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  { value: 'Hospital', label: 'Hospital', icon: Building2, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
];

const VALID_BIRTH_TYPES: BirthType[] = ['Home Birth', 'C-Section', 'Hospital'];

function HomeContent() {
  const searchParams = useSearchParams();
  const birthTypeParam = searchParams.get('birthType');
  const selectedBirthType = VALID_BIRTH_TYPES.includes(birthTypeParam as BirthType) ? (birthTypeParam as BirthType) : null;
  const canGetStarted = Boolean(selectedBirthType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center">
              <Baby className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Birth Planner
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Create your personalized birth preferences plan
          </p>
          <p className="text-gray-500">
            Your voice matters. Plan your ideal birth experience.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            Where do you plan to give birth?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Choose one option to get started
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {BIRTH_TYPES.map((option) => {
              const isSelected = selectedBirthType === option.value;
              return (
                <Link
                  key={option.value}
                  href={`/?birthType=${encodeURIComponent(option.value)}`}
                  className={`
                    flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200
                    hover:shadow-md text-left no-underline
                    ${isSelected
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-pink-200'
                    }
                  `}
                  aria-current={isSelected ? 'true' : undefined}
                  aria-label={`Select ${option.label}`}
                >
                  <div className={`w-16 h-16 rounded-full ${option.bgColor} mb-4 flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}>
                    <option.icon className={option.iconColor} size={28} />
                  </div>
                  <span className={`text-lg font-semibold ${isSelected ? 'text-pink-700' : 'text-gray-800'}`}>
                    {option.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          {canGetStarted ? (
            <Link
              href={`/stage1?birthType=${encodeURIComponent(selectedBirthType)}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 text-lg bg-pink-500 hover:bg-pink-600 shadow-lg hover:shadow-xl no-underline"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          ) : (
            <span
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-gray-500 transition-all duration-200 text-lg bg-gray-300 cursor-not-allowed"
              aria-disabled
            >
              Get Started
              <ArrowRight size={20} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
