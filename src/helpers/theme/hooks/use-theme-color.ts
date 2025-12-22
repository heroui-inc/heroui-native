import { useCSSVariable } from 'uniwind';
import type { ThemeColor } from '../types';

/**
 * Helper type to create a tuple of strings with the same length as the input array
 */
type CreateStringTuple<
  N extends number,
  TAcc extends string[] = [],
> = TAcc['length'] extends N ? TAcc : CreateStringTuple<N, [...TAcc, string]>;

/**
 * Hook to retrieve theme color values from CSS variables.
 * Supports both single color and multiple colors for efficient batch retrieval.
 *
 * @param themeColor - Single theme color name or array of theme color names
 * @returns Single color string or array of color strings
 *
 * @example
 * // Single color
 * const primaryColor = useThemeColor('accent');
 *
 * @example
 * // Multiple colors (more efficient)
 * const [primaryColor, backgroundColor] = useThemeColor(['accent', 'background']);
 */
export function useThemeColor(themeColor: ThemeColor): string;
export function useThemeColor<T extends readonly [ThemeColor, ...ThemeColor[]]>(
  themeColor: T
): CreateStringTuple<T['length']>;
export function useThemeColor(themeColor: ThemeColor[]): string[];
export function useThemeColor(
  themeColor: ThemeColor | ThemeColor[]
): string | string[] {
  const isArray = Array.isArray(themeColor);
  const cssVariables = isArray
    ? themeColor.map((color) => `--color-${color}`)
    : [`--color-${themeColor}`];

  const resolvedColors = useCSSVariable(cssVariables);

  const processedColors: string[] = resolvedColors.map((color) => {
    if (typeof color === 'string') {
      return color;
    }
    if (typeof color === 'number') {
      return String(color);
    }
    return 'invalid';
  });

  if (isArray) {
    return processedColors;
  }
  return processedColors[0]!;
}
