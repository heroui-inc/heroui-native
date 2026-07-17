/**
 * Display names for the GlassView component
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.GlassView',
};

/**
 * `--theme` value (see `useLibraryTheme`) that enables glass rendering
 */
export const GLASS_THEME_VALUE = 'glass';

/**
 * Default blur intensity forwarded to the blur package
 */
export const DEFAULT_INTENSITY = 20;

/**
 * Default blur package preference
 */
export const DEFAULT_BLUR_PACKAGE = 'expo-blur';

/**
 * Default Android blur implementation. Android renders no blur unless
 * `dimezisBlurView` is used.
 */
export const DEFAULT_ANDROID_BLUR_METHOD = 'dimezisBlurView';
