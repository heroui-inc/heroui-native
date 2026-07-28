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
 * Default blur intensity forwarded to expo-blur (iOS only)
 */
export const DEFAULT_INTENSITY = 25;

/**
 * Default theme color token flattened over `--background` on platforms
 * without native backdrop blur (Android / web)
 */
export const DEFAULT_FALLBACK_COLOR = 'overlay' as const;
