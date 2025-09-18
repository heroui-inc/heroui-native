import type { ViewStyle } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { SlottableViewProps } from '../../helpers/types';

/**
 * Available shadow sizes
 */
export type DropShadowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * iOS-specific shadow style properties
 */
export interface IOSShadowStyle {
  shadowColor?: ViewStyle['shadowColor'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowRadius?: ViewStyle['shadowRadius'];
}

/**
 * Android-specific shadow style properties
 */
export interface AndroidShadowStyle {
  shadowColor?: ViewStyle['shadowColor'];
  elevation?: ViewStyle['elevation'];
}

/**
 * Props for the DropShadowView component
 * Extends AnimatedProps<ViewProps> for animated capabilities
 */
export interface DropShadowViewProps extends AnimatedProps<SlottableViewProps> {
  /**
   * The children to be wrapped with the drop shadow
   */
  children?: React.ReactNode;

  /**
   * Shadow size preset
   * @default 'md'
   */
  shadowSize?: DropShadowSize;

  /**
   * Shadow color
   * @default 'black' for light theme, 'white' for dark theme
   */
  shadowColor?: string;

  /**
   * Additional CSS classes for styling
   */
  className?: string;

  /**
   * iOS-specific shadow style overrides
   * Allows customization of shadowColor, shadowOffset, shadowOpacity, and shadowRadius
   */
  iosShadowStyle?: IOSShadowStyle;

  /**
   * Android-specific shadow style overrides
   * Allows customization of shadowColor and elevation
   */
  androidShadowStyle?: AndroidShadowStyle;
}
