import type { CombinedStyles } from '../types';

/**
 * Helper function to combine style objects with proper type inference
 * This preserves the exact types of each style object, including VariantProps
 * @example
 * const styles = combineStyles({
 *   root,
 *   item,
 *   content
 * });
 */
export function combineStyles<T extends Record<string, any>>(
  styles: T
): CombinedStyles<T> {
  return styles as CombinedStyles<T>;
}
