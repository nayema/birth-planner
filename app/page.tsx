'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Baby, Home as HomeIcon, Building2, ClipboardList } from 'lucide-react';
import type { BirthType } from '@/types';

const BIRTH_TYPES: { value: BirthType; label: string; icon: typeof HomeIcon; bgColor: string; iconColor: string }[] = [
  { value: 'Home Birth', label: 'Home Birth', icon: HomeIcon, bgColor: 'bg-primary/15', iconColor: 'text-primary' },
  { value: 'C-Section', label: 'C-Section', icon: ClipboardList, bgColor: 'bg-primary/15', iconColor: 'text-primary' },
  { value: 'Hospital', label: 'Hospital', icon: Building2, bgColor: 'bg-primary/15', iconColor: 'text-primary' },
];

const VALID_BIRTH_TYPES: BirthType[] = ['Home Birth', 'C-Section', 'Hospital'];

function HomeContent() {
  const searchParams = useSearchParams();
  const birthTypeParam = searchParams.get('birthType');
  const selectedBirthType = VALID_BIRTH_TYPES.includes(birthTypeParam as BirthType) ? (birthTypeParam as BirthType) : null;
  const canGetStarted = Boolean(selectedBirthType);

  return (
    <div className="min-h-screen bg-lavender">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
              <Baby className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Birth Planner
          </h1>
          <p className="text-base md:text-lg text-slate-muted mb-1">
            Create your personalized birth preferences plan
          </p>
          <p className="text-base md:text-lg text-slate-muted">
            Your voice matters. Plan your ideal birth experience.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-primary/10">
          <h2 className="text-xl font-semibold text-primary mb-1 text-center">
            Where do you plan to give birth?
          </h2>
          <p className="text-sm text-slate-muted text-center mb-8">
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
                    flex flex-col items-center p-6 rounded-xl transition-all duration-200
                    border hover:shadow-md text-left no-underline
                    ${isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 bg-white hover:border-primary/30'
                    }
                  `}
                  aria-current={isSelected ? 'true' : undefined}
                  aria-label={`Select ${option.label}`}
                >
                  <div className={`w-16 h-16 rounded-lg ${option.bgColor} mb-4 flex items-center justify-center transition-transform ${isSelected ? 'scale-105' : ''}`}>
                    <option.icon className={option.iconColor} size={28} />
                  </div>
                  <span className={`text-base font-medium ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                    {option.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Get Started button - Warm Coral accent */}
        <div className="text-center mb-12">
          {canGetStarted ? (
            <Link
              href={`/stage1?birthType=${encodeURIComponent(selectedBirthType!)}`}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-white text-lg shadow-md hover:shadow-lg transition-all no-underline bg-accent hover:bg-accent-hover"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          ) : (
            <span
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-slate-soft text-lg bg-slate-200 cursor-not-allowed"
              aria-disabled
            >
              Get Started
              <ArrowRight size={20} />
            </span>
          )}
        </div>

        {/* Inspirational quote */}
        <blockquote className="text-center text-primary italic text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          &ldquo;Empower yourself with information and advocate for the birth experience you deserve through informed consent.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-lavender flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
