import { Easing } from 'react-native-reanimated';
import type { PressableFeedbackPlatformDefaults } from './pressable-feedback.types';

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
export const DEFAULT_PRESSABLE_FEEDBACK_PLATFORM: PressableFeedbackPlatformDefaults =
  {
    ios: 'highlight',
    android: 'ripple',
  } as const;

/**
 * Default ripple animation configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_RIPPLE = {
  color: 'rgba(0, 0, 0, 0.2)' as const,
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  disabled: false,
} as const;

/**
 * Default highlight animation configuration
 */
export const DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT = {
  color: 'rgba(0, 0, 0, 0.1)' as const,
  duration: 200,
  easing: Easing.inOut(Easing.quad),
  opacity: 0.7,
  disabled: false,
} as const;
