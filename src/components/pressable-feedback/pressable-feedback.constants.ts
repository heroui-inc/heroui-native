import { Easing } from 'react-native-reanimated';

/**
 * Display names for PressableFeedback components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.PressableFeedback.Root',
  HIGHLIGHT: 'HeroUINative.PressableFeedback.Highlight',
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
