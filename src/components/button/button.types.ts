import type { TextProps } from 'react-native';
import type {
  PressableFeedbackProps,
  PressableFeedbackVariant,
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
 * Props for the Button.Root component
 */
export type ButtonRootProps = Omit<PressableFeedbackProps, 'variant'> & {
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
   * Feedback variant for press interaction
   * @default 'highlight'
   */
  feedbackVariant?: PressableFeedbackVariant;
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
