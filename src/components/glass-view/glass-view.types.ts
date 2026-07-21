import type { ViewProps } from 'react-native';
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
   * Additional class names applied to the blur layer
   */
  className?: string;
};
