import { createContext } from '../utils';

/**
 * Marker context value for field container components (TextField, SearchField, etc.)
 *
 * When provided, child components like Label, Description, and FieldError
 * apply additional horizontal padding (`px-1.5`) for consistent field layout.
 */
export interface FieldContainerContextValue {
  /** Marker flag indicating the component is inside a field container */
  isFieldContainer: true;
}

const [FieldContainerProvider, useFieldContainer] =
  createContext<FieldContainerContextValue>({
    name: 'FieldContainerContext',
    strict: false,
  });

export { FieldContainerProvider, useFieldContainer };
