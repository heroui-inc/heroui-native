import type { ViewProps } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../../helpers/internal/types';

/**
 * Base spinner size variants
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Base spinner color variants
 */
export type SpinnerColor = 'default' | 'success' | 'warning' | 'danger';

/**
 * Animation configuration for spinner root component
 */
export type SpinnerRootAnimation = AnimationRoot<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for spinner root
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for spinner root
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the main Spinner component
 */
export interface SpinnerProps extends AnimatedProps<ViewProps> {
  /** Content to render inside the spinner */
  children?: React.ReactNode;

  /** Size of the spinner @default 'md' */
  size?: SpinnerSize;

  /** Color theme of the spinner @default 'default' */
  color?: SpinnerColor | (string & {});

  /** Whether the spinner is loading @default true */
  isLoading?: boolean;

  /** Custom class name for the spinner */
  className?: string;

  /**
   * Animation configuration for spinner root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SpinnerRootAnimation;
}

/**
 * Props for icon component
 */
export interface SpinnerIconProps {
  /** Width of the icon */
  width?: number | string;

  /** Height of the icon */
  height?: number | string;

  /** Color of the icon */
  color?: string;
}

/**
 * Animation configuration for spinner indicator component
 */
export type SpinnerIndicatorAnimation = Animation<{
  rotation?: AnimationValue<{
    /**
     * Rotation speed multiplier
     * @default 1.1
     */
    speed?: number;
    /**
     * Animation easing configuration
     * @default Easing.linear
     */
    easing?: WithTimingConfig['easing'];
  }>;
}>;

/**
 * Props for the SpinnerIndicator component
 */
export interface SpinnerIndicatorProps extends AnimatedProps<ViewProps> {
  /** Content to render inside the indicator */
  children?: React.ReactNode;

  /** Props for the default icon */
  iconProps?: SpinnerIconProps;

  /** Custom class name for the indicator element
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `rotate`) - Animated for continuous rotation animation
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Spinner.Indicator
   *   animation={{
   *     rotation: { speed: 1.1, easing: Easing.linear }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;

  /**
   * Animation configuration for spinner indicator
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SpinnerIndicatorAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Context value for spinner components
 */
export interface SpinnerContextValue {
  /** Size of the spinner */
  size: SpinnerSize;

  /** Color of the spinner */
  color: SpinnerColor | string;

  /** Whether the spinner is loading */
  isLoading: boolean;
}
