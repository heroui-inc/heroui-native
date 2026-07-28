import type { ReactNode } from 'react';
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
 * Props for the Surface.Background sub-component.
 * Generic absolute-fill container behind the surface content. When no
 * `children` are given, the active library theme decides the default
 * content (e.g. a frosted-glass blur layer when the theme is `glass`).
 */
export type SurfaceBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
};

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
  /**
   * When `true`, merges surface styling onto the single child element (Slot pattern).
   * The child must be one React element. Uses `Slot.View` internally.
   * @default false
   */
  asChild?: boolean;
  /**
   * Background layer rendered behind the surface content.
   * - `undefined` (default): renders `Surface.Background` for non-transparent
   *   variants when the active library theme registers default background
   *   content (e.g. `glass`); otherwise no layer
   * - custom node: replaces the default layer entirely (wrap content in
   *   `Surface.Background` to keep the absolute-fill and clipping)
   * - `null`: removes the background layer
   *
   * Not injected when `asChild` is `true` — the Slot pattern requires a
   * single child; render `Surface.Background` inside your child instead.
   */
  background?: ReactNode;
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
