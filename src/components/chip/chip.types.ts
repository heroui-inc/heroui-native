import type { PressableProps, TextProps, ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';

/**
 * Chip size variants
 */
export type ChipSize = 'sm' | 'md' | 'lg';

/**
 * Chip variant types
 */
export type ChipVariant = 'primary' | 'secondary' | 'tertiary' | 'soft';

/**
 * Chip color variants
 */
export type ChipColor = 'accent' | 'default' | 'success' | 'warning' | 'danger';

/**
 * Props for the main Chip component
 */
export interface ChipProps extends PressableProps {
  /** Child elements to render inside the chip */
  children?: React.ReactNode;

  /** Visual variant of the chip @default 'primary' */
  variant?: ChipVariant;

  /** Size of the chip @default 'md' */
  size?: ChipSize;

  /** Color theme of the chip @default 'accent' */
  color?: ChipColor;

  /** Custom class name for the chip */
  className?: string;

  /**
   * Animation configuration for chip
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;

  /**
   * Background layer rendered behind the chip surface.
   * - `undefined` (default): renders `Chip.Background` for the combinations
   *   whose background uses the default color (secondary variant, or
   *   primary / soft variants with `color="default"`) when the active
   *   library theme registers default background content (e.g. `glass`);
   *   otherwise no layer
   * - custom node: replaces the default layer entirely (wrap content in
   *   `Chip.Background` to keep the absolute-fill and clipping)
   * - `null`: removes the background layer
   */
  background?: React.ReactNode;
}

/**
 * Props for the Chip.Background sub-component.
 * Generic absolute-fill container behind the chip surface. When no
 * `children` are given, the active library theme decides the default
 * content (e.g. a frosted-glass blur layer when the theme is `glass`).
 */
export type ChipBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
};

/**
 * Props for the ChipLabel component
 */
export interface ChipLabelProps extends TextProps {
  /** Child elements to render as the label. If string, will be wrapped in Text component */
  children?: React.ReactNode;

  /** Custom class name for the label */
  className?: string;
}

/**
 * Context value for chip components
 */
export interface ChipContextValue {
  /** Size of the chip */
  size: ChipSize;

  /** Variant of the chip */
  variant: ChipVariant;

  /** Color theme of the chip */
  color: ChipColor;
}
