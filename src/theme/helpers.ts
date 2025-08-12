import type {
  CombinedStyles,
  NonColorVariables,
  ThemeExtension,
} from './types';

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
