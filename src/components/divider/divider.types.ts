import type { ViewProps } from 'react-native';

/**
 * Orientation of the divider
 * @default 'horizontal'
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Variant style of the divider
 * @default 'thin'
 */
export type DividerVariant = 'thin' | 'thick';

/**
 * Props for the Divider component
 */
export interface DividerProps extends ViewProps {
  /**
   * Variant style of the divider
   * @default 'thin'
   */
  variant?: DividerVariant;

  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Custom thickness of the divider. This controls the height (for horizontal) or width (for vertical) of the divider.
   * Note: Setting height via className will not work - use this prop instead.
   */
  thickness?: number;

  /**
   * Additional CSS classes to apply to the divider
   */
  className?: string;
}
