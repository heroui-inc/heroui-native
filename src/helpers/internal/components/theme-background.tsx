import { forwardRef, type FC } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { GlassView } from '../../../components/glass-view';
import { useLibraryTheme, type HeroUINativeTheme } from '../hooks';

/**
 * Props for the internal ThemeBackground primitive. Component-level
 * background sub-components (e.g. `Popover.ContentBackground`) forward
 * their props here after resolving their own class name.
 */
export type ThemeBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
};

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
 * ThemeBackground — shared internal primitive behind all component
 * background containers (`Popover.ContentBackground`,
 * `Slider.TrackBackground`, `Toast.Background`, etc.).
 *
 * Renders a plain container `View`; positioning and clipping come from the
 * `className` supplied by the wrapping component. With no `children`, the
 * active library theme decides the default content via
 * `THEME_BACKGROUND_CONTENT` (e.g. a `GlassView` blur layer for the `glass`
 * theme). Pass `children` to host arbitrary content (gradients, images)
 * with the container's positioning and clipping applied.
 */
export const ThemeBackground = forwardRef<View, ThemeBackgroundProps>(
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

ThemeBackground.displayName = 'HeroUINative.ThemeBackground';
