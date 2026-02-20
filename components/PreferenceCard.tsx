'use client';

import React, { memo } from 'react';
import { Preference } from '@/types';
import { Icon, bottleBaby, getPreferenceIcon } from '@/lib/icons';

interface PreferenceCardProps {
  preference: Preference;
  onToggle: (id: string, checked: boolean) => void;
}

function PreferenceCardInner({ preference, onToggle }: PreferenceCardProps) {
  const isBottleIcon = preference.icon === 'Bottle';
  const IconComponent = getPreferenceIcon(preference.icon);

  return (
    <label
      className={`
        flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-200 hover:shadow-md
        ${preference.checked 
          ? 'border-pink-300 bg-pink-50 shadow-sm' 
          : 'border-gray-200 bg-white hover:border-pink-200'
        }
      `}
    >
      <input
        type="checkbox"
        checked={preference.checked}
        onChange={(e) => onToggle(preference.id, e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500 cursor-pointer"
      />
      <div className="flex items-start gap-3 flex-1">
        <div className={`
          p-2 rounded-lg
          ${preference.checked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'}
        `}>
          {isBottleIcon ? (
            <Icon iconNode={bottleBaby} size={30} />
          ) : (
            <IconComponent size={30} />
          )}
        </div>
        <span className={`
          flex-1 text-sm leading-relaxed
          ${preference.checked ? 'text-gray-800 font-medium' : 'text-gray-700'}
        `}>
          {preference.label}
        </span>
      </div>
    </label>
  );
}

export const PreferenceCard = memo(PreferenceCardInner);
