import type { PressableProps, ViewProps } from 'react-native';
import type {
  AnimatedProps,
  BaseAnimationBuilder,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import type { TimingConfig } from '../../helpers/types';

/**
 * Size variants for the Button component
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Variant types for the Button component
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger';

/**
 * Configuration for button animations
 */
export interface AnimationConfig {
  /**
   * Whether to disable the animation
   * @default false
   */
  isAnimationDisabled?: boolean;
  /**
   * Animation target value for scale
   * @default 0.995
   */
  targetScaleValue?: number;
  /**
   * Animation timing configuration
   */
  timingConfig?: TimingConfig;
}

/**
 * Props for the Button.Root component
 */
export interface ButtonRootProps extends AnimatedProps<PressableProps> {
  /**
   * Children elements to be rendered inside the button
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Whether the button displays an icon only (needed for correct layout)
   * @default false
   */
  isIconOnly?: boolean;
  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for press states
   */
  animationConfig?: AnimationConfig;
  /**
   * Whether to skip the layout animation
   * @default false
   */
  skipLayoutAnimation?: boolean;
}

/**
 * Props for the Button.Label component
 */
export interface ButtonLabelProps extends AnimatedProps<ViewProps> {
  /**
   * Content to be rendered as label
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Context values shared between Button components
 */
export interface ButtonContextValue {
  /**
   * Size of the button
   */
  size: ButtonSize;
  /**
   * Visual variant of the button
   */
  variant: ButtonVariant;
  /**
   * Whether the button is disabled
   */
  isDisabled: boolean;
  /**
   * Layout transition for animated components
   */
  layout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder;
}
