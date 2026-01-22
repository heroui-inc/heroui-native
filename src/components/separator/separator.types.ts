import type { ViewProps } from 'react-native';

/**
 * Orientation of the separator
 * @default 'horizontal'
 */
export type SeparatorOrientation = 'horizontal' | 'vertical';

/**
 * Variant style of the separator
 * @default 'thin'
 */
export type SeparatorVariant = 'thin' | 'thick';

/**
 * Props for the Separator component
 */
export interface SeparatorProps extends ViewProps {
  /**
   * Variant style of the separator
   * @default 'thin'
   */
  variant?: SeparatorVariant;

  /**
   * Orientation of the separator
   * @default 'horizontal'
   */
  orientation?: SeparatorOrientation;

  /**
   * Custom thickness of the separator. This controls the height (for horizontal) or width (for vertical) of the separator.
   */
  thickness?: number;

  /**
   * Additional CSS classes to apply to the separator
   */
  className?: string;
}
