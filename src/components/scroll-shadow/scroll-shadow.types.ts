import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';
import type {
  AnimationRoot,
  AnimationValue,
} from '../../helpers/internal/types';

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

/**
 * Props passed to a custom `LinearGradientComponent`
 * @deprecated ScrollShadow draws its gradient with the native `backgroundImage`
 * style. This type will be removed in a future major release.
 */
export interface LinearGradientProps {
  colors: any;
  locations?: any;
  start?: any;
  end?: any;
  style?: any;
}

/**
 * LinearGradient component accepted by the `LinearGradientComponent` prop
 * @deprecated ScrollShadow draws its gradient with the native `backgroundImage`
 * style. This type will be removed in a future major release.
 */
export type LinearGradientComponent = ComponentType<LinearGradientProps>;

/**
 * Animation configuration for ScrollShadow root component
 */
export type ScrollShadowRootAnimation = AnimationRoot<{
  /**
   * Opacity animation configuration
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [initial, active]
     * - First value (0): Initial opacity when shadow is not visible
     * - Second value (1): Active opacity when shadow is visible
     * For bottom/right shadow, this array is reversed: [1, 0]
     * @default [0, 1]
     */
    value?: [number, number];
  }>;
}>;

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
   * @default 50
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
   *
   * Optional. When omitted, shadows are drawn with the native `backgroundImage`
   * style (`linear-gradient`), so no gradient library is needed.
   *
   * @deprecated ScrollShadow no longer needs a gradient library. Remove this
   * prop; it will be removed in a future major release.
   * @see https://reactnative.dev/docs/view-style-props#backgroundimage
   */
  LinearGradientComponent?: LinearGradientComponent;

  /**
   * Animation configuration for scroll shadow
   * @default undefined
   */
  animation?: ScrollShadowRootAnimation;
}
