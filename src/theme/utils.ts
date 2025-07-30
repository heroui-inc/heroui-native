import type { ClassValue } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
export type ElementSlots<S extends string> = {
  [key in S]?: Exclude<ClassValue, 0n>;
};

/**
 * Type helper that preserves the exact type of combined style objects
 * This ensures that VariantProps inference works correctly for each style
 */
export type CombinedStyles<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};

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
