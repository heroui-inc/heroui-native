import { forwardRef, type FC } from 'react';
import { View } from 'react-native';
import {
  useLibraryTheme,
  type HeroUINativeTheme,
} from '../../helpers/internal/hooks';
import { GlassView } from '../glass-view';
import { DISPLAY_NAME } from './theme-background.constants';
import type { ThemeBackgroundProps } from './theme-background.types';

/**
 * Default background content per library theme. Single source of truth for
 * the theme decision made by every background container — add an entry here
 * to give a new theme its own default layer across all components. Themes
 * without an entry render nothing.
 */
const THEME_BACKGROUND_CONTENT: Partial<Record<HeroUINativeTheme, FC>> = {
  glass: GlassView,
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
 */
const ThemeBackground = forwardRef<View, ThemeBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    const theme = useLibraryTheme();

    const ThemeContent = THEME_BACKGROUND_CONTENT[theme];

    return (
      <View ref={ref} className={className} {...props}>
        {children ?? (ThemeContent ? <ThemeContent /> : null)}
      </View>
    );
  }
);

ThemeBackground.displayName = DISPLAY_NAME.ROOT;

export default ThemeBackground;
