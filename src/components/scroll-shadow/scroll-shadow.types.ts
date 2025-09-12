import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

/**
 * Orientation of the scroll shadow
 * @default 'vertical'
 */
export type ScrollShadowOrientation = 'horizontal' | 'vertical';

/**
 * Visibility mode for the scroll shadows
 * - 'auto': Shows shadows based on scroll position and content overflow
 * - 'top': Only shows top shadow (for vertical) or left shadow (for horizontal)
 * - 'bottom': Only shows bottom shadow (for vertical) or right shadow (for horizontal)
 * - 'left': Only shows left shadow (for horizontal orientation)
 * - 'right': Only shows right shadow (for horizontal orientation)
 * - 'both': Always shows both shadows
 * - 'none': Hides all shadows
 * @default 'auto'
 */
export type ScrollShadowVisibility =
  | 'auto'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'both'
  | 'none';

export interface LinearGradientProps {
  colors: any;
  locations?: any;
  start?: any;
  end?: any;
  style?: any;
}

export type LinearGradientComponent = ComponentType<LinearGradientProps>;

/**
 * Props for the ScrollShadow component
 */
export interface ScrollShadowProps extends ViewProps {
  /**
   * The scrollable component to enhance with shadows
   * Must be a single React element (ScrollView, FlatList, etc.)
   */
  children: React.ReactElement;

  /**
   * Size (height/width) of the gradient shadow in pixels
   * @default 40
   */
  size?: number;

  /**
   * Orientation of the scroll shadow
   * If not provided, will auto-detect from child's `horizontal` prop
   * @default 'vertical' or auto-detected from child
   */
  orientation?: ScrollShadowOrientation;

  /**
   * Visibility mode for the shadows
   * @default 'auto'
   */
  visibility?: ScrollShadowVisibility;

  /**
   * Custom color for the gradient shadow
   * If not provided, uses the theme's background color
   */
  color?: string;

  /**
   * Whether the shadow effect is enabled
   * @default true
   */
  isEnabled?: boolean;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;

  /**
   * LinearGradient component to use for rendering shadows
   * Compatible with expo-linear-gradient, react-native-linear-gradient, etc.
   * Required for the component to render shadows
   */
  LinearGradientComponent: LinearGradientComponent;
}
