import type { ViewProps } from 'react-native';
import type { ExpoBlurMethod, ExpoBlurTint } from '../../optional/expo-blur';

/**
 * Optional blur package used to render the glass layer
 */
export type GlassViewBlurPackage = 'expo-blur' | 'community-blur';

/**
 * Props for the GlassView component
 */
export type GlassViewProps = ViewProps & {
  /**
   * Which optional blur package renders the layer: `expo-blur` or
   * `community-blur` (@react-native-community/blur). When the preferred
   * package is not installed, GlassView falls back to the other installed
   * one, then to a plain transparent `View`.
   * @default 'expo-blur'
   */
  blurPackage?: GlassViewBlurPackage;
  /**
   * Blur intensity (0-100). Forwarded to expo-blur's `intensity`, or to
   * @react-native-community/blur's `blurAmount` when falling back.
   * @default 50
   */
  intensity?: number;
  /**
   * Blur tint. Forwarded to expo-blur's `tint`, or mapped to
   * @react-native-community/blur's `blurType` when falling back.
   * @default derived from the active color scheme ('light' | 'dark')
   */
  tint?: ExpoBlurTint;
  /**
   * Android blur implementation forwarded to expo-blur's `BlurView`.
   * Android renders no blur unless `dimezisBlurView` is used. Ignored when
   * rendering via @react-native-community/blur (which blurs natively on
   * Android).
   * @default 'dimezisBlurView' on Android
   */
  experimentalBlurMethod?: ExpoBlurMethod;
  /**
   * Additional class names applied to the blur layer
   */
  className?: string;
};
