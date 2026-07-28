import type { ViewProps } from 'react-native';
import type { ThemeColor } from '../../helpers/external/hooks';

/**
 * Props for the ThemeBackground component.
 * Component-level background sub-components (e.g. `Popover.ContentBackground`)
 * forward their props here after resolving their own class name.
 */
export type ThemeBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
  /**
   * Theme color token forwarded to the default theme content (e.g. `GlassView`)
   * as its opaque Android / web fallback. Ignored when `children` are supplied.
   * Overlay-flavored parts keep the default; field parts pass `'field'`;
   * surface-backed parts pass `'surface'` / `'surface-secondary'` /
   * `'surface-tertiary'` so the fallback matches their surface tint.
   * @default 'overlay' (GlassView default)
   */
  fallbackColor?: ThemeColor;
  /**
   * Forwarded to the default theme content (e.g. `GlassView`) to paint the
   * opaque `fallbackColor` on every platform, including iOS where a blur
   * layer would otherwise be rendered. Ignored when `children` are supplied.
   * Used by parts where translucency is undesirable (e.g. stacked toasts).
   * @default false
   */
  forceFallbackColor?: boolean;
};

/**
 * Props accepted by theme-registered default background content components
 * (currently `GlassView` for the `glass` theme).
 */
export type ThemeBackgroundContentProps = {
  fallbackColor?: ThemeColor;
  forceFallbackColor?: boolean;
};
