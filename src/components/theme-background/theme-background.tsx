import { forwardRef, type FC } from 'react';
import { View } from 'react-native';
import {
  useLibraryTheme,
  type HeroUINativeTheme,
} from '../../helpers/internal/hooks';
import { GlassView } from '../glass-view';
import { DISPLAY_NAME } from './theme-background.constants';
import type {
  ThemeBackgroundContentProps,
  ThemeBackgroundProps,
} from './theme-background.types';

/**
 * Default background content per library theme. Single source of truth for
 * the theme decision made by every background container — add an entry here
 * to give a new theme its own default layer across all components. Themes
 * without an entry render nothing.
 */
const THEME_BACKGROUND_CONTENT: Partial<
  Record<HeroUINativeTheme, FC<ThemeBackgroundContentProps>>
> = {
  glass: GlassView,
};

/**
 * Returns `true` when the active library theme registers default background
 * content in `THEME_BACKGROUND_CONTENT` (e.g. a `GlassView` blur for
 * `glass`). Components use this to decide whether to mount a background
 * container at all — themes without an entry skip the wrapper entirely.
 */
export const useHasDefaultThemeBackground = (): boolean => {
  const theme = useLibraryTheme();
  return Boolean(THEME_BACKGROUND_CONTENT[theme]);
};

/**
 * ThemeBackground — shared primitive behind all component background
 * containers (`Popover.ContentBackground`, `Input.Background`,
 * `Toast.Background`, etc.).
 *
 * Renders a plain container `View`; positioning and clipping come from the
 * `className` supplied by the wrapping component. With no `children`, the
 * active library theme decides the default content via
 * `THEME_BACKGROUND_CONTENT` (e.g. a `GlassView` blur layer for the `glass`
 * theme). Pass `children` to host arbitrary content (gradients, images)
 * with the container's positioning and clipping applied.
 *
 * `fallbackColor` is forwarded to the theme content so platforms without
 * native blur (Android / web) can paint an opaque approximation of the
 * frosted tint. Surface-backed parts (Surface, Alert, Widget, etc.) pass
 * their matching surface token (`'surface'` / `'surface-secondary'` /
 * `'surface-tertiary'`); field parts pass `'field'`; overlay parts keep the
 * `'overlay'` default.
 */
const ThemeBackground = forwardRef<View, ThemeBackgroundProps>(
  (
    { children, className, fallbackColor, forceFallbackColor, ...props },
    ref
  ) => {
    const theme = useLibraryTheme();

    const ThemeContent = THEME_BACKGROUND_CONTENT[theme];

    return (
      <View ref={ref} className={className} {...props}>
        {children ??
          (ThemeContent ? (
            <ThemeContent
              fallbackColor={fallbackColor}
              forceFallbackColor={forceFallbackColor}
            />
          ) : null)}
      </View>
    );
  }
);

ThemeBackground.displayName = DISPLAY_NAME.ROOT;

export default ThemeBackground;
