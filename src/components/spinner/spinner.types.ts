import type { ViewProps } from 'react-native';
import type { AnimatedProps, WithTimingConfig } from 'react-native-reanimated';

/**
 * Base spinner size variants
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Base spinner color variants
 */
export type SpinnerColor = 'default' | 'success' | 'warning' | 'danger';

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
 * Props for the SpinnerIndicator component
 */
export interface SpinnerIndicatorProps extends AnimatedProps<ViewProps> {
  /** Content to render inside the indicator */
  children?: React.ReactNode;

  /** Speed in rounds per second @default 1 */
  speed?: number;

  /** Animation easing for indicator */
  animationEasing?: WithTimingConfig['easing'];

  /** Props for the default icon */
  iconProps?: SpinnerIconProps;

  /** Custom class name for the indicator element */
  className?: string;
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
