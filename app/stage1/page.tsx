'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePreferences } from '@/lib/store';
import { PreferenceCard } from '@/components/PreferenceCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StageLayout } from '@/components/StageLayout';
import type { BirthType } from '@/types';

const VALID_BIRTH_TYPES: BirthType[] = ['Home Birth', 'C-Section', 'Hospital'];

function Stage1Content() {
  const searchParams = useSearchParams();
  const { state, updatePreference, setBirthType } = usePreferences();
  const [hasSelection, setHasSelection] = useState(false);

  // Sync from store when navigating back (run once on mount, store may have selections)
  useEffect(() => {
    if (state.stage1.some((p) => p.checked)) setHasSelection(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- only sync on mount

  // Sync birth type from URL (when coming from home page) into store
  useEffect(() => {
    const birthTypeParam = searchParams.get('birthType');
    if (birthTypeParam && VALID_BIRTH_TYPES.includes(birthTypeParam as BirthType)) {
      setBirthType(birthTypeParam as BirthType);
    }
  }, [searchParams, setBirthType]);

  const handleToggle = (preferenceId: string, checked: boolean) => {
    updatePreference('stage1', preferenceId, checked);
    if (checked) {
      setHasSelection(true);
    } else {
      setHasSelection(state.stage1.some((p) => p.id !== preferenceId && p.checked));
    }
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

      <NavigationButtons currentStage={1} totalStages={4} canProceed={hasSelection || state.stage1.some((p) => p.checked)} />
    </StageLayout>
  );
}

export default function Stage1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Stage1Content />
    </Suspense>
  );
}
