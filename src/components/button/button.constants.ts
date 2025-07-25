import { Easing } from 'react-native-reanimated';

/**
 * Display names for Button components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Button.Root',
  LABEL: 'HeroUINative.Button.Label',
  START_CONTENT: 'HeroUINative.Button.StartContent',
  END_CONTENT: 'HeroUINative.Button.EndContent',
  BACKGROUND: 'HeroUINative.Button.Background',
};

/**
 * Default animation duration in milliseconds
 */
export const ANIMATION_DURATION = 100;

/**
 * Default animation easing function
 */
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

/**
 * Default label text for the button
 */
export const DEFAULT_LABEL_TEXT = 'Label';
