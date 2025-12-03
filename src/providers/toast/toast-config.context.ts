import { createContext, useContext } from 'react';
import type { ToastGlobalConfig } from './types';

/**
 * Context for global toast configuration
 * Extracted to separate file to avoid circular dependencies with toast component
 */
const ToastConfigContext = createContext<ToastGlobalConfig | undefined>(
  undefined
);

/**
 * Hook to access global toast configuration
 *
 * @returns Global toast configuration or undefined if not set
 *
 * @example
 * ```tsx
 * const globalConfig = useToastConfig();
 * // Use globalConfig.variant, globalConfig.placement, etc.
 * ```
 */
export function useToastConfig(): ToastGlobalConfig | undefined {
  return useContext(ToastConfigContext);
}

export { ToastConfigContext };
