import type { CombinedStyles } from './types';

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

/**
 * Adds alpha channel to an HSL color
 * @param color - HSL color in format 'hsl(0 0% 100%)' or '0 0% 100%'
 * @param alpha - Alpha value between 0 and 1
 * @returns HSL color with alpha channel
 * @example
 * addAlpha('hsl(0 0% 100%)', 0.5) // 'hsl(0 0% 100% / 0.5)'
 * addAlpha('0 0% 100%', 0.5) // 'hsl(0 0% 100% / 0.5)'
 */
export function addAlpha(color: string, alpha: number): string {
  const baseColor = color.startsWith('hsl(')
    ? color.replace(/^hsl\((.*)\)$/, '$1')
    : color;

  return `hsl(${baseColor} / ${alpha})`;
}