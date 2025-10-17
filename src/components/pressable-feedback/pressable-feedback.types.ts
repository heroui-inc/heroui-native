import type {
  PressableProps as RNPressableProps,
  ViewProps,
} from 'react-native';
import type {
  AnimatedProps,
  EasingFunction,
  EasingFunctionFactory,
  SharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Variant types for the PressableFeedback component
 */
export type PressableFeedbackVariant = 'highlight' | 'ripple';

/**
 * Platform-specific default variants
 */
export interface PressableFeedbackPlatformDefaults {
  /**
   * Default variant for iOS
   * @default 'highlight'
   */
  ios: PressableFeedbackVariant;
  /**
   * Default variant for Android
   * @default 'ripple'
   */
  android: PressableFeedbackVariant;
}

/**
 * Configuration for ripple animation
 */
export interface RippleAnimationConfig {
  /**
   * Duration of ripple animation in milliseconds
   * @default 250
   */
  duration?: number;
  /**
   * Easing function for ripple animation
   * @default Easing.bezier(0.25, 0.1, 0.25, 1)
   */
  easing?: EasingFunction | EasingFunctionFactory;
  /**
   * Opacity when the component is pressed
   * @default 0.2
   */
  opacity?: number;
  /**
   * Color of the ripple effect
   * @default 'black' for light theme, 'white' for dark theme
   */
  color?: string;
  /**
   * Whether the ripple effect is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Configuration for highlight animation
 */
export interface HighlightAnimationConfig {
  /**
   * Opacity when the component is pressed
   * @default 0.2
   */
  opacity?: number;
  /**
   * Color of the highlight effect
   * @default 'black' for light theme, 'white' for dark theme
   */
  color?: string;
  /**
   * Configuration for highlight animation
   */
  config?: WithTimingConfig;
  /**
   * Whether the highlight effect is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Common props shared by both ripple and highlight variants
 */
export interface PressableFeedbackCommonProps
  extends AnimatedProps<Omit<RNPressableProps, 'children' | 'disabled'>> {
  /**
   * Whether the pressable component is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Children elements or a function that receives pressable state
   */
  children?:
    | React.ReactNode
    | ((state: PressableFeedbackState) => React.ReactNode);
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for PressableFeedback component
 */
export type PressableFeedbackProps =
  | (PressableFeedbackCommonProps & {
      /**
       * Variant to use ripple effect
       */
      variant?: 'ripple';
      /**
       * Configuration for ripple animation
       */
      animationConfig?: RippleAnimationConfig;
    })
  | (PressableFeedbackCommonProps & {
      /**
       * Variant to use highlight effect
       */
      variant?: 'highlight';
      /**
       * Configuration for highlight animation
       */
      animationConfig?: HighlightAnimationConfig;
    });

/**
 * State passed to children render function
 */
export interface PressableFeedbackState {
  /**
   * True if component is hovered
   */
  isHovered: boolean;
  /**
   * True if component is pressed
   */
  isPressed: boolean;
}

/**
 * Internal Layout information for ripple or highlight positioning
 */
export interface LayoutInfo {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * Internal Props for RippleComponent
 */
export interface RippleComponentProps extends AnimatedProps<ViewProps> {
  color: string;
  ripple: RippleValue;
}

/**
 * Internal Props for HighlightComponent
 */
export interface HighlightComponentProps extends AnimatedProps<ViewProps> {
  animationConfig: HighlightAnimationConfig;
  isPressed: SharedValue<boolean>;
}

/**
 * Internal ripple animation values
 */
export interface RippleValue {
  scale: SharedValue<number>;
  opacity: SharedValue<number>;
  locationX: SharedValue<number>;
  locationY: SharedValue<number>;
  radius: SharedValue<number>;
  active: SharedValue<number>;
}
