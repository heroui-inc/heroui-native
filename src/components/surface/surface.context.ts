import { createContext } from '../../helpers/internal/utils';
import type { SurfaceContextValue } from './surface.types';

// --------------------------------------------------

/**
 * Context holding the active surface variant.
 *
 * Kept in a leaf module — free of component imports — so low-level consumers
 * such as `useIsOnSurface` can read the surface variant without pulling in the
 * Surface component graph.
 */
const [SurfaceProvider, useSurface] = createContext<SurfaceContextValue>({
  name: 'SurfaceContext',
  strict: false,
});

export { SurfaceProvider, useSurface };
