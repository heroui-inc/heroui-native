import { createContext } from '../utils';

/**
 * Context value for the effective layout direction
 */
export interface LayoutDirectionContextValue {
  /**
   * Whether the layout direction is right-to-left
   */
  isRTL: boolean;
}

const [LayoutDirectionProvider, useLayoutDirectionContext] =
  createContext<LayoutDirectionContextValue>({
    name: 'LayoutDirectionContext',
    strict: false,
  });

export { LayoutDirectionProvider, useLayoutDirectionContext };
