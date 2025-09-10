import type { ViewProps } from 'react-native';
import type { EasingFunction } from 'react-native-reanimated';

/**
 * Skeleton animation type - defines the animation style
 */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

/**
 * Gradient configuration for the shimmer effect
 */
export interface GradientConfig {
  /**
   * Array of gradient colors
   * @default ['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']
   */
  colors?: string[];

  /**
   * Gradient start position
   * @default { x: 0, y: 0.5 }
   */
  start?: { x: number; y: number };

  /**
   * Gradient end position
   * @default { x: 1, y: 0.5 }
   */
  end?: { x: number; y: number };
}

/**
 * Shimmer animation configuration
 */
export interface ShimmerConfig {
  /**
   * Animation duration in milliseconds
   * @default 1500
   */
  duration?: number;

  /**
   * Easing function for the animation
   */
  easing?: EasingFunction;

  /**
   * Speed multiplier for the animation
   * @default 1
   */
  speed?: number;

  /**
   * Gradient configuration for shimmer effect
   */
  gradientConfig?: GradientConfig;
}

/**
 * Pulse animation configuration
 */
export interface PulseConfig {
  /**
   * Animation duration in milliseconds
   * @default 1000
   */
  duration?: number;

  /**
   * Easing function for the animation
   */
  easing?: EasingFunction;

  /**
   * Minimum opacity value
   * @default 0.3
   */
  minOpacity?: number;

  /**
   * Maximum opacity value
   * @default 1
   */
  maxOpacity?: number;
}

/**
 * Props for the main Skeleton component
 */
export interface SkeletonProps extends ViewProps {
  /**
   * Child components to show when not loading
   */
  children?: React.ReactNode;

  /**
   * Whether the skeleton is currently loading
   * @default true
   */
  isLoading?: boolean;

  /**
   * Animation type
   * @default 'shimmer'
   */
  animationType?: SkeletonAnimation;

  /**
   * Shimmer animation configuration
   */
  shimmerConfig?: ShimmerConfig;

  /**
   * Pulse animation configuration
   */
  pulseConfig?: PulseConfig;

  /**
   * Additional CSS classes for styling
   */
  className?: string;
}

/**
 * Props for LinearGradient component
 */
export interface LinearGradientProps extends GradientConfig {
  /**
   * Style for the gradient container
   */
  style?: ViewProps['style'];

  /**
   * Child components
   */
  children?: React.ReactNode;
}
