import type { TextProps } from 'react-native';
import type {
  PressableFeedbackHighlightProps,
  PressableFeedbackProps,
  PressableFeedbackRippleProps,
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
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'danger-soft';

/**
 * Props for the Button.Root component
 */
export type ButtonRootProps = PressableFeedbackProps & {
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
   * Variant of pressable feedback effect
   * @default 'highlight'
   */
  pressableFeedbackVariant?: 'highlight' | 'ripple' | 'none';
  /**
   * Props for PressableFeedback.Highlight component
   */
  pressableFeedbackHighlightProps?: PressableFeedbackHighlightProps;
  /**
   * Props for PressableFeedback.Ripple component
   */
  pressableFeedbackRippleProps?: PressableFeedbackRippleProps;
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
