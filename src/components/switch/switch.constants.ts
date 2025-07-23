import { Easing } from 'react-native-reanimated';
import type { SwitchSize } from './switch.types';

export const DISPLAY_NAME = {
  SWITCH_ROOT: 'HeroUINative.Switch.Root',
  SWITCH_THUMB: 'HeroUINative.Switch.Thumb',
  SWITCH_START_CONTENT: 'HeroUINative.Switch.StartContent',
  SWITCH_END_CONTENT: 'HeroUINative.Switch.EndContent',
};

export const ANIMATION_DURATION = 175;
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export const DEFAULT_TIMING_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

export const DEFAULT_SPRING_CONFIG = {
  damping: 25,
  stiffness: 400,
  mass: 1,
};

export const THUMB_WIDTH_MAP: Record<SwitchSize, number> = {
  sm: 14,
  md: 18,
  lg: 21,
};
