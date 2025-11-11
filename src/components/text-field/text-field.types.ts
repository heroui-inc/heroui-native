import type { TextInputProps, TextProps, ViewProps } from 'react-native';
import type { AnimatedProps, WithTimingConfig } from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
import type { ErrorViewRootProps } from '../error-view';
import type { InputSlots, LabelSlots } from './text-field.styles';

/**
 * Custom colors for TextField.Input component
 */
export interface TextFieldInputColors {
  /**
   * Background color when input is blurred
   * @default --colors-default
   */
  blurBackground?: string;
  /**
   * Background color when input is focused
   * @default --colors-background
   */
  focusBackground?: string;
  /**
   * Background color when input is invalid
   * @default --colors-default (same as blurBackground)
   */
  errorBackground?: string;
  /**
   * Border color when input is blurred
   * @default --colors-border
   */
  blurBorder?: string;
  /**
   * Border color when input is focused
   * @default --colors-muted
   */
  focusBorder?: string;
  /**
   * Border color when input is invalid
   * @default --colors-danger
   */
  errorBorder?: string;
}

/**
 * Props for the TextField.Root component
 */
export interface TextFieldRootProps extends ViewProps {
  /**
   * Children elements to be rendered inside the root container
   */
  children?: React.ReactNode;
  /**
   * Whether the entire text field is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the text field is in an invalid state
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Whether the text field is required (shows asterisk in label)
   * @default false
   */
  isRequired?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.Label component
 */
export interface TextFieldLabelProps extends AnimatedProps<TextProps> {
  /**
   * Whether the label is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Children elements to be rendered as the label text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the label
   */
  classNames?: ElementSlots<LabelSlots>;
}

/**
 * Props for the TextField.Input component
 */
export interface TextFieldInputProps extends TextInputProps {
  /**
   * Children elements to be rendered inside the input container
   */
  children?: React.ReactNode;
  /**
   * Whether the input is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the input
   */
  classNames?: ElementSlots<InputSlots>;
  /**
   * Custom colors for the input background and border
   */
  colors?: TextFieldInputColors;
  /**
   * Animation configuration for focus/blur transitions
   */
  animationConfig?: WithTimingConfig;
}

/**
 * Props for the TextField.InputStartContent component
 */
export interface TextFieldInputStartContentProps extends ViewProps {
  /**
   * Children elements to be rendered at the start of the input
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.InputEndContent component
 */
export interface TextFieldInputEndContentProps extends ViewProps {
  /**
   * Children elements to be rendered at the end of the input
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.Description component
 */
export interface TextFieldDescriptionProps extends AnimatedProps<TextProps> {
  /**
   * Children elements to be rendered as the description text
   */
  children?: React.ReactNode;
  /**
   * Whether the description is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.ErrorMessage component
 */
export interface TextFieldErrorMessageProps extends ErrorViewRootProps {}

/**
 * Context value for the TextField component
 */
export interface TextFieldContextValue {
  /**
   * Whether the entire text field is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the text field is in an invalid state
   * @default false
   */
  isInvalid: boolean;
  /**
   * Whether the text field is required
   */
  isRequired: boolean;
}
