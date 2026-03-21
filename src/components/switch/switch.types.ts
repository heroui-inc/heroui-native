import type {
  AnimatedProps,
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../../helpers/internal/types';
import * as SwitchPrimitivesTypes from '../../primitives/switch/switch.types';

/**
 * Render function props for switch children
 */
export interface SwitchRenderProps {
  /** Whether the switch is selected */
  isSelected?: boolean;
  /** Whether the switch is disabled */
  isDisabled: boolean;
}

/**
 * Animation configuration for switch root component
 */
export type SwitchRootAnimation = AnimationRoot<{
  scale?: AnimationValue<{
    /**
     * Scale values [unpressed, pressed]
     * @default [1, 0.95]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 150 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  backgroundColor?: AnimationValue<{
    /**
     * Background color values [unselected, selected]
     * @default Uses theme colors (default, accent)
     */
    value?: [string, string];
    /**
     * Animation timing configuration
     * @default { duration: 175, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

/**
 * Props for the main Switch component
 */
export interface SwitchProps
  extends Omit<SwitchPrimitivesTypes.RootProps, 'children'> {
  /** Content to render inside the switch, or a render function */
  children?: React.ReactNode | ((props: SwitchRenderProps) => React.ReactNode);

  /** Whether the switch is disabled @default false */
  isDisabled?: boolean;

  /** Custom class name for the switch
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `backgroundColor` - Animated for selection transitions (unselected: default, selected: accent)
   * - `transform` (specifically `scale`) - Animated for press feedback transitions (unpressed: 1, pressed: 0.96)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Switch
   *   animation={{
   *     backgroundColor: { value: ['#e5e5e5', '#007AFF'], timingConfig: { duration: 175 } },
   *     scale: { value: [1, 0.96], timingConfig: { duration: 150 } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;

  /**
   * Animation configuration for switch
   * - `false` or `"disabled"`: Disable only root animations
   * - `"disable-all"`: Disable all animations including children
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SwitchRootAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Animation configuration for switch thumb component
 */
export type SwitchThumbAnimation = Animation<{
  /**
   * Animates the `left` position of the thumb between left and right sides.
   * The `value` property specifies the offset from the edges (left/right).
   * When you provide a single value (e.g., `value: 2`), it applies the same offset
   * to both sides: `2px` from the left when unselected, and `2px` from the right when selected.
   */
  left?: AnimationValue<{
    /**
     * Offset value from the edges (left when unselected, right when selected)
     * @default 2
     * @example value: 4 // 4px offset from both left and right edges
     */
    value?: number;
    /**
     * Spring animation configuration for thumb position
     * @default { damping: 120, stiffness: 1600, mass: 2 }
     */
    springConfig?: WithSpringConfig;
  }>;
  backgroundColor?: AnimationValue<{
    /**
     * Background color values [unselected, selected]
     * @default ['white', theme accent-foreground color]
     */
    value?: [string, string];
    /**
     * Animation timing configuration
     * @default { duration: 175, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

/**
 * Props for the SwitchThumb component
 */
export interface SwitchThumbProps
  extends Omit<AnimatedProps<SwitchPrimitivesTypes.ThumbProps>, 'children'> {
  /** Content to render inside the thumb, or a render function */
  children?: React.ReactNode | ((props: SwitchRenderProps) => React.ReactNode);

  /** Custom class name for the thumb element
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `left` - Animated for thumb position transitions (unselected: left edge offset, selected: right edge offset)
   * - `backgroundColor` - Animated for selection transitions (unselected: white, selected: accent-foreground)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Switch.Thumb
   *   animation={{
   *     left: { value: 2, springConfig: { damping: 120, stiffness: 1600, mass: 2 } },
   *     backgroundColor: { value: ['white', '#ffffff'], timingConfig: { duration: 175 } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;

  /**
   * Animation configuration for thumb
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SwitchThumbAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Props for the SwitchContent component
 */
export interface SwitchContentProps {
  /** Content to render inside the switch content */
  children?: React.ReactNode;

  /** Custom class name for the content element */
  className?: string;
}

/**
 * Context value for switch components
 */
export interface SwitchContextValue
  extends Pick<SwitchProps, 'isSelected' | 'isDisabled'> {}

/**
 * Context value for switch animation state
 */
export interface SwitchAnimationContextValue {
  /** Shared value tracking if the switch is pressed */
  isSwitchPressed: SharedValue<boolean>;
  /** Width of the content container */
  contentContainerWidth: SharedValue<number>;
}
