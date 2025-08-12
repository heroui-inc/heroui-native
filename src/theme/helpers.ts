import colorKit from './color-kit';
import type { SupportedColorFormats } from './color-kit/types';
import type {
  ColorConstants,
  ColorVariablesCSS,
  CombinedStyles,
  NonColorVariables,
  NonColorVariablesCSS,
  ThemeExtension,
} from './types';

/**
 * Converts any valid color format to HSL/HSLA string for CSS variables
 * @param color - Color in any format supported by color-kit
 * @returns HSL/HSLA string in format "h s% l%" or "h s% l% / a" for CSS variables
 */
export function convertToHSLString(
  color: SupportedColorFormats
): string | null {
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
 * Logs warning in development if color format is invalid
 * @param color - Color in any format supported by color-kit
 * @param colorName - Name of the color variable for error messages
 * @param defaultColor - Default color to use as fallback (should be in CSS var format)
 * @returns Converted HSL string or default color if validation fails
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
 * @param color - Color in either 'hsl(0 0% 100%)' or '0 0% 100%' format
 * @param toRuntime - If true, converts to runtime format (hsl wrapped), otherwise to CSS var format
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
 * Strips 'hsl(' wrapper from colors for CSS variable usage
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

/**
 * Converts ThemeExtension to NonColorVariables format
 * @internal
 */
export function extensionToNonColorVars(
  extension: ThemeExtension
): Partial<NonColorVariables> {
  const vars: Partial<NonColorVariables> = {};

  if (extension.borderRadius) {
    if (extension.borderRadius.DEFAULT) {
      vars.radius = extension.borderRadius.DEFAULT;
    }
    if (extension.borderRadius.panel) {
      vars.radiusPanel = extension.borderRadius.panel;
    }
    if (extension.borderRadius['panel-inner']) {
      vars.radiusPanelInner = extension.borderRadius['panel-inner'];
    }
  }

  if (extension.opacity?.disabled !== undefined) {
    vars.opacityDisabled = extension.opacity.disabled;
  }

  return vars;
}

/**
 * Deep merges two objects, with the second object's values taking precedence
 * @internal
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        target[key] !== null &&
        !Array.isArray(target[key])
      ) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key] as T[typeof key];
      }
    }
  }

  return result;
}

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
