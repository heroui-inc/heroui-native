import type { ColorVariables } from '@/theme/types';
import { Easing } from 'react-native-reanimated';
import type { ButtonVariant } from './button.types';

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
export const ANIMATION_DURATION = 125;

/**
 * Default animation easing function
 */
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

/**
 * Highlight animation configuration
 */
export const HIGHLIGHT_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

/**
 * Alpha values for highlight effect based on theme and variant
 */
export const OPACITY_ALPHA_MAP = {
  light: {
    primary: 0.1,
    secondary: 0.05,
    tertiary: 0.02,
    ghost: 0.03,
    danger: 0.12,
  },
  dark: {
    primary: 0.07,
    secondary: 0.08,
    tertiary: 0.03,
    ghost: 0.05,
    danger: 0.1,
  },
} as const;

/**
 * Map of button variant to theme color property
 */
export const VARIANT_TO_COLOR_MAP: Record<ButtonVariant, keyof ColorVariables> =
  {
    primary: 'accentForeground',
    secondary: 'accentSoftForeground',
    tertiary: 'defaultForeground',
    ghost: 'foreground',
    danger: 'dangerForeground',
  };

/**
 * Default label text for the button
 */
export const DEFAULT_LABEL_TEXT = 'Label';
