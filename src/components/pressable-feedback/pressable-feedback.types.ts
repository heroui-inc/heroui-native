import type { PressableProps as RNPressableProps } from 'react-native';
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
export type PressableFeedbackScaleAnimation = AnimationValue<{
  /**
   * Scale value when pressed
   * @default 0.99
   */
  value?: number;
  /**
   * Animation timing configuration
   * @default { duration: 200 }
   */
  timingConfig?: WithTimingConfig;
}>;

/**
 * Animation configuration for PressableFeedback highlight overlay
 */
export type PressableFeedbackHighlightAnimation = AnimationValue<{
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
export type PressableFeedbackRippleAnimation = AnimationValue<{
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
   * Opacity animation for the ripple effect
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [start, peak, end] for ripple animation
     * @default [0, 1, 0]
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
  extends AnimatedProps<Omit<RNPressableProps, 'disabled'>> {
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
}

/**
 * Props for PressableFeedback component with highlight variant
 */
export type PressableFeedbackHighlightProps = PressableFeedbackBaseProps & {
  /**
   * Variant of the feedback effect
   * @default 'highlight'
   */
  variant?: Extract<PressableFeedbackVariant, 'highlight'>;
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
  variant: Extract<PressableFeedbackVariant, 'ripple'>;
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
}
