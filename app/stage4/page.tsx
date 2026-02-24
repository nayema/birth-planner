'use client';

import React, { useState, useEffect } from 'react';
import { usePreferences } from '@/lib/store';
import { PreferenceCard } from '@/components/PreferenceCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StageLayout } from '@/components/StageLayout';

export default function Stage4Page() {
  const { state, updatePreference } = usePreferences();
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    if (state.stage4.some((p) => p.checked)) setHasSelection(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = (preferenceId: string, checked: boolean) => {
    updatePreference('stage4', preferenceId, checked);
    if (checked) {
      setHasSelection(true);
    } else {
      setHasSelection(state.stage4.some((p) => p.id !== preferenceId && p.checked));
    }
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

      <NavigationButtons currentStage={4} totalStages={4} canProceed={hasSelection || state.stage4.some((p) => p.checked)} />
    </StageLayout>
  );
}
