'use client';

import React from 'react';
import { BirthPlanState } from '@/types';
import { Icon, bottleBaby, getPreferenceIcon } from '@/lib/icons';

interface PDFPreviewProps {
  state: BirthPlanState;
}

export function PDFPreview({ state }: PDFPreviewProps) {
  const renderPreference = (pref: { id: string; label: string; icon: string; checked: boolean }) => {
    if (!pref.checked) return null;
    const isBottleIcon = pref.icon === 'Bottle';
    const IconComponent = getPreferenceIcon(pref.icon);
    return (
      <div key={pref.id} className="flex items-start gap-3 mb-3">
        <div className="mt-0.5 text-gray-900 flex-shrink-0">
          {isBottleIcon ? (
            <Icon iconNode={bottleBaby} size={30} strokeWidth={2} />
          ) : (
            <IconComponent size={30} strokeWidth={2} />
          )}
        </div>
        <span className="text-gray-900 leading-relaxed text-sm font-normal">{pref.label}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-5xl mx-auto" id="pdf-content" style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Birth Preferences</h1>
        {state.birthParent && (
          <p className="text-gray-900 text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="font-semibold">Birth Parent:</span> {state.birthParent}
          </p>
        )}
        {state.birthPartner && (
          <p className="text-gray-900 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="font-semibold">Birth Partner:</span> {state.birthPartner}
          </p>
        )}
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stage 1 */}
        <div className="bg-pink-50 rounded-xl p-5 border-2 border-pink-200">
          <h2 className="font-bold text-xl mb-4 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Stage 1: Labour</h2>
          <div className="space-y-0">
            {state.stage1.map(renderPreference)}
          </div>
        </div>

        {/* Stage 2 */}
        <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
          <h2 className="font-bold text-xl mb-4 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Stage 2: Birthing</h2>
          <div className="space-y-0">
            {state.stage2.map(renderPreference)}
          </div>
        </div>

        {/* Stage 3 */}
        <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-200">
          <h2 className="font-bold text-xl mb-4 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Stage 3: Placenta</h2>
          <div className="space-y-0">
            {state.stage3.map(renderPreference)}
          </div>
        </div>

        {/* Stage 4 */}
        <div className="bg-yellow-50 rounded-xl p-5 border-2 border-yellow-200">
          <h2 className="font-bold text-xl mb-4 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Newborn</h2>
          <div className="space-y-0">
            {state.stage4.map(renderPreference)}
          </div>
        </div>
      </div>
    </div>
  );
}
