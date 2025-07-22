import type { TimingConfig } from '@/helpers/types';
import * as ActivityIndicatorPrimitivesTypes from '@/primitives/activity-indicator';

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
export interface SpinnerProps
  extends ActivityIndicatorPrimitivesTypes.RootProps {
  /** Content to render inside the spinner */
  children?: React.ReactNode;

  /** Size of the spinner @default 'md' */
  size?: SpinnerSize;

  /** Color theme of the spinner @default 'default' */
  color?: SpinnerColor | string;

  /** Whether the spinner is loading @default true */
  loading?: boolean;

  /** Custom class name for the spinner */
  className?: string;
}

/**
 * Props for icon component
 */
export interface SpinnerIconProps {
  /** Width of the icon */
  width?: number;
  /** Height of the icon */
  height?: number;
  /** Color of the icon */
  color?: string;
}

/**
 * Props for the SpinnerIndicator component
 */
export interface SpinnerIndicatorProps
  extends ActivityIndicatorPrimitivesTypes.IndicatorProps {
  /** Content to render inside the indicator */
  children?: React.ReactNode;

  /** Custom class name for the indicator element */
  className?: string;

  /** Speed in rounds per second @default 1 */
  speed?: number;

  /** Animation easing for indicator */
  animationEasing?: TimingConfig['easing'];

  /** Props for the default icon */
  iconProps?: SpinnerIconProps;
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
  loading: boolean;
}
