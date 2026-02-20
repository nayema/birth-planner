'use client';

import {
  Syringe,
  Droplet,
  Lightbulb,
  Activity,
  Utensils,
  Bed,
  Scissors,
  Megaphone,
  User,
  Heart,
  Hand,
  Crown,
  Circle,
  Users,
  Sprout,
  Baby,
  Beaker,
  Stethoscope,
  Footprints,
  Eye,
} from 'lucide-react';
import { Icon } from 'lucide-react';
import { bottleBaby } from '@lucide/lab';
import type { LucideIcon } from 'lucide-react';

export const PREFERENCE_ICONS: Record<string, LucideIcon> = {
  Syringe,
  Droplet,
  Droplets: Droplet,
  Lightbulb,
  Activity,
  Coffee: Beaker,
  Utensils,
  Thermometer: Bed,
  Bed,
  Scissors,
  Megaphone,
  User,
  Heart,
  Hand,
  Crown,
  Circle,
  Users,
  Sprout,
  Baby,
  Beaker,
  Stethoscope,
  Footprints,
  Eye,
  Bottle: Beaker,
};

export function getPreferenceIcon(iconName: string): LucideIcon {
  return PREFERENCE_ICONS[iconName] ?? Circle;
}

export { Icon, bottleBaby };
