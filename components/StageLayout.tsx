'use client';

import React from 'react';

interface StageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  stageNumber: number;
}

export function StageLayout({ title, description, children, stageNumber }: StageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              {stageNumber}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          {description && (
            <p className="text-gray-600 ml-14 text-lg">{description}</p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
