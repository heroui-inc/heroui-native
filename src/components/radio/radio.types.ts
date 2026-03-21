import type { ViewProps } from 'react-native';
import type { AnimatedProps, WithTimingConfig } from 'react-native-reanimated';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/internal/types';
import type { RootProps as RadioPrimitiveRootProps } from '../../primitives/radio';

/**
 * Render function props for Radio children
 */
export interface RadioRenderProps {
  /** Whether the radio is selected */
  isSelected: boolean;
  /** Whether the radio is disabled */
  isDisabled: boolean;
  /** Whether the radio is invalid */
  isInvalid: boolean;
}

/**
 * Props for the Radio root component.
 *
 * Works in two modes:
 * - **Standalone**: Uses `isSelected` / `onSelectedChange` directly.
 * - **Inside RadioGroup**: Uses `value` prop; `isSelected` is derived from group context.
 */
export interface RadioProps extends Omit<RadioPrimitiveRootProps, 'children'> {
  /** Radio content, or a render function */
  children?: React.ReactNode | ((props: RadioRenderProps) => React.ReactNode);
  /** Custom class name */
  className?: string;
  /**
   * Animation configuration for radio
   * - `"disable-all"`: Disable all animations including children (Indicator, IndicatorThumb)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for Radio.Indicator component
 */
export interface RadioIndicatorProps extends AnimatedProps<ViewProps> {
  /** Indicator content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Animation configuration for RadioIndicatorThumb component
 */
export type RadioIndicatorThumbAnimation = Animation<{
  scale?: AnimationValue<{
    /**
     * Scale values [unselected, selected]
     * @default [1.5, 1]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 300, easing: Easing.out(Easing.ease) }
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

/**
 * Props for Radio.IndicatorThumb component
 */
export interface RadioIndicatorThumbProps
  extends Omit<AnimatedProps<ViewProps>, 'children'> {
  /** Custom class name
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `scale`) - Animated for selection transitions (unselected: 1.5, selected: 1)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Radio.IndicatorThumb
   *   animation={{
   *     scale: { value: [1.5, 1], timingConfig: { duration: 300, easing: Easing.out(Easing.ease) } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Animation configuration
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: RadioIndicatorThumbAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}
