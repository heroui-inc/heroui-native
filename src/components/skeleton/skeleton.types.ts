import type { ViewProps } from 'react-native';
import type {
  AnimatedProps,
  EasingFunction,
  SharedValue,
} from 'react-native-reanimated';

/**
 * Skeleton animation type - defines the animation style
 */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

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
   * Highlight color for the shimmer effect
   */
  highlightColor?: string;
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
 * Context value for skeleton provider
 */
export interface SkeletonContextValue {
  /**
   * Whether the skeleton is currently loading
   */
  isLoading: boolean;
  /**
   * Animation type
   */
  animationType: SkeletonAnimation;
  /**
   * Shimmer configuration
   */
  shimmerConfig?: ShimmerConfig;
  /**
   * Pulse configuration
   */
  pulseConfig?: PulseConfig;
  /**
   * Shared animation progress value
   */
  progress: SharedValue<number>;
  /**
   * Component width for shimmer calculation
   */
  componentWidth: number;
  /**
   * Component offset for shimmer calculation
   */
  offset: number;
  /**
   * Screen width for animation calculation
   */
  screenWidth: number;
}

/**
 * Props for the main Skeleton component
 */
export interface SkeletonProps extends AnimatedProps<ViewProps> {
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
