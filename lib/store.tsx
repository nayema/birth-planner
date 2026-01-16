'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { BirthPlanState, BirthPlanContextType, Preference } from '@/types';
import { getInitialPreferences } from '@/lib/preferences';

const initialState: BirthPlanState = {
  stage1: getInitialPreferences('stage1'),
  stage2: getInitialPreferences('stage2'),
  stage3: getInitialPreferences('stage3'),
  stage4: getInitialPreferences('stage4'),
};

const BirthPlanContext = createContext<BirthPlanContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BirthPlanState>(initialState);

  const updateStage = useCallback((stageId: string, preferences: Preference[]) => {
    setState((prev) => ({
      ...prev,
      [stageId]: preferences,
    }));
  }, []);

  const updatePreference = useCallback((stageId: string, preferenceId: string, checked: boolean) => {
    setState((prev) => {
      const stagePreferences = prev[stageId as keyof BirthPlanState];
      if (!stagePreferences || !Array.isArray(stagePreferences)) {
        return prev;
      }
      return {
        ...prev,
        [stageId]: stagePreferences.map((pref) =>
          pref.id === preferenceId ? { ...pref, checked } : pref
        ),
      };
    });
  }, []);

  const setBirthInfo = useCallback((birthParent?: string, birthPartner?: string) => {
    setState((prev) => ({
      ...prev,
      birthParent,
      birthPartner,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <BirthPlanContext.Provider
      value={{
        state,
        updateStage,
        updatePreference,
        setBirthInfo,
        reset,
      }}
    >
      {children}
    </BirthPlanContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(BirthPlanContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
