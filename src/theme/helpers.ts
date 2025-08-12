import type {
  ColorConstants,
  ColorVariablesCSS,
  CombinedStyles,
  NonColorVariables,
  NonColorVariablesCSS,
  ThemeExtension,
} from './types';

/**
 * Converts HSL string format between runtime and CSS variable formats
 * @param color - Color in either 'hsl(0 0% 100%)' or '0 0% 100%' format
 * @param toRuntime - If true, converts to runtime format (hsl wrapped), otherwise to CSS var format
 * @internal
 */
export function formatHSL(color: string, toRuntime: boolean = true): string {
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
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');

    // Type assertion needed because we're converting from HSLColor to HSLValue
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
