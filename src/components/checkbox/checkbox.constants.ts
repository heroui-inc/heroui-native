import { Easing } from 'react-native-reanimated';

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

export const DEFAULT_HIT_SLOP = 6;

export const DEFAULT_CHECK_ICON_SIZE = 12;
