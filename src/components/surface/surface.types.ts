import type { ViewProps } from 'react-native';

/**
 * Variant options for the Surface component
 */
export type SurfaceVariant = 'none' | '1' | '2' | '3';

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
   * @default 'none'
   */
  variant?: SurfaceVariant;
  /**
   * Additional CSS classes
   */
  className?: string;
}
