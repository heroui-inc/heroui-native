import { Easing } from 'react-native-reanimated';

/**
 * Display names for Button components
 */
export const DISPLAY_NAME = {
  BUTTON_ROOT: 'HeroUINative.Button.Root',
  BUTTON_LABEL: 'HeroUINative.Button.Label',
};

/**
 * Default animation duration in milliseconds
 */
export const ANIMATION_DURATION = 125;

/**
 * Default animation easing function
 */
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);
