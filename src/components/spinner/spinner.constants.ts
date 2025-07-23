import type { TimingConfig } from '@/helpers/types';
import { Easing } from 'react-native-reanimated';

/**
 * Display names for Spinner components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Spinner.Root',
  INDICATOR: 'HeroUINative.Spinner.Indicator',
  ICON: 'HeroUINative.Spinner.Icon',
} as const;

/**
 * Default animation duration for spinner rotation (in milliseconds)
 */
export const DEFAULT_ROTATION_DURATION = 1000;

/**
 * Default animation configuration for spinner
 */
export const DEFAULT_ANIMATION_CONFIG: TimingConfig = {
  duration: DEFAULT_ROTATION_DURATION,
  easing: Easing.linear,
};

/**
 * Size mappings for spinner icon dimensions
 */
export const SPINNER_SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;
