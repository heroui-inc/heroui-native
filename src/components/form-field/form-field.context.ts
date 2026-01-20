import { createContext } from '../../helpers/internal/utils';
import type { FormFieldContextValue } from './form-field.types';

/**
 * FormField context provider and hook
 * Extracted to separate file to avoid circular dependencies with Checkbox/Switch animation files
 */
const [FormFieldProvider, useFormField] = createContext<FormFieldContextValue>({
  name: 'FormFieldContext',
  strict: false,
});

export { FormFieldProvider, useFormField };
