import type { PressableProps, ViewProps, ViewStyle } from 'react-native';
import type {
  AnimatedProps,
  SharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
  ElementSlots,
} from '../../helpers/internal/types';
import type { RippleSlots } from './pressable-feedback.styles';

/**
 * Scale animation configuration shared by the root's built-in scale and the PressableFeedback.Scale compound part.
 *
 * Supports the standard Animation control flow:
 * - `true` or `undefined`: Use default scale animation
 * - `false` or `"disabled"`: Disable scale animation
 * - `object`: Custom scale configuration (value, timingConfig, ignoreScaleCoefficient)
 */
export type PressableFeedbackScaleAnimation = Animation<{
  /**
   * Scale value when pressed
   * @default 0.985
   *
   * Note: The actual scale is automatically adjusted based on the container's width
   * using a scale coefficient. This ensures the scale effect feels consistent across different
   * container sizes:
   * - Base width: 300px
   * - If container width > 300px: scale adjustment decreases (less noticeable scale down)
   * - If container width < 300px: scale adjustment increases (more noticeable scale down)
   * - Example: 600px width → 0.5x coefficient → adjustedScale = 1 - (1 - 0.98) * 0.5 = 0.99
   * - Example: 150px width → 2x coefficient → adjustedScale = 1 - (1 - 0.98) * 2 = 0.96
   *
   * This automatic scaling creates the same visual feel on different sized containers
   * by adjusting the scale effect relative to the container size.
   */
  value?: number;
  /**
   * Animation timing configuration
   * @default { duration: 300, easing: Easing.out(Easing.ease) }
   */
  timingConfig?: WithTimingConfig;
  /**
   * Ignore the scale coefficient and use the scale value directly
   *
   * When set to true, the scale coefficient will return 1, meaning the actual scale
   * will always equal the value regardless of the container's width.
   *
   * @default false
   */
  ignoreScaleCoefficient?: boolean;
}>;

/**
 * Animation configuration for PressableFeedback highlight overlay
 */
export type PressableFeedbackHighlightAnimation = Animation<{
  /**
   * Opacity animation for the highlight overlay
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [unpressed, pressed]
     * @default [0, 0.1]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 200 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  /**
   * Background color of the highlight overlay
   */
  backgroundColor?: AnimationValue<{
    /**
     * Background color value
     * @default Computed based on theme (brighten for dark, darken for light)
     */
    value?: string;
  }>;
}>;

/**
 * Animation configuration for PressableFeedback ripple effect
 */
export type PressableFeedbackRippleAnimation = Animation<{
  /**
   * Background color of the ripple effect
   */
  backgroundColor?: AnimationValue<{
    /**
     * Background color value
     * @default Computed based on theme (brighten for dark, darken for light)
     */
    value?: string;
  }>;
  /**
   * Progress animation configuration for the ripple effect
   *
   * This controls how the ripple progresses over time from the center to the edges.
   * The progress is represented as a shared value that animates from 0 to 2:
   * - 0 to 1: Initial expansion phase (press begins)
   * - 1 to 2: Final expansion and fade out phase (press ends)
   */
  progress?: AnimationValue<{
    /**
     * Base duration for the ripple progress animation in milliseconds
     *
     * This value controls how fast the ripple progresses across the container.
     * Lower values mean faster ripple expansion, higher values mean slower expansion.
     *
     * @default 750
     *
     * Note: The actual duration is automatically adjusted based on the container's diagonal size
     * using a durationCoefficient. This ensures the ripple feels consistent across different
     * container sizes:
     * - Base diagonal: 450px
     * - If container diagonal > 450px: duration increases proportionally (max 2x baseDuration)
     * - If container diagonal < 450px: duration decreases proportionally
     * - Example: 900px diagonal → 2x coefficient → duration = baseDuration * 2 (capped at 2x)
     * - Example: 225px diagonal → 0.5x coefficient → duration = baseDuration * 0.5
     *
     * This automatic scaling creates the same visual feel on different sized containers
     * by making the ripple travel at a consistent speed relative to the container size.
     */
    baseDuration?: number;
    /**
     * Minimum base duration for the ripple progress animation in milliseconds
     *
     * This sets a lower bound for the calculated duration after applying the duration coefficient.
     * Useful for preventing the ripple animation from being too fast on small containers.
     *
     * @default undefined (no minimum)
     */
    minBaseDuration?: number;
    /**
     * Ignore the duration coefficient and use the base duration directly
     *
     * When set to true, the durationCoefficient will return 1, meaning the actual duration
     * will always equal baseDuration regardless of the container's diagonal size.
     *
     * @default false
     */
    ignoreDurationCoefficient?: boolean;
  }>;
  /**
   * Opacity animation for the ripple effect
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [start, peak, end] for ripple animation
     * @default [0, 0.1, 0]
     */
    value?: [number, number, number];
    /**
     * Animation timing configuration
     * Note: Timing configs are applied to interpolated values. It's not recommended
     * to keep duration higher than 80ms as the ripple effect will be weak.
     * @default { duration: 30 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  /**
   * Scale animation for the ripple effect
   */
  scale?: AnimationValue<{
    /**
     * Scale values [start, peak, end] for ripple animation
     * @default [0, 1, 1]
     */
    value?: [number, number, number];
    /**
     * Animation timing configuration
     * Note: Timing configs are applied to interpolated values. It's not recommended
     * to keep duration higher than 80ms as the ripple effect will be weak.
     * @default { duration: 30 }
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

/**
 * Animation configuration for PressableFeedback root component.
 *
 * Supports the standard AnimationRoot control flow:
 * - `true` or `undefined`: Use the default built-in scale animation
 * - `false` or `"disabled"`: Disable the root's built-in scale (use this when applying scale
 *   via PressableFeedback.Scale instead)
 * - `"disable-all"`: Cascade-disable all animations including the built-in scale and children
 *   (Scale, Highlight, Ripple)
 * - `object`: Custom configuration for the built-in scale
 *   - `scale`: Customize the built-in scale animation (value, timingConfig, etc.)
 *   - `state`: Control animation state while keeping configuration (e.g. for runtime toggling)
 */
export type PressableFeedbackRootAnimation = AnimationRoot<{
  /**
   * Customize the built-in scale animation on the root component.
   * Accepts the same `PressableFeedbackScaleAnimation` configuration as the Scale compound part.
   */
  scale?: PressableFeedbackScaleAnimation;
}>;

/**
 * Props for PressableFeedback root component
 */
export interface PressableFeedbackProps
  extends Omit<AnimatedProps<PressableProps>, 'disabled'> {
  /**
   * Whether the pressable component is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Children elements
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for the root component.
   *
   * - Leave `undefined` or `true` for the default built-in scale animation.
   * - Provide an object with `scale` to customize the built-in scale:
   *   ```tsx
   *   <PressableFeedback animation={{ scale: { value: 0.97 } }}>
   *     {content}
   *   </PressableFeedback>
   *   ```
   * - Set to `false` or `"disabled"` to disable the built-in scale (use when applying
   *   scale via `PressableFeedback.Scale` on a specific child instead).
   * - Set to `'disable-all'` to cascade-disable all animations including children.
   */
  animation?: PressableFeedbackRootAnimation;
  /**
   * Whether the root's built-in animated styles (react-native-reanimated) are active.
   * When `false`, the animated scale style is not applied and you can implement custom logic.
   * @default true
   */
  isAnimatedStyleActive?: boolean;
  /**
   * When `true`, merges press behavior and animated scale onto the single child (Slot pattern).
   * The child must be one React element. Uses `Animated.createAnimatedComponent(Slot.Pressable)` internally.
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for PressableFeedback.Scale compound part
 */
export interface PressableFeedbackScaleProps extends AnimatedProps<ViewProps> {
  /**
   * Additional CSS classes
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `scale`) - Animated for press feedback transitions
   *   (unpressed: 1, pressed: adjusted scale based on container width, default: 0.985)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <PressableFeedback.Scale
   *   animation={{ value: 0.985, timingConfig: { duration: 300, easing: Easing.out(Easing.ease) } }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop,
   * set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Animation configuration for the scale effect
   */
  animation?: PressableFeedbackScaleAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Props for PressableFeedback highlight component
 */
export interface PressableFeedbackHighlightProps
  extends AnimatedProps<ViewProps> {
  /**
   * Additional CSS classes
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `backgroundColor` - Animated for highlight background color transitions (default: theme-aware gray)
   * - `opacity` - Animated for highlight visibility transitions (unpressed: 0, pressed: 0.1, default duration: 200ms)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <PressableFeedback.Highlight
   *   animation={{
   *     backgroundColor: { value: '#3f3f46' },
   *     opacity: { value: [0, 0.2], timingConfig: { duration: 300 } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Animation configuration for the highlight overlay
   */
  animation?: PressableFeedbackHighlightAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Props for PressableFeedback ripple component
 */
export interface PressableFeedbackRippleProps extends ViewProps {
  /**
   * Additional CSS classes for the container slot
   *
   * Applied to the container slot (`absolute inset-0`). The container handles touch events and positioning.
   * Container styles can be fully customized via className or the `classNames.container` prop.
   */
  className?: string;
  /**
   * Additional CSS classes for the slots
   *
   * - `container`: Outer container slot (`absolute inset-0`) - styles can be fully customized
   * - `ripple`: Inner ripple slot (`absolute top-0 left-0 rounded-full`) - has animated properties that cannot be set via className
   *
   * @note The following style properties on the `ripple` slot are occupied by animations and cannot be set via className:
   * - `width`, `height`, `borderRadius` - Animated for ripple circle size calculations (based on container diagonal)
   * - `opacity` - Animated for ripple visibility transitions (unpressed: 0, expanding: 0.1, fading: 0)
   * - `transform` (specifically `translateX`, `translateY`, `scale`) - Animated for ripple position and expansion from touch point
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <PressableFeedback.Ripple
   *   animation={{
   *     opacity: { value: [0, 0.1, 0], timingConfig: { duration: 400 } },
   *     scale: { value: [0, 1, 1] },
   *     backgroundColor: { value: '#3f3f46' }
   *   }}
   * />
   * ```
   *
   * Touch handlers (`onTouchStart`, `onTouchEnd`, `onTouchCancel`) can be customized via props and will be called alongside animation handlers.
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  classNames?: ElementSlots<RippleSlots>;
  /**
   * Styles for different parts of the ripple overlay
   */
  styles?: Partial<Record<RippleSlots, ViewStyle>>;
  /**
   * Animation configuration for the ripple overlay
   */
  animation?: PressableFeedbackRippleAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Context value for PressableFeedback root animation state
 */
export interface PressableFeedbackRootAnimationContextValue {
  /** Shared value tracking if component is pressed (for scale animation) */
  isPressed: SharedValue<boolean>;
  /** Shared value tracking the container width (for scale coefficient calculation) */
  containerWidth: SharedValue<number>;
  /** Shared value tracking the container height (for scale coefficient calculation) */
  containerHeight: SharedValue<number>;
}
