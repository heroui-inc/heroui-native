import { createContext } from '../utils';

/**
 * Combined context value for form field state and layout (shared across form field components).
 *
 * Providers: TextField, SearchField, ControlField, RadioGroup.
 * Consumers: Label, Description, FieldError, Input.
 */
export interface FormFieldContextValue {
  /**
   * Whether the form field is required
   */
  isRequired: boolean;
  /**
   * Whether the form field is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the form field is in an invalid state
   */
  isInvalid: boolean;
  /**
   * When true, child components (Label, Description, FieldError) apply
   * additional horizontal padding (`px-1.5`) for consistent field layout.
   *
   * Set to `true` by container components like TextField and SearchField.
   */
  hasFieldPadding: boolean;
}

const [FormFieldProvider, useFormField] = createContext<FormFieldContextValue>({
  name: 'FormFieldContext',
  strict: false,
});

export { FormFieldProvider, useFormField };
