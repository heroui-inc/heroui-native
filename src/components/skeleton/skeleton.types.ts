import type { ViewProps } from 'react-native';
import type {
  AnimatedProps,
  EasingFunction,
  EntryOrExitLayoutType,
  SharedValue,
} from 'react-native-reanimated';
import type { Animation, AnimationRoot } from '../../helpers/types';

/**
 * Skeleton animation type - defines the animation style
 */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

/**
 * Shimmer animation configuration for Skeleton root component
 */
export type SkeletonShimmerAnimation = Animation<{
  /**
   * Animation duration in milliseconds
   * @default 1500
   */
  duration?: number;
  /**
   * Speed multiplier for the animation
   * @default 1
   */
  speed?: number;
  /**
   * Highlight color for the shimmer effect
   */
  highlightColor?: string;
  /**
   * Easing function for the animation
   */
  easing?: EasingFunction;
}>;

/**
 * Pulse animation configuration for Skeleton root component
 */
export type SkeletonPulseAnimation = Animation<{
  /**
   * Animation duration in milliseconds
   * @default 1000
   */
  duration?: number;
  /**
   * Minimum opacity value
   * @default 0.5
   */
  minOpacity?: number;
  /**
   * Maximum opacity value
   * @default 1
   */
  maxOpacity?: number;
  /**
   * Easing function for the animation
   */
  easing?: EasingFunction;
}>;

/**
 * Animation configuration for Skeleton root component
 */
export type SkeletonRootAnimation = AnimationRoot<{
  entering?: Animation<{
    /**
     * Custom entering animation for skeleton
     */
    value?: EntryOrExitLayoutType;
  }>;
  /**
   * Exiting animation for the skeleton
   */
  exiting?: Animation<{
    /**
     * Custom exiting animation for skeleton
     */
    value?: EntryOrExitLayoutType;
  }>;
  /**
   * Shimmer animation configuration
   */
  shimmer?: SkeletonShimmerAnimation;
  /**
   * Pulse animation configuration
   */
  pulse?: SkeletonPulseAnimation;
  /**
   * Entering animation for the skeleton
   */
}>;

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
   * Animation variant
   * @default 'shimmer'
   */
  variant?: SkeletonAnimation;

  /**
   * Animation configuration
   */
  animation?: SkeletonRootAnimation;

  /**
   * Additional CSS classes for styling
   */
  className?: string;
}

/**
 * Context value for skeleton animation provider
 */
export interface SkeletonAnimationContextValue {
  /**
   * Whether the skeleton is currently loading
   */
  isLoading: boolean;
  /**
   * Animation variant
   */
  variant: SkeletonAnimation;
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
