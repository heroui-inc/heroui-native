import type { PressableProps } from 'react-native';
import type {
  AnimatedProps,
  SharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { Animation, AnimationValue } from '../../helpers/types';

/**
 * Variant of the feedback effect
 */
export type PressableFeedbackVariant = 'highlight' | 'ripple';

/**
 * Scale animation configuration for PressableFeedback root container
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
     * @default 1000
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
 * Animation configuration for PressableFeedback root component with highlight variant
 */
export type PressableFeedbackHighlightRootAnimation = Animation<{
  /**
   * Scale animation for the root container
   */
  scale?: PressableFeedbackScaleAnimation;
  /**
   * Highlight overlay animation configuration
   */
  highlight?: PressableFeedbackHighlightAnimation;
}>;

/**
 * Animation configuration for PressableFeedback root component with ripple variant
 */
export type PressableFeedbackRippleRootAnimation = Animation<{
  /**
   * Scale animation for the root container
   */
  scale?: PressableFeedbackScaleAnimation;
  /**
   * Ripple effect animation configuration
   */
  ripple?: PressableFeedbackRippleAnimation;
}>;

export type PressableFeedbackAnimation =
  | PressableFeedbackHighlightRootAnimation
  | PressableFeedbackRippleRootAnimation;

/**
 * Common props shared by both ripple and highlight variants
 */
export interface PressableFeedbackBaseProps
  extends AnimatedProps<Omit<PressableProps, 'disabled'>> {
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
   * Controls the z-index positioning of the feedback effect relative to children
   *
   * - 'behind': Feedback effect renders behind children
   * - 'top': Feedback effect renders on top of children (default)
   *
   * @default 'top'
   */
  feedbackPosition?: 'behind' | 'top';
}

/**
 * Props for PressableFeedback component with highlight variant
 */
export type PressableFeedbackHighlightProps = PressableFeedbackBaseProps & {
  /**
   * Variant of the feedback effect
   * @default 'highlight'
   */
  feedbackVariant?: Extract<PressableFeedbackVariant, 'highlight'>;
  /**
   * Animation configuration for the highlight overlay
   */
  animation?: PressableFeedbackHighlightRootAnimation;
};

/**
 * Props for PressableFeedback component with ripple variant
 */
export type PressableFeedbackRippleProps = PressableFeedbackBaseProps & {
  /**
   * Variant of the feedback effect
   * @default 'highlight'
   */
  feedbackVariant: Extract<PressableFeedbackVariant, 'ripple'>;
  /**
   * Animation configuration for the ripple effect
   */
  animation?: PressableFeedbackRippleRootAnimation;
};

/**
 * Props for PressableFeedback component
 */
export type PressableFeedbackProps =
  | PressableFeedbackHighlightProps
  | PressableFeedbackRippleProps;

/**
 * Context value for PressableFeedback animation state
 */
export interface PressableFeedbackAnimationContextValue {
  /** Shared value tracking if component is pressed */
  isPressed: SharedValue<boolean>;
  /** Shared value tracking the center X position of the press */
  pressedCenterX: SharedValue<number>;
  /** Shared value tracking the center Y position of the press */
  pressedCenterY: SharedValue<number>;
  /** Shared value tracking the container width */
  containerWidth: SharedValue<number>;
  /** Shared value tracking the container height */
  containerHeight: SharedValue<number>;
  /** Shared value tracking the ripple progress */
  rippleProgress: SharedValue<number>;
  /** Whether all animations should be disabled (cascading from root) */
  isAllAnimationsDisabled: boolean;
}
