export interface Preference {
  id: string;
  label: string;
  icon: string; // Icon name from icon library (lucide-react)
  checked: boolean;
}

export interface StagePreferences {
  stageId: string;
  stageName: string;
  preferences: Preference[];
}

export interface BirthPlanState {
  stage1: Preference[];
  stage2: Preference[];
  stage3: Preference[];
  stage4: Preference[];
  birthParent?: string;
  birthPartner?: string;
}

export interface BirthPlanContextType {
  state: BirthPlanState;
  updateStage: (stageId: string, preferences: Preference[]) => void;
  updatePreference: (stageId: string, preferenceId: string, checked: boolean) => void;
  setBirthInfo: (birthParent?: string, birthPartner?: string) => void;
  reset: () => void;
}
