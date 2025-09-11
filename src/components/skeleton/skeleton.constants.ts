import { Easing } from 'react-native-reanimated';

/**
 * Display name constants for the Skeleton component
 */
export const DISPLAY_NAME = {
  SKELETON: 'HeroUINative.Skeleton',
  LINEAR_GRADIENT: 'HeroUINative.Skeleton.LinearGradient',
};

/**
 * Default shimmer animation duration in milliseconds
 */
export const DEFAULT_SHIMMER_DURATION = 1500;

/**
 * Default pulse animation duration in milliseconds
 */
export const DEFAULT_PULSE_DURATION = 1000;

/**
 * Default easing function for animations
 */
export const DEFAULT_EASING = Easing.linear;

/**
 * Default gradient colors for shimmer effect
 */
export const DEFAULT_GRADIENT_COLORS = [
  'transparent',
  'rgba(255, 255, 255, 0.5)',
  'transparent',
];

/**
 * Default minimum opacity for pulse animation
 */
export const DEFAULT_PULSE_MIN_OPACITY = 0.5;

/**
 * Default maximum opacity for pulse animation
 */
export const DEFAULT_PULSE_MAX_OPACITY = 1;

/**
 * Default animation speed multiplier
 */
export const DEFAULT_SPEED = 1;
