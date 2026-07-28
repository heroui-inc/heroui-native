import type { ViewProps } from 'react-native';
import type { ThemeColor } from '../../helpers/external/hooks';
import type { ExpoBlurTint } from '../../optional/expo-blur';

/**
 * Props for the GlassView component
 */
export type GlassViewProps = ViewProps & {
  /**
   * Blur intensity (0-100) forwarded to expo-blur's `intensity`.
   * iOS only — the Android fallback layer ignores it.
   * @default 30
   */
  intensity?: number;
  /**
   * Blur tint forwarded to expo-blur's `tint`. iOS only — the Android
   * fallback layer ignores it.
   * @default derived from the active color scheme ('light' | 'dark')
   */
  tint?: ExpoBlurTint;
  /**
   * Theme color token flattened over `--background` and painted as an opaque
   * `backgroundColor` on platforms without native backdrop blur (Android /
   * web). iOS ignores this — the blur layer frosts through the translucent
   * tint instead.
   * @default 'overlay'
   */
  fallbackColor?: ThemeColor;
  /**
   * When `true`, skips the iOS blur layer and paints the opaque
   * `fallbackColor` (flattened over `--background`) on every platform.
   * Useful for surfaces where translucency is undesirable, e.g. stacked
   * toasts where the blur would reveal the content underneath.
   * @default false
   */
  forceFallbackColor?: boolean;
  /**
   * Additional class names applied to the blur layer
   */
  className?: string;
};
