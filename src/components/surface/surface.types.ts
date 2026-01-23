import type { ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';

/**
 * Variant options for the Surface component
 */
export type SurfaceVariant =
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'transparent';

/**
 * Props for the Surface.Root component
 */
export interface SurfaceRootProps extends ViewProps {
  /**
   * Children elements to be rendered inside the surface
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the surface
   * @default 'default'
   */
  variant?: SurfaceVariant;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for surface
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Context value for the Surface component
 */
export interface SurfaceContextValue {
  /**
   * Visual variant of the surface
   */
  variant: SurfaceVariant;
}
