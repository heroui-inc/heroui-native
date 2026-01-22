import { useCSSVariable } from 'uniwind';

/**
 * Theme colors as const array for efficient mapping
 */
const THEME_COLORS = [
  'background',
  'background-secondary',
  'background-tertiary',
  'background-quaternary',
  'background-inverse',
  'foreground',
  'surface',
  'surface-foreground',
  'surface-secondary',
  'surface-tertiary',
  'surface-quaternary',
  'overlay',
  'overlay-foreground',
  'on-surface',
  'on-surface-foreground',
  'on-surface-hover',
  'on-surface-focus',
  'muted',
  'default',
  'default-foreground',
  'default-hover',
  'accent',
  'accent-foreground',
  'accent-hover',
  'accent-soft',
  'accent-soft-foreground',
  'accent-soft-hover',
  'field',
  'field-foreground',
  'field-placeholder',
  'field-border',
  'field-hover',
  'field-focus',
  'field-border-hover',
  'field-border-focus',
  'success',
  'success-foreground',
  'success-hover',
  'success-soft',
  'success-soft-foreground',
  'success-soft-hover',
  'warning',
  'warning-foreground',
  'warning-hover',
  'warning-soft',
  'warning-soft-foreground',
  'warning-soft-hover',
  'danger',
  'danger-foreground',
  'danger-hover',
  'danger-soft',
  'danger-soft-foreground',
  'danger-soft-hover',
  'segment',
  'segment-foreground',
  'border',
  'separator',
  'focus',
  'link',
] as const;

/**
 * Theme colors type derived from THEME_COLORS array
 */
export type ThemeColor = (typeof THEME_COLORS)[number];

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
