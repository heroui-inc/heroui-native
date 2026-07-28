import { useCSSVariable } from 'uniwind';

/**
 * CSS variable carrying the active library theme name. Declared in
 * `src/styles/variables.css` with the value `default` and overridden by
 * theme CSS packages (e.g. `heroui-native-pro/themes/glass` sets `glass`).
 */
export const THEME_CSS_VARIABLE = '--theme';

/**
 * Known library theme names. Open-ended so future theme CSS packages can
 * introduce new values without a type change.
 */
export type HeroUINativeTheme = 'default' | 'glass' | (string & {});

/**
 * Returns the active library theme — the value of the `--theme` CSS
 * variable. Components use it to decide theme-specific content (e.g. a
 * frosted-glass background layer when the theme is `glass`).
 */
export const useLibraryTheme = (): HeroUINativeTheme => {
  const [theme] = useCSSVariable([THEME_CSS_VARIABLE]);

  if (typeof theme === 'string') {
    return theme;
  }

  return 'default';
};
