import type {
  AnimatedProps,
  SharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../../helpers/types';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';

/**
 * Context value for checkbox animation state
 */
export interface CheckboxAnimationContextValue {
  /** Shared value tracking if the checkbox is pressed */
  isCheckboxPressed: SharedValue<boolean>;
  /** Whether all animations should be disabled (cascading from root) */
  isAllAnimationsDisabled: boolean;
}

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
 * Animation configuration for checkbox root component
 */
export type CheckboxRootAnimation = AnimationRoot<{
  scale?: AnimationValue<{
    /**
     * Scale values [unpressed, pressed]
     * @default [1, 0.95]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

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
  animation?: CheckboxRootAnimation;
}

/**
 * Animation configuration for checkbox indicator component
 */
export type CheckboxIndicatorAnimation = Animation<{
  opacity?: AnimationValue<{
    /**
     * Opacity values [unselected, selected]
     * @default [0, 1]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 100 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  borderRadius?: AnimationValue<{
    /**
     * Border radius values [unselected, selected]
     * @default [99, 0]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 50 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  translateX?: AnimationValue<{
    /**
     * TranslateX values [unselected, selected]
     * @default [-4, 0]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 100 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  scale?: AnimationValue<{
    /**
     * Scale values [unselected, selected]
     * @default [0.8, 1]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 100 }
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

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
   * Animation configuration
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: CheckboxIndicatorAnimation;
}
