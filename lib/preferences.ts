import { Preference } from '@/types';

// Stage 1: Labour preferences
export const stage1Preferences: Preference[] = [
  {
    id: 'no-drugs',
    label: 'No drugs offered',
    icon: 'Syringe',
    checked: false,
  },
  {
    id: 'expectant-management',
    label: 'Expectant Management: No IVs or antibiotics unless there are signs of infection',
    icon: 'Droplet',
    checked: false,
  },
  {
    id: 'room-environment',
    label: 'Adjust the room environment (light, privacy, low voices etc) to promote healthy labour',
    icon: 'Lightbulb',
    checked: false,
  },
  {
    id: 'natural-water-rupture',
    label: 'Natural water rupture',
    icon: 'Droplet',
    checked: false,
  },
  {
    id: 'limited-cervical-check',
    label: 'Limited cervical check: obtain my consent before any vaginal exam',
    icon: 'Activity',
    checked: false,
  },
  {
    id: 'food-water',
    label: 'Free use of food & water',
    icon: 'Coffee',
    checked: false,
  },
  {
    id: 'pain-management',
    label: 'Pain Management: TENS machine, counter and acupressure, heat on back, birth ball, birth stool, peanut ball, tub or shower',
    icon: 'Thermometer',
    checked: false,
  },
];

// Stage 2: Birthing preferences
export const stage2Preferences: Preference[] = [
  {
    id: 'no-episiotomy',
    label: 'No episiotomy, vacuum or forceps: obtain consent from mom or dad if absolutely needed',
    icon: 'Scissors',
    checked: false,
  },
  {
    id: 'no-directed-pushing',
    label: 'No directed pushing: push when baby is station +2, refrain from forceful or coached pushing',
    icon: 'Megaphone',
    checked: false,
  },
  {
    id: 'position-choice',
    label: 'Labour and birth in position of my choice',
    icon: 'User',
    checked: false,
  },
  {
    id: 'intermittent-monitoring',
    label: 'Intermittent fetal and maternal monitoring',
    icon: 'Activity',
    checked: false,
  },
  {
    id: 'perineal-care',
    label: 'Perineal care: warm compress on perineum, stretches with olive oil',
    icon: 'Heart',
    checked: false,
  },
  {
    id: 'crowning',
    label: "Crowning: Reminder to slow down, breathing 'He-He-Hoo-Hoo', deliver baby's head in between contractions",
    icon: 'Crown',
    checked: false,
  },
];

// Stage 3: Placenta preferences
export const stage3Preferences: Preference[] = [
  {
    id: 'physiological-placenta',
    label: 'Expectant management: Physiological birth of placenta up to 30 mins',
    icon: 'Circle',
    checked: false,
  },
  {
    id: 'no-drug-intervention',
    label: 'Expectant management: No drug intervention unless there are signs of hemorrhaging',
    icon: 'Syringe',
    checked: false,
  },
  {
    id: 'delayed-cord-cutting',
    label: 'Delayed cord cutting: wait until pulsing stops',
    icon: 'Scissors',
    checked: false,
  },
  {
    id: 'cord-cutting-choice',
    label: 'Birth parent or their birth partner will cut cord',
    icon: 'Users',
    checked: false,
  },
  {
    id: 'skin-to-skin-mom',
    label: 'Immediate skin to skin with mom',
    icon: 'Heart',
    checked: false,
  },
];

// C-section preferences (part of Stage 3)
export const cSectionPreferences: Preference[] = [
  {
    id: 'skin-to-skin-dad',
    label: 'Immediate skin to skin with dad',
    icon: 'Heart',
    checked: false,
  },
  {
    id: 'vaginal-seeding',
    label: 'Vaginal seeding',
    icon: 'Sprout',
    checked: false,
  },
];

// Stage 4: Newborn preferences
export const stage4Preferences: Preference[] = [
  {
    id: 'golden-hour',
    label: 'Golden Hour: Breastcrawl to initiate breastfeeding, wait for cues - obtain consent before assisting with latching',
    icon: 'Baby',
    checked: false,
  },
  {
    id: 'colostrum',
    label: 'Feed colostrum if latching is not possible with mom - please assist in expressing and collecting colostrum if needed',
    icon: 'Beaker',
    checked: false,
  },
  {
    id: 'exams-on-chest',
    label: "Exams done on mom's chest or same room as parents, A parent must be present with baby at ALL times",
    icon: 'Stethoscope',
    checked: false,
  },
  {
    id: 'vitamin-k',
    label: 'Vitamin K after golden hour, No RSV Vaccine - mom vaccinated at 32w gestation',
    icon: 'Syringe',
    checked: false,
  },
  {
    id: 'no-eye-ointment',
    label: 'No eye ointment',
    icon: 'Eye',
    checked: false,
  },
  {
    id: 'delay-bath',
    label: 'Wash baby at home; Delay first bath at least 24 hours, as per WHO guidelines',
    icon: 'Droplet',
    checked: false,
  },
  {
    id: 'loose-swaddle',
    label: 'Keep swaddle loose around hands and legs. Keep hands up',
    icon: 'Baby',
    checked: false,
  },
  {
    id: 'no-formula',
    label: 'No Formula',
    icon: 'Beaker',
    checked: false,
  },
  {
    id: 'no-pacifier',
    label: 'No Pacifier',
    icon: 'Circle',
    checked: false,
  },
];

export function getInitialPreferences(stageId: string): Preference[] {
  switch (stageId) {
    case 'stage1':
      return stage1Preferences.map(p => ({ ...p }));
    case 'stage2':
      return stage2Preferences.map(p => ({ ...p }));
    case 'stage3':
      return stage3Preferences.map(p => ({ ...p }));
    case 'stage4':
      return stage4Preferences.map(p => ({ ...p }));
    default:
      return [];
  }
}
