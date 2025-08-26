import { Easing, FadeIn, FadeOut } from 'react-native-reanimated';

/**
 * Display names for the ErrorView component parts
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.ErrorView',
};

/**
 * Animation duration for focus/blur transitions
 */
export const ANIMATION_DURATION = 150;

/**
 * Animation easing function for focus/blur transitions
 */
export const ANIMATION_EASING = Easing.out(Easing.ease);

/**
 * Default entering animation configuration
 */
export const ENTERING_ANIMATION_CONFIG =
  FadeIn.duration(ANIMATION_DURATION).easing(ANIMATION_EASING);

/**
 * Default exiting animation configuration
 */
export const EXITING_ANIMATION_CONFIG = FadeOut.duration(
  ANIMATION_DURATION / 1.5
).easing(ANIMATION_EASING);
