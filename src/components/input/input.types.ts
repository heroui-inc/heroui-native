import type { TextInputProps } from 'react-native';

/**
 * Props for the Input component
 */
export interface InputProps extends TextInputProps {
  /**
   * Whether the input is in an invalid state (overrides context)
   * @default undefined
   */
  isInvalid?: boolean;
  /**
   * Whether the input is disabled (overrides context)
   * @default undefined
   */
  isDisabled?: boolean;
  /**
   * Variant style for the input
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /**
   * Whether the input automatically handles keyboard state when rendered
   * inside a BottomSheet. When `true` (default), onFocus/onBlur handlers
   * are automatically wired to the bottom sheet's keyboard avoidance system.
   * Set to `false` to disable this automatic behavior.
   * @default true
   */
  isBottomSheetAware?: boolean;
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
