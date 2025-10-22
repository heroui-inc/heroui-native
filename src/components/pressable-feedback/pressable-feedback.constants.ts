import { Easing } from 'react-native-reanimated';

/**
 * Display names for PressableFeedback components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.PressableFeedback.Root',
  HIGHLIGHT: 'HeroUINative.PressableFeedback.Highlight',
  RIPPLE: 'HeroUINative.PressableFeedback.Ripple',
} as const;

/**
 * Default platform-specific variants
 */
export const DEFAULT_PRESSABLE_FEEDBACK_PLATFORM = {
  ios: 'highlight',
  android: 'ripple',
} as const;

/**
 * Default ripple configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_RIPPLE = {
  opacity: 0.2,
  isDisabled: false,
} as const;

/**
 * Default ripple timing configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_RIPPLE_TIMING_CONFIG = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
} as const;

/**
 * Default highlight configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT = {
  opacity: 0.1,
  isDisabled: false,
} as const;

/**
 * Default highlight timing configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT_TIMING_CONFIG = {
  duration: 200,
  easing: Easing.inOut(Easing.quad),
} as const;