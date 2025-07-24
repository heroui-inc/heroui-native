import { Easing } from 'react-native-reanimated';
import type { CheckboxSize } from './checkbox.types';

export const DISPLAY_NAME = {
  CHECKBOX_ROOT: 'HeroUINative.Checkbox.Root',
  CHECKBOX_BACKGROUND: 'HeroUINative.Checkbox.Background',
  CHECKBOX_INDICATOR: 'HeroUINative.Checkbox.Indicator',
  CHECKBOX_CHECK_ICON: 'HeroUINative.Checkbox.CheckIcon',
} as const;

export const ANIMATION_DURATION = 175;
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export const DEFAULT_TIMING_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

export const HIT_SLOP_MAP: Record<CheckboxSize, number> = {
  sm: 10,
  md: 6,
  lg: 4,
};

export const CHECK_ICON_SIZE_MAP: Record<CheckboxSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
};
