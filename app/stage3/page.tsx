'use client';

import React from 'react';
import { usePreferences } from '@/lib/store';
import { PreferenceCard } from '@/components/PreferenceCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StageLayout } from '@/components/StageLayout';

export default function Stage3Page() {
  const { state, updatePreference } = usePreferences();

  const handleToggle = (preferenceId: string, checked: boolean) => {
    updatePreference('stage3', preferenceId, checked);
  };

  return (
    <StageLayout
      title="Stage 3: Placenta"
      description="Select your preferences for the placenta stage"
      stageNumber={3}
    >
      <div className="space-y-4">
        {state.stage3.map((preference) => (
          <PreferenceCard
            key={preference.id}
            preference={preference}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <NavigationButtons currentStage={3} totalStages={4} />
    </StageLayout>
  );
}
