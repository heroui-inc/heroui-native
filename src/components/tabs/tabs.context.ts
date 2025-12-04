import { createContext, useContext } from 'react';
import type { MeasurementsContextValue } from './tabs.types';

// --------------------------------------------------

/**
 * Context for managing tab item measurements
 * Used to track width, height, and position of each tab trigger
 */
const MeasurementsContext = createContext<MeasurementsContextValue | null>(
  null
);

/**
 * Hook to access tab measurements context
 * @throws Error if used outside of Tabs component
 */
function useTabsMeasurements() {
  const context = useContext(MeasurementsContext);
  if (!context) {
    throw new Error(
      'Tabs measurement components must be used within Tabs component'
    );
  }
  return context;
}

export { MeasurementsContext, useTabsMeasurements };
