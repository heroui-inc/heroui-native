import type { PressableProps, ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { TimingConfig } from '../../helpers/types';
import type { ElementSlots } from '../../theme';
import type { LabelSlots } from './button.styles';

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
 * Configuration for disabling button animations
 */
export interface DisableAnimation {
  /**
   * Whether to disable the scale animation
   * @default false
   */
  scale?: boolean;
  /**
   * Whether to disable the highlight animation
   * @default false
   */
  highlight?: boolean;
}

/**
 * Configuration for button animations
 */
export interface AnimationConfig {
  /**
   * Animation configuration for scale
   */
  scale?: {
    /**
     * Animation target value for scale
     * @default 0.995
     */
    value?: number;
    /**
     * Animation configuration for scale
     */
    config?: TimingConfig;
  };
  /**
   * Animation configuration for highlight
   */
  highlight?: {
    /**
     * Animation target color for highlight
     * @default 'transparent'
     */
    color?: string;
    /**
     * Animation target opacity for highlight
     * @default varies by variant and theme
     */
    opacity?: number;
    /**
     * Animation configuration for highlight
     */
    config?: TimingConfig;
  };
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
   * Whether the button should take full width of its container
   * @default true
   */
  isFullWidth?: boolean;
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
   * Whether to disable the animation (scale and/or highlight)
   * @default false
   */
  disableAnimation?: DisableAnimation;
  /**
   * Animation configuration for press states (scale and highlight)
   */
  animationConfig?: AnimationConfig;
}

/**
 * Props for the Button.Background component
 */
export interface ButtonBackgroundProps extends AnimatedProps<ViewProps> {
  /**
   * Content to be rendered as the button background
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Button.StartContent component
 */
export interface ButtonStartContentProps extends AnimatedProps<ViewProps> {
  /**
   * Content to be rendered at the start of the button
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Button.Label component
 */
export interface ButtonLabelProps extends AnimatedProps<ViewProps> {
  /**
   * Content to be rendered as label. If string, will be wrapped in Text component
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for the different parts of the label
   */
  classNames?: ElementSlots<LabelSlots>;
}

/**
 * Props for the Button.EndContent component
 */
export interface ButtonEndContentProps extends AnimatedProps<ViewProps> {
  /**
   * Content to be rendered at the end of the button
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
}
