import type { ViewProps } from 'react-native';
import type { AnimatedProps, WithTimingConfig } from 'react-native-reanimated';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/internal/types';
import type { ItemProps, RootProps } from '../../primitives/radio-group';

/**
 * Props for RadioGroup root component
 */
export interface RadioGroupProps extends Omit<RootProps, 'asChild'> {
  /** Radio group content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /**
   * Animation configuration for radio group
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Context values shared between RadioGroupItem compound components
 */
export interface RadioGroupItemContextValue {
  /** Whether the radio item is selected */
  isSelected: boolean;
  /** Whether the radio item is disabled */
  isDisabled?: boolean;
  /** Whether the radio item is invalid */
  isInvalid?: boolean;
  /** Variant style for the radio item */
  variant?: 'primary' | 'secondary';
}

/**
 * Render function props for RadioGroupItem children
 */
export interface RadioGroupItemRenderProps {
  /** Whether the radio item is selected */
  isSelected: boolean;
  /** Whether the radio item is disabled */
  isDisabled: boolean;
  /** Whether the radio item is invalid */
  isInvalid: boolean;
}

/**
 * Props for the RadioGroupItem component
 */
export interface RadioGroupItemProps extends Omit<ItemProps, 'children'> {
  /** Radio item content, or a render function */
  children?:
    | React.ReactNode
    | ((props: RadioGroupItemRenderProps) => React.ReactNode);
  /** Whether the radio item is invalid @default false */
  isInvalid?: boolean;
  /** Variant style for the radio item
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.Indicator component
 */
export interface RadioGroupIndicatorProps extends AnimatedProps<ViewProps> {
  /** Indicator content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Animation configuration for RadioGroupIndicatorThumb component
 */
export type RadioGroupIndicatorThumbAnimation = Animation<{
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
 * Props for RadioGroup.IndicatorThumb component
 */
export interface RadioGroupIndicatorThumbProps
  extends Omit<AnimatedProps<ViewProps>, 'children'> {
  /** Custom class name
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `scale`) - Animated for selection transitions (unselected: 1.5, selected: 1)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <RadioGroup.IndicatorThumb
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
  animation?: RadioGroupIndicatorThumbAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}
