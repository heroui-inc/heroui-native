import { Platform } from 'react-native';

/**
 * Display name constants for ScrollShadow components
 */
export const SCROLL_SHADOW_DISPLAY_NAME = {
  ROOT: 'HeroUINative.ScrollShadow',
} as const;

/**
 * Default size for gradient shadows in pixels
 */
export const DEFAULT_SHADOW_SIZE = 50;

/**
 * Animation duration for shadow opacity transitions in milliseconds
 */
export const SHADOW_EXIT_ANIMATION_DURATION = 200;

/**
 * Default scroll event throttle for performance
 */
export const DEFAULT_SCROLL_EVENT_THROTTLE = 16;

/**
 * Style key used to draw the gradient shadows.
 *
 * React Native 0.87 made `backgroundImage` stable. Older supported versions
 * (0.81 - 0.86) only accept the `experimental_backgroundImage` key, so the
 * key is resolved once from the running React Native version.
 *
 * @see https://reactnative.dev/docs/view-style-props#backgroundimage
 */
const { major: RN_MAJOR = 0, minor: RN_MINOR = 0 } =
  Platform.constants.reactNativeVersion ?? {};

export const BACKGROUND_IMAGE_STYLE_KEY =
  RN_MAJOR > 0 || RN_MINOR >= 87
    ? 'backgroundImage'
    : 'experimental_backgroundImage';
