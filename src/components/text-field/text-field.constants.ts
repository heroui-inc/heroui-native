import { Easing, FadeIn, FadeOut } from 'react-native-reanimated';

/**
 * Display names for TextField components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.TextField.Root',
  LABEL: 'HeroUINative.TextField.Label',
  INPUT: 'HeroUINative.TextField.Input',
  INPUT_START_CONTENT: 'HeroUINative.TextField.InputStartContent',
  INPUT_END_CONTENT: 'HeroUINative.TextField.InputEndContent',
  DESCRIPTION: 'HeroUINative.TextField.Description',
  ERROR_MESSAGE: 'HeroUINative.TextField.ErrorMessage',
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
 * Animation configuration for entering transitions
 */
export const ENTERING_ANIMATION_CONFIG =
  FadeIn.duration(ANIMATION_DURATION).easing(ANIMATION_EASING);

/**
 * Animation configuration for exiting transitions
 */
export const EXITING_ANIMATION_CONFIG =
  FadeOut.duration(ANIMATION_DURATION).easing(ANIMATION_EASING);
