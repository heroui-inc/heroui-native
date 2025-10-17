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
 * Default ripple animation configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_RIPPLE = {
  duration: 250,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  opacity: 0.2,
  isDisabled: false,
} as const;

/**
 * Default highlight animation configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT = {
  duration: 200,
  easing: Easing.inOut(Easing.quad),
  opacity: 0.1,
  isDisabled: false,
} as const;
