import type {
  ColorValue,
  EasingFunction,
  PressableStateCallbackType,
  PressableProps as RNPressableProps,
} from 'react-native';
import type {
  EasingFunctionFactory,
  SharedValue,
} from 'react-native-reanimated';

/**
 * Variant types for PressableFeedback component
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
 * Ripple animation configuration
 */
export interface RippleAnimationConfig {
  /**
   * Color of the ripple effect
   * @default 'rgba(0, 0, 0, 0.2)'
   */
  color?: ColorValue;
  /**
   * Duration of the ripple animation in milliseconds
   * @default 400
   */
  duration?: number;
  /**
   * Easing function for the ripple animation
   * @default Easing.bezier(0.25, 0.1, 0.25, 1)
   */
  easing?: EasingFunction | EasingFunctionFactory;
  /**
   * Whether to disable the ripple effect
   * @default false
   */
  disabled?: boolean;
}

/**
 * Highlight animation configuration
 */
export interface HighlightAnimationConfig {
  /**
   * Color of the highlight effect
   * @default 'rgba(0, 0, 0, 0.1)'
   */
  color?: ColorValue;
  /**
   * Duration of the highlight animation in milliseconds
   * @default 200
   */
  duration?: number;
  /**
   * Easing function for the highlight animation
   * @default Easing.inOut(Easing.quad)
   */
  easing?: EasingFunction | EasingFunctionFactory;
  /**
   * Opacity value when highlighted
   * @default 0.7
   */
  opacity?: number;
  /**
   * Whether to disable the highlight effect
   * @default false
   */
  disabled?: boolean;
}

/**
 * Union type for animation configurations based on variant
 */
export type PressableFeedbackAnimationConfig =
  | ({ variant: 'ripple' } & RippleAnimationConfig)
  | ({ variant: 'highlight' } & HighlightAnimationConfig);

/**
 * Props for the PressableFeedback component
 */
export interface PressableFeedbackProps
  extends Omit<RNPressableProps, 'children' | 'disabled'> {
  /**
   * The feedback variant to use
   * @default 'highlight' on iOS, 'ripple' on Android
   */
  variant?: PressableFeedbackVariant;

  /**
   * Animation configuration based on the selected variant
   */
  animationConfig?: PressableFeedbackAnimationConfig;

  /**
   * Whether the pressable is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Children elements to be rendered inside the pressable area
   */
  children?:
    | React.ReactNode
    | ((state: PressableFeedbackState) => React.ReactNode);
}

/**
 * State object passed to children render function
 */
export interface PressableFeedbackState extends PressableStateCallbackType {
  /**
   * Whether the component is currently hovered
   */
  hovered: boolean;
  /**
   * Whether the component is currently pressed
   */
  pressed: boolean;
}

/**
 * Layout information for positioning calculations
 */
export interface PressableFeedbackLayoutInfo {
  /**
   * Width of the component
   */
  width: number;
  /**
   * Height of the component
   */
  height: number;
  /**
   * X position of the component
   */
  x: number;
  /**
   * Y position of the component
   */
  y: number;
}

/**
 * Props for the RippleComponent
 */
export interface RippleComponentProps {
  /**
   * Ripple value object
   */
  ripple: RippleValue;
  /**
   * Ripple animation configuration
   */
  config: RippleAnimationConfig;
}

/**
 * Props for the HighlightComponent
 */
export interface HighlightComponentProps {
  /**
   * Shared value for the pressed state
   */
  pressed: SharedValue<boolean>;
  /**
   * Highlight animation configuration
   */
  config: HighlightAnimationConfig;
}

/**
 * Internal ripple value structure for animation management
 */
export interface RippleValue {
  /**
   * Scale animation value
   */
  scale: SharedValue<number>;
  /**
   * Opacity animation value
   */
  opacity: SharedValue<number>;
  /**
   * X coordinate of ripple center
   */
  centerX: SharedValue<number>;
  /**
   * Y coordinate of ripple center
   */
  centerY: SharedValue<number>;
  /**
   * Radius of the ripple effect
   */
  radius: SharedValue<number>;
  /**
   * Whether the ripple is currently active
   */
  active: SharedValue<number>;
}
