import type { ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type { ButtonRootProps } from '../button/button.types';
import type { InputProps } from '../input/input.types';

/**
 * Context value provided by SearchField root to child components.
 * Carries the controlled value, onChange callback, and form-field
 * state so that Input and ClearButton can consume them.
 */
export interface SearchFieldContextType {
  /** Current search text (undefined when uncontrolled) */
  value: string | undefined;
  /** Callback invoked when the search text changes */
  onChange: ((value: string) => void) | undefined;
  /** Whether the search field is disabled */
  isDisabled: boolean;
  /** Whether the search field is in an invalid state */
  isInvalid: boolean;
  /** Whether the search field is required */
  isRequired: boolean;
}

/**
 * Props for the SearchField root component
 */
export interface SearchFieldProps extends ViewProps {
  /**
   * Children elements to be rendered inside the search field
   */
  children?: React.ReactNode;

  /**
   * Controlled search text value
   */
  value?: string;

  /**
   * Callback fired when the search text changes
   */
  onChange?: (value: string) => void;

  /**
   * Whether the search field is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the search field is in an invalid state
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Whether the search field is required
   * @default false
   */
  isRequired?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Animation configuration for search field
   * - `"disable-all"`: Disable all animations including children (cascades down)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the SearchField.Group component
 */
export interface SearchFieldGroupProps extends ViewProps {
  /**
   * Children elements to be rendered inside the group
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for customizing the default search icon
 */
export interface SearchFieldSearchIconIconProps {
  /**
   * Size of the search icon
   * @default 16
   */
  size?: number;

  /**
   * Color of the search icon
   * @default Uses theme muted color
   */
  color?: string;
}

/**
 * Props for the SearchField.SearchIcon component
 */
export interface SearchFieldSearchIconProps extends ViewProps {
  /**
   * Custom content to replace the default search icon
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Props for customizing the default search icon (ignored when children are provided)
   */
  iconProps?: SearchFieldSearchIconIconProps;
}

/**
 * Props for the SearchField.Input component.
 * Extends InputProps with search-specific defaults (placeholder, a11y role).
 * Omits `value` and `onChangeText` because they are provided by SearchField
 * root through SearchFieldValueContext.
 */
export interface SearchFieldInputProps
  extends Omit<InputProps, 'value' | 'onChangeText'> {}

/**
 * Props for customizing the clear button icon
 */
export interface SearchFieldClearButtonIconProps {
  /**
   * Size of the icon
   * @default 14
   */
  size?: number;

  /**
   * Color of the icon
   * @default Uses theme muted color
   */
  color?: string;
}

/**
 * Props for the SearchField.ClearButton component
 */
export type SearchFieldClearButtonProps = ButtonRootProps & {
  /**
   * Props for customizing the clear button icon
   */
  iconProps?: SearchFieldClearButtonIconProps;
};
