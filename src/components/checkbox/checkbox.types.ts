import type { AnimatedProps, WithTimingConfig } from 'react-native-reanimated';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';

/**
 * Checkbox Indicator Icon Props
 */
export interface CheckboxIndicatorIconProps {
  /** Indicator size */
  size?: number;
  /** Indicator stroke width */
  strokeWidth?: number;
  /** Indicator color */
  color?: string;
  /** Enter duration */
  enterDuration?: number;
  /** Exit duration */
  exitDuration?: number;
}

/**
 * Render function props for checkbox children
 */
export interface CheckboxRenderProps {
  /** Whether the checkbox is selected */
  isSelected?: boolean;
  /** Whether the checkbox is invalid */
  isInvalid: boolean;
  /** Whether the checkbox is disabled */
  isDisabled: boolean;
}

/**
 * Props for the main Checkbox component
 */
export interface CheckboxProps
  extends Omit<CheckboxPrimitivesTypes.RootProps, 'children'> {
  /** Child elements to render inside the checkbox, or a render function */
  children?:
    | React.ReactNode
    | ((props: CheckboxRenderProps) => React.ReactNode);

  /** Custom class name for the checkbox */
  className?: string;

  /** Animation configuration for checkbox scale animation */
  animationConfig?: {
    scale?: {
      /**
       * Animation target value for scale when pressed
       * @default 0.95
       */
      value?: number;
      /**
       * Animation timing configuration
       */
      config?: WithTimingConfig;
      /**
       * Whether to disable the animation
       * @default false
       */
      isDisabled?: boolean;
    };
  };
}

/**
 * Props for the CheckboxIndicator component
 */
export interface CheckboxIndicatorProps
  extends AnimatedProps<
    Omit<CheckboxPrimitivesTypes.IndicatorProps, 'children'>
  > {
  /** Child elements to render inside the indicator, or a render function */
  children?:
    | React.ReactNode
    | ((props: CheckboxRenderProps) => React.ReactNode);

  /** Custom class name for the indicator */
  className?: string;

  /** Custom icon props for the indicator */
  iconProps?: CheckboxIndicatorIconProps;

  /**
   * Whether to disable the default indicator animations (transform, opacity, borderRadius transitions)
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
}
