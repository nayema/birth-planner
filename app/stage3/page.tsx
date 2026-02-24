'use client';

import React, { useState, useEffect } from 'react';
import { usePreferences } from '@/lib/store';
import { PreferenceCard } from '@/components/PreferenceCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StageLayout } from '@/components/StageLayout';

export default function Stage3Page() {
  const { state, updatePreference } = usePreferences();
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    if (state.stage3.some((p) => p.checked)) setHasSelection(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = (preferenceId: string, checked: boolean) => {
    updatePreference('stage3', preferenceId, checked);
    if (checked) {
      setHasSelection(true);
    } else {
      setHasSelection(state.stage3.some((p) => p.id !== preferenceId && p.checked));
    }
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

      <NavigationButtons currentStage={3} totalStages={4} canProceed={hasSelection || state.stage3.some((p) => p.checked)} />
    </StageLayout>
  );
}
