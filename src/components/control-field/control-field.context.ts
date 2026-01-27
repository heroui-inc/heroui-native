import { createContext } from '../../helpers/internal/utils';
import type { ControlFieldContextValue } from './control-field.types';

/**
 * ControlField context provider and hook
 * Extracted to separate file to avoid circular dependencies with Checkbox/Switch animation files
 */
const [ControlFieldProvider, useControlField] =
  createContext<ControlFieldContextValue>({
    name: 'ControlFieldContext',
    strict: false,
  });

export { ControlFieldProvider, useControlField };
