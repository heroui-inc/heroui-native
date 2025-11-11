import type { TextProps } from 'react-native';
import type { WithTimingConfig } from 'react-native-reanimated';
import type {
  HighlightAnimationConfig,
  PressableFeedbackProps,
} from '../pressable-feedback';

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
  | 'destructive'
  | 'destructive-soft';

/**
 * Configuration for button animations
 */
export interface AnimationConfig {
  highlight?: HighlightAnimationConfig;
  scale?: {
    /**
     * Animation target value for scale
     * @default 0.995
     */
    scale?: number;
    /**
     * Animation timing configuration
     */
    config?: WithTimingConfig;
    /**
     * Whether to disable the animation
     * @default false
     */
    isDisabled?: boolean;
  };
}

/**
 * Props for the Button.Root component
 */
export type ButtonRootProps = Omit<
  PressableFeedbackProps,
  'variant' | 'animationConfig'
> & {
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
   * Additional CSS classes
   */
  className?: string;
  /**
   * Scale on press animation configuration
   */
  animationConfig?: AnimationConfig;
};

/**
 * Props for the Button.Label component
 */
export interface ButtonLabelProps extends TextProps {
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
}
