import type { TextInputProps, ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';

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
  /**
   * Animation configuration for text field root
   * - `"disable-all"`: Disable all animations including children (cascades down to all child components)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the TextField.Input component
 */
export interface TextFieldInputProps extends TextInputProps {
  /**
   * Whether the input is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Variant style for the input
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom className for the selection color
   * @default "accent-accent"
   */
  selectionColorClassName?: string;
  /**
   * Custom className for the placeholder text color
   * @default "field-placeholder"
   */
  placeholderColorClassName?: string;
}

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
