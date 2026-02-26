import type { ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type { InputProps } from '../input';

/**
 * Context value provided by InputGroup root to child components.
 * Carries the controlled value, onChange callback, focus state, and
 * form-field state so that Addon, Input, and Group can consume them.
 */
export interface InputGroupContextType {
  /** Current input text (undefined when uncontrolled) */
  value: string | undefined;
  /** Callback invoked when the input text changes */
  onChange: ((value: string) => void) | undefined;
  /** Whether the inner TextInput is currently focused */
  isFocused: boolean;
  /** Callback to update the focus state */
  setIsFocused: (focused: boolean) => void;
  /** Whether the input group is disabled */
  isDisabled: boolean;
  /** Whether the input group is in an invalid state */
  isInvalid: boolean;
  /** Whether the input group is required */
  isRequired: boolean;
}

/**
 * Props for the InputGroup root component
 */
export interface InputGroupProps extends ViewProps {
  /**
   * Children elements to be rendered inside the input group
   */
  children?: React.ReactNode;

  /**
   * Controlled input text value
   */
  value?: string;

  /**
   * Callback fired when the input text changes
   */
  onChange?: (value: string) => void;

  /**
   * Whether the input group is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the input group is in an invalid state
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Whether the input group is required
   * @default false
   */
  isRequired?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Animation configuration for input group
   * - `"disable-all"`: Disable all animations including children (cascades down)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the InputGroup.Addon component
 */
export interface InputGroupAddonProps extends ViewProps {
  /**
   * Content to render inside the addon
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the InputGroup.Input component.
 * Omits `value` and `onChangeText` because they are provided by InputGroup
 * root through InputGroupContext.
 */
export interface InputGroupInputProps
  extends Omit<InputProps, 'value' | 'onChangeText'> {}
