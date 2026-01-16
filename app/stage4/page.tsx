'use client';

import React from 'react';
import { usePreferences } from '@/lib/store';
import { PreferenceCard } from '@/components/PreferenceCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StageLayout } from '@/components/StageLayout';

export default function Stage4Page() {
  const { state, updatePreference } = usePreferences();

  const handleToggle = (preferenceId: string, checked: boolean) => {
    updatePreference('stage4', preferenceId, checked);
  };

  return (
    <StageLayout
      title="Stage 4: Newborn"
      description="Select your preferences for newborn care"
      stageNumber={4}
    >
      <div className="space-y-4">
        {state.stage4.map((preference) => (
          <PreferenceCard
            key={preference.id}
            preference={preference}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <NavigationButtons currentStage={4} totalStages={4} />
    </StageLayout>
  );
}
