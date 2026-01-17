'use client';

import React from 'react';
import { BirthPlanState } from '@/types';
import * as Icons from 'lucide-react';

interface PDFPreviewProps {
  state: BirthPlanState;
}

export function PDFPreview({ state }: PDFPreviewProps) {
  const iconMap: Record<string, keyof typeof Icons> = {
    'Syringe': 'Syringe',
    'Droplet': 'Droplet',
    'Droplets': 'Droplet',
    'Lightbulb': 'Lightbulb',
    'Activity': 'Activity',
    'Coffee': 'Coffee',
    'Thermometer': 'Thermometer',
    'Scissors': 'Scissors',
    'Megaphone': 'Megaphone',
    'User': 'User',
    'Heart': 'Heart',
    'Crown': 'Crown',
    'Circle': 'Circle',
    'Users': 'Users',
    'Sprout': 'Sprout',
    'Baby': 'Baby',
    'Beaker': 'Beaker',
    'Stethoscope': 'Stethoscope',
    'Eye': 'Eye',
    'Bottle': 'Beaker',
  };

  const renderPreference = (pref: { id: string; label: string; icon: string; checked: boolean }) => {
    if (!pref.checked) return null;
    
    const iconName = iconMap[pref.icon] || 'Circle';
    const IconComponent = (Icons as any)[iconName] || Icons.Circle;
    
    return (
      <div key={pref.id} className="flex items-start gap-2 mb-2 text-sm">
        <div className="mt-1 text-pink-600 flex-shrink-0">
          <IconComponent size={16} />
        </div>
        <span className="text-gray-700 leading-relaxed">{pref.label}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto" id="pdf-content" style={{ width: '100%' }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-pink-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Birth Preferences</h1>
        {state.birthParent && (
          <p className="text-gray-700">
            <span className="font-semibold">Birth Parent:</span> {state.birthParent}
          </p>
        )}
        {state.birthPartner && (
          <p className="text-gray-700">
            <span className="font-semibold">Birth Partner:</span> {state.birthPartner}
          </p>
        )}
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stage 1 */}
        <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
          <h2 className="font-bold text-lg mb-3 text-gray-900">Stage 1: Labour</h2>
          <div className="space-y-1">
            {state.stage1.map(renderPreference)}
          </div>
        </div>

        {/* Stage 2 */}
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <h2 className="font-bold text-lg mb-3 text-gray-900">Stage 2: Birthing</h2>
          <div className="space-y-1">
            {state.stage2.map(renderPreference)}
          </div>
        </div>

        {/* Stage 3 */}
        <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
          <h2 className="font-bold text-lg mb-3 text-gray-900">Stage 3: Placenta</h2>
          <div className="space-y-1">
            {state.stage3.map(renderPreference)}
          </div>
        </div>

        {/* Stage 4 */}
        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
          <h2 className="font-bold text-lg mb-3 text-gray-900">Newborn</h2>
          <div className="space-y-1">
            {state.stage4.map(renderPreference)}
          </div>
        </div>
      </div>
    </div>
  );
}
