'use client';

import React from 'react';
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
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-gray-200 bg-white hover:border-primary/30'
        }
      `}
    >
      <input
        type="checkbox"
        checked={preference.checked}
        onChange={(e) => onToggle(preference.id, e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
      />
      <div className="flex items-start gap-3 flex-1">
        <div className={`
          p-2 rounded-lg
          ${preference.checked ? 'bg-primary/15 text-primary' : 'bg-gray-100 text-slate-muted'}
        `}>
          {isBottleIcon ? (
            <Icon iconNode={bottleBaby} size={30} />
          ) : (
            <IconComponent size={30} />
          )}
        </div>
        <span className={`
          flex-1 text-sm leading-relaxed
          ${preference.checked ? 'text-gray-800 font-medium' : 'text-slate-muted'}
        `}>
          {preference.label}
        </span>
      </div>
    </label>
  );
}

export const PreferenceCard = PreferenceCardInner;
