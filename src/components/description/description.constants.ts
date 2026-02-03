import { Easing, FadeIn, FadeOut } from 'react-native-reanimated';

/**
 * Display names for Description components
 */
export const DISPLAY_NAME = {
  DESCRIPTION: 'HeroUINative.Description',
} as const;

/**
 * Animation duration for description transitions
 */
export const ANIMATION_DURATION = 150;

/**
 * Animation easing function for description transitions
 */
export const ANIMATION_EASING = Easing.out(Easing.ease);

/**
 * Animation configuration for entering transitions
 */
export const ENTERING_ANIMATION_CONFIG =
  FadeIn.duration(ANIMATION_DURATION).easing(ANIMATION_EASING);

/**
 * Animation configuration for exiting transitions
 */
export const EXITING_ANIMATION_CONFIG =
  FadeOut.duration(ANIMATION_DURATION).easing(ANIMATION_EASING);
