import type {
  AnimatedProps,
  SharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../../helpers/internal/types';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';

/**
 * Context value for checkbox animation state
 */
export interface CheckboxAnimationContextValue {
  /** Shared value tracking if the checkbox is pressed */
  isCheckboxPressed: SharedValue<boolean>;
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

  /** Variant style for the checkbox
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';

  /** Custom class name for the checkbox
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `scale`) - Animated for press feedback transitions (unpressed: 1, pressed: 0.96)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Checkbox
   *   animation={{
   *     scale: { value: [1, 0.96], timingConfig: { duration: 150 } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;

  /** Animation configuration for checkbox scale animation */
  animation?: CheckboxRootAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
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

  /** Custom class name for the indicator
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for selection transitions (unselected: 0, selected: 1)
   * - `borderRadius` - Animated for selection transitions (unselected: 8, selected: 0)
   * - `transform` (specifically `translateX` and `scale`) - Animated for selection transitions (translateX: unselected: -4, selected: 0; scale: unselected: 0.8, selected: 1)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Checkbox.Indicator
   *   animation={{
   *     opacity: { value: [0, 1], timingConfig: { duration: 100 } },
   *     borderRadius: { value: [8, 0], timingConfig: { duration: 50 } },
   *     translateX: { value: [-4, 0], timingConfig: { duration: 100 } },
   *     scale: { value: [0.8, 1], timingConfig: { duration: 100 } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
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
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}
