import { Easing } from 'react-native-reanimated';

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
};

/**
 * Animation duration for focus/blur transitions
 */
export const ANIMATION_DURATION = 200;

/**
 * Animation easing function for focus/blur transitions
 */
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);
