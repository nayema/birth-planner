'use client';

import React from 'react';
import { usePreferences } from '@/lib/store';
import { PreferenceCard } from '@/components/PreferenceCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StageLayout } from '@/components/StageLayout';

export default function Stage1Page() {
  const { state, updatePreference } = usePreferences();

  const handleToggle = (preferenceId: string, checked: boolean) => {
    updatePreference('stage1', preferenceId, checked);
  };

  return (
    <StageLayout
      title="Stage 1: Labour"
      description="Select your preferences for the labour stage"
      stageNumber={1}
    >
      <div className="space-y-4">
        {state.stage1.map((preference) => (
          <PreferenceCard
            key={preference.id}
            preference={preference}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <NavigationButtons currentStage={1} totalStages={4} />
    </StageLayout>
  );
}
