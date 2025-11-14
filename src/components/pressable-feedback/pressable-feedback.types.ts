import type {
  PressableProps as RNPressableProps,
  ViewProps,
} from 'react-native';
import type {
  AnimatedProps,
  SharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Variant types for the PressableFeedback component
 */
export type PressableFeedbackVariant = 'highlight';

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
   * Children elements
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for PressableFeedback component
 */
export type PressableFeedbackProps = PressableFeedbackCommonProps & {
  /**
   * Variant to use highlight effect
   */
  variant?: 'highlight';
  /**
   * Configuration for highlight animation
   */
  animationConfig?: HighlightAnimationConfig;
};

/**
 * Internal Props for HighlightComponent
 */
export interface HighlightComponentProps extends AnimatedProps<ViewProps> {
  animationConfig: HighlightAnimationConfig;
  isPressed: SharedValue<boolean>;
}
