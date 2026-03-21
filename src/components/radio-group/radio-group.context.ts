import { createContext } from '../../helpers/internal/utils';
import type { RadioGroupItemContextValue } from './radio-group.types';

/**
 * RadioGroupItem context provider and hook
 * Extracted to separate file to avoid circular dependencies with Label component
 */
const [RadioGroupItemProvider, useRadioGroupItem] =
  createContext<RadioGroupItemContextValue>({
    name: 'RadioGroupItemContext',
    strict: false,
  });

export { RadioGroupItemProvider, useRadioGroupItem };
