import { createContext } from '../utils';

/**
 * Context value for form item state (shared across form field components)
 */
export interface FormItemStateContextValue {
  /**
   * Whether the form item is required
   */
  isRequired: boolean;
  /**
   * Whether the form item is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the form item is in an invalid state
   */
  isInvalid: boolean;
}

const [FormItemStateProvider, useFormItemState] =
  createContext<FormItemStateContextValue>({
    name: 'FormItemStateContext',
    strict: false,
  });

export { FormItemStateProvider, useFormItemState };
