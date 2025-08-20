/**
 * Provider-specific utilities for theme management
 * These utilities handle the color processing flow for the ThemeProvider
 *
 * THEME COLOR PROCESSING FLOW:
 * ============================
 *
 * 1. USER PROVIDES CUSTOM THEME:
 *    ```tsx
 *    <ThemeProvider theme={{
 *      light: { colors: { primary: '#ff0000' } }
 *    }}>
 *    ```
 *
 * 2. COLOR VALIDATION:
 *    - Each custom color goes through `processColorValue()`
 *    - Uses `colorKit.getFormat()` to validate color format
 *    - Supports: hex, rgb, hsl, named colors, and formats with alpha
 *
 * 3. COLOR CONVERSION:
 *    - Valid colors are converted to HSL via `convertToHSLString()`
 *    - Invalid colors log warnings (dev only) and use defaults
 *    - Output format: "h s% l%" or "h s% l% / a" (with alpha)
 *
 * 4. FORMAT WRAPPING:
 *    - For runtime (color constants): wrapped with hsl() via `formatHSL(color, true)`
 *    - For CSS variables: unwrapped via `formatHSL(color, false)`
 *
 * 5. FINAL OUTPUT:
 *    - Runtime: colors.primary = 'hsl(0 100% 50%)'
 *    - CSS Var: --primary: 0 100% 50%;
 */

import colorKit from './color-kit';
import type { SupportedColorFormats } from './color-kit/types';
import type {
  ColorConstants,
  ColorVariablesCSS,
  NonColorVariablesCSS,
  ThemeExtension,
} from './types';

/**
 * Converts any valid color format to HSL/HSLA string for CSS variables
 *
 * This is the core conversion function that enables support for any color format.
 * It uses color-kit to parse the color and convert it to HSL format.
 *
 * @param color - Color in any format supported by color-kit
 *                Examples: '#ff0000', 'rgb(255, 0, 0)', 'hsl(0, 100%, 50%)', 'red'
 * @returns HSL/HSLA string in format "h s% l%" or "h s% l% / a" for CSS variables
 *          Returns null if the color format is invalid
 *
 * @example
 * convertToHSLString('#ff0000') // "0 100% 50%"
 * convertToHSLString('rgba(255, 0, 0, 0.5)') // "0 100% 50% / 0.5"
 * convertToHSLString('invalid') // null
 */
export function convertToHSLString(
  color: SupportedColorFormats
): string | null {
  if (!color) return null;

  // Use colorKit.getFormat to validate - it's the single source of truth
  if (colorKit.getFormat(color) === null) {
    return null;
  }

  const hslColor = colorKit.HSL(color);
  const hslObject = hslColor.object();

  // Check if color has alpha channel
  if (hslObject.a !== undefined && hslObject.a < 1) {
    // Return HSLA format for CSS variables with alpha
    return `${Math.round(hslObject.h)} ${Math.round(hslObject.s)}% ${Math.round(hslObject.l)}% / ${hslObject.a}`;
  }

  // Return HSL format for CSS variables without alpha
  return `${Math.round(hslObject.h)} ${Math.round(hslObject.s)}% ${Math.round(hslObject.l)}%`;
}

/**
 * Processes a color value, validating and converting it to HSL format
 *
 * This is the main entry point for processing user-provided colors.
 * It handles validation, conversion, error logging, and fallback to defaults.
 *
 * FLOW:
 * 1. Check if color is null/undefined → use default
 * 2. Try to convert to HSL → if successful, return HSL string
 * 3. If conversion fails → log warning (dev only) and use default
 *
 * @param color - Color in any format supported by color-kit (can be null/undefined)
 * @param colorName - Name of the color variable (used in error messages)
 * @param defaultColor - Default color to use as fallback (should be in CSS var format)
 * @returns Converted HSL string or default color if validation fails
 *
 * @example
 * processColorValue('#ff0000', 'primary', '0 100% 50%') // "0 100% 50%"
 * processColorValue('invalid', 'primary', '0 100% 50%') // "0 100% 50%" (with warning)
 * processColorValue(null, 'primary', '0 100% 50%') // "0 100% 50%" (with warning)
 */
export function processColorValue(
  color: string | null | undefined,
  colorName: string,
  defaultColor: string
): string {
  const errorMsg = `🎨 HeroUI Native Theme:\nInvalid color format for "${colorName}: ${color}".\nPlease provide a valid color format (HSL, HSLA, RGB, RGBA, HEX, HEXA).\nUsing default ${colorName} color as a fallback.`;

  // Handle null/undefined
  if (!color) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(errorMsg);
    }
    return defaultColor;
  }

  // Try to convert to HSL
  const hslString = convertToHSLString(color);

  if (!hslString) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(errorMsg);
    }
    return defaultColor;
  }

  return hslString;
}

/**
 * Converts HSL string format between runtime and CSS variable formats
 *
 * This function handles the wrapping/unwrapping of HSL values:
 * - Runtime format: needs hsl() or hsla() wrapper for React Native
 * - CSS variable format: needs unwrapped values for NativeWind
 *
 * @param color - Color in either 'hsl(0 0% 100%)' or '0 0% 100%' format
 * @param toRuntime - If true, wraps with hsl(), if false, unwraps
 * @returns Formatted color string
 *
 * @example
 * // For runtime usage (React Native color constants)
 * formatHSL('0 100% 50%', true) // 'hsl(0 100% 50%)'
 * formatHSL('0 100% 50% / 0.5', true) // 'hsla(0, 100%, 50%, 0.5)'
 *
 * // For CSS variables (NativeWind)
 * formatHSL('hsl(0 100% 50%)', false) // '0 100% 50%'
 * formatHSL('hsla(0, 100%, 50%, 0.5)', false) // '0 100% 50% / 0.5'
 *
 * @internal
 */
export function formatHSL(color: string, toRuntime: boolean = true): string {
  // Check if string contains alpha (has " / " separator)
  if (color.includes(' / ')) {
    if (toRuntime) {
      // Convert to hsla() format
      const parts = color.split(' / ');
      if (parts.length === 2 && parts[0] && parts[1]) {
        return `hsla(${parts[0].replace(/ /g, ', ')}, ${parts[1]})`;
      }
    } else if (color.startsWith('hsla(')) {
      // Unwrap hsla() to CSS variable format
      const match = color.match(
        /hsla\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/
      );
      if (match) {
        const [, h, s, l, a] = match;
        return `${h} ${s}% ${l}% / ${a}`;
      }
    }
    return color;
  }

  // Handle regular HSL format
  const isWrapped = color.startsWith('hsl(');

  if (toRuntime && !isWrapped) {
    return `hsl(${color})`;
  } else if (!toRuntime && isWrapped) {
    return color.replace(/^hsl\((.*)\)$/, '$1');
  }

  return color;
}

/**
 * Converts ColorConstants to CSS variable format for NativeWind
 *
 * This function transforms the merged color constants into CSS variables
 * that NativeWind can use. It handles the naming conversion and format changes.
 *
 * TRANSFORMATIONS:
 * 1. Naming: camelCase to kebab-case (e.g., 'mutedForeground' → '--muted-foreground')
 * 2. Special cases: 'surface1' → '--surface-1' (adds hyphen before number)
 * 3. Format: Unwraps hsl() wrapper (e.g., 'hsl(0 100% 50%)' → '0 100% 50%')
 *
 * @param colors - Color constants object with hsl() wrapped values
 * @returns CSS variables object with unwrapped HSL values
 *
 * @example
 * Input:  { primary: 'hsl(0 100% 50%)', surface1: 'hsl(0 0% 96%)' }
 * Output: { '--primary': '0 100% 50%', '--surface-1': '0 0% 96%' }
 *
 * @internal
 */
export function colorsToCSSVars(
  colors: Partial<ColorConstants>
): Partial<ColorVariablesCSS> {
  const cssVars: Partial<ColorVariablesCSS> = {};

  for (const [key, value] of Object.entries(colors)) {
    const cssKey =
      '--' +
      key
        // Handle surface1, surface2, surface3 special case
        .replace(/surface(\d)/, 'surface-$1')
        // Convert camelCase to kebab-case
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');

    // Convert to CSS variable format (unwrap hsl/hsla)
    const cssValue = formatHSL(value, false);
    (cssVars as any)[cssKey] = cssValue;
  }

  return cssVars;
}

/**
 * Converts ThemeExtension non-color values to CSS variables format
 *
 * This function handles non-color theme customizations like border radius
 * and opacity values, converting them to CSS variables for NativeWind.
 *
 * SUPPORTED PROPERTIES:
 * - borderRadius.DEFAULT → --radius
 * - borderRadius.panel → --radius-panel
 * - borderRadius['panel-inner'] → --radius-panel-inner
 * - opacity.disabled → --opacity-disabled
 *
 * @param extension - Theme extension object with non-color values
 * @returns CSS variables object for non-color properties
 *
 * @example
 * Input:  { borderRadius: { DEFAULT: '12px', panel: '8px' } }
 * Output: { '--radius': '12px', '--radius-panel': '8px' }
 *
 * @internal
 */
export function extensionToCSSVars(
  extension: ThemeExtension
): Partial<NonColorVariablesCSS> {
  const cssVars: Partial<NonColorVariablesCSS> = {};

  if (extension.borderRadius) {
    if (extension.borderRadius.DEFAULT) {
      cssVars['--radius'] = extension.borderRadius.DEFAULT;
    }
    if (extension.borderRadius.panel) {
      cssVars['--radius-panel'] = extension.borderRadius.panel;
    }
    if (extension.borderRadius['panel-inner']) {
      cssVars['--radius-panel-inner'] = extension.borderRadius['panel-inner'];
    }
  }

  if (extension.opacity?.disabled !== undefined) {
    cssVars['--opacity-disabled'] = extension.opacity.disabled;
  }

  return cssVars;
}
