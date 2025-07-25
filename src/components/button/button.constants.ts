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
 * Ripple color map for different button variants in light theme
 */
export const RIPPLE_COLOR_LIGHT_THEME_MAP: Record<ButtonVariant, string> = {
  primary: 'rgba(250, 250, 250, 0.1)',
  secondary: 'rgba(10, 10, 10, 0.05)',
  tertiary: 'rgba(10, 10, 10, 0.02)',
  ghost: 'rgba(10, 10, 10, 0.03)',
  danger: 'rgba(250, 250, 250, 0.12)',
};

/**
 * Ripple color map for different button variants in dark theme
 */
export const RIPPLE_COLOR_DARK_THEME_MAP: Record<ButtonVariant, string> = {
  primary: 'rgba(10, 10, 10, 0.07)',
  secondary: 'rgba(10, 10, 10, 0.07)',
  tertiary: 'rgba(250, 250, 250, 0.03)',
  ghost: 'rgba(250, 250, 250, 0.05)',
  danger: 'rgba(250, 250, 250, 0.1)',
};

/**
 * Default label text for the button
 */
export const DEFAULT_LABEL_TEXT = 'Label';
